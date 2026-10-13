// 벽 바깥(화면 전체 폭) 배경 레이어 스타일. 스크롤 진행도에 따라 아래로 흐르며 cross-fade.
// 어떤 도시가 어느 구간에 나오는지는 story.js의 각 비트 `city`가 정한다 (climbRoute.CITY_RANGES).
// 현재 순서: New York → Seoul → Los Angeles → Austin. 스토리에서 쓰지 않는 도시는 표시되지 않는다.
//
// src:   이미지 경로 (static/backgrounds/<id>.webp 권장). null이면 하늘 그라데이션 + 스카이라인 플레이스홀더.
// sky:   [위, 아래] 그라데이션 색 — 이미지가 있어도 로딩 전 바탕색으로 사용
// city:  플레이스홀더 스카이라인 실루엣 색
export const BACKGROUNDS = [
  { id: 'seoul',      label: 'Seoul',       src: null, sky: ['#cfe3f7', '#fbe6d4'], city: '#8fa6bd' },
  { id: 'new-york',   label: 'New York',    src: null, sky: ['#bcd6f2', '#f3ece2'], city: '#7d8ea3' },
  { id: 'london',     label: 'London',      src: null, sky: ['#c9d1d9', '#e9e4dc'], city: '#8a8f99' },
  { id: 'los-angeles', label: 'Los Angeles', src: null, sky: ['#f7c9a3', '#fde9c9'], city: '#b98a7a' },
  { id: 'austin',     label: 'Austin',      src: null, sky: ['#f2a98b', '#ffdcb5'], city: '#9c6f63' },
]
