// 벽 바깥(화면 전체 폭) 배경 레이어 스타일. 스크롤 진행도에 따라 아래로 흐르며 cross-fade.
// 어떤 도시가 어느 구간에 나오는지는 story.js의 각 비트 `city`가 정한다 (climbRoute.CITY_RANGES).
// 현재 순서: New York → Seoul → Los Angeles → Austin. 스토리에서 쓰지 않는 도시는 표시되지 않는다.
//
// src:   이미지 URL. src/background/images/<id>/*.webp 중 하나를 페이지 로드마다 랜덤으로 고른다
//        (새로고침하면 바뀜). 폴더가 비어 있으면 null → 하늘 그라데이션 + 스카이라인 플레이스홀더.
//        이미지 추가/삭제는 폴더에 파일만 넣고 빼면 됨 (Vite glob이 자동 수집, 빌드 시 해시 파일명).
//        원본(Midjourney PNG)은 art-src/backgrounds/에 로컬 보관 — 1232×928 → WebP q80.
// sky:   [위, 아래] 그라데이션 색 — 이미지가 있어도 로딩 전 바탕색으로 사용
// city:  플레이스홀더 스카이라인 실루엣 색
const IMAGES = import.meta.glob('../background/images/*/*.webp', { eager: true, query: '?url', import: 'default' })

// 도시 폴더의 이미지 중 하나를 랜덤으로 (모듈 로드 시 1회 = 페이지 로드마다 새로)
function randomImage(id) {
  const urls = Object.entries(IMAGES)
    .filter(([path]) => path.includes(`/images/${id}/`))
    .map(([, url]) => url)
  return urls.length ? urls[Math.floor(Math.random() * urls.length)] : null
}

export const BACKGROUNDS = [
  { id: 'seoul',      label: 'Seoul',       src: randomImage('seoul'), sky: ['#cfe3f7', '#fbe6d4'], city: '#8fa6bd' },
  { id: 'new-york',   label: 'New York',    src: randomImage('new-york'), sky: ['#bcd6f2', '#f3ece2'], city: '#7d8ea3' },
  { id: 'london',     label: 'London',      src: randomImage('london'), sky: ['#c9d1d9', '#e9e4dc'], city: '#8a8f99' },
  { id: 'los-angeles', label: 'Los Angeles', src: randomImage('los-angeles'), sky: ['#f7c9a3', '#fde9c9'], city: '#b98a7a' },
  { id: 'austin',     label: 'Austin',      src: randomImage('austin'), sky: ['#f2a98b', '#ffdcb5'], city: '#9c6f63' },
]
