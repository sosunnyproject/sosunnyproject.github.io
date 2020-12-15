---
category: 'blog'
title: '[p5js] Leap Motion Getting Started'
date: '2020-05-30'
---

# 1. Set up

- 브라우저 html 파일에 leap motion API & leapJS plugins 추가하기
- [LeapJS-plugins](https://github.com/leapmotion/leapjs-plugins)으로 LeapJS API 를 좀 더 손쉽게 이용가능하다.
- LeapJS-plugins 사용에 대한 자세한 예시들은 [여기](http://leapmotion.github.io/leapjs-plugins/docs/)를 참조하면 된다.

```html
<!-- production -->
<script src="https://js.leapmotion.com/leap-0.6.4.min.js"></script>
<script src="//js.leapmotion.com/leap-plugins-0.1.12.min.js"></script>
<!-- development -->
<script src="https://js.leapmotion.com/leap-0.6.4.js"></script>
<script src="//js.leapmotion.com/leap-plugins-0.1.12.js"></script>
```

- npm 설치도 가능

```bash
$ npm install leapjs -v0.6.4
```

# 2. [Getting Started](https://developer-archive.leapmotion.com/getting-started/javascript)

## Frames

LeapJS 는 로컬의 Leap Service (하드웨어와 연동되는 leap motion 전용 소프트웨어를 지칭하는 것 같다)에서 제공되는 웹소켓 서비스와 연결되어 작동한다. 매 10밀리세컨드마다 서비스가 frame을 웹소켓을 통해 전달한다. 이 frame은 손과 손가락의 위치 데이터를 가지고 있는 JSON 데이터 뭉치이다. 

브라우저는 매 16밀리세컨드(60Hz)마다 화면을 다시 그리기 때문에 deviceFrames 데이트는 바로, 완전 실시간으로 사용되지는 않는다. 10ms 와 16ms 사이의 갭은 브라우저 자체의 animation loop 이 그려주는 animation frames 이 채워준다. 

frame data 를 접근하는 가장 쉬운 방법은 Leap Loop 함수이다. 
- [loop(option, callback)](https://developer-archive.leapmotion.com/documentation/javascript/api/Leap_Classes.html#leap-namespace)
  - **callback** 
    - 클라이언트 브라우저에서 보통 60초마다 호출된다.
    - 가장 최근의 Leap data 가 callback 함수로 전달된다.
    - 브라우저가 스크린에 그릴 수 있을 때에 호출된다.
  - **option**
    - host: 127.0.0.1
    - port: 6437
    - background: true (application이 foreground 상태가 아니여도 계속 frames 를 받고 싶다면 true로 설정하기)
    - optimizeHMD: true (VR 기기같은 HMD 에 립모션이 제대로 mount 되면 true)
    - frameEventName: **animationFrame** (디폴트 / 브라우저 60fps) or **deviceFrame** (기기에 따라 20-200fps 사이)
    - useAllPlugins: 디폴트는 false, [plugins](https://github.com/leapmotion/leapjs/wiki/plugins)
    - loopWhileDisconnected: 디폴트는 true; animation frame loop 이 계속해서 실행된다. 새로운 frame data가 있을 때만 animation loop 을 작동시키고 싶다면 false 로 설정할 수 있지만, 애니메이션이 느려지거나 중간중간 멈출 수 있다.

## Frame Objects : frame data JSON object

- 손가락 하나하나 따로 접근 가능: thumb ~ pinky
- 손바닥 및 손바닥 아래 관절: carpal
- 한 손가락의 각 마디도 데이터 접근 가능: distal (top) - medial (middle) - proximal (bottom)
- 길이, 속도, timeVisible, rotationMatrix 등의 데이터 가능
- [class Hand()](https://developer-archive.leapmotion.com/documentation/javascript/api/Leap.Hand.html) : The Hand class reports the physical characteristics of a detected hand.
  - Hand tracking data includes a palm position and velocity; vectors for the palm normal and direction to the fingers; properties of a sphere fit to the hand; and lists of the attached fingers.
- [class Pointable()](https://developer-archive.leapmotion.com/documentation/javascript/api/Leap.Pointable.html) : The Pointable class reports the physical characteristics of a detected finger.

```json
LeapFrame = {
  hands: [
    {
      palmPosition: [x,y,z]
      palmNormal: [x,y,z]
      direction: [x,y,z]
      roll()
      pitch()
      yaw()
      pinchStrength: 0-1
      grabStrength:  0-1
      fingers: [
        {
          tipPosition: [x,y,z]
          direction: [x,y,z]
          bones: [
            {
              prevJoint: [x,y,z]
              nextJoint: [x,y,z]
              length: mm
              width:  mm
              center()
              matrix()
            }
          ]
        }
      ]
    }
  ]
}
```

console.log

```json
b.exports
arm: b.exports
  basis: (3) [Array(3), Array(3), Array(3)]
  finger: b.exports {id: 45, palmPosition: Array(3), direction: Array(3), palmVelocity: Array(3), palmNormal: Array(3), …}
  length: 204.375890741276
  nextJoint: (3) [-34.0754, 136.563, 31.9857]
  prevJoint: (3) [-41.612, 80.0318, 228.243]
  type: 4
  width: 48.2327
  _center: null
  _matrix: null
  __proto__: Object
confidence: 0
direction: (3) [0.0675656, 0.117649, -0.990754]
fingers: (5) [b.exports, b.exports, b.exports, b.exports, b.exports]
frame: b.exports {valid: true, id: 25871, timestamp: 10330365634, hands: Array(1), handsMap: {…}, …}
grabStrength: 0
id: 45
indexFinger: b.exports {valid: true, id: 451, handId: 45, length: 44.5142, tool: false, …}
middleFinger: b.exports {valid: true, id: 452, handId: 45, length: 50.7203, tool: false, …}
palmNormal: (3) [0.22329, -0.969618, -0.0999114]
palmPosition: (3) [-24.9726, 139.439, -8.3086]
palmVelocity: (3) [1.19209e-7, 1.19209e-7, 1.19209e-7]
pinchStrength: 0
pinky: b.exports {valid: true, id: 454, handId: 45, length: 38.234, tool: false, …}
pointables: Array(5)
0: b.exports {valid: true, id: 450, handId: 45, length: 39.4493, tool: false, …}
1: b.exports {valid: true, id: 451, handId: 45, length: 44.5142, tool: false, …}
2: b.exports {valid: true, id: 452, handId: 45, length: 50.7203, tool: false, …}
3: b.exports {valid: true, id: 453, handId: 45, length: 48.7689, tool: false, …}
4: b.exports {valid: true, id: 454, handId: 45, length: 38.234, tool: false, …}
length: 5
__proto__: Array(0)
ringFinger: b.exports {valid: true, id: 453, handId: 45, length: 48.7689, tool: false, …}
sphereCenter: (3) [-65.6435, 376.761, -49.435]
sphereRadius: 243.965
stabilizedPalmPosition: (3) [-24.9726, 139.439, -8.3086]
thumb: b.exports {valid: true, id: 450, handId: 45, length: 39.4493, tool: false, …}
timeVisible: 0
tools: []
type: "left"
valid: true
_rotation: (9) [1, 1.04083e-18, -1.55431e-16, -1.04083e-18, 1, 2.22045e-17, 1.55431e-16, -2.22045e-17, 1]
_scaleFactor: 1
_translation: (3) [0, 0, 0]
__proto__: Object
```