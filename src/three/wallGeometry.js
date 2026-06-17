import * as THREE from 'three'

// BoxGeometry의 "앞면"만 변위시켜 두께가 있는 faceted 암벽 슬래브를 만든다.
// 뒷면·옆면은 평평하게 남아 실제 두께(thickness)가 보이고,
// 앞면 내부 정점만 흔들어 low-poly 굴곡을 준다.
// 가장자리(테두리) 정점은 변위에서 제외 → 옆면과 빈틈 없이 연결.
export function createWall({
  width = 6,
  height = 24,
  segX = 6,
  segY = 24,
  thickness = 0.6,     // 벽 두께 (box depth)
  depth = 0.32,        // 앞면 Z 변위 범위 — 최대/최소 차를 작게
  irregularity = 0.55, // <1 일수록 값이 양 극단으로 몰려 면 간 깊이 차가 커짐
  detail = 0.25,       // 작은 고주파 디테일 변위 비율
  yOffset = 0,         // 월드 좌표 보정 (mesh position.y와 동일하게)
} = {}) {
  const geometry = new THREE.BoxGeometry(width, height, thickness, segX, segY, 1)
  const pos = geometry.attributes.position
  const frontZ = thickness / 2
  const halfW = width / 2
  const halfH = height / 2
  const EPS = 1e-4

  const vertices = []
  for (let i = 0; i < pos.count; i++) {
    // 앞면 정점만 대상
    if (Math.abs(pos.getZ(i) - frontZ) > EPS) continue

    const x = pos.getX(i)
    const y = pos.getY(i)
    const onBorder =
      Math.abs(Math.abs(x) - halfW) < EPS || Math.abs(Math.abs(y) - halfH) < EPS

    let z = frontZ
    if (!onBorder) {
      const r = Math.random() * 2 - 1 // -1..1
      const base = Math.sign(r) * Math.pow(Math.abs(r), irregularity) * depth
      const fine = (Math.random() * 2 - 1) * depth * detail
      z = frontZ + base + fine
      pos.setZ(i, z)
      // 홀드는 변위된 내부 정점 위에만 올림
      vertices.push(new THREE.Vector3(x, y + yOffset, z))
    }
  }
  geometry.computeVertexNormals()

  return { geometry, vertices }
}

// (x, y)에 가장 가까운 벽 정점의 z를 반환 → 홀드가 기울어진 면 위에 앉도록
export function surfaceZAt(vertices, x, y) {
  let best = 0
  let bestD = Infinity
  for (const v of vertices) {
    const d = (v.x - x) ** 2 + (v.y - y) ** 2
    if (d < bestD) {
      bestD = d
      best = v.z
    }
  }
  return best
}
