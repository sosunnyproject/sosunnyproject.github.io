import { useFrame } from '@react-three/fiber'
import { climbPose, WALL_WIDTH } from './climbRoute.js'

const BASE_Z = 7
const WALL_FRONT_Z = 0.5
const SIDE_MARGIN = 0.92 // 세로 화면에서 보장할 벽 폭 비율 (가장자리만 살짝 잘림 — 홀드는 다 보임)
const SUBJECT = 0.7      // 캐릭터 몸 중심 (발 기준)
const LOWER = 0.2        // 몸 중심을 화면 중앙보다 화면 높이의 20% 아래에 → 하단 2/3 안에 위치

// 캐릭터를 따라 올라가는 카메라. progress는 이미 스프링 감쇠된 값이라 그대로 적용.
export function CameraRig({ progress }) {
  useFrame(({ camera, size }) => {
    const { y } = climbPose(progress.get())
    const tanHalf = Math.tan((camera.fov * Math.PI) / 360)
    const aspect = size.width / size.height
    const fitZ = WALL_FRONT_Z + (WALL_WIDTH * SIDE_MARGIN) / 2 / (tanHalf * aspect)
    const z = Math.max(BASE_Z, fitZ)
    const viewH = 2 * (z - WALL_FRONT_Z) * tanHalf
    const camY = y + SUBJECT + viewH * LOWER

    camera.position.set(0, camY, z)
    camera.lookAt(0, camY, 0)
  })
  return null
}
