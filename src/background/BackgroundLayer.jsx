import { useMemo } from 'react'
import { motion, useTransform, useReducedMotion } from 'framer-motion'
import { makeRng } from '../three/wallGeometry.js'

const TRAVEL = 12 // 구간 동안 이미지가 아래로 이동하는 양 (% of layer height)
const POINTER = 1.5 // 마우스 패럴랙스 최대 이동 (% of image). CSS .bg-pointer 여백(2%)보다 작게

// 배경 1장. 자기 구간 [start, end]에서만 보이고, 경계 ±fade 동안 이웃과 cross-fade.
// 구간 진행에 따라 아래로 흐르고(캐릭터가 오르니 세상은 내려감) 미세하게 줌 아웃.
// pointer: { x, y } 마우스 위치 MotionValue (-1..1) → 이미지가 커서 반대쪽으로 살짝 이동 (깊이감)
export function BackgroundLayer({ layer, progress, start, end, fade, first, last, pointer }) {
  const reduce = useReducedMotion()

  const inRange = [first ? 0 : start - fade, first ? 0 : start + fade, last ? 1 : end - fade, last ? 1 : end + fade]
  const opacity = useTransform(progress, inRange, [first ? 1 : 0, 1, 1, last ? 1 : 0])
  const y = useTransform(progress, [inRange[0], inRange[3]], [`${-TRAVEL}%`, `${TRAVEL}%`])
  const scale = useTransform(progress, [inRange[0], inRange[3]], [1.08, 1])
  const px = useTransform(pointer.x, (v) => `${-v * POINTER}%`)
  const py = useTransform(pointer.y, (v) => `${-v * POINTER}%`)

  const [top, bottom] = layer.sky
  return (
    <motion.div
      className="bg-layer"
      style={{ opacity, background: `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)` }}
    >
      <motion.div className="bg-media" style={reduce ? undefined : { y, scale }}>
        <motion.div className="bg-pointer" style={reduce ? undefined : { x: px, y: py }}>
          {layer.src ? (
            <img src={layer.src} alt="" decoding="async" fetchPriority={first ? 'high' : 'low'} />
          ) : (
            <SkylinePlaceholder label={layer.label} color={layer.city} seed={layer.id} />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// 실제 이미지가 오기 전까지 쓰는 시드 고정 스카이라인 실루엣 + 도시명
function SkylinePlaceholder({ label, color, seed }) {
  const buildings = useMemo(() => {
    const rng = makeRng([...seed].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7))
    const out = []
    for (let x = 0; x < 100; ) {
      const w = 2 + rng() * 5
      out.push({ x, w, h: 8 + rng() * 26 })
      x += w + rng() * 0.8
    }
    return out
  }, [seed])

  return (
    <div className="bg-placeholder">
      <span className="bg-label">{label}</span>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
        {buildings.map((b, i) => (
          <rect key={i} x={b.x} y={40 - b.h} width={b.w} height={b.h} fill={color} opacity={0.55} />
        ))}
      </svg>
    </div>
  )
}
