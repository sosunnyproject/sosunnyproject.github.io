// 일반(장식) 클라이밍 홀드 모델 카탈로그. 개발 서버에서 /dev/holds 로 전부 벽에 붙여 확인할 수 있다 (HoldLab).
//
// mount: 모델을 벽에 붙이는 방법. 원본 모델마다 축이 달라서 모델별로 지정.
//   'floor' — 바닥에 놓인 모델 (얇은 축이 Y, 바닥면 -Y) → X +90°로 세워 바닥면을 벽에 붙임
//   'wall'  — 이미 벽을 향한 모델 (얇은 축이 Z, 바닥면 -Z) → 그대로
// pool:  true면 루트 홀드(climbRoute.ROUTE_HOLDS) 자리마다 시드 랜덤으로 골라 쓰는 후보에 포함.
//        ⚠️ 모델 하나당 0.8–4.5MB라 늘리면 랜딩 로딩이 무거워진다.
// 회전(벽 법선 기준)·크기·z(뒷면이 표면에 닿게)는 자동.
export const HOLD_MODELS = [
  { url: '/models/holds/hold_conver_no5.glb',    mount: 'floor', pool: true },
  { url: '/models/holds/hold_convex_no6.glb',    mount: 'floor', pool: true },
  { url: '/models/holds/hold_convex_no8.glb',    mount: 'floor', pool: true },
  { url: '/models/holds/hold_e_m_4v2.glb',       mount: 'wall',  pool: true },
  { url: '/models/holds/hold_e_m_5.glb',         mount: 'wall',  pool: true },
  { url: '/models/holds/hold_mint_big_hold.glb', mount: 'floor', pool: false },
  { url: '/models/holds/hold_phone_big.glb',     mount: 'wall',  pool: false },
  { url: '/models/holds/hold_phone_fat.glb',     mount: 'floor', pool: true },
  { url: '/models/holds/hold_phone_small.glb',   mount: 'floor', pool: true },
  { url: '/models/holds/hold_side_green.glb',    mount: 'wall',  pool: false },
  { url: '/models/holds/hold_thb_01_v2.glb',     mount: 'wall',  pool: true },
  { url: '/models/holds/hold_under_gray.glb',    mount: 'wall',  pool: false },
  { url: '/models/holds/hold_under_mint.glb',    mount: 'floor', pool: false },
  { url: '/models/holds/hold_under_red.glb',     mount: 'wall',  pool: false },
  { url: '/models/holds/hold_yellow_big.glb',    mount: 'floor', pool: false },
  { url: '/models/holds/hold_yellow_curved.glb', mount: 'floor', pool: false },
  { url: '/models/holds/hold_yellow_small.glb',  mount: 'floor', pool: false },
]

export const HOLD_MODEL_POOL = HOLD_MODELS.filter((m) => m.pool)

// 수동 배치 홀드 (선택). 루트 홀드 외에 특정 위치에 직접 놓고 싶을 때만 추가.
// position:   [x, y]    → z는 벽 표면에 자동 스냅
//             [x, y, z] → z까지 직접 지정
// rotation:   [x, y, z] 라디안
// targetSize: 정규화 크기 (~0.4–0.6)
// 예) { url: '/models/holds/hold_conver_no5.glb', position: [0.4, 9.0], rotation: [Math.PI / 2, 0, 0], targetSize: 0.5 },
export const DECO_HOLDS = []
