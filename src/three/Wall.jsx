// 지오메트리는 상위(ClimbingWall)에서 생성해 주입 — 홀드와 정점 데이터 공유
// opacity < 1 이면 뒤 배경(사진/영상)이 살짝 비쳐 보인다.
export function Wall({ geometry, position = [0, 0, 0], opacity = 0.62 }) {
  return (
    <mesh geometry={geometry} position={position} receiveShadow castShadow>
      <meshStandardMaterial
        color="#ece7dd"
        roughness={0.95}
        metalness={0}
        flatShading
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  )
}
