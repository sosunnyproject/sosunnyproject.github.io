import { useMemo } from 'react'
import { CATEGORIES } from '../data/categories.js'
import { HOLD_PALETTE } from '../data/decoHolds.js'

// "Top out." 축하 컨페티 — 순수 CSS 애니메이션 (landing.css의 .confetti*).
// 타이틀 근처에서 터져 퍼진 뒤 중력처럼 떨어진다. 마운트될 때마다 한 번 재생 (OUTRO에 도달할 때마다).
// prefers-reduced-motion이면 렌더하지 않는다.
const COLORS = [...CATEGORIES.map((c) => c.color), ...HOLD_PALETTE.slice(0, 5)]
const rand = (a, b) => a + Math.random() * (b - a)

export function Confetti() {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const pieces = useMemo(() => {
    if (typeof window === 'undefined') return []
    const n = window.innerWidth < 640 ? 46 : 84
    const spread = Math.min(window.innerWidth, 1100) / 2
    return Array.from({ length: n }, (_, i) => {
      const angle = rand(-Math.PI * 0.95, -Math.PI * 0.05) // 위쪽 반원으로 터짐
      const power = rand(0.35, 1)
      const shape = i % 5 === 0 ? 'dot' : i % 3 === 0 ? 'strip' : 'chip'
      return {
        key: i,
        shape,
        style: {
          '--bx': `${Math.cos(angle) * spread * power}px`,
          '--by': `${Math.sin(angle) * rand(90, 220) * power}px`,
          '--dx': `${rand(-80, 80)}px`,
          '--fall': `${rand(70, 100)}vh`,
          '--rot': `${rand(-720, 720)}deg`,
          '--dur': `${rand(2.4, 3.6)}s`,
          '--delay': `${rand(0, 0.18)}s`,
          '--flip': `${rand(0.35, 0.8)}s`,
          '--c': COLORS[i % COLORS.length],
        },
      }
    })
  }, [])

  if (reduce || !pieces.length) return null
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span key={p.key} className="confetti-piece" style={p.style}>
          <i className={`confetti-${p.shape}`} />
        </span>
      ))}
    </div>
  )
}
