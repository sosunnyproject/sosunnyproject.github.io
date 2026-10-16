import { Suspense, useMemo, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom'
import { Wall } from './Wall.jsx'
import { Hold } from './Hold.jsx'
import { ModelHold, ModelDecoHold, WallHold } from './ModelHold.jsx'
import { Lighting } from './Lighting.jsx'
import { Climber } from './Climber.jsx'
import { CameraRig } from './CameraRig.jsx'
import { FogBand } from './FogBand.jsx'
import { createWall, createSurfaceSampler, surfaceZAt, makeRng } from './wallGeometry.js'
import { WALL_HEIGHT, WALL_WIDTH, WALL_Y, STORY_STOPS, ROUTE_HOLDS } from './climbRoute.js'
import { CATEGORIES } from '../data/categories.js'
import { DECO_HOLDS, HOLD_MODEL_POOL } from '../data/decoHolds.js'
import { useStore } from '../store/useStore.js'

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

  // 벽 표면 높이 샘플러 (레이캐스트). 홀드 발자국 안에서 가장 튀어나온 점에 뒷면을 맞춘다.
  const surfaceZ = useMemo(() => createSurfaceSampler(geometry, WALL_Y), [geometry])

  // 카테고리 홀드: 데이터의 position 사용. z 생략 시 → 발자국(크기의 40% 반경) 안 최고 표면 + 뒷면 자동 맞춤(seat).
  const categoryHolds = useMemo(
    () =>
      CATEGORIES.map((cat) => {
        const [x, y, customZ] = cat.position
        const size = cat.model?.targetSize ?? 0.6
        const seat = customZ == null
        const z = seat ? surfaceZ.max(x, y, size * 0.4) : customZ
        return { ...cat, worldPosition: [x, y, z], seat }
      }),
    [surfaceZ]
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

  // 루트 홀드: 캐릭터 경로를 따라 지그재그로 놓인 일반 홀드 (위치는 climbRoute.ROUTE_HOLDS).
  // 모델은 풀에서 시드 랜덤(바로 앞과 같은 모델은 피함), 벽 법선 기준 회전·크기도 시드 고정 → 새로고침해도 동일.
  const routeHolds = useMemo(() => {
    const rng = makeRng(4242)
    let prev = -1
    return ROUTE_HOLDS.map(({ x, y }) => {
      let m = Math.floor(rng() * HOLD_MODEL_POOL.length)
      if (m === prev) m = (m + 1) % HOLD_MODEL_POOL.length
      prev = m
      const targetSize = 0.38 + rng() * 0.12
      return {
        ...HOLD_MODEL_POOL[m],
        position: [x, y, surfaceZ.max(x, y, targetSize * 0.4)], // 발자국 안 최고 표면에 뒷면을 맞춤
        spin: rng() * Math.PI * 2,
        targetSize,
      }
    })
  }, [surfaceZ])

  return (
    <>
      <Lighting />

      {/* 드래그로 ±45° 만 회전하는 그룹 (벽 + 홀드 + 캐릭터 한 덩어리) */}
      <group ref={tiltRef}>
        <Wall geometry={geometry} position={[0, WALL_Y, 0]} />

        {routeHolds.map((h, i) => (
          <WallHold
            key={`route-${i}`}
            url={h.url}
            mount={h.mount}
            position={h.position}
            spin={h.spin}
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
              seat={cat.seat}
              label={cat.label}
              active={cat.slug === activeHold}
              onClick={cat.to ? () => navigate(cat.to) : undefined}
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
              onClick={cat.to ? () => navigate(cat.to) : undefined}
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
