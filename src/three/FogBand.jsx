import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { WALL_WIDTH } from './climbRoute.js'

const FOG_Z = 2.2   // 캐릭터·홀드보다 앞
const BAND = 1 / 3  // 화면 상단 1/3
const FEATHER = 0.35 // 밴드 아래쪽 페이드 폭 (밴드 높이 대비)

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

// 수직 그라데이션 알파 × 흐르는 fbm 노이즈 = 벽 상단을 덮는 구름/안개
const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uDrift;
  uniform float uFeather;
  uniform float uEdge;
  uniform vec3 uColor;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 p = vec2(vUv.x * 3.0, vUv.y * 1.6 + uDrift);
    float n = fbm(p + vec2(uTime * 0.025, 0.0));
    float n2 = fbm(p * 1.7 - vec2(uTime * 0.04, uTime * 0.01));
    float cloud = mix(n, n2, 0.5);

    // 아래쪽: 구름 경계가 노이즈로 울퉁불퉁하게 풀리며 페이드
    float edge = smoothstep(0.0, uFeather, vUv.y + (cloud - 0.5) * 0.25);
    // 좌우: 벽 바깥으로 갈수록 옅게 → 배경 이미지는 살아 있게
    float side = smoothstep(0.0, uEdge, vUv.x) * smoothstep(1.0, 1.0 - uEdge, vUv.x);
    float alpha = edge * side * mix(0.82, 0.98, smoothstep(0.25, 0.75, cloud));

    gl_FragColor = vec4(uColor * mix(0.95, 1.03, cloud), alpha);
  }
`

// 화면 상단 1/3 높이에 맞춰 매 프레임 카메라를 따라가는 안개 plane (벽 폭 + 여유만큼만)
export function FogBand({ color = '#f5f1ea', width = WALL_WIDTH + 2.4 }) {
  const ref = useRef()
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uDrift: { value: 0 },
      uFeather: { value: FEATHER },
      uEdge: { value: 1.2 / width },
      uColor: { value: new THREE.Color(color) },
    }),
    [color, width]
  )

  useFrame(({ camera, clock }) => {
    const mesh = ref.current
    if (!mesh) return
    const viewH = 2 * (camera.position.z - FOG_Z) * Math.tan((camera.fov * Math.PI) / 360)
    const h = viewH * BAND * (1 + FEATHER) + 0.6 // 위쪽은 화면 밖까지 살짝 넘김
    mesh.scale.set(width, h, 1)
    mesh.position.set(0, camera.position.y + viewH / 2 + 0.6 - h / 2, FOG_Z)
    uniforms.uTime.value = clock.elapsedTime
    uniforms.uDrift.value = camera.position.y * 0.12 // 오를수록 구름이 아래로 흘러감
  })

  return (
    <mesh ref={ref} renderOrder={10}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}
