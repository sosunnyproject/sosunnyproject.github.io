// 주인공 캐릭터 설정.
// dora-climbing-down.glb = Dora(Sketchfab, CC-BY-4.0) + Mixamo 리깅 + 'Climbing Down' 클립 (1개, 4.05초 = 2 사이클).
// 클립을 오른 높이로 scrub 한다 (§15.4). 내려가는 클립이라 reverse로 역재생 → 오르는 동작.
export const CLIMBER = {
  url: '/models/dora-climbing-down.glb',
  animUrl: null,              // 클립만 담긴 glb (Mixamo 'Without Skin' 등). 있으면 url 모델에 이 파일의 클립을 입힌다 (본 이름으로 바인딩)
  height: 1.4,                // 월드 단위 키 (바운딩박스 높이로 정규화)
  rotation: [0, Math.PI, 0],  // 벽을 바라보게 — 등이 카메라 쪽
  z: 1.35,                    // 몸 중심의 z (벽 앞면 ~0.35–0.7, 홀드 ~0.9)
  reach: 1.2,                 // 발 → 뻗은 손끝 높이. 이 높이가 홀드에 닿으면 '도달'
  clip: /climb|mixamo/i,      // 사용할 클립 이름 패턴 (없으면 첫 클립)
  reverse: true,              // 클립을 거꾸로 재생 (climbing down → up)
  stride: null,               // 클립 한 번 재생 동안 오르는 높이. null = 클립의 root motion에서 자동 계산
  strideScale: 3.2,           // stride 배율. 1 = 손발이 벽에 딱 붙음(동작이 빠름), 클수록 같은 높이에 동작이 느긋해짐(약간 미끄러짐)
  rootMotion: 'detrend',      // Hips 이동 트랙 처리: 'detrend' = 누적 이동만 제거(흔들림 유지) | 'strip' = 트랙 제거 | 'keep'
  // 머티리얼 보정. Blender glTF export가 alphaMode BLEND(→ 깊이 정렬 깨짐)와 metallic 누락(→ 기본값 1, 어둡고 번들거림)을 남김.
  // opaque: 불투명 + depthWrite 강제 / metalness·roughness: 덮어쓸 값 (undefined면 유지)
  material: { opaque: true, metalness: 0, roughness: 0.85 },
}
