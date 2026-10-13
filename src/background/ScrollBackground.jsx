import { BackgroundLayer } from './BackgroundLayer.jsx'
import { BACKGROUNDS } from '../data/backgrounds.js'

// 벽 바깥 배경 스택 — three 씬과 분리된 DOM 레이어 (Canvas 뒤).
// opacity/transform만 바뀌므로 compositor가 처리하고, 3D가 실패해도 배경은 남는다 (§15.6).
export function ScrollBackground({ progress, layers = BACKGROUNDS, fadeRatio = 0.35 }) {
  const n = layers.length
  return (
    <div className="landing-bg" aria-hidden="true">
      {layers.map((layer, i) => {
        const [start, end] = layer.range ?? [i / n, (i + 1) / n]
        return (
          <BackgroundLayer
            key={layer.id}
            layer={layer}
            progress={progress}
            start={start}
            end={end}
            fade={((end - start) * fadeRatio) / 2}
            first={i === 0}
            last={i === n - 1}
          />
        )
      })}
    </div>
  )
}
