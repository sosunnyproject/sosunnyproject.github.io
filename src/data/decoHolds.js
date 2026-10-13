// 벽에 흩뿌리는 장식 홀드용 모델 풀. 절차적 스캐터가 이 중에서 시드 랜덤으로 골라 쓴다.
export const HOLD_MODEL_POOL = [
  '/models/holds/hold_conver_no5.glb',
  '/models/holds/hold_convex_no6.glb',
  '/models/holds/hold_convex_no8.glb',
  '/models/holds/hold_e_m_4v2.glb',
  '/models/holds/hold_e_m_5.glb',
  '/models/holds/hold_phone_fat.glb',
  '/models/holds/hold_phone_small.glb',
  '/models/holds/hold_thb_01_v2.glb',
]

// 장식용(클릭 불가) 모델 클라이밍 홀드 배치 데이터.
// 워크플로우: 먼저 position 으로 위치를 잡고 → rotation 으로 각도를 맞춘다.
//
// position:   [x, y]    → z는 벽 표면에 자동 스냅 (벽이 시드 고정이라 매번 동일)
//             [x, y, z] → z까지 직접 지정
// rotation:   [x, y, z] 라디안. 위치를 잡은 뒤 여기서 각도 조정.
// targetSize: 정규화 크기 (장식은 작게 ~0.5–0.7 권장)
// ⚠️ x는 캐릭터 이동 범위 근처(대략 |x| ≤ 1.3)에 둘 것 — 벽 가장자리 쪽은 비워 둔다.
export const DECO_HOLDS = [
  { url: '/models/holds/hold_conver_no5.glb',   position: [-1.0,  2.2], rotation: [0, 0, 0], targetSize: 0.6 },
  { url: '/models/holds/hold_convex_no6.glb',   position: [ 1.0,  4.3], rotation: [0, 0, 0], targetSize: 0.6 },
  { url: '/models/holds/hold_convex_no8.glb',   position: [-1.1,  6.5], rotation: [0, 0, 0], targetSize: 0.6 },
  { url: '/models/holds/hold_e_m_4v2.glb',      position: [ 0.2,  7.6], rotation: [0, 0, 0], targetSize: 0.6 },
  { url: '/models/holds/hold_e_m_5.glb',        position: [ 1.0,  9.5], rotation: [0, 0, 0], targetSize: 0.6 },
  { url: '/models/holds/hold_mint_big_hold.glb', position: [-1.0, 11.0], rotation: [0, 0, 0], targetSize: 0.6 },
  { url: '/models/holds/hold_phone_fat.glb',    position: [ 1.0, 14.6], rotation: [0, 0, 0], targetSize: 0.6 },
  { url: '/models/holds/hold_phone_small.glb',  position: [-1.0, 15.8], rotation: [0, 0, 0], targetSize: 0.6 },
  { url: '/models/holds/hold_thb_01_v2.glb',    position: [ 0.0, 18.5], rotation: [0, 0, 0], targetSize: 0.6 },
]
