import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'

// 3D 랜딩은 별도 청크로 lazy load
const Landing = lazy(() => import('./routes/Landing.jsx'))

export default function App() {
  return (
    <Suspense fallback={<LandingFallback />}>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Suspense>
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
