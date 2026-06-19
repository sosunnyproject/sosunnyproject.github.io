// 클라이밍 홀드 = 포트폴리오 카테고리. 위치/회전 등 배치 데이터를 여기 한 곳에서 관리.
//
// position: [x, y]      → z는 벽 표면에 자동 스냅 (벽이 시드 고정이라 매번 동일)
//           [x, y, z]   → z까지 직접 지정 (표면 스냅 무시, 커스텀 깊이)
// rotation: [x, y, z]   라디안. 홀드의 기본 기울기.
// model:    있으면 glTF 모델 홀드로 렌더 (없으면 기본 dodecahedron 홀드)
//   - url        모델 경로
//   - targetSize 정규화 크기
//   - spin       매 프레임 Y축 자동 회전 속도 (라디안/초). 0이면 회전 안 함.
export const CATEGORIES = [
  {
    slug: 'main', label: 'All Work', color: '#e67e22', to: '/portfolio/main',
    position: [-1.4, 3.5, 0.9],
    rotation: [Math.PI/2, 0, 0],
    model: {  
      url: '/models/holds/hold_conver_no5.glb',
      targetSize: 0.8,
    },
  },
  {
    slug: 'games', label: 'Games', color: '#e74c3c', to: '/portfolio/games',
    position: [1.6, 6.0],
    rotation: [0, 0, 0],
    model: {
      url: '/models/cyberfunk-sony-controller.glb',
      targetSize: 1.2,
      spin: 0.4,
      spinAxis: 'z',
    },
  },
  {
    slug: 'graphics', label: 'Creative Technology', color: '#9b59b6', to: '/portfolio/graphics',
    position: [-1.2, 8.8, 0.8],
    rotation: [Math.PI/2, 0, 0],
    model: {
      url: '/models/dj-deck/scene.gltf',
      targetSize: 1.6,
      spin: 0.4,
      spinAxis: 'y',
    },
  },
  {
    slug: 'xr', label: 'XR', color: '#1abc9c', to: '/portfolio/xr',
    position: [1.5, 11.5, 0.6],
    rotation: [Math.PI/10, -Math.PI/2, 0],
    model: {
      url: '/models/apple-vision-pro/scene.gltf',
      targetSize: 1.6,
      spin: 0.9,
      spinAxis: 'x',
    },
  },
  {
    slug: 'web', label: 'Web', color: '#3498db', to: '/portfolio/web',
    position: [-1.5, 13.2],
    rotation: [0, 0, 0],
    model: {
      url: '/models/react-logo/scene.gltf',
      targetSize: 1.2,
      spin: 1.0,
      spinAxis: 'z',
    },
  },
  {
    slug: 'edu', label: 'Education', color: '#f1c40f', to: '/portfolio/edu',
    position: [1.3, 17.0],
    rotation: [Math.PI/2, 0, 0],
    model: {
      url: '/models/apple_keyboard.glb',
      targetSize: 1.2,
      spin: 1.0,
      spinAxis: 'y',
    },
  },
]
