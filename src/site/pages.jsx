import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CATEGORIES } from '../data/categories.js'
import {
  sectionBySlug,
  sectionOf,
  projectsIn,
  findProject,
  loadProject,
  posts,
  findPost,
  loadPost,
  formatDate,
  yearOf,
  isKorean,
} from './content.js'
import { CategoryChips, Hold, Loading, NextCard, PageHead, ProjectCard, useTitle } from './ui.jsx'

// 벽의 등반 순서 (아래 → 위) — "다음 홀드"
const WALL_ORDER = CATEGORIES.map((c) => c.slug).filter((s) => sectionBySlug[s])
const nextSection = (slug) => sectionBySlug[WALL_ORDER[(WALL_ORDER.indexOf(slug) + 1) % WALL_ORDER.length]]

/* ───────── /portfolio/:slug — 카테고리 or 프로젝트 ───────── */
export function PortfolioRoute() {
  const { slug } = useParams()
  if (sectionBySlug[slug]) return <CategoryPage slug={slug} />
  if (findProject(slug)) return <ProjectPage slug={slug} />
  return <NotFound />
}

function CategoryPage({ slug }) {
  const s = sectionBySlug[slug]
  const list = projectsIn(slug)
  const next = nextSection(slug)
  useTitle(s.label)
  const hold = String(WALL_ORDER.indexOf(slug) + 1).padStart(2, '0')

  return (
    <>
      <CategoryChips active={slug} />
      <motion.div key={slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
        <PageHead color={s.color} kicker={`Hold ${hold} · ${list.length} project${list.length === 1 ? '' : 's'}`} kickerColor={s.text} title={s.label} lead={s.blurb} />
        <div className="wrap">
          {list.length ? (
            <ul className="grid">
              {list.map((p, i) => (
                <ProjectCard key={p.slug} p={p} i={i} wide={slug === 'main' && i === 0} showSection={slug === 'main'} priority={i < 3} />
              ))}
            </ul>
          ) : (
            <p className="empty">Nothing on this hold yet — check back soon.</p>
          )}
        </div>
        <section className="next" aria-label="Keep climbing">
          <div className="wrap next-grid">
            <NextCard to={`/portfolio/${next.slug}`} label="Next hold" labelColor={next.text} title={next.label} color={next.color} />
            <NextCard to="/" label="Back to" title="the climbing wall" color="var(--scene-wall)" />
          </div>
        </section>
      </motion.div>
    </>
  )
}

// 본문 안 <figure>/<img>/<iframe>를 스크롤 시 부드럽게 등장시킨다
function useRevealMedia(ref, deps) {
  useEffect(() => {
    const root = ref.current
    if (!root || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const els = root.querySelectorAll(':scope > figure, :scope > p > img, :scope > img, :scope > iframe, :scope > .meta-list, :scope > pre')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.animate(
            [
              { opacity: 0, transform: 'translateY(18px)' },
              { opacity: 1, transform: 'none' },
            ],
            { duration: 450, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }
          )
          io.unobserve(e.target)
        }),
      { rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top > window.innerHeight) io.observe(el) // 첫 화면 아래 것만
    })
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

function useDoc(loader, slug) {
  const [doc, setDoc] = useState(null)
  useEffect(() => {
    let alive = true
    setDoc(null)
    loader(slug).then((d) => alive && setDoc(d))
    return () => {
      alive = false
    }
  }, [loader, slug])
  return doc
}

function Prose({ html, essay }) {
  const ref = useRef(null)
  useRevealMedia(ref, [html])
  return <div ref={ref} className={`prose${essay ? ' essay' : ''}`} dangerouslySetInnerHTML={{ __html: html }} />
}

function ProjectPage({ slug }) {
  const meta = findProject(slug)
  const s = sectionOf(meta)
  const doc = useDoc(loadProject, slug)
  useTitle(meta.title)

  const siblings = projectsIn(s.slug)
  const idx = siblings.findIndex((p) => p.slug === slug)
  const nextProject = siblings.length > 1 ? siblings[(idx + 1) % siblings.length] : null
  const next = nextSection(s.slug)
  // 커버가 본문에 이미 있으면 히어로 생략 (중복 방지)
  const showHero = meta.cover && doc && !doc.html.includes(meta.cover)

  return (
    <article>
      <div className="wrap">
        <Link to={`/portfolio/${s.slug}`} className="back">
          <span className="arr" aria-hidden="true">←</span> {s.label}
        </Link>
        <header className="article-head">
          <p className="kicker" style={{ color: s.text }}>
            <Hold color={s.color} />
            {[s.label, yearOf(meta.date), meta.kicker].filter(Boolean).join(' · ')}
          </p>
          <motion.h1 className="display" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }}>
            {meta.title}
          </motion.h1>
        </header>
        {showHero && (
          <motion.figure className="hero" initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <img src={meta.cover} alt="" />
          </motion.figure>
        )}
        {doc ? <Prose html={doc.html} essay={false} /> : <Loading />}
      </div>
      <section className="next" aria-label="Keep climbing">
        <div className="wrap next-grid">
          {nextProject && <NextCard to={`/portfolio/${nextProject.slug}`} label={`Next in ${s.label}`} labelColor={s.text} title={nextProject.title} />}
          <NextCard to={`/portfolio/${next.slug}`} label="Next hold up the wall" labelColor={next.text} title={next.label} color={next.color} />
        </div>
      </section>
    </article>
  )
}

/* ───────── /blog ───────── */
export function BlogIndex() {
  useTitle('Blog')
  const byYear = useMemo(() => {
    const m = new Map()
    posts.forEach((p) => {
      const y = yearOf(p.date) || '—'
      if (!m.has(y)) m.set(y, [])
      m.get(y).push(p)
    })
    return [...m.entries()]
  }, [])
  let i = 0
  return (
    <>
      <PageHead color="var(--scene-wall)" kicker={`Writing · ${posts.length} posts`} title="Blog" lead="Notes on creative coding, front-end, exhibitions and the occasional retrospective — mostly in Korean." />
      <div className="wrap">
        {byYear.map(([year, list]) => (
          <section key={year} aria-labelledby={`y-${year}`}>
            <h2 className="year-head" id={`y-${year}`}>
              {year}
            </h2>
            <ul className="post-list">
              {list.map((p) => (
                <motion.li key={p.slug} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35, delay: Math.min(i++, 6) * 0.04 }}>
                  <Link to={`/blog/${p.slug}`} className="post-link">
                    <span className="post-date">{formatDate(p.date)}</span>
                    <span>
                      <span className="post-title">{p.title}</span>
                      {p.excerpt && <span className="post-excerpt">{p.excerpt}</span>}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  )
}

export function BlogPost() {
  const { slug } = useParams()
  const meta = findPost(slug)
  const doc = useDoc(loadPost, slug)
  useTitle(meta?.title)
  if (!meta) return <NotFound />
  const i = posts.indexOf(meta)
  const newer = posts[i - 1]
  const older = posts[i + 1]
  const essay = isKorean(meta.title + meta.excerpt) && !/```|<pre/.test(doc?.html ?? '')

  return (
    <article>
      <div className="wrap">
        <Link to="/blog" className="back">
          <span className="arr" aria-hidden="true">←</span> Blog
        </Link>
        <header className="article-head">
          <p className="kicker" style={{ color: 'var(--accent-text)' }}>
            {[formatDate(meta.date), meta.kicker].filter(Boolean).join(' · ')}
          </p>
          <motion.h1 className="display" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            {meta.title}
          </motion.h1>
        </header>
        {doc ? <Prose html={doc.html} essay={essay} /> : <Loading />}
      </div>
      {(newer || older) && (
        <section className="next" aria-label="More posts">
          <div className="wrap next-grid">
            {older && <NextCard to={`/blog/${older.slug}`} label="Older" title={older.title} />}
            {newer && <NextCard to={`/blog/${newer.slug}`} label="Newer" title={newer.title} />}
          </div>
        </section>
      )}
    </article>
  )
}

/* ───────── /archive (TIL) ───────── */
const TIL = [
  {
    title: 'TIL',
    note: '2023~',
    links: [
      ['Nonfigurative 3d scene across windows threejs, localStorage, window.getScreenDetails() API, getScreenDetails(), window.screenX/Y', 'https://github.com/bgstaal/multipleWindow3dScene'],
      ['Unite Seoul 2020 VFX by Keijiro Takhashi: Particle Strip, VFX Shader Graph...', 'https://www.youtube.com/watch?v=b9QbRuvkvsI'],
      ['Web GPU API', 'https://developer.mozilla.org/en-US/docs/Web/API/WebGPU_API#examples'],
      ['Web GPU Samples', 'https://webgpu.github.io/webgpu-samples/'],
      ['WEB GPU Compute on the web', 'https://developer.chrome.com/articles/gpu-compute/'],
      ['WebGPU Intro (Korean)한글', 'https://www.youtube.com/watch?v=lKdi5ZG4NbU'],
      ['Create Rendering Engine From the Ground Zero', 'https://learnopengl.com/Getting-started/Textures'],
      ['WebGPU: Unlocking modern GPU access in the browser', 'https://developer.chrome.com/blog/webgpu-io2023/'],
      ['Build WEB GPU APP with Colab', 'https://codelabs.developers.google.com/your-first-webgpu-app?hl=ko#0'],
      ['WebGPU Shading Language, W3C Working Draft, 20 November 2023', 'https://www.w3.org/TR/WGSL/'],
      ['Build and Deploy an Amazing 3D Developer Portfolio in React with Three.js', 'https://www.youtube.com/watch?v=FkowOdMjvYo&pp=ygUfamF2YXNjcmlwdCBtYXN0ZXJ5IDNkIHBvcnRmb2xpbw%3D%3D'],
      ['DirectX 11', 'http://www.directxtutorial.com/Lesson.aspx?lessonid=9-1-3'],
    ],
  },
  {
    title: 'learn',
    links: [
      ['https://threejs.org/', 'https://threejs.org/'],
      ['https://p5js.org', 'https://p5js.org'],
      ['https://thebookofshaders.com/', 'https://thebookofshaders.com/'],
      ['Inigo Quilez Youtube', 'https://www.youtube.com/channel/UCdmAhiG8HQDlz8uyekw4ENw'],
      ['https://threejs-journey.com/', 'https://threejs-journey.com/'],
      ['https://forums.cgsociety.org/', 'https://forums.cgsociety.org/'],
      ['https://sbcode.net/threejs/loaders-gltf/', 'https://sbcode.net/threejs/loaders-gltf/'],
      ['https://twitter.com/Andersonmancini', 'https://twitter.com/Andersonmancini'],
      ['https://www.youtube.com/c/3blue1brown', 'https://www.youtube.com/c/3blue1brown'],
      ['https://www.sidefx.com/industries/games/', 'https://www.sidefx.com/industries/games/'],
      ['https://www.shadertoy.com/', 'https://www.shadertoy.com/'],
      ['https://spector.babylonjs.com/', 'https://spector.babylonjs.com/'],
      ['https://www.opengl.org/', 'https://www.opengl.org/'],
      ['https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection', 'https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection/'],
    ],
  },
  {
    title: 'coolsss',
    links: [
      ['https://twitter.com/mrdoob', 'https://twitter.com/mrdoob'],
      ['DemoScene', 'https://www.youtube.com/watch?v=O4T7pIs--LA'],
      ['https://www.instagram.com/zach.lieberman/', 'https://www.instagram.com/zach.lieberman/'],
      ['https://bruno-simon.com/', 'https://bruno-simon.com/'],
      ['http://goinghome.302chanwoo.com/', 'http://goinghome.302chanwoo.com/'],
      ['Wolves in the Walls | Oculus Quest + Rift Platforms', 'https://www.youtube.com/watch?v=r-H5U6dV0VM'],
      ['http://taotajima.jp/', 'http://taotajima.jp/'],
    ],
  },
  {
    title: 'my stuff',
    links: [
      ['P5JS Guide Book for Classes (Made by Me)', 'https://3d-math.gitbook.io/p5jscodeanddesign/'],
      ['뉴스레터 (Korean Newsletter)', 'https://maily.so/sosunnyproject/'],
      ['Instagram', 'https://instagram.com/sosunnyproject/'],
    ],
  },
]
const TIL_COLORS = ['var(--accent)', 'var(--cat-xr)', 'var(--cat-graphics)', 'var(--cat-edu)']

export function Archive() {
  useTitle('TIL')
  return (
    <>
      <PageHead color="var(--cat-xr)" kicker="Today I learned" kickerColor="var(--cat-xr-text)" title="til" lead="Links I keep going back to — graphics, WebGPU, shaders and people who inspire me." />
      <div className="wrap link-groups">
        {TIL.map((g, gi) => (
          <motion.section key={g.title} className="link-group" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
            <h2>
              <Hold color={TIL_COLORS[gi % TIL_COLORS.length]} size={12} />
              {g.title} {g.note && <small>{g.note}</small>}
            </h2>
            <ul>
              {g.links.map(([label, href]) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noreferrer">
                    {label}
                    <span className="ext" aria-hidden="true">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
    </>
  )
}

/* ───────── /cv ───────── */
export function CV() {
  useTitle('CV')
  return (
    <>
      <PageHead color="var(--cat-web)" kicker="Curriculum vitae" kickerColor="var(--cat-web-text)" title="cv">
        <div className="cv-actions" style={{ marginTop: 'var(--space-6)', paddingBottom: 0 }}>
          <a className="pill" href="https://drive.google.com/file/d/1S6e2I_hDFYBNiFCPgKPK4A2AkhysLykJ/view?usp=sharing" target="_blank" rel="noreferrer">
            Resume (1 page) ↗
          </a>
          <a className="pill ghost" href="https://www.linkedin.com/in/sosunpark/" target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a className="pill ghost" href="https://docs.google.com/document/d/1PVqbH6huZiy4b9-AkDRo7rRD5BWEOV7F_H4uvHs-gIE/edit" target="_blank" rel="noreferrer">
            Original document ↗
          </a>
        </div>
      </PageHead>
      <div className="wrap">
        <iframe
          className="doc-frame"
          title="CV"
          loading="lazy"
          src="https://docs.google.com/document/d/e/2PACX-1vQYcyKhMS04uJtowbEjud8dp1W7c1uNxdHNtdom7tXvGWEkh41oUGMPOauyw262MAYLGV9UqtbadaYt/pub?embedded=true"
        />
      </div>
    </>
  )
}

export function PortfolioHome() {
  return <Navigate to="/portfolio/main" replace />
}

export function NotFound() {
  useTitle('Off route')
  return (
    <PageHead color="var(--cat-games)" kicker="404" kickerColor="var(--cat-games-text)" title="Off route" lead="This hold doesn't exist. Let's get you back on the wall.">
      <div className="cv-actions" style={{ marginTop: 'var(--space-6)' }}>
        <Link className="pill" to="/">
          Back to the wall ↑
        </Link>
        <Link className="pill ghost" to="/portfolio/main">
          See all work
        </Link>
      </div>
    </PageHead>
  )
}

