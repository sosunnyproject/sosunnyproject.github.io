import { Routes, Route, Link, useParams } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// 3D 랜딩은 별도 청크로 lazy load
const Landing = lazy(() => import('./routes/Landing.jsx'))
// 개발 전용: 홀드 모델 카탈로그 확인 (npm run dev → /dev/holds). 프로덕션 빌드에는 포함되지 않음
const HoldLab = import.meta.env.DEV ? lazy(() => import('./routes/HoldLab.jsx')) : null

export default function App() {
  return (
    <Suspense fallback={<LandingFallback />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        {/* 라우팅은 Phase 7에서 실제 페이지로 연결. 지금은 임시 placeholder */}
        <Route path="/portfolio/:category" element={<CategoryPlaceholder />} />
        {HoldLab && <Route path="/dev/holds" element={<HoldLab />} />}
      </Routes>
    </Suspense>
  )
}

// 홀드 클릭 시 도착하는 임시 화면 (Phase 7에서 ListTemplate으로 교체)
function CategoryPlaceholder() {
  const { category } = useParams()
  return (
    <main style={{ padding: '2rem', maxWidth: 720, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Portfolio — {category}</h1>
      <p>이 카테고리 페이지는 준비 중입니다. (Phase 7에서 구현 예정)</p>
      <Link to="/">← 클라이밍 벽으로 돌아가기</Link>
    </main>
  )
}

function LandingFallback() {
  return (
    <main style={{ padding: '2rem', maxWidth: 720, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Write Code, Make Art</h1>
      <p>Graphics · Web · Games · XR. Currently studying M.S. Game Design at USC.</p>
      <a href="/work">View projects →</a>
    </main>
  )
}
