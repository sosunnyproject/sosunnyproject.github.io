// 스크롤 진행도(0..1) ↔ 캐릭터 위치/스토리 비트 매핑. React 무관 순수 함수.
// 3D(캐릭터·카메라·안개)와 DOM(텍스트)이 같은 함수를 쓰므로 서로 어긋나지 않는다.
import { CATEGORIES } from '../data/categories.js'
import { STORY, OUTRO } from '../data/story.js'
import { CLIMBER } from '../data/climber.js'
import { makeRng } from './wallGeometry.js'

export const WALL_WIDTH = 5 // 화면을 꽉 채우지 않도록 — 양옆에 배경 여백 확보
export const WALL_HEIGHT = 24
export const WALL_Y = WALL_HEIGHT / 2 - 2 // mesh position.y == 정점 yOffset

const START_Y = 0.2  // 시작 시 발 높이
const TOP_OUT = 1.6  // 마지막 홀드 이후 더 오르는 높이
const SIDE = 0.55    // 홀드 x 쪽으로 붙는 비율 (1 = 홀드 바로 아래)
const ARRIVE = 0.72  // 구간의 이 지점에서 홀드 도달 → 나머지는 매달려 머무름(읽는 시간)
const LINGER = 0.35  // 다음 구간 초반까지 이전 문구 유지

// 스토리 홀드 위치 (y 오름차순)
export const STORY_STOPS = STORY.map((beat) => {
  const cat = beat.hold ? CATEGORIES.find((c) => c.slug === beat.hold) : null
  const [x, y] = beat.position ?? cat?.position ?? [0, 0]
  return { ...beat, x, y }
}).sort((a, b) => a.y - b.y)

// 구간 = 홀드마다 1개 + 탑아웃 1개. 홀드 간격과 무관하게 비트마다 같은 스크롤 분량.
const KEYS = [
  { x: 0, y: START_Y },
  ...STORY_STOPS.map((s) => ({ x: s.x * SIDE, y: s.y - CLIMBER.reach })),
  { x: 0, y: STORY_STOPS[STORY_STOPS.length - 1].y - CLIMBER.reach + TOP_OUT },
]
const SEGMENTS = KEYS.length - 1

// 스크롤 길이 (뷰포트 배수). 구간(홀드 → 홀드)당 PAGES_PER_SEGMENT 화면 + 마지막 화면.
// 키우면 같은 휠 양에 캐릭터가 덜 움직인다 (이동·팔다리 동작 모두 느려짐).
const PAGES_PER_SEGMENT = 1.8
export const SCROLL_PAGES = SEGMENTS * PAGES_PER_SEGMENT + 1

// 배경 도시 구간: 비트 i = 구간 i (그 홀드로 오르는 구간), OUTRO = 마지막 구간.
// 같은 도시가 연속되면 한 구간으로 합친다 → [{ city, range: [start, end] }]
export const CITY_RANGES = [...STORY_STOPS.map((s) => s.city), OUTRO.city].reduce((out, city, i) => {
  const prev = out[out.length - 1]
  if (prev?.city === city) prev.range[1] = (i + 1) / SEGMENTS
  else out.push({ city, range: [i / SEGMENTS, (i + 1) / SEGMENTS] })
  return out
}, [])

// ── 루트 홀드 ──────────────────────────────────────────────────────────────
// 일반 홀드를 캐릭터 경로를 따라 지그재그(좌·우 교대)로 배치한 (x, y) 목록. 모델/회전/z는 ClimbingWall에서.
// 경로 = 몸 중심이 지나는 선 (KEYS를 reach/2 만큼 올림) + 시작 발 높이 ~ 탑아웃 손 높이까지 연장.
// 경로 길이 기준 등간격이라 비스듬한 구간에서도 간격이 일정하다.
const HOLD_STEP = 0.55   // 경로를 따라 홀드 간 거리
const HOLD_SPREAD = 0.4  // 경로 중심에서 좌우로 벌어지는 거리 (몸 폭 ≈ 손발 위치)
const HOLD_CLEAR = 0.8   // 스토리(심볼) 홀드 주변 비우는 반경
const HOLD_JITTER = 0.06 // 자연스럽게 살짝 흐트러뜨림

const LAST = KEYS[KEYS.length - 1]
const PATH = [
  { x: 0, y: START_Y + 0.05 },
  ...KEYS.map((k) => ({ x: k.x, y: k.y + CLIMBER.reach / 2 })),
  { x: LAST.x, y: LAST.y + CLIMBER.reach + 0.3 },
]

export const ROUTE_HOLDS = (() => {
  const rng = makeRng(2024)
  const halfW = WALL_WIDTH / 2 - 0.3
  const out = []
  let side = 1
  let carry = HOLD_STEP / 2 // 구간 경계를 넘어 간격 유지
  for (let i = 0; i < PATH.length - 1; i++) {
    const a = PATH[i]
    const b = PATH[i + 1]
    const dx = b.x - a.x
    const dy = b.y - a.y
    const len = Math.hypot(dx, dy)
    const nx = -dy / len // 진행 방향의 왼쪽 법선
    const ny = dx / len
    let s = carry
    for (; s < len; s += HOLD_STEP) {
      const t = s / len
      const off = HOLD_SPREAD * (0.85 + rng() * 0.3) * side
      const x = Math.max(-halfW, Math.min(halfW, a.x + dx * t + nx * off + (rng() - 0.5) * HOLD_JITTER))
      const y = a.y + dy * t + ny * off + (rng() - 0.5) * HOLD_JITTER
      side = -side // 건너뛰어도 좌우 리듬은 유지
      if (CATEGORIES.some((c) => (c.position[0] - x) ** 2 + (c.position[1] - y) ** 2 < HOLD_CLEAR ** 2)) continue
      out.push({ x, y })
    }
    carry = s - len
  }
  return out
})()

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const easeInOut = (t) => t * t * (3 - 2 * t)

function segmentAt(p) {
  const f = clamp01(p) * SEGMENTS
  const i = Math.min(SEGMENTS - 1, Math.floor(f))
  return { i, t: f - i }
}

// progress → 캐릭터 발 위치
export function climbPose(p) {
  const { i, t } = segmentAt(p)
  const a = KEYS[i]
  const b = KEYS[i + 1]
  const k = easeInOut(Math.min(1, t / ARRIVE))
  return { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k }
}

// progress → 스토리 홀드 성장도 0..1. 손이 홀드 GROW_FROM 아래에 오면 커지기 시작해 도달 순간 1.
// 스크롤로 구동되므로 위로 스크롤하면 다시 작아진다.
const GROW_FROM = 1.8
export function approachAt(p, holdY) {
  const hand = climbPose(p).y + CLIMBER.reach
  return easeInOut(clamp01((hand - (holdY - GROW_FROM)) / GROW_FROM))
}

// progress → 지금 보여줄 텍스트: 'intro' | STORY_STOPS 인덱스 | 'outro' | null(이동 중)
export function beatAt(p) {
  const { i, t } = segmentAt(p)
  const last = SEGMENTS - 1
  if (i === last) return t >= ARRIVE * 0.6 ? 'outro' : t < LINGER ? i - 1 : null
  if (t >= ARRIVE) return i
  if (t < LINGER) return i === 0 ? 'intro' : i - 1
  return null
}
