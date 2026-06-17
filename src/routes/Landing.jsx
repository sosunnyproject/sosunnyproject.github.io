import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { ClimbingWall } from '../three/ClimbingWall.jsx'

export default function Landing() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(180deg, #bfe3ff 0%, #ffe9c7 100%)',
    }}>
      <Canvas
        shadows
        camera={{ position: [0, 2, 7], fov: 50 }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <ClimbingWall />
        </Suspense>
      </Canvas>
    </div>
  )
}
