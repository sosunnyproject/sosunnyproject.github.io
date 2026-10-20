import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore.js'
import { STORY_STOPS } from '../three/climbRoute.js'
import { INTRO, OUTRO } from '../data/story.js'
import { Confetti } from './Confetti.jsx'

const card = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  exit: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
}
const line = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, filter: 'blur(4px)', transition: { duration: 0.35, ease: 'easeIn' } },
}

function contentFor(beat) {
  if (beat === 'intro') return { key: 'intro', ...INTRO }
  if (beat === 'outro') return { key: 'outro', ...OUTRO }
  if (typeof beat === 'number' && STORY_STOPS[beat]) return { key: `beat-${beat}`, ...STORY_STOPS[beat] }
  return null
}

// 화면 상단 1/3(안개 영역)의 스토리 텍스트. 비트가 바뀔 때만 리렌더.
export function StoryOverlay() {
  const beat = useStore((s) => s.beat)
  const content = contentFor(beat)

  return (
    <div className="story">
      {/* Top out 도달 시 축하 컨페티 (떠났다가 다시 오면 다시 재생) */}
      {beat === 'outro' && <Confetti />}
      <AnimatePresence mode="wait">
        {content && (
          <motion.div key={content.key} className="story-card" variants={card} initial="hidden" animate="show" exit="exit">
            {content.kicker && (
              <motion.p className="story-kicker" variants={line}>{content.kicker}</motion.p>
            )}
            {content.title && (
              <motion.h1 className="story-title" variants={line}>{content.title}</motion.h1>
            )}
            {content.lines.map((text, i) => (
              <motion.p key={i} className="story-line" variants={line}>{text}</motion.p>
            ))}
            {content.cta && (
              <motion.div variants={line}>
                <Link className="story-cta" to={content.cta.to}>{content.cta.label}</Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 스크린리더·크롤러용: 전체 스토리를 한 번에 */}
      <ol className="sr-only">
        {[INTRO, ...STORY_STOPS, OUTRO].map((b, i) => (
          <li key={i}>{[b.title ?? b.kicker, ...b.lines].join(' ')}</li>
        ))}
      </ol>
    </div>
  )
}
