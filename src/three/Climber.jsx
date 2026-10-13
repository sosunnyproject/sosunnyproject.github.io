import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { clone as cloneSkinned } from 'three/examples/jsm/utils/SkeletonUtils.js'
import * as THREE from 'three'
import { climbPose } from './climbRoute.js'
import { CLIMBER } from '../data/climber.js'

// 주인공 — progress에 따라 루트를 따라 오른다.
// 클립이 있으면 오른 높이로 scrub (스크롤 멈춤 = 동작 멈춤, 위로 스크롤 = 역재생),
// 없으면(현재 journey-character.glb) 절차적 체중 이동/흔들림.
export function Climber({ progress, config = CLIMBER }) {
  const { url, height, rotation, z, clip, stride, stripRootMotion } = config
  const { scene, animations } = useGLTF(url, true)
  const root = useRef()
  const body = useRef()

  // 클론 + 키 정규화 + 발을 원점에
  const model = useMemo(() => {
    const obj = cloneSkinned(scene)
    obj.traverse((o) => {
      if (o.isMesh) o.castShadow = true
    })
    const box = new THREE.Box3().setFromObject(obj)
    const size = box.getSize(new THREE.Vector3())
    const s = height / (size.y || 1)
    const wrapper = new THREE.Group()
    obj.position.set(-(box.min.x + size.x / 2), -box.min.y, -(box.min.z + size.z / 2))
    wrapper.add(obj)
    wrapper.scale.setScalar(s)
    return wrapper
  }, [scene, height])

  const clips = useMemo(
    () =>
      stripRootMotion
        ? animations.map((c) => {
            const out = c.clone()
            out.tracks = out.tracks.filter((t) => !/hips\.position$/i.test(t.name))
            return out
          })
        : animations,
    [animations, stripRootMotion]
  )
  const { actions, names } = useAnimations(clips, root)
  const clipName = names.find((n) => clip.test(n)) ?? names[0]
  const action = clipName ? actions[clipName] : null

  useEffect(() => {
    if (!action) return
    action.play()
    action.paused = true // 시간은 스크롤이 결정
    return () => action.stop()
  }, [action])

  useFrame(({ clock }) => {
    if (!root.current || !body.current) return
    const { x, y } = climbPose(progress.get())
    root.current.position.set(x, y, z)

    const cycle = y / stride
    if (action) {
      const frac = ((cycle % 1) + 1) % 1
      action.time = frac * action.getClip().duration
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
