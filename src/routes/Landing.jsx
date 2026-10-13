import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import { ClimbingWall } from '../three/ClimbingWall.jsx'
import { ScrollBackground } from '../background/ScrollBackground.jsx'
import { StoryOverlay } from '../story/StoryOverlay.jsx'
import { beatAt, SCROLL_PAGES } from '../three/climbRoute.js'
import { useStore } from '../store/useStore.js'
import './landing.css'

// 레이어(뒤→앞): 배경(DOM) → 3D Canvas(투명) → 스토리 텍스트(DOM). 모두 position: fixed.
// 문서 스크롤 길이는 스페이서가 제공하고, 진행도 MotionValue 하나를 모든 레이어가 공유한다 (§15.2).
export default function Landing() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.6, restDelta: 0.0002 })

  const setBeat = useStore((s) => s.setBeat)
  useMotionValueEvent(progress, 'change', (p) => {
    const beat = beatAt(p)
    if (beat !== useStore.getState().beat) setBeat(beat)
  })

  return (
    <div className="landing">
      <ScrollBackground progress={progress} />

      <div className="landing-canvas">
        <Canvas shadows camera={{ position: [0, 2, 7], fov: 50 }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <ClimbingWall progress={progress} />
          </Suspense>
        </Canvas>
      </div>

      <StoryOverlay />
      <div className="landing-spacer" style={{ height: `${SCROLL_PAGES * 100}vh` }} />
    </div>
  )
}
