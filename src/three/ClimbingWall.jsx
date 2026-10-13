import { Suspense, useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import { Wall } from './Wall.jsx'
import { Hold } from './Hold.jsx'
import { ModelHold, ModelDecoHold } from './ModelHold.jsx'
import { Lighting } from './Lighting.jsx'
import { Climber } from './Climber.jsx'
import { CameraRig } from './CameraRig.jsx'
import { FogBand } from './FogBand.jsx'
import { createWall, surfaceZAt, makeRng } from './wallGeometry.js'
import { WALL_WIDTH, WALL_HEIGHT, WALL_Y, STORY_STOPS } from './climbRoute.js'
import { CATEGORIES } from '../data/categories.js'
import { DECO_HOLDS, HOLD_MODEL_POOL } from '../data/decoHolds.js'
import { useStore } from '../store/useStore.js'

// 카테고리 홀드의 (x, y) 루트 — 장식 홀드가 이 근처를 피하도록 사용
const HOLD_XY = CATEGORIES.map((c) => [c.position[0], c.position[1]])

// 클릭&드래그로 벽 그룹을 Y축 회전 (±maxAngle 로 clamp).
// 스크롤과 충돌하는 OrbitControls 대신, 이벤트를 window에서 받아
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
    window.addEventListener('pointercancel', onUp) // 터치 스크롤이 포인터를 가져갈 때
    return () => {
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
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

// progress: 스프링 감쇠된 스크롤 진행도 MotionValue (0..1). Landing에서 DOM 레이어와 공유.
export function ClimbingWall({ progress }) {
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
  // 캐릭터가 도달한 스토리 홀드 → 강조
  const activeHold = useStore((s) => (typeof s.beat === 'number' ? STORY_STOPS[s.beat]?.hold : null))

  // 드래그 회전 (±45°)
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
    <>
      <Lighting />

      {/* 드래그로 ±45° 만 회전하는 그룹 (벽 + 홀드 + 캐릭터 한 덩어리) */}
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
              active={cat.slug === activeHold}
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
              active={cat.slug === activeHold}
              onClick={() => navigate(cat.to)}
            />
          )
        )}

        {/* 주인공은 tilt 그룹 안 (벽과 함께 회전). 무거우니 별도 Suspense — 벽이 먼저 보인다 */}
        <Suspense fallback={null}>
          <Climber progress={progress} />
        </Suspense>
      </group>

      <FogBand />
      <CameraRig progress={progress} />
    </>
  )
}
