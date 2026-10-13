// 랜딩 스크롤 스토리 — 캐릭터 손이 홀드에 닿으면 화면 상단 1/3에 나타나는 문구.
// 배치(위치/모델)는 categories.js, 텍스트는 여기. ⚠️ 문구는 vitae/포트폴리오 기반 초안 — 직접 다듬을 것.
//
// hold:     CATEGORIES의 slug → 그 홀드의 position을 사용
// position: [x, y] 직접 지정 (장식 홀드 등 카테고리가 아닌 곳에 의미를 붙일 때). hold보다 우선.
// kicker:   작은 머리글 (선택)
// lines:    2–3줄
export const INTRO = {
  title: 'Write Code, Make Art',
  lines: [
    "Hi, I'm Sunny — I build things where code meets art.",
    'Scroll to climb. Every hold carries a story.',
  ],
}

export const STORY = [
  {
    hold: 'main',
    kicker: 'Where it started',
    lines: [
      'Media Studies at Vassar, a first job in New York,',
      'then home to Seoul to write code for a living.',
    ],
  },
  {
    hold: 'games',
    kicker: 'Games',
    lines: [
      'Now an M.S. Game Design student at USC,',
      'building Unity games and a C++ engine from scratch.',
    ],
  },
  {
    hold: 'graphics',
    kicker: 'Creative Technology',
    lines: [
      'Exhibitions in Seoul taught me to make code you can feel —',
      'p5.js, shaders, Arduino lights, and a 3D Euljiro on the web.',
    ],
  },
  {
    hold: 'xr',
    kicker: 'XR',
    lines: [
      'From a HoloLens hackathon at MIT to Frankenstein in mixed reality,',
      'and now Apple Vision Pro with Unity PolySpatial.',
    ],
  },
  {
    hold: 'web',
    kicker: 'Web',
    lines: [
      'Years of frontend at POSCO ICT and Tripbtoz —',
      'React, design systems, and the craft of shipping.',
    ],
  },
  {
    hold: 'edu',
    kicker: 'Sharing',
    lines: [
      'I love passing on what I learn:',
      'talks at JSConf Korea and SOSCON, and creative-coding classes.',
    ],
  },
]

export const OUTRO = {
  title: 'Top out.',
  lines: ['Thanks for climbing with me. Click any hold, or —'],
  cta: { to: '/portfolio/main', label: 'See all work →' },
}
