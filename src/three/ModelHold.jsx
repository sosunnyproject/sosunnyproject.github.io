import { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'

// glTF 모델을 클라이밍 홀드로 사용. 로드 후 바운딩박스로 중심 정렬 + targetSize로 정규화.
export function ModelHold({
  url,
  position,
  rotation = [0, 0, 0], // 기본 기울기 (라디안) [x, y, z]
  spin = 0,             // 매 프레임 자동 회전 (라디안/초). 0이면 정지.
  spinAxis = 'y',       // 회전축 'x' | 'y' | 'z'
  targetSize = 0.9,
  baseScale = 1,
  label,
  onClick,
}) {
  const { scene } = useGLTF(url, true) // 두번째 인자 true = Draco 디코더 활성화
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const target = useRef(new THREE.Vector3(baseScale, baseScale, baseScale))

  // 모델을 클론해서 원본 오염 방지 + 중심 정렬 + 크기 정규화
  const model = useMemo(() => {
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

  useFrame((_, delta) => {
    if (!ref.current) return
    target.current.setScalar(hovered ? baseScale * 1.25 : baseScale)
    ref.current.scale.lerp(target.current, 0.15)
    if (spin) ref.current.rotation[spinAxis] += spin * delta // 연속 tick 회전
  })

  return (
    <group position={position}>
      {/* 바깥: 데이터의 기본 기울기(고정) / 안쪽 ref: hover 스케일 + 자동 회전 */}
      <group rotation={rotation}>
        <group
          ref={ref}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            setHovered(false)
            document.body.style.cursor = 'auto'
          }}
          onClick={(e) => {
            e.stopPropagation()
            onClick?.()
          }}
        >
          <primitive object={model} />
        </group>
      </group>
      {hovered && label && (
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
