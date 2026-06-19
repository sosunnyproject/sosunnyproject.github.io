import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'

// 클릭 가능한 카테고리 홀드 — low-poly Dodecahedron + flatShading
export function Hold({ position, color, scale = 1, rotation = [0, 0, 0], label, onClick }) {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const target = useRef(new THREE.Vector3(scale, scale, scale))

  useFrame(() => {
    if (!ref.current) return
    target.current.setScalar(hovered ? scale * 2 : scale)
    ref.current.scale.lerp(target.current, 0.15)
  })

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={ref}
        castShadow
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
        <dodecahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color={color}
          roughness={0.55}
          metalness={0.05}
          flatShading
          emissive={color}
          emissiveIntensity={hovered ? 0.55 : 0.08}
        />
      </mesh>
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
            border: `1px solid ${color}55`,
          }}>
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}

// 장식용 비클릭 홀드 — 벽 표면을 채우는 작은 다면체 / 타원형 구
// variant: 'dodeca' = low-poly 다면체, 'ellipsoid' = 찌그러진 저폴리 구
export function DecoHold({
  position,
  color,
  variant = 'dodeca',
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}) {
  return (
    <mesh position={position} rotation={rotation} scale={scale} castShadow>
      {variant === 'ellipsoid' ? (
        <sphereGeometry args={[0.16, 6, 5]} />
      ) : (
        <dodecahedronGeometry args={[0.16, 0]} />
      )}
      <meshStandardMaterial
        color={color}
        roughness={0.6}
        metalness={0.05}
        flatShading
      />
    </mesh>
  )
}
