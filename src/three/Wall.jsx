import { useThree } from '@react-three/fiber'

// 화면 폭에 따른 벽 불투명도 — 좁은 화면일수록 더 투명하게(뒤 도시 배경이 더 비침).
// 폰(≤ MOBILE_W) = MOBILE, 데스크톱(≥ DESKTOP_W) = DESKTOP, 그 사이는 선형 보간.
export const WALL_OPACITY = { MOBILE: 0.42, DESKTOP: 0.6, MOBILE_W: 420, DESKTOP_W: 1024 }

export function wallOpacityFor(width) {
  const { MOBILE, DESKTOP, MOBILE_W, DESKTOP_W } = WALL_OPACITY
  const t = Math.min(1, Math.max(0, (width - MOBILE_W) / (DESKTOP_W - MOBILE_W)))
  return MOBILE + (DESKTOP - MOBILE) * t
}

// 지오메트리는 상위(ClimbingWall)에서 생성해 주입 — 홀드와 정점 데이터 공유
// opacity < 1 이면 뒤 배경(사진/영상)이 살짝 비쳐 보인다. opacity를 넘기면 고정값, 생략하면 화면 폭에 반응.
export function Wall({ geometry, position = [0, 0, 0], opacity }) {
  const width = useThree((s) => s.size.width) // 캔버스 CSS px — 리사이즈/회전 시 갱신
  const o = opacity ?? wallOpacityFor(width)
  return (
    <mesh geometry={geometry} position={position} receiveShadow castShadow>
      <meshStandardMaterial
        color="#C2AEB0"
        roughness={0.95}
        metalness={0}
        flatShading
        transparent={o < 1}
        opacity={o}
      />
    </mesh>
  )
}
