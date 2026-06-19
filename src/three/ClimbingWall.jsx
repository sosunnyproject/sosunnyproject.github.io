import { useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { useNavigate } from 'react-router-dom'
import { Wall } from './Wall.jsx'
import { Hold } from './Hold.jsx'
import { ModelHold, ModelDecoHold } from './ModelHold.jsx'
import { Lighting } from './Lighting.jsx'
import { createWall, surfaceZAt, makeRng } from './wallGeometry.js'
import { CATEGORIES } from '../data/categories.js'
import { DECO_HOLDS, HOLD_MODEL_POOL } from '../data/decoHolds.js'

const WALL_WIDTH = 5 // 화면을 꽉 채우지 않도록 — 양옆에 배경 여백 확보
const WALL_HEIGHT = 24
const WALL_Y = WALL_HEIGHT / 2 - 2 // mesh position.y == 정점 yOffset

// 카테고리 홀드의 (x, y) 루트 — 장식 홀드가 이 근처를 피하도록 사용
const HOLD_XY = CATEGORIES.map((c) => [c.position[0], c.position[1]])

function ScrollCamera() {
  const scroll = useScroll()
  const { camera } = useThree()
  useFrame(() => {
    camera.position.y = THREE.MathUtils.lerp(2, WALL_HEIGHT - 4, scroll.offset)
    camera.lookAt(0, camera.position.y, 0)
  })
  return null
}

// 클릭&드래그로 벽 그룹을 Y축 회전 (±maxAngle 로 clamp).
// ScrollControls와 충돌하는 OrbitControls 대신, 이벤트를 window에서 받아
// 그룹 rotation만 흔든다 → 벽 뒤쪽을 살짝 들여다볼 수 있음.
function useDragTilt(ref, { maxAngle = Math.PI / 4, speed = 0.005 } = {}) {
  const drag = useRef({ active: false, lastX: 0, target: 0 })

  useEffect(() => {
    const onDown = (e) => {
      drag.current.active = true
      drag.current.lastX = e.clientX
    }
    const onMove = (e) => {
      if (!drag.current.active) return
      const dx = e.clientX - drag.current.lastX
      drag.current.lastX = e.clientX
      drag.current.target = THREE.MathUtils.clamp(
        drag.current.target + dx * speed,
        -maxAngle,
        maxAngle
      )
    }
    const onUp = () => {
      drag.current.active = false
    }
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [maxAngle, speed])

  useFrame(() => {
    if (!ref.current) return
    ref.current.rotation.y = THREE.MathUtils.lerp(
      ref.current.rotation.y,
      drag.current.target,
      0.12
    )
  })
}

export function ClimbingWall() {
  const { geometry, vertices } = useMemo(
    () => createWall({
      width: WALL_WIDTH,
      height: WALL_HEIGHT,
      segX: 5,
      segY: 24,
      thickness: 0.7,
      depth: 0.32,
      irregularity: 0.55,
      detail: 0.25,
      yOffset: WALL_Y,
    }),
    []
  )

  const navigate = useNavigate()

  // 드래그 회전 (±22.5°)
  const tiltRef = useRef()
  useDragTilt(tiltRef, { maxAngle: Math.PI / 4})

  // 카테고리 홀드: 데이터의 position 사용. z 생략 시 벽 표면에 스냅.
  const categoryHolds = useMemo(
    () =>
      CATEGORIES.map((cat) => {
        const [x, y, customZ] = cat.position
        const z = customZ ?? surfaceZAt(vertices, x, y) + 0.16 // z 없으면 표면에 붙임
        return { ...cat, worldPosition: [x, y, z] }
      }),
    [vertices]
  )

  // 장식용 모델 홀드: 데이터의 position 사용. z 생략 시 벽 표면에 스냅.
  const decoModelHolds = useMemo(
    () =>
      DECO_HOLDS.map((h) => {
        const [x, y, customZ] = h.position
        const z = customZ ?? surfaceZAt(vertices, x, y) + 0.12
        return { ...h, worldPosition: [x, y, z] }
      }),
    [vertices]
  )

  // 장식용 모델 홀드(스캐터): 벽 정점 일부를 샘플링해 표면에 흩뿌림 (카테고리 위치는 피함).
  // 각 위치에 홀드 모델 풀에서 시드 랜덤으로 모델/회전/크기 배정 → 새로고침해도 동일.
  const scatterHolds = useMemo(() => {
    const rng = makeRng(4242) // 고정 시드
    const out = []
    const step = 7 // 정점 샘플링 간격
    for (let i = 0; i < vertices.length; i += step) {
      const v = vertices[i]
      // 가장자리·카테고리 홀드 근처는 제외
      if (Math.abs(v.x) > WALL_WIDTH / 2 - 0.6) continue
      if (v.y < 1 || v.y > WALL_HEIGHT - 4) continue
      const tooClose = HOLD_XY.some(([hx, hy]) => (hx - v.x) ** 2 + (hy - v.y) ** 2 < 1.2)
      if (tooClose) continue

      out.push({
        url: HOLD_MODEL_POOL[Math.floor(rng() * HOLD_MODEL_POOL.length)],
        position: [v.x, v.y, v.z + 0.1],
        rotation: [rng() * Math.PI * 2, rng() * Math.PI * 2, rng() * Math.PI * 2],
        targetSize: 0.45 + rng() * 0.25,
      })
    }
    return out
  }, [vertices])

  return (
    <ScrollControls pages={4} damping={0.3}>
      <Lighting />

      {/* 드래그로 ±22.5° 만 회전하는 그룹 (벽 + 홀드 한 덩어리) */}
      <group ref={tiltRef}>
        <Wall geometry={geometry} position={[0, WALL_Y, 0]} />

        {scatterHolds.map((h, i) => (
          <ModelDecoHold
            key={`scatter-${i}`}
            url={h.url}
            position={h.position}
            rotation={h.rotation}
            targetSize={h.targetSize}
          />
        ))}

        {decoModelHolds.map((h, i) => (
          <ModelDecoHold
            key={`deco-model-${i}`}
            url={h.url}
            position={h.worldPosition}
            rotation={h.rotation}
            targetSize={h.targetSize}
          />
        ))}

        {categoryHolds.map((cat) =>
          cat.model ? (
            <ModelHold
              key={cat.slug}
              url={cat.model.url}
              position={cat.worldPosition}
              rotation={cat.rotation}
              spin={cat.model.spin}
              spinAxis={cat.model.spinAxis}
              targetSize={cat.model.targetSize}
              label={cat.label}
              onClick={() => navigate(cat.to)}
            />
          ) : (
            <Hold
              key={cat.slug}
              position={cat.worldPosition}
              rotation={cat.rotation}
              color={cat.color}
              scale={1.0}
              label={cat.label}
              onClick={() => navigate(cat.to)}
            />
          )
        )}
      </group>

      <ScrollCamera />
      <Scroll html>
        <div style={{
          position: 'absolute',
          top: '10vh',
          width: '100%',
          textAlign: 'center',
          color: '#1e2327',
          pointerEvents: 'none',
        }}>
          <h1 style={{ fontSize: '2.2rem', margin: '0 0 0.4rem', fontFamily: 'sans-serif' }}>
            Write Code, Make Art
          </h1>
          <p style={{ opacity: 0.65, fontFamily: 'sans-serif', margin: 0, fontSize: '1rem' }}>
            스크롤해서 벽을 오르세요 — 홀드를 클릭하면 포트폴리오로 이동합니다.
          </p>
        </div>
      </Scroll>
    </ScrollControls>
  )
}
