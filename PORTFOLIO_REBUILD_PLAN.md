# sosunnyproject.github.io — Vite + React Three Fiber 재구축 계획

> Claude Code에서 이 문서를 그대로 실행 가이드로 사용하세요.
> Gatsby → Vite 이주 + Three.js 클라이밍 벽 랜딩 페이지 구축.
> 각 Phase는 독립적으로 커밋 가능하도록 설계되어 있습니다.

---

## 0. 목표와 원칙

**목표**
- Gatsby를 걷어내고 Vite + React + React Three Fiber(R3F) 스택으로 이주
- 메인 랜딩 페이지 = 인터랙티브 3D 클라이밍 벽 (스크롤로 벽을 오르고, 홀드를 클릭하면 프로젝트로 이동)
- 프로젝트 상세 페이지를 MDX로 템플릿화 — 새 프로젝트 추가가 "마크다운 파일 + 이미지 폴더" 한 세트면 끝
- GitHub Pages에 GitHub Actions로 자동 배포

**원칙**
1. **이주와 새 디자인을 한 브랜치에 섞지 않는다.** 먼저 기존 사이트와 동일하게 보이는 Vite 버전을 완성하고(Phase 1–3), 그 다음 클라이밍 벽을 올린다(Phase 4–6).
2. 각 Phase 끝에서 반드시 커밋. 사이트는 항상 배포 가능한 상태 유지.
3. 기존 Gatsby 코드는 `source`/`source-update`가 origin에 이미 푸시되어 있어 별도 백업 브랜치 없이도 보존됨. 작업은 `source-update`에서 분기한 `threejs` 브랜치에서 진행.
4. 3D는 기본 geometry + 라이팅 중심의 stylized low-poly. 사실적 텍스처/외부 모델 의존 최소화.

**기술 스택 (2026 기준 안정 조합)**

| 영역 | 도구 |
|---|---|
| 빌드 | Vite |
| 프레임워크 | React 18 |
| 3D | @react-three/fiber + @react-three/drei |
| 포스트프로세싱 | @react-three/postprocessing |
| 라우팅 | react-router-dom v6 |
| 콘텐츠 | MDX (@mdx-js/rollup) |
| 상태 | zustand |
| DOM 애니메이션 | framer-motion |
| 개발용 GUI | leva (튜닝 후 제거 가능) |
| 배포 | GitHub Actions → GitHub Pages |

---

## 1. 사전 작업 — 브랜치 셋업 (완료)

> `source-update`는 이미 origin과 동기화된 최신 상태(`git pull` 확인됨)이므로, 별도 백업 브랜치 없이 바로 작업 브랜치를 분기.

```bash
git checkout source-update
git checkout -b threejs
```

이후 모든 Phase 작업은 `threejs` 브랜치에서 진행한다. 기존 Gatsby 코드는 `source`/`source-update`에 그대로 남아있으므로 언제든 되돌아갈 수 있다.

배포 안전망: 이주가 끝나 새 사이트가 정상 배포될 때까지 GitHub Pages의 source는 기존 설정(`master` 브랜치) 그대로 둔다. 새 워크플로우가 초록불이 된 걸 확인한 뒤에 Pages source를 "GitHub Actions"로 전환한다.

---

## 2. 프로젝트 초기 구조

이주 완료 시점의 목표 디렉토리 구조:

```
sosunnyproject.github.io/
├─ .github/
│  └─ workflows/
│     └─ deploy.yml
├─ public/
│  └─ googled935393a50610930.html   # 기존 google 인증 파일 유지
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  ├─ index.css
│  ├─ routes/
│  │  ├─ Landing.jsx               # 클라이밍 벽 (메인)
│  │  ├─ ProjectList.jsx
│  │  └─ ProjectPage.jsx           # MDX 렌더 래퍼
│  ├─ three/
│  │  ├─ ClimbingWall.jsx          # 씬 루트
│  │  ├─ Wall.jsx                  # 벽 mesh
│  │  ├─ Hold.jsx                  # 클릭 가능한 홀드
│  │  ├─ Climber.jsx               # (옵션) 캐릭터
│  │  ├─ Lighting.jsx
│  │  └─ useScrollProgress.js
│  ├─ content/
│  │  └─ portfolio/
│  │     ├─ prime-engine/
│  │     │  ├─ index.mdx
│  │     │  └─ hero.png
│  │     └─ 2019-ial-show/
│  │        ├─ index.mdx
│  │        └─ ...images
│  ├─ components/
│  │  ├─ ProjectHero.jsx
│  │  ├─ Gallery.jsx
│  │  ├─ TechStack.jsx
│  │  └─ Seo.jsx
│  ├─ data/
│  │  └─ projects.js               # MDX glob → 메타데이터 수집
│  └─ store/
│     └─ useStore.js               # zustand
├─ index.html
├─ vite.config.js
└─ package.json
```

---

## 3. Phase별 로드맵

| Phase | 내용 | 예상 | 커밋 시점 |
|---|---|---|---|
| 1 | Vite 초기화 + 의존성 + 워크플로우 | 0.5일 | "chore: vite scaffold" |
| 2 | 라우팅 + 기존 콘텐츠 정적 이주 (3D 없음) | 1–2일 | "feat: migrate pages to vite" |
| 3 | MDX 프로젝트 템플릿 | 1–2일 | "feat: mdx project template" |
| 4 | R3F 프로토타입 (`/play`에 회전 박스 → 벽) | 2일 | "feat: r3f wall prototype" |
| 5 | 홀드 ↔ 프로젝트 연결 + 인터랙션 | 2–3일 | "feat: interactive holds" |
| 6 | 폴리시(라이팅/bloom/fallback/SEO) + 메인 교체 | 2–3일 | "feat: climbing wall landing" |

각 Phase 종료 후 `npm run build && npm run preview`로 빌드 검증 → 커밋 → push.

---

## 4. Phase 1 — Vite 초기화

> Claude Code에서 빈 작업 폴더(또는 `threejs` 브랜치 워크트리)에서 실행.

### 4.1 스캐폴딩 & 의존성

```bash
npm create vite@latest . -- --template react
npm i three @react-three/fiber @react-three/drei @react-three/postprocessing
npm i react-router-dom zustand framer-motion
npm i -D @mdx-js/rollup @mdx-js/react leva
```

### 4.2 `vite.config.js`

> user site(`<username>.github.io`)는 루트에 배포되므로 `base: '/'`. project page라면 `'/repo-name/'`로 바꿔야 함.

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'

export default defineConfig({
  base: '/',
  plugins: [
    { enforce: 'pre', ...mdx({ providerImportSource: '@mdx-js/react' }) },
    react(),
  ],
  build: {
    outDir: 'dist',
    // three.js를 별도 청크로 분리해 초기 번들 부담 완화
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
        },
      },
    },
  },
})
```

### 4.3 `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sunny — Write Code, Make Art</title>
    <meta name="description" content="Sunny's portfolio — graphics, web, games, XR." />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### 4.4 `.github/workflows/deploy.yml`

```yaml
name: Deploy to Pages

on:
  push:
    branches: [source-update]   # 이주 완료 후 사용할 메인 소스 브랜치
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - uses: actions/configure-pages@v5
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

> 주의: 작업은 `threejs` 브랜치에서 하되, 위 트리거는 최종 머지 대상인 `source-update`로 두었다. 테스트 중에는 `workflow_dispatch`로 수동 실행하거나, 트리거에 `threejs`을 임시로 추가.

### 4.5 기존 인증 파일 보존

```bash
# source-update 브랜치에서 가져오기
git checkout origin/source-update -- static/googled935393a50610930.html
mkdir -p public
mv static/googled935393a50610930.html public/
```

`public/` 안의 파일은 빌드 시 `dist/` 루트로 그대로 복사된다.

---

## 5. Phase 2 — 라우팅 + 정적 이주

### 5.1 `src/main.jsx`

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { MDXProvider } from '@mdx-js/react'
import App from './App.jsx'
import { mdxComponents } from './components/mdxComponents.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MDXProvider components={mdxComponents}>
        <App />
      </MDXProvider>
    </BrowserRouter>
  </React.StrictMode>
)
```

> GitHub Pages는 SPA의 클라이언트 라우팅에서 새로고침 시 404가 난다. 해결: `public/404.html`에 리다이렉트 스크립트를 두는 정석 트릭(spa-github-pages 방식)을 적용하거나, 해시 라우터(`HashRouter`)를 쓴다. 깔끔한 URL을 원하면 아래 404 트릭을 권장.

`public/404.html`:
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <script>
      // SPA redirect: /some/path -> /?p=/some/path
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'" />
  </head>
  <body></body>
</html>
```

`index.html` `<head>` 안에:
```html
<script>
  (function () {
    var r = sessionStorage.redirect;
    delete sessionStorage.redirect;
    if (r && r !== location.href) history.replaceState(null, null, r);
  })();
</script>
```

### 5.2 `src/App.jsx`

```jsx
import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import ProjectList from './routes/ProjectList.jsx'
import ProjectPage from './routes/ProjectPage.jsx'

// 3D 랜딩은 무겁다 → lazy load + fallback
const Landing = lazy(() => import('./routes/Landing.jsx'))

export default function App() {
  return (
    <Suspense fallback={<LandingFallback />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/work" element={<ProjectList />} />
        <Route path="/work/:slug" element={<ProjectPage />} />
      </Routes>
    </Suspense>
  )
}

// 3D 로딩 전/실패 시 보이는 정적 화면 (SEO·접근성 안전망)
function LandingFallback() {
  return (
    <main style={{ padding: '2rem', maxWidth: 720, margin: '0 auto' }}>
      <h1>Write Code, Make Art</h1>
      <p>Graphics · Web · Games · XR. Currently studying M.S. Game Design at USC.</p>
      <a href="/work">View projects →</a>
    </main>
  )
}
```

### 5.3 콘텐츠 이주

```bash
# 기존 마크다운 + 이미지를 새 구조로 복사
git checkout origin/source-update -- content/portfolio
mkdir -p src/content
git mv content/portfolio src/content/portfolio   # 또는 수동 cp
```

각 `index.md`를 `index.mdx`로 확장자 변경 후, frontmatter 정리 (다음 Phase에서 스키마 확정).

---

## 6. Phase 3 — MDX 프로젝트 템플릿

### 6.1 frontmatter 스키마 (모든 프로젝트 공통)

> ⚠️ **실측 정정**: 기존 60여 개 md 파일은 아래와 같은 **기존 스키마**를 이미 쓰고 있다. 새 스키마를 발명해 전부 다시 쓰는 건 비용이 크므로, **기존 필드를 그대로 채택**하고 부족한 것(`slug`, `holdColor`)만 코드에서 파생/추가한다. 자세한 내용은 §12 갭 분석 참고.

**기존 포트폴리오 frontmatter (실제):**
```mdx
---
title: '[C++] Prime Engine (W.I.P)'
date: '2023-09-01'
category: 'portfolio'          # 'portfolio' | 'blog' — 라우팅 분기에 사용
subcategory: 'games'           # games | graphics | web | xr | edu — 홀드 색의 근거
featuredImage: 'pe-3.png'      # 폴더 내 상대 파일명 (Gatsby가 처리하던 부분)
featured: true                 # 메인 포트폴리오 리스트 노출 여부
order: 7                       # 정렬 순서
---
```

**기존 블로그 frontmatter (실제):**
```mdx
---
category: 'blog'
title: "[CSS] Studying CSS Flex with flexbox froggy"
date: "2020-03-11"
---
```

- `slug`은 frontmatter에 없다 → 폴더명에서 파생(`import.meta.glob` 경로).
- `holdColor`도 없다 → `subcategory → 색상` 매핑 테이블을 코드에 둔다(아래 §12.4).
- 호환을 위해 `import.meta.glob`로 모은 뒤 `subcategory`로 카테고리를, 폴더명으로 `slug`을 만든다.

> `@mdx-js/rollup`은 frontmatter를 기본 파싱하지 않는다. `remark-frontmatter` + `remark-mdx-frontmatter`를 추가해 export로 노출시킨다.

```bash
npm i -D remark-frontmatter remark-mdx-frontmatter
```

`vite.config.js`의 mdx 플러그인 수정:
```js
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
// ...
mdx({
  providerImportSource: '@mdx-js/react',
  remarkPlugins: [
    remarkFrontmatter,
    [remarkMdxFrontmatter, { name: 'frontmatter' }],
  ],
})
```

이제 각 mdx가 `export const frontmatter = {...}`를 자동 노출.

### 6.2 `src/data/projects.js` — 자동 수집

```js
// 모든 프로젝트 mdx를 빌드 타임에 glob으로 수집
const modules = import.meta.glob('../content/portfolio/*/index.mdx', { eager: true })

export const projects = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/').slice(-2)[0]
    return { slug, Component: mod.default, ...mod.frontmatter }
  })
  .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))

export const getProject = (slug) => projects.find((p) => p.slug === slug)
```

새 프로젝트 추가 = `src/content/portfolio/새폴더/index.mdx` 생성. 코드 수정 불필요. 홀드도 자동 생성됨(Phase 5).

### 6.3 MDX에서 쓸 컴포넌트 — `src/components/mdxComponents.jsx`

```jsx
import { ProjectHero } from './ProjectHero.jsx'
import { Gallery } from './Gallery.jsx'
import { TechStack } from './TechStack.jsx'

// 마크다운 본문에서 <Gallery />처럼 바로 쓸 수 있도록 공급
export const mdxComponents = {
  ProjectHero,
  Gallery,
  TechStack,
  // 기본 태그 스타일 오버라이드도 가능: h1, p, a, img ...
}
```

### 6.4 `src/components/Gallery.jsx` (예시)

```jsx
export function Gallery({ images = [] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
      {images.map((src, i) => (
        <img key={i} src={src} alt="" loading="lazy" style={{ width: '100%', borderRadius: 8 }} />
      ))}
    </div>
  )
}
```

`ProjectHero`, `TechStack`도 같은 패턴으로 단순하게.

### 6.5 `src/routes/ProjectPage.jsx`

```jsx
import { useParams, Link } from 'react-router-dom'
import { getProject } from '../data/projects.js'
import { Seo } from '../components/Seo.jsx'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <p>Not found. <Link to="/work">Back</Link></p>

  const { Component, title, role, year, tech, summary } = project
  return (
    <article style={{ maxWidth: 760, margin: '0 auto', padding: '2rem' }}>
      <Seo title={title} description={summary} />
      <Link to="/work">← all work</Link>
      <h1>{title}</h1>
      <p>{role} · {year} · {tech?.join(', ')}</p>
      <Component />   {/* MDX 본문 */}
    </article>
  )
}
```

---

## 7. Phase 4 — R3F 클라이밍 벽 프로토타입

> 먼저 `/play` 같은 임시 라우트에서 검증한 뒤 `Landing.jsx`로 승격. 아래는 바로 `Landing.jsx`로 써도 되는 완성 프로토타입.

### 7.1 `src/three/useScrollProgress.js`

```js
// drei의 ScrollControls 내부에서 useScroll을 쓰지만,
// 별도 정규화가 필요할 때를 위한 헬퍼 (선택).
import { useScroll } from '@react-three/drei'
export function useScrollProgress() {
  const scroll = useScroll()
  return () => scroll.offset // 0..1
}
```

### 7.2 `src/three/Lighting.jsx`

```jsx
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[5, 12, 6]}
        intensity={2.2}
        color="#ffd9a0"            // 따뜻한 햇빛 톤
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={40}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={20}
        shadow-camera-bottom={-5}
      />
      <hemisphereLight args={['#bfe3ff', '#8a6a4a', 0.4]} />
    </>
  )
}
```

### 7.3 `src/three/Wall.jsx`

```jsx
import { useMemo } from 'react'
import * as THREE from 'three'

// PlaneGeometry를 잘게 나누고 vertex에 노이즈를 줘 거친 암벽 느낌
export function Wall({ width = 6, height = 24 }) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(width, height, 24, 96)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const z = (Math.random() - 0.5) * 0.12 // 표면 거칠기
      pos.setZ(i, z)
    }
    geo.computeVertexNormals()
    return geo
  }, [width, height])

  return (
    <mesh geometry={geometry} position={[0, height / 2 - 2, 0]} receiveShadow>
      <meshStandardMaterial color="#9b8579" roughness={1} metalness={0} />
    </mesh>
  )
}
```

### 7.4 `src/three/Hold.jsx`

```jsx
import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

// 변형된 Icosahedron = 자연스러운 클라이밍 홀드
export function Hold({ position, color, scale = 1, label, onClick }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)

  const geometry = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(0.3, 0)
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const j = 0.85 + Math.random() * 0.3
      pos.setXYZ(i, pos.getX(i) * j, pos.getY(i) * j, pos.getZ(i) * j)
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  useFrame(() => {
    if (!ref.current) return
    const target = hovered ? scale * 1.25 : scale
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.15)
  })

  return (
    <group position={position}>
      <mesh
        ref={ref}
        geometry={geometry}
        castShadow
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto' }}
        onClick={(e) => { e.stopPropagation(); onClick?.() }}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.8}
          emissive={color}
          emissiveIntensity={hovered ? 0.4 : 0}
        />
      </mesh>
      {hovered && label && (
        <Html distanceFactor={8} position={[0.5, 0.3, 0]}>
          <div style={{
            background: 'rgba(20,20,24,0.9)', color: '#fff', padding: '4px 8px',
            borderRadius: 6, fontSize: 12, whiteSpace: 'nowrap', pointerEvents: 'none',
          }}>{label}</div>
        </Html>
      )}
    </group>
  )
}
```

### 7.5 `src/three/ClimbingWall.jsx` (씬 루트)

```jsx
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { Wall } from './Wall.jsx'
import { Hold } from './Hold.jsx'
import { Lighting } from './Lighting.jsx'
import { projects } from '../data/projects.js'

const WALL_HEIGHT = 24

// 스크롤 진행도에 따라 카메라를 위로 끌어올림
function ScrollCamera() {
  const scroll = useScroll()
  const { camera } = useThree()
  useFrame(() => {
    const top = WALL_HEIGHT - 4
    camera.position.y = THREE.MathUtils.lerp(2, top, scroll.offset)
    camera.lookAt(0, camera.position.y, 0)
  })
  return null
}

function Holds() {
  const navigate = useNavigate()
  // 프로젝트를 벽 높이에 균등 분배하고 x는 지그재그로
  const placed = useMemo(() =>
    projects.map((p, i) => {
      const t = (i + 0.5) / projects.length
      return {
        ...p,
        position: [
          (i % 2 === 0 ? -1 : 1) * (0.8 + Math.random() * 1.2),
          2 + t * (WALL_HEIGHT - 5),
          0.2,
        ],
        scale: 0.9 + Math.random() * 0.5,
      }
    }), [])

  return placed.map((p) => (
    <Hold
      key={p.slug}
      position={p.position}
      color={p.holdColor || '#e74c3c'}
      scale={p.scale}
      label={p.title}
      onClick={() => navigate(`/work/${p.slug}`)}
    />
  ))
}

export function ClimbingWall() {
  return (
    <ScrollControls pages={4} damping={0.25}>
      <Lighting />
      <Wall height={WALL_HEIGHT} />
      <Holds />
      <ScrollCamera />
      {/* DOM 오버레이 (제목, 안내) */}
      <Scroll html>
        <div style={{ position: 'absolute', top: '12vh', width: '100%', textAlign: 'center', color: '#1e2327' }}>
          <h1 style={{ fontSize: '2.4rem', margin: 0 }}>Write Code, Make Art</h1>
          <p style={{ opacity: 0.7 }}>스크롤해서 벽을 오르세요 — 홀드를 클릭하면 프로젝트로 이동합니다.</p>
        </div>
      </Scroll>
    </ScrollControls>
  )
}

// 위에서 THREE.MathUtils를 쓰므로 import 필요
import * as THREE from 'three'
```

> 정리 팁: 위 파일 상단에 `import * as THREE from 'three'`를 올려두세요(맨 아래가 아니라). 위치는 무관하지만 가독성을 위해.

### 7.6 `src/routes/Landing.jsx`

```jsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { ClimbingWall } from '../three/ClimbingWall.jsx'

export default function Landing() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: 'linear-gradient(#bfe3ff, #ffe9c7)' }}>
      <Canvas shadows camera={{ position: [0, 2, 7], fov: 50 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ClimbingWall />
          <EffectComposer>
            <Bloom intensity={0.4} luminanceThreshold={0.6} mipmapBlur />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
```

---

## 8. Phase 5 — 인터랙션 다듬기

> ⚠️ **설계 변경 반영(§14 참조)**: 홀드는 이제 **개별 프로젝트가 아니라 포트폴리오 카테고리 페이지로 이동**한다. 아래 항목들도 그 전제로 읽을 것.

- **홀드 색 = 카테고리**: 홀드 1개 = 1개 카테고리(games/graphics/xr/web/edu/main). 색은 `src/data/categories.js`의 매핑을 따른다. 같은 색끼리 "루트"처럼 연결선(`<Line>` from drei)을 그어도 좋음.
- **클릭 트랜지션**: 바로 navigate 대신, framer-motion으로 페이드/줌 후 라우트 전환. zustand에 `hoveredCategory`/`selectedCategory` 두고 오버레이로 먼저 보여준 뒤 이동하는 2단계도 가능.
- **모바일 스크롤 검증(중요)**: 실제 기기에서 Canvas 위 터치가 스크롤로 동작하는지 확인. `ScrollControls`가 처리하지만 iOS Safari에서 어긋나는 경우가 있어 `touch-action` CSS 점검.
- **배경 진행감 → 도시 랜드스케이프 페이드(§14.2, 구현 설계는 §15.6)**: `scroll.offset`에 따라 배경에 도시 스카이라인 그래픽이 **fade in/out**으로 전환된다(Seoul → New York → London → Los Angeles → Austin). 단순 그라데이션 보간을 대체/보완.

`src/store/useStore.js` (zustand):
```js
import { create } from 'zustand'
export const useStore = create((set) => ({
  selected: null,
  setSelected: (slug) => set({ selected: slug }),
}))
```

---

## 9. Phase 6 — 폴리시 / Fallback / SEO / 메인 교체

- **성능**: `dpr={[1, 2]}` 유지, 그림자 mapSize 과하면 낮추기, `<Bloom>` 강도 절제. Lighthouse로 메인 페이지 LCP 확인.
- **Fallback**: `LandingFallback`(Phase 2)에 실제 텍스트 콘텐츠(이름·소개·프로젝트 링크) 채우기 → JS 미실행/크롤러 대비.
- **접근성**: 키보드 탭으로 프로젝트 목록 접근 가능한 `/work` 경로를 항상 제공. 3D는 보조 경험으로.
- **SEO**: `react-helmet-async` 또는 `unhead`로 페이지별 메타. 정적 사이트라 OG 이미지도 직접 지정.
- **메인 교체**: `/play`에서 검증된 씬을 `/`로 승격. `threejs` → `source-update` 머지.
- **배포 전환**: 새 워크플로우가 초록불인지 확인 후 GitHub → Settings → Pages → Source를 "GitHub Actions"로 변경. 기존 `master` 빌드 브랜치는 더 이상 불필요(보존하려면 그대로 둬도 됨).

---

## 10. 자주 막히는 지점 체크리스트

- [ ] `vite.config.js`의 `base`가 user site면 `'/'`인지 (틀리면 에셋 404)
- [ ] SPA 새로고침 404 → `public/404.html` 리다이렉트 트릭 적용했는지
- [ ] `public/googled935393a50610930.html` 가 `dist` 루트로 복사되는지 (Search Console 인증 유지)
- [ ] MDX frontmatter가 `export const frontmatter`로 노출되는지 (remark 플러그인)
- [ ] three.js 번들이 `manualChunks`로 분리되어 초기 로드가 가벼운지
- [ ] 모바일 실기기에서 스크롤·터치 정상인지
- [ ] 그림자용 directionalLight의 shadow-camera 범위가 벽 전체를 덮는지
- [ ] Pages source 전환은 새 워크플로우 성공 확인 *후*에

---

## 11. Claude Code에서의 진행 권장 순서 (요약)

1. 이 문서를 레포 루트에 두고 시작.
2. "Phase 1을 실행해줘" → scaffold + 의존성 + 워크플로우.
3. `npm run dev`로 로컬 확인 후 커밋.
4. Phase 2~3로 기존 콘텐츠를 정적 이주 + MDX 템플릿화. 여기까지가 "기존과 똑같이 보이는 Vite 버전".
5. Phase 4에서 `/play` 라우트에 클라이밍 벽 프로토타입. 박스 → 벽 → 홀드 순.
6. Phase 5~6에서 인터랙션·폴리시 후 메인 교체 및 배포 전환.

각 단계마다 빌드(`npm run build`)가 통과하는지 먼저 확인하고 다음으로 넘어갈 것.

---

## 12. 실측 기반 갭 분석 및 보완 (필독 — 기존 §1~11보다 우선)

> 현재 Gatsby 레포를 실제로 읽고 대조한 결과, 기존 플랜(§1~11)은 **사이트를 "포트폴리오 ~5개짜리 단일 페이지"로 과소평가**하고 있다. 실제로는 **블로그 24편 + 드래프트 8편 + 포트폴리오 ~30개(서브카테고리 5종) + CV + vitae(한/영) + archive**가 있는 풀 블로그/포트폴리오다. 아래 항목들을 반영하지 않으면 "task로 바로 실행"하면 중간에 막힌다.

### 12.1 콘텐츠 실측 인벤토리

| 항목 | 실측 | 플랜 반영 여부 |
|---|---|---|
| 블로그 글 | `content/blog/` 24편 (+Disqus 댓글) | ❌ 누락 (라우팅·댓글 전무) |
| 드래프트 | `content/drafts/` 8편 | ❌ 누락 (빌드 포함/제외 정책 필요) |
| 포트폴리오 | `content/portfolio/` ~30개 | △ 5개 가정 |
| 포트폴리오 서브카테고리 | games/graphics/web/xr/edu/main | ❌ 누락 |
| 폴더당 복수 md | `explainer.md` + `index.md` 동시 존재(3폴더) | ❌ glob `*/index.mdx`가 explainer 누락 |
| 페이지 | index, blog, cv, vitae(ko/en), archive, portfolio/* | ❌ 대부분 누락 |
| 커스텀 폰트 | `src/fonts/` Pretendard·Gmarket·RIDIBatang·SFUIText (woff/woff2/otf) | ❌ Google 폰트만 언급 |
| 마크다운 내 raw HTML | `<figure><img><h2><ul>` 등 다수 | ❌ MDX는 기본적으로 raw HTML 비허용 |
| 상대경로 이미지 | `![](x.png)` 13파일 + `<img src="x.png">` 27파일 | ❌ **최대 리스크** (아래 12.2) |
| 외부 임베드 | iframe/youtube/codepen/slideshare 20파일 + 홈 유튜브 + Instagram 플러그인 | ❌ 누락 |
| 코드 하이라이팅 | `gatsby-remark-prismjs` (블로그 코드블록) | ❌ 누락 |
| SEO | `react-helmet` + siteMetadata + canonical | △ Phase 6에만 언급, 구현 없음 |
| 애널리틱스 | Google gtag `UA-178004297-2` | ❌ 누락 |
| PWA/기타 플러그인 | sitemap, robots-txt, manifest, offline(서비스워커), favicon | ❌ 누락 |

### 12.2 ⚠️ 최대 리스크 — 마크다운 이미지 & raw HTML 이주

Gatsby는 `gatsby-remark-images`로 마크다운의 상대경로 이미지(`![](x.png)`, `<img src="x.png">`)를 빌드시 자동 리라이트·최적화했다. **Vite+MDX엔 이게 없다.** 그대로 옮기면 모든 포트폴리오 이미지가 깨진다. 해결 전략 중 택1:

- **(A) 권장 — co-located + remark 리라이트**: 이미지를 md와 같은 폴더에 두고, MDX import 또는 커스텀 remark 플러그인(`remark-images`/직접 작성)으로 상대경로를 Vite asset import로 변환. 최적화까지 원하면 `vite-imagetools`.
- **(B) 단순 — `public/`로 평탄화**: 모든 이미지를 `public/portfolio/<slug>/`로 복사하고 md 내 경로를 `/portfolio/<slug>/x.png` 절대경로로 일괄 치환(sed 스크립트). 최적화는 없지만 가장 확실.

추가로, **마크다운 본문의 raw HTML(`<figure>`, `<img>` 등)을 렌더링하려면 `rehype-raw`가 필요**하다(`.md`를 MDX로 통과시킬 때). 또는 본문을 순수 마크다운으로 정리. 이걸 빼면 `<figure>` 블록들이 통째로 사라지거나 파싱 에러가 난다.

```bash
npm i -D rehype-raw remark-gfm
# vite.config mdx: rehypePlugins: [rehypeRaw], remarkPlugins: [..., remarkGfm]
```

> 주의: `@mdx-js/rollup`에서 `rehype-raw`를 쓰려면 `format: 'md'` 또는 적절한 설정이 필요하고, MDX의 JSX와 raw HTML 혼용 시 충돌 케이스가 있다. **블로그(.md, 순수 콘텐츠)와 포트폴리오(.md, raw HTML 다수)는 MDX가 아니라 `remark`로 HTML 문자열을 만들어 렌더(기존 Gatsby의 `dangerouslySetInnerHTML` 방식 유지)하는 편이 이주 리스크가 훨씬 작다.** MDX 컴포넌트(`<Gallery/>` 등)는 신규 작성 페이지에서만 쓰고, 기존 콘텐츠는 markdown→html 파이프라인으로 옮기는 하이브리드를 권장.

### 12.3 라우팅 / URL 보존 (SEO 직결)

- 기존 slug 구조: `gatsby-node.js`가 `/<category>/<folder>/` 형태로 생성 → 실제 URL은 `/portfolio/prime-engine/`, `/blog/flexbox-study/`. 사이트맵·검색엔진·외부링크가 이 URL을 가리킨다.
- 플랜의 `/work/:slug`로 바꾸면 **기존 URL 전부 깨짐**. → 라우트를 `/portfolio/:slug`, `/blog/:slug`로 유지하거나, 최소한 301 대체(404.html 리다이렉트 트릭에 매핑 추가)를 넣어야 한다.
- 네비게이션(`header.jsx`)은 `/portfolio/main`, `/cv`, `/archive`(TIL)를 가리킴 → 이 경로들도 살려야 함.

### 12.4 홀드 색 매핑 (frontmatter에 holdColor 없음)

`holdColor`는 기존 데이터에 없다. `subcategory`로 매핑한다:

```js
export const HOLD_COLORS = {
  games:    '#e74c3c',
  graphics: '#9b59b6',
  web:      '#3498db',
  xr:       '#1abc9c',
  edu:      '#f1c40f',
  default:  '#e67e22',
}
export const holdColorFor = (p) => HOLD_COLORS[p.subcategory] ?? HOLD_COLORS.default
```

§7.5의 `Holds`에서 `p.holdColor` 대신 `holdColorFor(p)` 사용. 클라이밍 벽 홀드 = 포트폴리오 항목이므로 `projects`도 `category === 'portfolio'`만 필터링해야 한다(블로그가 홀드로 섞이면 안 됨).

### 12.5 폰트 이주

`src/styles/typography.css`의 `@font-face`(Pretendard variable, Gmarket, RIDIBatang, SF UI Text)와 `src/fonts/*` 파일을 그대로 가져온다. Vite에선 `@font-face`의 `url()`을 `/src/fonts/...` 또는 `public/fonts/...`로 두면 동작. Google `web-font-loader`(Rubik 등 다수)는 `index.html`의 `<link>` 또는 `@fontsource/*` 패키지로 대체.

### 12.6 누락 플러그인 → Vite 대체 매핑

| Gatsby 플러그인 | Vite 대체 |
|---|---|
| gatsby-plugin-sitemap | `vite-plugin-sitemap` (또는 빌드 후 스크립트) |
| gatsby-plugin-robots-txt | `public/robots.txt` 정적 파일 |
| gatsby-plugin-manifest | `public/manifest.webmanifest` + 아이콘 |
| gatsby-plugin-offline | `vite-plugin-pwa` (워크박스) — 필요시 |
| gatsby-plugin-google-gtag | `index.html`에 gtag 스니펫 직접 (`UA-178004297-2`) |
| gatsby-plugin-react-helmet | `react-helmet-async` |
| gatsby-plugin-disqus | `disqus-react` |
| gatsby-plugin-instagram-embed | iframe 직접 또는 `react-instagram-embed` |
| gatsby-remark-prismjs | `rehype-prism-plus` 또는 `shiki` |
| gatsby-plugin-image / sharp | `vite-imagetools` (택1, 12.2 참고) |

### 12.7 SSG/SSR vs SPA — SEO 영향

Gatsby는 정적 HTML을 프리렌더(SSG)했다. 플랜의 Vite SPA는 빈 `<div id="root">`만 서빙 → **블로그/포트폴리오 본문이 초기 HTML에 없어 검색·OG 크롤러에 불리**. `LandingFallback`만으론 부족. 대안:
- `vite-plugin-ssg`(예: `vite-react-ssg`) 또는 `react-snap`/프리렌더로 라우트별 정적 HTML 생성.
- 최소한 블로그·포트폴리오 상세는 프리렌더 권장(기존 SEO 자산 보존).

### 12.8 보완된 Phase 로드맵 (기존 §3 대체)

| Phase | 내용 | 비고 |
|---|---|---|
| 0 | (완료) `threejs` 브랜치 분기 | |
| 1 | Vite scaffold + 의존성 + 워크플로우 + 폰트/정적자산 이주 | §4 + 12.5 |
| 2 | **콘텐츠 파이프라인 결정**(MDX vs md→html 하이브리드, 12.2) + 이미지 이주 전략 확정 | **선행 필수** |
| 3 | 라우팅(`/`, `/portfolio`, `/portfolio/:slug`, `/portfolio/:subcat`, `/blog`, `/blog/:slug`, `/cv`, `/archive`) + URL 보존 | 12.3 |
| 4 | 블로그(Prism, Disqus) + 포트폴리오 리스트/상세 + 서브카테고리 필터 | 12.6 |
| 5 | SEO(helmet-async, 사이트맵, robots, manifest, gtag) + 프리렌더 | 12.6/12.7 |
| 6 | R3F 클라이밍 벽 프로토타입(`/play`) | 기존 §7 |
| 7 | 홀드↔포트폴리오 연결 + 인터랙션 + holdColor 매핑 | §8 + 12.4 |
| 8 | 폴리시 + 메인 교체 + 배포 전환 | 기존 §9 |

### 12.9 task 실행 전 확정해야 할 의사결정 (열린 질문)

1. **콘텐츠 렌더 방식**: 기존 60개 .md를 (a) 전부 MDX로 변환 + rehype-raw, (b) markdown→html 하이브리드 유지 중 무엇? → **(b) 권장** (리스크 최소).
2. **이미지**: co-located+imagetools(A) vs public 평탄화(B)? → 분량·최적화 요구에 따라.
3. **URL**: 기존 `/portfolio/...`·`/blog/...` 유지 vs `/work/...` 신규(+리다이렉트)?
4. **드래프트**: 빌드에 포함할지, 숨길지.
5. **SEO 프리렌더**: 도입할지(블로그 SEO 중요도에 따라).
6. **블로그 댓글**: Disqus 유지 vs 제거/대체.
7. **클라이밍 벽 범위**: 포트폴리오 ~30개 전부 홀드로? 아니면 `featured`만?

> 위 1~7이 정해지기 전에는 Phase 2 이후가 흔들린다. **§13(또는 별도 대화)에서 먼저 결정 → 그 다음 task 분해**를 권장한다.

### 12.10 결론 — "지금 task로 바로 돌릴 수 있나?"

- **Phase 1(scaffold)은 지금 바로 task화 가능.** 위험 없음.
- **Phase 2 이상은 12.9의 결정이 선행되어야** 안전하게 task로 분해된다. 특히 12.2(이미지/raw HTML)와 12.3(URL)은 결정하지 않으면 중간에 대량 재작업이 발생한다.

> 📌 **작업 우선순위(사용자 방향)**: 이번 라운드의 실제 구현 범위는 **① 기초 구조 셋업(Phase 1) + ② 메인 랜딩 = 클라이밍 벽**에 집중한다. 메뉴/cv/portfolio/blog 등 개별 페이지의 상세 리팩토링은 **추후 작업으로 미룬다.** 단, 나중에 재사용할 **템플릿은 §13에서 스펙 수준으로 미리 설계**해 둔다(구현 X, 인터페이스만 확정). §12는 그 템플릿들이 왜 필요한지에 대한 근거 자료로 본다.

---

## 13. 템플릿 기획 (추후 작업 — 스펙 레벨, 구현 보류)

> 지금 만들지 않는다. 나중에 개별 페이지를 재구축할 때 **이 인터페이스대로 채우기만 하면 되도록** 미리 모양을 정해 둔다. 각 템플릿은 "데이터 입력 → 일관된 출력"을 보장하는 재사용 단위.

### 13.1 템플릿 인벤토리

| 템플릿 | 역할 | 입력(props/data) | 매핑되는 기존 콘텐츠 |
|---|---|---|---|
| `PageShell` | 모든 페이지 공통 레이아웃 | `children`, `seo` | 전 페이지 (Container+Header+Footer) |
| `Nav` | 상단 네비게이션 | `items[]`, 현재 경로 | header.jsx |
| `ListTemplate` | 카드 그리드 리스트 | `items[]`, `renderCard` | blog 리스트, portfolio 리스트, 서브카테고리 |
| `Card` | 리스트 1개 항목 | `title, date, excerpt, thumb, to` | 블로그/포트폴리오 항목 |
| `PostTemplate` | 글 상세(블로그) | `title, date, html, comments?` | blog-post.js |
| `ProjectTemplate` | 프로젝트 상세(포트폴리오) | `title, date, subcategory, hero, html/children` | portfolio-post.js |
| `CVTemplate` | 이력서 페이지 | 섹션 데이터 or MDX | cv.jsx / vitae |
| `Landing` | 3D 클라이밍 벽 (메인) | `projects[]` | §7 (이번 라운드 구현 대상) |
| MDX 조각들 | 본문 삽입 컴포넌트 | 각자 | `<Gallery> <ProjectHero> <YouTube> <CodePen>` |

### 13.2 핵심 인터페이스 스케치

```jsx
// PageShell — 모든 페이지를 감싼다
<PageShell seo={{ title, description, pathname, image }}>
  {children}
</PageShell>

// Nav — 링크는 config로 (하드코딩 금지)
const NAV_ITEMS = [
  { to: '/portfolio/main', label: 'portfolio', match: 'portfolio' },
  { to: '/cv',             label: 'cv',        match: 'cv' },
  { to: '/archive',        label: '🤓TIL🤓',  match: 'archive' },
]

// ListTemplate — 블로그/포트폴리오가 같은 컴포넌트를 공유
<ListTemplate
  items={posts}            // [{ slug, title, date, excerpt, thumb, subcategory }]
  filter={(p) => p.category === 'portfolio' && p.featured}
  sort={(a,b) => a.order - b.order}
  renderCard={(p) => <Card {...p} to={`/portfolio/${p.slug}`} />}
/>

// PostTemplate / ProjectTemplate — 콘텐츠 파이프라인(§12.2) 출력만 꽂으면 됨
<ProjectTemplate meta={frontmatter}>
  {/* md→html dangerouslySetInnerHTML 또는 MDX children */}
</ProjectTemplate>
```

### 13.3 설계 원칙
- **데이터/표현 분리**: 템플릿은 콘텐츠 소스(§12.2 파이프라인)와 무관하게 "정규화된 객체"만 받는다. md든 MDX든 `{ slug, title, date, ... , body }`로 통일해 넘긴다.
- **리스트는 하나로**: blog/portfolio/서브카테고리는 `ListTemplate` + `filter`/`sort` 조합으로 재사용(별도 페이지 컴포넌트 난립 방지 — 기존 portfolio/edu·games·graphics·web·xr 5개 중복 제거).
- **Nav·CV는 config/데이터 주도**: 새 항목 추가가 코드 수정이 아니라 배열 한 줄 추가가 되도록.
- **이번 라운드 구현 대상은 `Landing`뿐**, 나머지 템플릿은 "시그니처 확정 + 빈 스텁" 정도까지만 둬도 된다(추후 채움).

---

## 14. 메인 랜딩 설계 확정 (Phase 4 구현 반영)

> 실제 구현하면서 확정한 사항. 이전 §7(`/work/:slug` 프로토타입)보다 **이 섹션이 우선**한다. 스크롤 구동·캐릭터·스토리 텍스트·배경은 **§15가 최신**.

### 14.1 홀드 = 카테고리 (개별 프로젝트 아님)

- 클라이밍 홀드 1개는 **포트폴리오 카테고리**에 대응한다. 클릭 시 카테고리 페이지 route로 이동:
  `/portfolio/main`, `/portfolio/games`, `/portfolio/graphics`, `/portfolio/xr`, `/portfolio/web`, `/portfolio/edu`.
- 데이터 소스: `src/data/categories.js` (`{ slug, label, color, to }`). 홀드 수가 6개로 고정·적어서 배치가 단순하고, ~30개 프로젝트를 벽에 흩뿌리는 것보다 직관적.
- 이전 §7.5의 `navigate('/work/${p.slug}')`, §12.4의 `projects`/`holdColor` 기반 배치는 **폐기**. 대신 `CATEGORIES`를 순회하며 `navigate(cat.to)`.
- ⚠️ **라우팅은 추후 연결**(사용자 결정): 이번 라운드는 랜딩만 완성한다. `/portfolio/*` 페이지는 아직 Vite로 포팅되지 않았으므로(기존 `src/pages/portfolio/*.jsx`는 Gatsby 전용 — `graphql`/`gatsby` import로 동작 불가), 클릭 시 **임시 placeholder 라우트**("준비 중")로 받는다. Phase 7에서 §13 `ListTemplate`로 실제 페이지 구현.

### 14.2 스크롤 연동 도시 랜드스케이프 배경 (신규 요구 — 구현 설계는 §15.6이 우선)

스크롤 업/다운에 따라 배경에 **도시 스카이라인 그래픽이 fade in/out**으로 순차 전환된다. 벽을 오를수록 도시가 바뀌는 연출.

- **도시 순서**: ~~Seoul → New York → London → Los Angeles → Austin~~ → **§15.10에서 변경**: New York → Seoul → Los Angeles → Austin. 각 스토리 비트의 `city`가 결정.
- **구현 방식 후보**:
  - (A) **DOM 레이어**: 각 도시 PNG/SVG를 절대배치 레이어로 깔고, `scroll.offset` 구간별 `opacity`를 framer-motion 또는 `useFrame`으로 보간. Canvas 뒤(z-index 아래)에 둠. 가장 단순·가벼움. **권장**.
  - (B) **R3F 평면 텍스처**: 벽 뒤쪽에 도시 텍스처를 입힌 billboard plane들을 배치하고 카메라 거리/스크롤로 머티리얼 `opacity` 보간. 씬에 통합되지만 텍스처 로딩·메모리 관리 필요.
- **fade 로직**: 도시 N개를 스크롤 `0..1` 구간을 N등분해 각 구간 중심에서 최대 opacity, 인접 구간과 cross-fade. 한 번에 1~2개 도시만 보이게.
- **에셋**: 도시별 stylized skyline 그래픽 1장씩(통일된 아트 스타일, 가로로 긴 비율). `src/assets/cities/` 또는 `static/cities/`에 둔다. 아직 없음 → 제작/수급 필요(플레이스홀더로 단색+도시명 텍스트부터 시작 가능).
- **배경 그라데이션**(새벽→낮→노을)은 도시 페이드와 **공존** 가능: 하늘 그라데이션 위에 도시 실루엣이 겹치는 구성.

**구현 순서 제안**: ① 플레이스홀더(도시명 텍스트 레이어)로 fade 로직 먼저 검증 → ② 실제 스카이라인 그래픽 교체.

---

## 15. 스크롤 클라이밍 스토리 랜딩 (최신 — §7.5·§8·§14.2보다 우선)

> 목표: 첫 화면 = 스크롤 연동 인터랙티브 three.js 경험. 사용자가 아래로 스크롤하면 주인공 캐릭터가 **벽을 오르는 모션**을 하고, 의미 있는 홀드(`ModelHold`)에 닿을 때마다 화면 상단 1/3에 **2–3줄짜리 자기소개 문장**이 나타난다. 동시에 벽 바깥(화면 전체 폭)의 **배경 이미지가 아래로 흐르며 cross-fade**된다.

### 15.1 화면 구성 (뷰포트 기준 레이어, 뒤 → 앞)

| z | 레이어 | 구현 | 비고 |
|---|---|---|---|
| 0 | 배경 이미지 스택 | `src/background/ScrollBackground.jsx` (DOM) | 전체 폭. 스크롤에 따라 아래로 parallax + cross-fade |
| 1 | 3D Canvas (투명) | `src/three/ClimbingWall.jsx` | 벽·홀드·캐릭터·안개 밴드 |
| 2 | 스토리 텍스트 | `src/story/StoryOverlay.jsx` (DOM) | 상단 1/3, `pointer-events: none` |
| — | 스크롤 스페이서 | `Landing.jsx`의 `height: N×100vh` 빈 div | 문서 스크롤 길이만 제공 |

- 화면 **하단 2/3 = 선명한 벽 + 캐릭터**, **상단 1/3 = 안개/구름으로 흐려진 벽 + 텍스트**.
- 안개는 벽 바로 앞에 놓인 **카메라 추종 셰이더 plane**(`FogBand.jsx`)으로 처리 → 벽 폭만 흐리게 하고 양옆 배경 이미지는 그대로 보이게 한다. 수직 그라데이션 알파 + 흐르는 노이즈(fbm)로 구름 느낌.
- 다음 홀드는 안개 속에 있다가 캐릭터가 다가가면 안개 밖으로 드러난다 → "도달" 순간 텍스트 등장.

### 15.2 스크롤 구동 방식 변경: `ScrollControls` → 네이티브 스크롤 + 단일 progress

- 기존 drei `ScrollControls`는 Canvas 내부 전용 스크롤 div를 만든다 → **Canvas 바깥 DOM(배경·텍스트)이 같은 진행도를 읽기 어렵고**, §8에서 우려한 iOS 터치 스크롤 이슈도 있다.
- 변경: 문서(window) 스크롤 + `position: fixed` 레이어. framer-motion `useScroll()` → `useSpring()`으로 감쇠한 **MotionValue 하나(`progress`, 0..1)** 를 모든 레이어가 공유한다.
  - DOM 레이어: `useTransform(progress, …)`으로 opacity/transform 바인딩 (리렌더 없음, GPU 합성).
  - R3F: `useFrame`에서 `progress.get()`을 읽어 캐릭터/카메라/안개 갱신.
  - 같은 스프링 값을 쓰므로 3D와 DOM이 프레임 단위로 동기화.
- GSAP ScrollTrigger는 **도입하지 않음**(framer-motion이 이미 의존성에 있고 기능이 겹침). 추후 타임라인 연출이 필요하면 `progress` MotionValue만 GSAP 값으로 교체하면 되도록 인터페이스를 단일화해 둔다.

### 15.3 클라이밍 루트 (순수 함수 모듈) — `src/three/climbRoute.js`

진행도 → 캐릭터 위치/활성 비트의 매핑을 **React와 무관한 순수 함수**로 둔다. 3D(캐릭터·카메라)와 DOM(텍스트)이 같은 함수를 호출하므로 어긋날 수 없다.

- `climberYAt(p)` : 0..1 → 캐릭터 y (벽 하단 → 마지막 홀드 위)
- `climberXAt(y)` : 스토리 홀드들의 x를 smoothstep으로 이어 지그재그 루트 생성 (홀드 옆으로 붙어서 오름)
- `beatIndexAt(p)` : 손 높이(`y + REACH`)가 지난 스토리 홀드 수 → 현재 텍스트 비트 (-1 = 인트로)

### 15.4 주인공 캐릭터 — `src/three/Climber.jsx`

- ✅ **교체 완료 (§15.10)**: `static/models/dora-climbing-down.glb` (리깅 + 클립). 아래는 이전 상태 기록.
- ⚠️ **실측(이전)**: `static/models/journey-character.glb`는 **스켈레톤·애니메이션이 없는 정적 메시**(skins 0, animations 0, Sketchfab cloth 그룹). 이 파일로는 "팔다리가 움직이는 클라이밍 모션"을 재생할 수 없다.
- 그래서 `Climber`는 두 모드를 지원:
  1. **리깅 모델 + 클립이 있으면**: `useAnimations`로 클립(이름에 `climb` 포함 우선)을 재생하되, 시간 흐름이 아니라 **스크롤로 scrub**한다 — `action.time = (오른 거리 / stride) mod duration`. 스크롤을 멈추면 동작도 멈추고, 위로 스크롤하면 역재생.
  2. **클립이 없으면(현재)**: 절차적 모션 — 오른 거리에 비례한 좌우 체중 이동, 상하 bob, 몸 기울기. 실제 에셋이 오기 전 레이아웃/타이밍 검증용.
- **에셋 파이프라인(해야 할 일)**: Mixamo에서 캐릭터 리깅(또는 Mixamo 기본 캐릭터) + `Climbing` / `Climbing Up Wall` 애니메이션 → FBX 다운로드 → Blender에서 glTF(.glb)로 export(가능하면 Draco/Meshopt 압축) → `static/models/climber.glb`. `src/data/climber.js`의 `url`만 바꾸면 자동으로 모드 1로 전환.
  - Journey 모델은 망토(cloth) 위주라 Mixamo 자동 리깅이 잘 안 될 수 있음 → 리깅된 바디 + 망토는 별도 메시로 붙이거나, 클라이밍 포즈에 맞는 다른 캐릭터를 쓰는 방안 검토.
- 캐릭터는 벽을 바라보도록(등이 카메라 쪽) 배치. 크기는 바운딩박스 높이로 정규화.

### 15.5 스토리 비트 데이터 — `src/data/story.js`

- 텍스트는 배치 데이터(`categories.js`)와 분리. 각 비트는 홀드 slug를 참조(`hold: 'games'`)하거나 직접 `y`를 지정 → 카테고리 홀드뿐 아니라 장식 홀드에도 의미를 붙일 수 있음.
- 형식: `{ hold, kicker, lines: [2–3줄] }` + `INTRO`, `OUTRO`(포트폴리오 CTA).
- 현재 문구는 vitae/포트폴리오에서 뽑은 **초안**. 작가가 직접 다듬을 것.
- 활성 홀드는 zustand `activeHold`로 공유 → 해당 `ModelHold`가 살짝 커지며 강조.

### 15.6 배경 이미지 컴포넌트 검토 — 왜 별도 컴포넌트인가

배경은 벽/홀드와 **수명주기·성능 특성·편집 주기가 전혀 다르므로** three 씬에서 분리한다.

| 관점 | (A) DOM 레이어 — **채택** | (B) WebGL 배경 quad |
|---|---|---|
| 렌더 비용 | opacity/transform만 변경 → 브라우저 compositor(GPU)가 처리, 3D 프레임과 독립 | 3D 렌더 패스에 full-screen 텍스처 샘플링 추가 |
| 전환 연출 | cross-fade + parallax + 미세 scale(Ken Burns) | 노이즈 dissolve, displacement, 블러 등 셰이더 전환 가능 |
| 이미지 교체 | `src`만 바꾸면 됨, `object-fit: cover` 반응형, `loading`/`decoding` 브라우저 최적화 | 텍스처 로딩/해제/메모리 관리 직접 |
| 실패 시 | 3D가 실패해도 배경·텍스트는 남음 (fallback에 유리) | Canvas와 운명을 같이함 |

- 구조: `src/data/backgrounds.js`(레이어 설정) → `ScrollBackground`(스택, `progress` 구독) → `BackgroundLayer`(한 장, 자기 구간에서만 보임).
- 각 레이어는 `progress` 구간 `[start, end]`을 가지며, 경계에서 `fade` 폭만큼 겹쳐 **한 번에 최대 2장**만 보인다. 레이어 내부 이미지는 뷰포트보다 높게(예: 130vh) 두고 구간 진행에 따라 **아래로 이동**(캐릭터가 오르니 세상은 내려감).
- 이미지가 아직 없으면 그라데이션 + 큰 라벨(도시명)로 플레이스홀더 렌더 → 에셋 없이도 타이밍 검증 가능. 도시 순서·구간은 `story.js` 비트의 `city`에서 파생(§15.10).
- 에셋 가이드: 가로 2400px 내외 WebP/AVIF, 세로 길이 ≥ 1.3×(가로/16×9), 각 300KB 이하 목표. 경로 `static/backgrounds/<id>.webp`.
- (B)로 갈 경우: `progress`를 uniform으로 받는 `BackgroundShader` 컴포넌트로 교체만 하면 됨 — 인터페이스(`progress` MotionValue + `backgrounds.js`)는 동일하게 유지.

### 15.7 파일 구조 (이번 라운드)

```
src/
├─ routes/Landing.jsx            # 레이어 조립 + 스크롤 스페이서 + progress 생성
├─ background/
│  ├─ ScrollBackground.jsx       # 배경 스택
│  └─ BackgroundLayer.jsx        # 배경 1장 (cross-fade + parallax)
├─ story/StoryOverlay.jsx        # 상단 1/3 텍스트 (framer-motion AnimatePresence)
├─ three/
│  ├─ ClimbingWall.jsx           # 씬 루트 (ScrollControls 제거, progress prop)
│  ├─ CameraRig.jsx              # 캐릭터 추종 카메라 + 화면비 대응 거리
│  ├─ Climber.jsx                # 주인공 (클립 scrub / 절차적 fallback)
│  ├─ FogBand.jsx                # 상단 1/3 안개 셰이더 plane
│  └─ climbRoute.js              # progress ↔ 위치/비트 순수 함수 + 벽 치수 상수(WALL_*)
└─ data/
   ├─ story.js                   # 홀드별 2–3줄 문구
   ├─ backgrounds.js             # 배경 레이어 설정
   └─ climber.js                 # 캐릭터 모델 설정
```

### 15.8 완료 기준

> 1차 구현 완료 (headless Chromium 1280×800 / 390×844 스크린샷 + 홀드 클릭 이동으로 확인). 남은 일은 §15.9.

- [x] 랜딩 진입 시 인트로 문구가 상단 1/3에 보이고, 캐릭터는 벽 하단에 있다.
- [x] 스크롤 다운 → 캐릭터가 위로 이동(모션 포함), 카메라가 따라감, 위로 스크롤하면 역방향.
- [x] 상단 1/3 벽은 안개로 흐리고, 하단 2/3는 선명.
- [x] 스토리 홀드에 손이 닿으면 해당 2–3줄 문구가 fade/slide-in, 이전 문구는 fade-out.
- [x] 배경이 아래로 흐르며 구간별 cross-fade, 동시에 최대 2장.
- [x] 홀드 클릭 → 카테고리 placeholder 라우트 이동 유지, 드래그 tilt 유지.
- [x] `prefers-reduced-motion`이면 parallax/scale 없이 opacity 전환만.
- [x] 모바일 세로 화면에서 벽 전체 폭이 보이도록 카메라 거리 자동 조정.

### 15.9 남은 일 (에셋/튜닝)

- [x] 리깅 + 클라이밍 클립이 있는 캐릭터 glb 제작 → `src/data/climber.js`의 `url` 교체 (§15.4, §15.10)
- [ ] 도시 배경 이미지 4장(New York, Seoul, Los Angeles, Austin) 제작 → `src/data/backgrounds.js`의 `src` 채우기 (§15.6)
- [ ] `src/data/story.js` 문구 다듬기 (현재 초안)
- [ ] 모델 하나라도 로드 실패 시 씬 전체가 사라짐 → `<ErrorBoundary>`로 홀드/캐릭터 개별 격리 + Draco 디코더 self-host(`useGLTF(url, '/draco/')`) 검토
- [x] 홀드 glb 용량 압축 — 중복 7개 삭제 + gltf-transform Draco/WebP 512/simplify 0.5 → 28MB(17개) → 0.8MB(10개) (§15.10)
- [ ] CC-BY-4.0 크레딧 표기 — Dora(littlebillfishing), Theater Masks(WilDuo). 원문은 각 모델 폴더의 `license.txt`. 사이트 footer/about에 노출 필요
- [ ] 캐릭터 포즈 튜닝 — Dora는 2등신 비율이라 Mixamo 리타깃 시 다리가 몸 쪽으로 많이 접힘 → `Climbing Up Wall` 클립으로 교체 (§15.10 절차)

### 15.10 업데이트 (2026-10-13)

**캐릭터 교체** — `dora-climbing-down.glb`
- 실측: skins 1 (Mixamo `mixamorig:*` 33 joints), 클립 1개 `Armature|mixamo.com|Layer0` 4.05초 = 내려가기 2 사이클, Hips 이동 트랙에 **root motion**(아래로 이동) 포함. 텍스처 내장, 355KB.
- `dora-gltf/`(리깅 없는 원본 Sketchfab 메시)와 `.fbx`(Mixamo 원본)는 런타임에 쓰지 않음 → 커밋하지 않음.
- `Climber.jsx` 변경:
  - `reverse: true` — 내려가는 클립을 역재생해서 오르는 동작으로 사용.
  - `rootMotion: 'detrend'` — Hips 이동 트랙에서 **누적 이동만 선형으로 빼서** 제자리 루프로 만든다(흔들림 유지, 루프 이음매 없음). 루트 이동은 `climbRoute`가 담당.
  - `stride: null` → 빼낸 누적 이동량(월드 단위로 변환)을 그대로 stride로 사용 → 손발이 미끄러지지 않음 (현재 ≈1.04 / 클립 1회).
  - 버그 수정: drei `useAnimations`의 `actions`는 마운트 후에야 생성되는데 렌더 중에 꺼내고 있었음 → 첫 비트 변경으로 리렌더되기 전까지 T-포즈. effect에서 꺼내 ref로 보관.

**첫 홀드 = Theater Masks** — `static/models/theater_masks/theater_masks.glb`
- 원본 `scene.gltf` 14.5MB(~30만 정점) → `gltf-transform optimize --compress draco --simplify-ratio 0.12` → **151KB** (정점 색 유지). 원본은 커밋하지 않음.
- 슬러그는 `main` 유지, **링크 없음**(`to: null` → 클릭/호버 커서 반응 없음), 라벨 `Theater`. OUTRO의 'See all work' CTA는 그대로 `/portfolio/main`.

**스토리 순서 / 배경 도시**

| # | 홀드 | 도시 |
|---|---|---|
| 1 | main (Theater → Media Studies) | New York |
| 2 | xr | New York |
| 3 | web | Seoul |
| 4 | graphics | Seoul |
| 5 | edu | Seoul |
| 6 | games | Los Angeles |
| OUTRO | — | Austin |

- 등반 순서는 **홀드 y**가 결정(`STORY_STOPS`는 y 정렬) → `categories.js` 위치를 위 순서대로 재배치(모델별 rotation/z/spin은 모델과 함께 이동).
- 각 비트에 `city` 필드 추가. `climbRoute.CITY_RANGES`가 비트 i = 구간 i, OUTRO = 마지막 구간으로 보고 같은 도시가 이어지면 합쳐 배경 구간을 만든다. `backgrounds.js`는 이제 도시별 스타일만 가진다(London은 미사용).
- 구간 길이가 달라져서 cross-fade 폭은 가장 짧은 구간 기준으로 통일.

**일반 홀드 배치 범위 축소**
- `climbRoute.ROUTE_X` = 캐릭터 발 x 범위(현재 약 −0.83..0.88). 스캐터 홀드는 `ROUTE_X ± 0.5` 안에만, 행(0.6) 단위 지그재그로 배치 → 벽 가장자리는 비워 둔다.
- 스캐터 z는 최근접 정점 대신 **레이캐스트로 정확한 면 높이**(`createSurfaceSampler`) 사용.
- `decoHolds.js` 수동 배치 x도 ±2.0 → ±1.0으로 이동.

**캐릭터 머티리얼 보정** (2차)
- 실측: Blender export가 두 머티리얼 모두 `alphaMode: BLEND`(텍스처는 RGB, 알파 없음) + `metallicFactor` 누락(glTF 기본값 1.0) → 투명 정렬로 머리카락/손/몸 깊이 순서가 뒤바뀌고, 환경맵 없는 금속이라 어둡고 번들거림. 원본 Sketchfab gltf는 metallic 0.
- `climber.js`의 `material: { opaque, metalness, roughness }`로 런타임 보정(머티리얼 사본에 적용). 다음 export도 같은 결함이 나올 수 있어 데이터로 둠.
- Blender에서 고치려면: Material → Settings → Blend Mode `Opaque`, Principled BSDF Metallic 0.

**Mixamo 'Climbing Up Wall' 적용 절차**
1. Mixamo에 Dora 업로드(이전과 같은 캐릭터 FBX) → `Climbing Up Wall` 검색 → (있으면) In Place 체크는 상관없음 — root motion은 `detrend`가 처리.
2. Download: FBX, **With Skin**, 30fps.
3. Blender: File → Import → FBX → (위 머티리얼 설정 수정 선택) → File → Export → glTF Binary, Animation 포함 → `static/models/dora-climbing-up.glb`.
4. `climber.js`: `url: '/models/dora-climbing-up.glb'`, `reverse: false`. stride는 자동 계산.
- 클립을 여러 개 쓸 때: 'Without Skin'으로 받아 같은 방식으로 glb 변환 → `animUrl`에 지정하면 `url` 모델에 본 이름(`mixamorig*`)으로 바인딩. ⚠️ 모델과 같은 파이프라인(Blender)으로 변환해야 함 — FBXLoader로 바로 읽은 클립은 Blender export 리그와 본 축/스케일이 달라 깨진다.
- 대안 클립: `Climbing`(벽 타기 루프). `Climbing To Top`은 탑아웃(턱 넘기) 동작이라 OUTRO용으로 고려 가능.

**루트 홀드 (스캐터 대체)**
- 일반 홀드는 랜덤 스캐터 대신 `climbRoute.ROUTE_HOLDS`가 **캐릭터 경로를 따라** 계산: 몸 중심선(KEYS + reach/2, 시작 발 높이 ~ 탑아웃 손 높이) 위를 경로 길이 기준 `HOLD_STEP`(0.55) 등간격으로 걸으며 진행 방향 법선으로 좌·우 교대 `HOLD_SPREAD`(0.4) 오프셋 + 작은 jitter. 심볼 홀드 반경 `HOLD_CLEAR`(0.8) 안은 비움 → 현재 35개. 심볼 홀드 위치를 옮기면 자동으로 따라감.
- `WallHold`: 모델별 `mount`('floor' = X +90°로 세움 / 'wall' = 그대로)로 바닥면을 벽에 붙이고, 벽 법선 기준 spin, 바운딩박스 뒷면이 표면에 닿게 z 자동 보정. 이전 스캐터는 3축 랜덤 회전이라 홀드가 벽에 박히거나 떠 보였음.
- `decoHolds.js`: `HOLD_MODELS`(17개 전체 카탈로그, mount·pool 플래그) → `HOLD_MODEL_POOL = pool만`. 수동 `DECO_HOLDS`는 비움(경로 밖 ±1.0 배치였음, 필요하면 추가).
- **개발 전용 `/dev/holds` (HoldLab)**: `npm run dev` 후 접속. 카탈로그 전 모델을 같은 `WallHold`로 벽에 붙여 표시, 궤도 회전, spin 슬라이더, 라벨 클릭 시 반대 mount 미리보기 + 반영할 값 표시. `import.meta.env.DEV`에서만 라우트 등록 → 프로덕션 번들 제외.

**홀드 깊이(벽 밀착)**
- 원인: 벽 앞면이 ±0.3 굴곡진 faceted 면인데, 카테고리 홀드는 중심의 *최근접 정점* z + 0.16에 놓여 넓은 모델(React 로고 1.2)이 높은 면을 파고들었음. 루트 홀드는 회전된 geometry 박스(부풀려짐)로 z를 계산해 뜨거나 묻혔음.
- `createSurfaceSampler(...).max(x, y, r)`: 발자국 반경(크기의 40%) 안 17점 레이캐스트 중 가장 튀어나온 표면 z.
- 카테고리 홀드(z 생략 시): `seat` — 기본 회전 + spin 한 바퀴(16등분) 동안 가장 깊은 정점 z를 precise Box3로 구해, 뒷면이 그 표면에 닿게 앞으로 뺌. 커스텀 z(xr, graphics)는 그대로 존중.
- 루트 홀드(`WallHold`): precise Box3 + 발자국 최고 표면, inset 0.005.
- ~~남는 한계: hover/active 확대 시 파고듦~~ → 해결: seat 오프셋을 현재 스케일에 비례시켜 매 프레임 갱신.

**홀드 중복 제거 + 압축 + 팔레트 색칠**
- 실측: 17개 중 7쌍이 **바이트 단위로 동일**(지오메트리·텍스처 같음, 이름만 다름) → `yellow_big/small/curved`, `under_gray/red/mint`, `side_green` 삭제. 남은 10개 모양.
- `gltf-transform optimize --compress draco --texture-compress webp --texture-size 512 --simplify-ratio 0.5 --simplify-error 0.001 --palette false` → 10개 합계 **≈0.8MB** (이전 17개 28MB). `--palette false`: 기본 palette 단계가 단색 머티리얼을 하나로 합쳐 이름 기반 칠하기가 깨지므로 끔.
- 색은 코드에서: `HOLD_MODELS[].paint` = { 머티리얼 이름 | '*': 밝기 배율 }. 칠한 머티리얼은 텍스처 제거 + 무광(metalness 0). 볼륨 홀드는 몸체 1.0 + 받침/볼트 0.55(어두운 같은 색).
- 루트 홀드는 `HOLD_PALETTE`에서 시드 랜덤 색(앞 홀드와 같은 색 피함). 같은 (원본 머티리얼, 색, 배율) 조합은 머티리얼 공유(캐시).
- HoldLab: color = palette 순환 / original / 팔레트 칸 클릭으로 전체 미리보기. 10개 전부 pool.

**스토리 홀드 접근 성장**
- `climbRoute.approachAt(p, holdY)`: 손 높이가 홀드 y − 1.8에서 0 → 도달 순간 1 (smoothstep). 스크롤 구동이라 역스크롤 시 다시 작아짐.
- `ModelHold`의 `approach` + `dormantScale`(0.5): 도달 전 절반 크기에서 시작. hover 1.25 / active 1.12는 그대로 우선.
- 스케일이 중심 기준이라 `seat` 오프셋 × 현재 스케일로 z를 매 프레임 갱신 → 어떤 크기에서도 뒷면이 벽에 닿음.
- 팔레트: 사용자 확정 파스텔 `HOLD_PALETTE`.
