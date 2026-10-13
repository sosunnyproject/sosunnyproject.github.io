// 주인공 캐릭터 설정.
// ⚠️ journey-character.glb는 스켈레톤/애니메이션이 없는 정적 메시 → 절차적 흔들림으로 대체 재생.
// Mixamo 등에서 리깅 + 'Climbing' 클립을 넣은 glb로 url만 바꾸면 클립을 스크롤로 scrub 한다 (§15.4).
export const CLIMBER = {
  url: '/models/journey-character.glb',
  height: 1.4,                // 월드 단위 키 (바운딩박스 높이로 정규화)
  rotation: [0, Math.PI, 0],  // 벽을 바라보게 — 등이 카메라 쪽
  z: 1.35,                    // 몸 중심의 z (벽 앞면 ~0.35–0.7, 홀드 ~0.9)
  reach: 1.2,                 // 발 → 뻗은 손끝 높이. 이 높이가 홀드에 닿으면 '도달'
  clip: /climb/i,             // 리깅 모델일 때 사용할 클립 이름 패턴 (없으면 첫 클립)
  stride: 0.9,                // 클립 한 사이클 동안 오르는 높이
  stripRootMotion: true,      // Mixamo 'Hips.position' 트랙 제거 (In Place가 아닌 클립 대비)
}
