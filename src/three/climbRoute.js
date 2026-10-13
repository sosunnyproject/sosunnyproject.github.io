// 스크롤 진행도(0..1) ↔ 캐릭터 위치/스토리 비트 매핑. React 무관 순수 함수.
// 3D(캐릭터·카메라·안개)와 DOM(텍스트)이 같은 함수를 쓰므로 서로 어긋나지 않는다.
import { CATEGORIES } from '../data/categories.js'
import { STORY, OUTRO } from '../data/story.js'
import { CLIMBER } from '../data/climber.js'

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

// 스크롤 길이 (뷰포트 배수) — 구간당 약 1화면
export const SCROLL_PAGES = SEGMENTS + 1

// 배경 도시 구간: 비트 i = 구간 i (그 홀드로 오르는 구간), OUTRO = 마지막 구간.
// 같은 도시가 연속되면 한 구간으로 합친다 → [{ city, range: [start, end] }]
export const CITY_RANGES = [...STORY_STOPS.map((s) => s.city), OUTRO.city].reduce((out, city, i) => {
  const prev = out[out.length - 1]
  if (prev?.city === city) prev.range[1] = (i + 1) / SEGMENTS
  else out.push({ city, range: [i / SEGMENTS, (i + 1) / SEGMENTS] })
  return out
}, [])

// 캐릭터가 좌우로 움직이는 x 범위 (발 기준) — 일반 홀드를 이 근처에만 배치
const ROUTE_XS = KEYS.map((k) => k.x)
export const ROUTE_X = [Math.min(...ROUTE_XS), Math.max(...ROUTE_XS)]

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

// progress → 지금 보여줄 텍스트: 'intro' | STORY_STOPS 인덱스 | 'outro' | null(이동 중)
export function beatAt(p) {
  const { i, t } = segmentAt(p)
  const last = SEGMENTS - 1
  if (i === last) return t >= ARRIVE * 0.6 ? 'outro' : t < LINGER ? i - 1 : null
  if (t >= ARRIVE) return i
  if (t < LINGER) return i === 0 ? 'intro' : i - 1
  return null
}
