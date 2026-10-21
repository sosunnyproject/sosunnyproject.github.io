// 랜딩 스크롤 스토리 — 캐릭터 손이 홀드에 닿으면 화면 상단 1/3에 나타나는 문구.
// 배치(위치/모델)는 categories.js, 텍스트는 여기. ⚠️ 문구는 vitae/포트폴리오 기반 초안 — 직접 다듬을 것.
//
// hold:     CATEGORIES의 slug → 그 홀드의 position을 사용
// position: [x, y] 직접 지정 (장식 홀드 등 카테고리가 아닌 곳에 의미를 붙일 때). hold보다 우선.
// kicker:   작은 머리글 (선택)
// lines:    2–3줄
// city:     이 비트 구간의 배경 도시 (backgrounds.js의 id). 같은 도시가 이어지면 한 장으로 합쳐진다.
//
// ⚠️ 등반 순서는 배열 순서가 아니라 홀드 y 순서(categories.js)로 정해진다 — 둘을 같은 순서로 유지할 것.
export const INTRO = {
  title: 'Write Code, Make Art',
  lines: [
    "Welcome to my adventure.",
    'Scroll to climb. Every hold carries a story.',
  ],
}

export const STORY = [
  {
    hold: 'main',
    city: 'new-york',
    kicker: 'Where it started',
    lines: [
      'I started out as a Theater major at Vassar in New York,',
      'then turned to Media Studies, where storytelling met technology.',
    ],
  },
  {
    hold: 'xr',
    city: 'new-york',
    kicker: 'XR',
    lines: [
      'From a HoloLens hackathon at MIT to Frankenstein in mixed reality,',
      'and now Apple Vision Pro with Unity PolySpatial.',
    ],
  },
  {
    hold: 'web',
    city: 'seoul',
    kicker: 'Web',
    lines: [
      'Back home in Seoul, I worked for B2B and B2C services,',
      'using React, design systems, Java, blockchain, and AR.',
    ],
  },
  {
    hold: 'graphics',
    city: 'seoul',
    kicker: 'Creative Technology',
    lines: [
      'Exhibitions in Seoul taught me to make code you can feel',
      'with p5.js, shaders, Arduino lights, and a interactive 3D on the web.',
    ],
  },
  {
    hold: 'edu',
    city: 'seoul',
    kicker: 'Sharing',
    lines: [
      'I love passing on what I learn:',
      'talks at JSConf Korea and SOSCON, and creative-coding classes.',
    ],
  },
  {
    hold: 'games',
    city: 'los-angeles',
    kicker: 'Games',
    lines: [
      'Now an M.S. Game Design student at USC,',
      'building Unity games and a C++ engine from scratch.',
    ],
  },
]

export const OUTRO = {
  city: 'austin',
  title: 'Top out.',
  lines: ['Thanks for climbing with me!', 'Tap any hold to revisit a chapter, or see everything at once.'],
  cta: { to: '/portfolio/main', label: 'See all work →' },
}
