import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js'
import * as THREE from 'three'
import { climbPose } from './climbRoute.js'
import { CLIMBER } from '../data/climber.js'

const FALLBACK_STRIDE = 0.9
const isHipsPosition = (track) => /hips\.position$/i.test(track.name)

// Hips 이동 트랙의 누적 이동(root motion)만 선형으로 빼서 제자리 루프로 만든다.
// 사이클 안의 흔들림/체중 이동은 유지되고 처음·끝 위치가 같아져 루프 이음매가 없다.
// 반환: 클립 전체 동안의 누적 이동 (Hips 부모 좌표계)
function detrendTrack(track) {
  const { times, values } = track
  const n = times.length
  const t0 = times[0]
  const span = times[n - 1] - t0 || 1
  const drift = new THREE.Vector3().fromArray(values, (n - 1) * 3).sub(new THREE.Vector3().fromArray(values, 0))
  for (let k = 0; k < n; k++) {
    const f = (times[k] - t0) / span
    values[k * 3] -= drift.x * f
    values[k * 3 + 1] -= drift.y * f
    values[k * 3 + 2] -= drift.z * f
  }
  return drift
}

// 주인공 — progress에 따라 루트를 따라 오른다.
// 클립이 있으면 오른 높이로 scrub (스크롤 멈춤 = 동작 멈춤, 위로 스크롤 = 역재생),
// 없으면 절차적 체중 이동/흔들림.
export function Climber({ progress, config = CLIMBER }) {
  const { url, height, rotation, z, clip, reverse, stride, rootMotion } = config
  const { scene, animations } = useGLTF(url, true)
  const root = useRef()
  const body = useRef()

  // 클론 + 키 정규화 + 발을 원점에. root motion 처리 후, 그 이동량으로 stride 자동 계산.
  const { model, clips, rises } = useMemo(() => {
    const obj = cloneSkinned(scene)
    obj.traverse((o) => {
      if (o.isMesh) o.castShadow = true
      if (o.isSkinnedMesh) o.frustumCulled = false // 포즈가 바인드 박스를 벗어나도 잘리지 않게
    })
    obj.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(obj)
    const size = box.getSize(new THREE.Vector3())
    const s = height / (size.y || 1)
    const wrapper = new THREE.Group()
    obj.position.set(-(box.min.x + size.x / 2), -box.min.y, -(box.min.z + size.z / 2))
    wrapper.add(obj)
    wrapper.scale.setScalar(s)

    const rises = {} // 클립 이름 → 한 번 재생 동안 오르내리는 높이 (월드 단위)
    const out = animations.map((c) => {
      if (rootMotion === 'keep') return c
      const copy = c.clone()
      if (rootMotion === 'strip') {
        copy.tracks = copy.tracks.filter((t) => !isHipsPosition(t))
        return copy
      }
      for (const t of copy.tracks) {
        if (!isHipsPosition(t)) continue
        const drift = detrendTrack(t)
        // 누적 이동을 월드(정규화 후) 단위로 변환
        const hips = obj.getObjectByName(THREE.PropertyBinding.parseTrackName(t.name).nodeName)
        if (hips?.parent) {
          drift.applyMatrix3(new THREE.Matrix3().setFromMatrix4(hips.parent.matrixWorld))
          rises[c.name] = Math.abs(drift.y) * s
        }
      }
      return copy
    })
    return { model: wrapper, clips: out, rises }
  }, [scene, animations, height, rootMotion])

  const { actions, names } = useAnimations(clips, root)
  const clipName = names.find((n) => clip.test(n)) ?? names[0]
  const autoStride = rises[clipName]
  // drei의 actions는 root.current가 생긴 뒤(마운트 후)에야 만들어진다 → 렌더 중이 아니라 effect에서 꺼낸다.
  const action = useRef(null)

  useEffect(() => {
    const a = clipName ? actions[clipName] : null
    if (!a) return
    action.current = a
    a.play()
    a.paused = true // 시간은 스크롤이 결정
    return () => {
      a.stop()
      action.current = null
    }
  }, [actions, clipName])

  useFrame(({ clock }) => {
    if (!root.current || !body.current) return
    const { x, y } = climbPose(progress.get())
    root.current.position.set(x, y, z)

    const cycle = y / (stride || autoStride || FALLBACK_STRIDE)
    const a = action.current
    if (a) {
      const frac = ((cycle % 1) + 1) % 1
      a.time = (reverse ? 1 - frac : frac) * a.getClip().duration
      return
    }
    // 절차적 fallback: 한 사이클 = 왼손·오른손 한 번씩
    const phase = cycle * Math.PI * 2
    const breathe = Math.sin(clock.elapsedTime * 1.6) * 0.01
    body.current.rotation.z = Math.sin(phase) * 0.09
    body.current.rotation.x = -0.08 + Math.abs(Math.sin(phase)) * 0.05 // 벽 쪽으로 기댐
    body.current.position.x = Math.sin(phase) * 0.07
    body.current.position.y = -Math.abs(Math.cos(phase)) * 0.05 + breathe
  })

  return (
    <group ref={root}>
      <group ref={body}>
        <group rotation={rotation}>
          <primitive object={model} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(CLIMBER.url, true)
