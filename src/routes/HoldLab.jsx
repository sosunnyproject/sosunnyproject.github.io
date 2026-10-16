import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { WallHold } from '../three/ModelHold.jsx'
import { HOLD_MODELS, HOLD_PALETTE } from '../data/decoHolds.js'

// 개발 전용 홀드 카탈로그 (/dev/holds). decoHolds.js의 HOLD_MODELS를 전부 평평한 벽(z=0)에
// 랜딩과 같은 WallHold(mount + 자동 z 보정)로 붙여서 보여준다.
// 색: 'palette' = 모델마다 팔레트 색 순환, 'original' = 파일 원래 색, 팔레트 칸 클릭 = 전부 그 색.
// mount가 틀린 모델은 바닥면이 벽에서 떨어져 보이거나 옆으로 누워 보임 → 'flip'으로 반대 mount를 미리 보고 데이터 수정.
const COLS = 6
const GAP = 1.1
const name = (url) => url.split('/').pop().replace(/^hold_|\.glb$/g, '')
const other = { floor: 'wall', wall: 'floor' }

export default function HoldLab() {
  const [flipped, setFlipped] = useState({}) // url → true면 반대 mount로 미리보기
  const [spin, setSpin] = useState(0)
  const [paintMode, setPaintMode] = useState('palette') // 'palette' | 'original' | '#hex'
  const colorFor = (i) =>
    paintMode === 'original' ? undefined : paintMode === 'palette' ? HOLD_PALETTE[i % HOLD_PALETTE.length] : paintMode
  const rows = Math.ceil(HOLD_MODELS.length / COLS)
  const changed = HOLD_MODELS.filter((m) => flipped[m.url])

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#e8e4dc', fontFamily: 'sans-serif' }}>
      <Canvas camera={{ position: [2.5, 1, 8.5], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 5, 6]} intensity={2.2} />
        <hemisphereLight args={['#ffffff', '#8a7f70', 0.5]} />
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[COLS * GAP + 1, rows * GAP + 1, 0.1]} />
          <meshStandardMaterial color="#b9b2a6" />
        </mesh>
        {HOLD_MODELS.map((m, i) => {
          const mount = flipped[m.url] ? other[m.mount] : m.mount
          const x = ((i % COLS) - (COLS - 1) / 2) * GAP
          const y = ((rows - 1) / 2 - Math.floor(i / COLS)) * GAP
          return (
            <group key={m.url}>
              <Suspense fallback={null}>
                <WallHold url={m.url} mount={mount} spin={spin} targetSize={0.7} position={[x, y, 0]} color={colorFor(i)} paint={m.paint} />
              </Suspense>
              <Html position={[x, y - 0.5, 0.05]} center>
                <button
                  onClick={() => setFlipped((f) => ({ ...f, [m.url]: !f[m.url] }))}
                  title="클릭: 반대 mount로 미리보기"
                  style={{
                    font: '11px/1.3 sans-serif', whiteSpace: 'nowrap', cursor: 'pointer', border: 0, borderRadius: 4,
                    padding: '2px 6px', color: '#fff', background: flipped[m.url] ? '#c0392b' : m.pool ? '#27ae60' : '#555',
                  }}
                >
                  {name(m.url)} · {mount}{m.pool ? ' · pool' : ''}
                </button>
              </Html>
            </group>
          )
        })}
        <OrbitControls target={[0, 0, 0]} />
      </Canvas>

      <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(255,255,255,0.9)', padding: '10px 12px', borderRadius: 8, fontSize: 13, maxWidth: 360 }}>
        <b>Hold Lab</b> — <code>src/data/decoHolds.js</code> HOLD_MODELS
        <div style={{ marginTop: 6, color: '#555' }}>
          드래그로 궤도 회전 · 라벨 클릭 = 반대 mount 미리보기<br />
          <span style={{ color: '#27ae60' }}>■</span> pool (랜딩 루트 홀드에 사용) <span style={{ color: '#555' }}>■</span> 미사용
        </div>
        <label style={{ display: 'block', marginTop: 6 }}>
          spin {Math.round((spin * 180) / Math.PI)}°{' '}
          <input type="range" min={0} max={Math.PI * 2} step={0.01} value={spin} onChange={(e) => setSpin(+e.target.value)} />
        </label>
        <div style={{ marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
          color
          {['palette', 'original'].map((mode) => (
            <button key={mode} onClick={() => setPaintMode(mode)} style={chip(paintMode === mode)}>{mode}</button>
          ))}
          {HOLD_PALETTE.map((c) => (
            <button key={c} onClick={() => setPaintMode(c)} title={c}
              style={{ ...chip(paintMode === c), width: 20, height: 20, padding: 0, background: c }} />
          ))}
        </div>
        {changed.length > 0 && (
          <pre style={{ marginTop: 8, fontSize: 11, background: '#f4f1ec', padding: 6, whiteSpace: 'pre-wrap' }}>
            {'// 데이터에 반영할 mount 변경\n' + changed.map((m) => `${name(m.url)}: mount: '${other[m.mount]}'`).join('\n')}
          </pre>
        )}
      </div>
    </div>
  )
}

const chip = (active) => ({
  font: '11px sans-serif', border: active ? '2px solid #111' : '1px solid #bbb', borderRadius: 4,
  padding: '2px 6px', background: '#fff', cursor: 'pointer',
})
