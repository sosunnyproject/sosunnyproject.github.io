import * as THREE from 'three'

// 결정론적 PRNG (mulberry32). 같은 seed → 항상 같은 난수열 →
// 새로고침해도 벽 굴곡·홀드 z가 고정된다.
export function makeRng(seed) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

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
  seed = 1337,         // 고정 시드 → 새로고침해도 동일한 벽 굴곡
} = {}) {
  const rng = makeRng(seed)
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
      const r = rng() * 2 - 1 // -1..1
      const base = Math.sign(r) * Math.pow(Math.abs(r), irregularity) * depth
      const fine = (rng() * 2 - 1) * depth * detail
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

// 벽 앞면의 정확한 표면 z를 구하는 샘플러 (레이캐스트). 정점 사이 기울어진 면 위에도 홀드가 정확히 앉는다.
// geometry는 createWall 결과, yOffset은 mesh position.y와 동일하게.
export function createSurfaceSampler(geometry, yOffset = 0) {
  const mesh = new THREE.Mesh(geometry)
  mesh.position.y = yOffset
  mesh.updateMatrixWorld(true)
  const ray = new THREE.Raycaster()
  const origin = new THREE.Vector3()
  const dir = new THREE.Vector3(0, 0, -1)
  const at = (x, y) => {
    ray.set(origin.set(x, y, 10), dir)
    const hit = ray.intersectObject(mesh, false)[0]
    return hit ? hit.point.z : 0
  }
  // 반경 r 원 안(중심 + 둘레 8점 + 중간 8점)에서 가장 튀어나온 표면 z.
  // 홀드 뒷면을 여기에 맞추면 굴곡진 면 위에서도 벽을 파고들지 않는다.
  at.max = (x, y, r) => {
    let z = at(x, y)
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2
      for (const k of [0.5, 1]) z = Math.max(z, at(x + Math.cos(a) * r * k, y + Math.sin(a) * r * k))
    }
    return z
  }
  return at
}
