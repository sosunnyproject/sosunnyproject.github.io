import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'

// glTF/glb 로드 → 클론(원본 오염 방지) + 바운딩박스 중심 정렬 + targetSize로 크기 정규화.
function useNormalizedModel(url, targetSize) {
  const { scene } = useGLTF(url, true) // 두번째 인자 true = Draco 디코더 활성화
  return useMemo(() => {
    const clone = scene.clone(true)
    const box = new THREE.Box3().setFromObject(clone)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const s = targetSize / maxDim

    clone.position.sub(center) // 원점 중심으로
    const wrapper = new THREE.Group()
    wrapper.add(clone)
    wrapper.scale.setScalar(s)
    return wrapper
  }, [scene, targetSize])
}

// 모델이 (자동 회전 포함) 가장 깊이 들어가는 z를 구해, 그만큼 앞으로 뺄 거리를 반환.
// → position.z를 벽 표면에 두면 뒷면이 표면에 닿는다. spin이 있으면 한 바퀴를 16등분해 최악값 사용.
function useSeatOffset(model, rotation, spin, spinAxis, enabled) {
  const [rx, ry, rz] = rotation
  return useMemo(() => {
    if (!enabled) return 0
    const outer = new THREE.Group()
    outer.rotation.set(rx, ry, rz)
    const inner = new THREE.Group()
    outer.add(inner)
    inner.add(model)
    const steps = spin ? 16 : 1
    let minZ = Infinity
    for (let i = 0; i < steps; i++) {
      inner.rotation.set(0, 0, 0)
      inner.rotation[spinAxis] = (i / steps) * Math.PI * 2
      outer.updateMatrixWorld(true)
      minZ = Math.min(minZ, new THREE.Box3().setFromObject(outer, true).min.z)
    }
    inner.remove(model) // 실제 씬 그룹에 다시 붙도록 임시 부모에서 분리
    return -minZ
  }, [model, rx, ry, rz, spin, spinAxis, enabled])
}

const MOUNTS = { floor: [Math.PI / 2, 0, 0], wall: [0, 0, 0] }

// 벽 표면에 앉히는 일반 홀드. position = 벽 표면 점.
// mount로 바닥면을 벽(-Z)으로 향하게 세우고 → 벽 법선(Z) 기준 spin 회전 → 뒷면이 표면에 닿도록 z 자동 보정.
export function WallHold({ url, position, mount = 'floor', spin = 0, targetSize = 0.45, inset = 0.005 }) {
  const model = useNormalizedModel(url, targetSize)
  const object = useMemo(() => {
    const mounted = new THREE.Group()
    mounted.rotation.set(...MOUNTS[mount])
    mounted.add(model)
    const spun = new THREE.Group()
    spun.rotation.z = spin
    spun.add(mounted)
    spun.updateMatrixWorld(true)
    // precise: 회전된 정점 기준 (geometry 박스를 회전하면 부풀어서 떠 보임)
    spun.position.z = -new THREE.Box3().setFromObject(spun, true).min.z - inset
    return spun
  }, [model, mount, spin, inset])
  return (
    <group position={position}>
      <primitive object={object} />
    </group>
  )
}

// 장식용(클릭/호버 없는) 모델 홀드 — 벽에 흩뿌리는 정적 클라이밍 홀드.
// 위치 잡은 뒤 rotation으로 각도만 조정하면 됨.
export function ModelDecoHold({
  url,
  position,
  rotation = [0, 0, 0],
  targetSize = 0.6,
}) {
  const model = useNormalizedModel(url, targetSize)
  return (
    <group position={position} rotation={rotation}>
      <primitive object={model} />
    </group>
  )
}

// glTF 모델을 클릭 가능한 카테고리 홀드로 사용.
export function ModelHold({
  url,
  position,
  rotation = [0, 0, 0], // 기본 기울기 (라디안) [x, y, z]
  spin = 0,             // 매 프레임 자동 회전 (라디안/초). 0이면 정지.
  spinAxis = 'y',       // 회전축 'x' | 'y' | 'z'
  targetSize = 0.9,
  baseScale = 1,
  seat = false,         // true: position.z = 벽 표면으로 보고, 뒷면이 표면에 닿게 앞으로 뺌
  label,
  active = false,       // 캐릭터가 이 홀드에 도달 → 살짝 커지고 라벨 표시
  onClick,
}) {
  const model = useNormalizedModel(url, targetSize)
  const seatOffset = useSeatOffset(model, rotation, spin, spinAxis, seat)
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const target = useRef(new THREE.Vector3(baseScale, baseScale, baseScale))

  useFrame((_, delta) => {
    if (!ref.current) return
    target.current.setScalar(baseScale * (hovered ? 1.25 : active ? 1.12 : 1))
    ref.current.scale.lerp(target.current, 0.15)
    if (spin) ref.current.rotation[spinAxis] += spin * delta // 연속 tick 회전
  })

  return (
    <group position={[position[0], position[1], position[2] + seatOffset]}>
      {/* 바깥: 데이터의 기본 기울기(고정) / 안쪽 ref: hover 스케일 + 자동 회전 */}
      <group rotation={rotation}>
        <group
          ref={ref}
          onPointerOver={(e) => {
            if (!onClick) return // 링크 없는 홀드는 호버/커서 반응 없음
            e.stopPropagation()
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            setHovered(false)
            document.body.style.cursor = 'auto'
          }}
          onClick={(e) => {
            if (!onClick) return
            e.stopPropagation()
            onClick()
          }}
        >
          <primitive object={model} />
        </group>
      </group>
      {(hovered || active) && label && (
        <Html distanceFactor={8} position={[0.6, 0.4, 0]}>
          <div style={{
            background: 'rgba(15,15,20,0.88)',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: 6,
            fontSize: 13,
            fontFamily: 'sans-serif',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}>
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}

useGLTF.preload('/models/apple-vision-pro/scene.gltf')
