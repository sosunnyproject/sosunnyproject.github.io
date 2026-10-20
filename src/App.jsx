import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// 3D 랜딩은 별도 청크로 lazy load
const Landing = lazy(() => import('./routes/Landing.jsx'))
// 개발 전용: 홀드 모델 카탈로그 확인 (npm run dev → /dev/holds). 프로덕션 빌드에는 포함되지 않음
const HoldLab = import.meta.env.DEV ? lazy(() => import('./routes/HoldLab.jsx')) : null
// 포트폴리오 / 블로그 / cv / til — 랜딩과 별도 청크
const SiteRoutes = lazy(() => import('./site/SiteRoutes.jsx'))

export default function App() {
  return (
    <Suspense fallback={<LandingFallback />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        {HoldLab && <Route path="/dev/holds" element={<HoldLab />} />}
        <Route
          path="/*"
          element={
            <Suspense fallback={<div style={{ minHeight: '100vh', background: '#f3ece2' }} />}>
              <SiteRoutes />
            </Suspense>
          }
        />
      </Routes>
    </Suspense>
  )
}

function LandingFallback() {
  return (
    <main style={{ padding: '2rem', maxWidth: 720, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Write Code, Make Art</h1>
      <p>Graphics · Web · Games · XR. Currently studying M.S. Game Design at USC.</p>
      <a href="/portfolio/main">View projects →</a>
    </main>
  )
}
