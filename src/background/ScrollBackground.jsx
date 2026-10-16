import { useEffect } from 'react'
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { BackgroundLayer } from './BackgroundLayer.jsx'
import { BACKGROUNDS } from '../data/backgrounds.js'
import { CITY_RANGES } from '../three/climbRoute.js'

// 스토리 비트의 city 구간 → 배경 레이어 (스타일은 backgrounds.js)
const STORY_LAYERS = CITY_RANGES.map(({ city, range }, i) => ({
  ...(BACKGROUNDS.find((b) => b.id === city) ?? { id: city, label: city, src: null, sky: ['#ddd', '#eee'], city: '#999' }),
  key: `${city}-${i}`,
  range,
}))

// 벽 바깥 배경 스택 — three 씬과 분리된 DOM 레이어 (Canvas 뒤).
// opacity/transform만 바뀌므로 compositor가 처리하고, 3D가 실패해도 배경은 남는다 (§15.6).
export function ScrollBackground({ progress, layers = STORY_LAYERS, fadeRatio = 0.35 }) {
  const pointer = usePointerParallax()
  const n = layers.length
  const ranges = layers.map((layer, i) => layer.range ?? [i / n, (i + 1) / n])
  // 구간 길이가 달라도 경계 양쪽이 같은 폭으로 cross-fade 되도록 가장 짧은 구간 기준
  const fade = (Math.min(...ranges.map(([s, e]) => e - s)) * fadeRatio) / 2
  return (
    <div className="landing-bg" aria-hidden="true">
      {layers.map((layer, i) => (
        <BackgroundLayer
          key={layer.key ?? layer.id}
          layer={layer}
          progress={progress}
          start={ranges[i][0]}
          end={ranges[i][1]}
          fade={fade}
          first={i === 0}
          last={i === n - 1}
          pointer={pointer}
        />
      ))}
    </div>
  )
}

// 마우스 위치 → -1..1 (화면 중앙 = 0), 스프링으로 부드럽게. 모든 배경 레이어가 공유.
// 마우스만 반응 (터치 드래그는 스크롤/벽 회전과 겹치므로 제외), reduced-motion이면 정지.
function usePointerParallax() {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const spring = { stiffness: 50, damping: 20, mass: 0.8 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  useEffect(() => {
    if (reduce) return
    const onMove = (e) => {
      if (e.pointerType !== 'mouse') return
      x.set((e.clientX / window.innerWidth) * 2 - 1)
      y.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onLeave = () => {
      x.set(0)
      y.set(0)
    }
    window.addEventListener('pointermove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [reduce, x, y])

  return { x: sx, y: sy }
}
