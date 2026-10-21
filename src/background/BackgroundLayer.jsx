import { useMemo, useState } from 'react'
import { motion, useTransform, useReducedMotion } from 'framer-motion'
import { makeRng } from '../three/wallGeometry.js'

// 줌 최소화: 이 값들이 클수록 이미지를 더 크게 키워야 가장자리가 안 보임
const TRAVEL = 5    // 구간 동안 이미지가 아래로 이동하는 양 (% of layer height). CSS .bg-media 위아래 여백(6vh / 112vh ≈ 5.4%) 이하
const ZOOM = 1.03   // 구간 시작 시 확대 → 1까지 줄어듦 (Ken Burns)
const POINTER = 1.2 // 마우스 패럴랙스 최대 이동 (% of image). CSS .bg-pointer 여백(1.5%)보다 작게

// 배경 1장. 자기 구간 [start, end]에서만 보이고, 경계 ±fade 동안 이웃과 cross-fade.
// 구간 진행에 따라 아래로 흐르고(캐릭터가 오르니 세상은 내려감) 미세하게 줌 아웃.
// pointer: { x, y } 마우스 위치 MotionValue (-1..1) → 이미지가 커서 반대쪽으로 살짝 이동 (깊이감)
export function BackgroundLayer({ layer, progress, start, end, fade, first, last, pointer }) {
  const reduce = useReducedMotion()

  const inRange = [first ? 0 : start - fade, first ? 0 : start + fade, last ? 1 : end - fade, last ? 1 : end + fade]
  const opacity = useTransform(progress, inRange, [first ? 1 : 0, 1, 1, last ? 1 : 0])
  const y = useTransform(progress, [inRange[0], inRange[3]], [`${-TRAVEL}%`, `${TRAVEL}%`])
  const scale = useTransform(progress, [inRange[0], inRange[3]], [ZOOM, 1])
  const px = useTransform(pointer.x, (v) => `${-v * POINTER}%`)
  const py = useTransform(pointer.y, (v) => `${-v * POINTER}%`)

  // 이미지 윗부분 색 → 레이어 바탕. 화면이 이미지보다 길면(세로 화면) 이미지 위 빈 하늘이 그림과 이어지게.
  const [skyColor, setSkyColor] = useState(null)
  const [top, bottom] = layer.sky
  return (
    <motion.div
      className="bg-layer"
      style={{ opacity, background: skyColor ?? `linear-gradient(180deg, ${top} 0%, ${bottom} 100%)` }}
    >
      <motion.div className="bg-media" style={reduce ? undefined : { y, scale }}>
        <motion.div className="bg-pointer" style={reduce ? undefined : { x: px, y: py }}>
          {layer.image ? (
            <picture>
              <source type="image/avif" srcSet={layer.image.avif} />
              <img
                src={layer.image.webp ?? layer.image.avif}
                alt=""
                decoding="async"
                fetchPriority={first ? 'high' : 'low'}
                onLoad={(e) => setSkyColor(topColor(e.currentTarget))}
              />
            </picture>
          ) : (
            <SkylinePlaceholder color={layer.city} seed={layer.id} />
          )}
          <span className="bg-label">{layer.label}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// 이미지 맨 위 4% 띠의 평균 색 (16×2로 축소 후 평균)
function topColor(img) {
  try {
    const c = document.createElement('canvas')
    c.width = 16
    c.height = 2
    const ctx = c.getContext('2d', { willReadFrequently: true })
    ctx.drawImage(img, 0, 0, img.naturalWidth, Math.max(1, img.naturalHeight * 0.04), 0, 0, 16, 2)
    const d = ctx.getImageData(0, 0, 16, 2).data
    const sum = [0, 0, 0]
    for (let i = 0; i < d.length; i += 4) for (let k = 0; k < 3; k++) sum[k] += d[i + k]
    const n = d.length / 4
    return `rgb(${sum.map((v) => Math.round(v / n)).join(', ')})`
  } catch {
    return null // 샘플링 실패 시 기본 그라데이션 유지
  }
}

// 이미지가 없을 때 쓰는 시드 고정 스카이라인 실루엣 (도시명은 레이어에서 공통으로 표시)
function SkylinePlaceholder({ color, seed }) {
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
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
        {buildings.map((b, i) => (
          <rect key={i} x={b.x} y={40 - b.h} width={b.w} height={b.h} fill={color} opacity={0.55} />
        ))}
      </svg>
    </div>
  )
}
