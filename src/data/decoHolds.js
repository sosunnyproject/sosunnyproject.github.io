// 일반(장식) 클라이밍 홀드 모델 카탈로그. 개발 서버에서 /dev/holds 로 전부 벽에 붙여 확인할 수 있다 (HoldLab).
// 모양별 파일 1개만 두고 색은 코드에서 칠한다 (같은 모델의 색만 다른 복사본은 삭제함).
// 파일은 gltf-transform으로 Draco + WebP(512) + simplify 0.5 압축 (10개 합계 ≈ 0.8MB, 이전 17개 ≈ 28MB).
//
// mount: 모델을 벽에 붙이는 방법. 원본 모델마다 축이 달라서 모델별로 지정.
//   'floor' — 바닥에 놓인 모델 (얇은 축이 Y, 바닥면 -Y) → X +90°로 세워 바닥면을 벽에 붙임
//   'wall'  — 이미 벽을 향한 모델 (얇은 축이 Z, 바닥면 -Z) → 그대로
// pool:  true면 루트 홀드(climbRoute.ROUTE_HOLDS) 자리마다 시드 랜덤으로 골라 쓰는 후보에 포함.
// paint: 팔레트 색을 칠할 머티리얼 이름 → 밝기 배율 (1 = 팔레트 색 그대로, 0.55 = 어둡게). '*' = 모든 머티리얼.
//        칠한 머티리얼은 텍스처를 떼고 단색·무광(metalness 0)이 된다 — 텍스처 × 색 곱셈으로 원래 색이 섞이는 것 방지.
//        목록에 없는 머티리얼은 원래 색 유지.
// 회전(벽 법선 기준)·크기·z(뒷면이 표면에 닿게)는 자동.
const VOLUME = { 'Plastic_-_Textured_-_Regular': 1, 'Rilsan_Invent_Natural_-_PA_11': 0.55, 'Steel_-_Satin': 0.55 } // 몸체 + 어두운 받침/볼트
const SOLID = { '*': 1 }

export const HOLD_MODELS = [
  { url: '/models/holds/hold_conver_no5.glb',    mount: 'floor', pool: true, paint: VOLUME },
  { url: '/models/holds/hold_convex_no6.glb',    mount: 'floor', pool: true, paint: VOLUME },
  { url: '/models/holds/hold_convex_no8.glb',    mount: 'floor', pool: true, paint: VOLUME },
  { url: '/models/holds/hold_e_m_4v2.glb',       mount: 'wall',  pool: true, paint: SOLID },
  { url: '/models/holds/hold_e_m_5.glb',         mount: 'wall',  pool: true, paint: SOLID },
  { url: '/models/holds/hold_mint_big_hold.glb', mount: 'floor', pool: true, paint: SOLID },
  { url: '/models/holds/hold_phone_big.glb',     mount: 'wall',  pool: true, paint: SOLID },
  { url: '/models/holds/hold_phone_fat.glb',     mount: 'floor', pool: true, paint: SOLID },
  { url: '/models/holds/hold_phone_small.glb',   mount: 'floor', pool: true, paint: SOLID },
  { url: '/models/holds/hold_thb_01_v2.glb',     mount: 'wall',  pool: true, paint: SOLID },
]

export const HOLD_MODEL_POOL = HOLD_MODELS.filter((m) => m.pool)

// 루트 홀드 색 팔레트 — 홀드마다 시드 랜덤 (바로 앞 홀드와 같은 색은 피함). 베이지 벽 위에서 잘 보이는 색 위주.
export const HOLD_PALETTE = ['#e4572e', '#f3a712', '#29a36a', '#2e86de', '#8e44ad', '#ff7eb6', '#17bebb', '#2d3142']

// 수동 배치 홀드 (선택). 루트 홀드 외에 특정 위치에 직접 놓고 싶을 때만 추가.
// position:   [x, y]    → z는 벽 표면에 자동 스냅
//             [x, y, z] → z까지 직접 지정
// rotation:   [x, y, z] 라디안
// targetSize: 정규화 크기 (~0.4–0.6)
// 예) { url: '/models/holds/hold_conver_no5.glb', position: [0.4, 9.0], rotation: [Math.PI / 2, 0, 0], targetSize: 0.5 },
export const DECO_HOLDS = []
