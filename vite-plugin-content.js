// 기존 Gatsby 마크다운(content/**)을 Vite 모듈로 변환하는 플러그인.
//
//   import.meta.glob('/content/portfolio/*/index.md', { query: '?meta', eager: true, import: 'default' })
//     → { slug, title, kicker, date, category, subcategory, featured, order, cover, excerpt }  (리스트용, 가벼움)
//   import.meta.glob('/content/portfolio/*/index.md', { query: '?post', import: 'default' })
//     → { ...meta, html }  (상세 페이지용, lazy chunk)
//
// - frontmatter는 단순 `key: value` 형식만 쓰므로 직접 파싱한다 (gray-matter는 브라우저 번들에 Buffer가 필요).
// - 본문은 marked로 HTML 변환. raw HTML(<figure>, <iframe>, <li>…)은 그대로 통과.
// - 상대경로 이미지(<img src="x.png">, ![](x.png), featuredImage)는 Vite asset import로 바꿔
//   빌드 시 해시 파일명으로 복사된다 (Gatsby의 gatsby-remark-images 대체).
// - 코드 블록은 빌드 시 Prism으로 하이라이트.
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { Marked } from './scripts/vendor/marked.esm.js' // marked v18 (MIT) — 의존성 추가 없이 벤더링

const require = createRequire(import.meta.url)
const Prism = require('prismjs')
require('prismjs/components/index')(['javascript', 'jsx', 'typescript', 'css', 'glsl', 'c', 'cpp', 'csharp', 'python', 'bash', 'json', 'markup'])

const marked = new Marked({ gfm: true, breaks: false })
marked.use({
  renderer: {
    code({ text, lang }) {
      const l = (lang || '').trim().split(/\s/)[0].toLowerCase()
      const alias = { js: 'javascript', ts: 'typescript', html: 'markup', sh: 'bash', shell: 'bash', 'c#': 'csharp', cs: 'csharp', frag: 'glsl', vert: 'glsl' }
      const name = alias[l] || l
      const grammar = Prism.languages[name]
      const body = grammar ? Prism.highlight(text, grammar, name) : escapeHtml(text)
      return `<pre class="code language-${name || 'text'}"><code class="language-${name || 'text'}">${body}</code></pre>\n`
    },
  },
})

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function parseFrontmatter(src) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src)
  if (!m) return { data: {}, body: src }
  const data = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line)
    if (!kv) continue
    let v = kv[2].trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1)
    else if (v === 'true' || v === 'false') v = v === 'true'
    else if (/^-?\d+(\.\d+)?$/.test(v)) v = Number(v)
    data[kv[1]] = v
  }
  return { data, body: src.slice(m[0].length) }
}

// "[3D Web Graphics] 《 euljiro.xyz 》" → kicker "3D Web Graphics", title "euljiro.xyz"
function splitTitle(raw = '') {
  let title = String(raw).trim()
  let kicker = ''
  const b = /^\[([^\]]+)\]\s*/.exec(title)
  if (b) {
    kicker = b[1].trim()
    title = title.slice(b[0].length)
  }
  title = title.replace(/^《\s*/, '').replace(/\s*》$/, '').trim()
  return { title: title || String(raw), kicker }
}

// 포트폴리오 글 상단의 맨 <li><b>Position</b>: …</li> 줄 묶음 → 메타 리스트로 감싼다
function wrapLooseListItems(md) {
  const out = []
  let run = []
  let depth = 0 // 열린 <ul>/<ol> 깊이 — 그 안의 <li>는 건드리지 않는다
  const flush = () => {
    if (run.length) out.push('<ul class="meta-list">', ...run, '</ul>')
    run = []
  }
  for (const line of md.split(/\r?\n/)) {
    if (depth === 0 && /^\s*<li>.*<\/li>\s*$/i.test(line)) run.push(line.trim())
    else {
      flush()
      out.push(line)
    }
    depth += (line.match(/<(ul|ol)\b/gi) || []).length - (line.match(/<\/(ul|ol)>/gi) || []).length
    if (depth < 0) depth = 0
  }
  flush()
  return out.join('\n')
}

function excerptOf(html, n = 140) {
  const text = html
    .replace(/<pre[\s\S]*?<\/pre>/g, ' ')
    .replace(/<(figcaption|iframe|script|style)[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  return text.length > n ? text.slice(0, n).replace(/\s\S*$/, '') + '…' : text
}

const isRelative = (src) => src && !/^(https?:|data:|\/\/|\/|#|mailto:)/i.test(src)

function build(file, withHtml) {
  const src = fs.readFileSync(file, 'utf8')
  const { data, body } = parseFrontmatter(src)
  const dir = path.dirname(file)
  const rel = path.relative(path.resolve('content'), file).split(path.sep) // ['portfolio','slug','index.md']
  const section = rel[0]
  const slug = rel[rel.length - 1] === 'index.md' ? rel[rel.length - 2] : rel.slice(1).join('/').replace(/\.md$/, '')
  const { title, kicker } = splitTitle(data.title)

  const imports = []
  const assetVar = (p) => {
    const abs = path.resolve(dir, decodeURI(p.split(/[?#]/)[0]))
    if (!fs.existsSync(abs)) return null
    const name = `__img${imports.length}`
    imports.push(`import ${name} from ${JSON.stringify(abs.split(path.sep).join('/') + '?url')}`)
    return name
  }

  let html = marked
    .parse(wrapLooseListItems(body))
    .replace(/<img\b(?![^>]*\bloading=)/g, '<img loading="lazy" decoding="async"')
  const meta = {
    slug,
    section,
    title,
    kicker,
    rawTitle: data.title || title,
    date: data.date ? String(data.date) : '',
    category: data.category || '',
    subcategory: String(data.subcategory || '').toLowerCase(),
    featured: data.featured === true,
    order: typeof data.order === 'number' ? data.order : 999,
    excerpt: excerptOf(html),
  }
  const coverVar = data.featuredImage && isRelative(data.featuredImage) ? assetVar(data.featuredImage) : null
  // 커버가 없으면 본문 첫 이미지
  let firstImgVar = null

  // 본문의 상대경로 src → "+__imgN+" 로 치환해 JS 문자열 연결로 내보낸다
  const parts = []
  let last = 0
  html.replace(/(<img\b[^>]*?\ssrc=)(["'])([^"']+)\2/gi, (m, pre, q, s, idx) => {
    if (!isRelative(s)) return m
    const v = assetVar(s)
    if (!v) return m
    if (!firstImgVar) firstImgVar = v
    parts.push(JSON.stringify(html.slice(last, idx) + pre + q), v)
    last = idx + m.length - 1 // 닫는 따옴표는 남긴다
    return m
  })
  parts.push(JSON.stringify(html.slice(last)))

  const htmlExpr = parts.join(' + ')

  const cover = coverVar || firstImgVar || 'null'
  const code = [
    ...imports,
    `const meta = ${JSON.stringify(meta)};`,
    `meta.cover = ${cover};`,
    withHtml ? `export default { ...meta, html: ${htmlExpr} };` : `export default meta;`,
  ].join('\n')
  return code
}

export default function contentPlugin() {
  return {
    name: 'sosunny-content',
    enforce: 'pre',
    load(id) {
      const [file, query] = id.split('?')
      if (!file.endsWith('.md') || !query) return null
      if (query === 'meta') {
        this.addWatchFile(file)
        return build(file, false)
      }
      if (query === 'post') {
        this.addWatchFile(file)
        return build(file, true)
      }
      return null
    },
  }
}
