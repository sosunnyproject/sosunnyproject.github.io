import { useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SECTIONS, sectionOf, yearOf } from './content.js'

export function useTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — sosunny portfolio` : 'sosunny portfolio'
  }, [title])
}

const spring = { type: 'spring', stiffness: 520, damping: 14 }

// 홀드 색 점. hover 시 살짝 "잡히는" 흔들림
export function Hold({ color, size = 10, wiggle = true, className = '', style }) {
  return (
    <motion.span
      aria-hidden="true"
      className={`hold ${className}`}
      style={{ width: size, height: size, background: color, ...style }}
      whileHover={wiggle ? { scale: 1.25, rotate: [0, -14, 12, -6, 0] } : undefined}
      transition={spring}
    />
  )
}

export function Loading() {
  const colors = ['var(--accent)', 'var(--cat-xr)', 'var(--cat-web)']
  return (
    <div className="loading" role="status" aria-label="Loading">
      {colors.map((c, i) => (
        <motion.span
          key={c}
          className="hold"
          style={{ width: 12, height: 12, background: c }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.12, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// 카테고리 칩 — 활성 배경이 layoutId로 미끄러지듯 이동
export function CategoryChips({ active }) {
  const row = useRef(null)
  // 모바일: 활성 칩이 화면 밖이면 가로 스크롤로 보이게
  useEffect(() => {
    const el = row.current?.querySelector('[aria-current="page"]')
    if (!el || !row.current) return
    const r = row.current
    const left = el.offsetLeft - (r.clientWidth - el.offsetWidth) / 2
    r.scrollTo({ left: Math.max(0, left), behavior: 'smooth' })
  }, [active])
  return (
    <div className="chips">
      <div className="wrap">
        <nav className="chips-row" aria-label="Portfolio categories" ref={row}>
          {SECTIONS.map((s) => {
            const isActive = s.slug === active
            return (
              <Link key={s.slug} to={`/portfolio/${s.slug}`} className="chip" aria-current={isActive ? 'page' : undefined}>
                {isActive && <motion.span layoutId="chip-bg" className="chip-bg" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                <Hold color={s.color} />
                {s.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export function PageHead({ color, kicker, kickerColor, title, lead, children }) {
  return (
    <header className="page-head">
      <div className="wrap">
        {color && (
          <motion.div
            className="bar"
            style={{ background: color }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
          />
        )}
        {kicker && (
          <p className="kicker" style={{ color: kickerColor || 'var(--accent-text)' }}>
            {kicker}
          </p>
        )}
        <h1 className="display">{title}</h1>
        {lead && <p className="lead">{lead}</p>}
        {children}
      </div>
    </header>
  )
}

const cardIn = {
  hidden: { opacity: 0, y: 28 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: Math.min(i, 6) * 0.06, ease: [0.2, 0.7, 0.2, 1] } }),
}

export function ProjectCard({ p, i = 0, wide = false, showSection = false, priority = false }) {
  const s = sectionOf(p)
  return (
    <motion.li className={wide ? 'wide' : undefined} variants={cardIn} custom={i} initial="hidden" whileInView="show" viewport={{ once: true, margin: '0px 0px -40px 0px' }}>
      <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 400, damping: 26 }} style={{ height: '100%' }}>
        <Link to={`/portfolio/${p.slug}`} className="card">
          <div className="card-media">
            {p.cover ? (
              <img src={p.cover} alt="" loading={priority ? 'eager' : 'lazy'} decoding="async" />
            ) : (
              <span className="placeholder">{p.title.slice(0, 1)}</span>
            )}
            {showSection && (
              <span className="card-hold">
                <Hold color={s.color} size={9} wiggle={false} />
                {s.label}
              </span>
            )}
          </div>
          <div className="card-body">
            <p className="card-meta">{[yearOf(p.date), p.kicker].filter(Boolean).join(' · ')}</p>
            <h2 className="card-title">
              {p.title}
              <span className="arrow" aria-hidden="true">→</span>
            </h2>
          </div>
        </Link>
      </motion.div>
    </motion.li>
  )
}

// 프로젝트 / 카테고리 하단: 다음 홀드로
export function NextCard({ to, label, title, color, labelColor }) {
  return (
    <motion.div whileHover="hover" initial="rest" animate="rest">
      <Link to={to} className="next-card ghost">
        {color && (
          <motion.span
            aria-hidden="true"
            className="hold"
            style={{ width: 44, height: 44, background: color }}
            variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: [0, -12, 10, 0], scale: 1.08 } }}
            transition={spring}
          />
        )}
        <span>
          <span className="label" style={{ color: labelColor || 'var(--ink-soft)' }}>
            {label}
          </span>
          <span className="title">{title}</span>
        </span>
        <motion.span className="go" aria-hidden="true" variants={{ rest: { y: 0 }, hover: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 0.6 } } }}>
          ↗
        </motion.span>
      </Link>
    </motion.div>
  )
}

export function NavItem({ to, children, match, pathname }) {
  const active = pathname.startsWith(match)
  return (
    <NavLink to={to} aria-current={active ? 'page' : undefined}>
      {children}
      {active && <motion.span layoutId="nav-underline" className="underline" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
    </NavLink>
  )
}
