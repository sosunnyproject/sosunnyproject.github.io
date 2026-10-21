import { useEffect, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { NavItem } from './ui.jsx'
import { sectionBySlug } from './content.js'
import instagramSVG from '../images/instagram.svg'
import youtubeSVG from '../images/youtube-pixel-perfect.svg'
import githubSVG from '../images/github-pixel-perfect.svg'
import linkedinSVG from '../images/linkedin (1).svg'
import './site.css'

const NAV = [
  { to: '/portfolio/main', match: '/portfolio', label: 'portfolio' },
  // { to: '/blog', match: '/blog', label: 'blog' },
  { to: '/cv', match: '/cv', label: 'cv' },
  { to: '/archive', match: '/archive', label: 'til' },
]

const SOCIAL = [
  { href: 'https://www.instagram.com/sosunnyproject', label: 'Instagram', icon: instagramSVG },
  { href: 'https://www.youtube.com/channel/UCKNXAqIvqc25JJ1CWdayqBA', label: 'YouTube', icon: youtubeSVG },
  { href: 'https://www.github.com/sosunnyproject', label: 'GitHub', icon: githubSVG },
  { href: 'https://www.linkedin.com/in/sosunpark', label: 'LinkedIn', icon: linkedinSVG },
]

// CC-BY 모델 크레딧 (static/models/*/license.txt)
const CREDITS = [
  { title: 'Dora', by: 'littlebillfishing', href: 'https://sketchfab.com/3d-models/dora-bb8d8385212e420e8cb5a54f370eea6c', lic: 'CC BY 4.0' },
  { title: 'Theater Masks', by: 'WilDuo', href: 'https://sketchfab.com/3d-models/happy-and-sad-theater-masks-comedy-and-tragedy-ee0c1240423546f5bd6083873a7144c5', lic: 'CC BY 4.0' },
  { title: 'Apple Vision Pro', by: 'DextonOfficial', href: 'https://sketchfab.com/3d-models/apple-vision-pro-3341d1f3f75e41b59fcedd1f46f03d56', lic: 'CC BY 4.0' },
  { title: 'React logo', by: 'xenadus', href: 'https://sketchfab.com/3d-models/react-logo-76174ceeba96487f9863f974636f641e', lic: 'CC BY 4.0' },
  { title: 'DJ Set', by: 'Milan', href: 'https://sketchfab.com/3d-models/dj-set-dacd1e338270478485e35f8a79d6dc64', lic: 'CC BY-NC-ND 4.0' },
]

function Logo() {
  return (
    <motion.div initial="rest" whileHover="hover" animate="rest">
      <Link to="/" className="logo" aria-label="sosunny portfolio, back to the climbing wall">
        <motion.span
          className="logo-hold"
          initial={{ y: -14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          variants={{ hover: { y: [0, -7, 0], rotate: [0, -20, 0], transition: { duration: 0.45 } } }}
          transition={{ type: 'spring', stiffness: 500, damping: 12 }}
        />
        <span className="logo-text">
          <b>sosunny</b>
          <span>portfolio</span>
        </span>
      </Link>
    </motion.div>
  )
}

function Social() {
  return (
    <div className="social">
      {SOCIAL.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
          <img src={s.icon} alt="" width="18" height="18" />
        </a>
      ))}
    </div>
  )
}

function Header({ pathname }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 4)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap header-row">
        <Logo />
        <nav className="nav" aria-label="Main">
          {NAV.map((n) => (
            <NavItem key={n.to} to={n.to} match={n.match} pathname={pathname}>
              {n.label}
            </NavItem>
          ))}
          <Social />
        </nav>
        <button className="menu-btn" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(true)}>
          <span className="bars" aria-hidden="true">
            <i />
            <i />
          </span>
          menu
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="sheet-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.div
              id="mobile-menu"
              className="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            >
              <div className="sheet-top">
                <Logo />
                <button className="menu-btn" onClick={() => setOpen(false)} autoFocus>
                  close
                </button>
              </div>
              <nav aria-label="Main">
                {NAV.map((n, i) => (
                  <motion.div key={n.to} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }}>
                    <Link to={n.to} aria-current={pathname.startsWith(n.match) ? 'page' : undefined}>
                      {n.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + NAV.length * 0.05 }}>
                  <Link to="/">
                    back to the wall
                    <span aria-hidden="true">↑</span>
                  </Link>
                </motion.div>
              </nav>
              <Social />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-row">
          <span>© {new Date().getFullYear()} sosunnyproject · Write Code, Make Art</span>
          <motion.span initial="rest" whileHover="hover" animate="rest">
            <Link to="/" className="to-wall">
              <span className="holds" aria-hidden="true">
                {['var(--accent)', 'var(--cat-xr)', 'var(--cat-web)'].map((c, i) => (
                  <motion.span
                    key={c}
                    className="hold"
                    style={{ width: 8, height: 8, background: c }}
                    variants={{ hover: { y: [0, -5, 0], transition: { delay: i * 0.08, duration: 0.4 } } }}
                  />
                ))}
              </span>
              climb back to the wall ↑
            </Link>
          </motion.span>
        </div>
        <p className="credits">
          3D models on the wall:{' '}
          {CREDITS.map((c, i) => (
            <span key={c.title}>
              <a href={c.href} target="_blank" rel="noreferrer">
                “{c.title}”
              </a>{' '}
              by {c.by} ({c.lic}){i < CREDITS.length - 1 ? ', ' : '.'}
            </span>
          ))}
        </p>
      </div>
    </footer>
  )
}

export default function SiteLayout() {
  const { pathname } = useLocation()
  // 카테고리끼리 이동할 땐 페이지를 다시 마운트하지 않는다 → 칩 배경이 미끄러지는 애니메이션 유지
  const seg = pathname.split('/').filter(Boolean)
  const pageKey = seg[0] === 'portfolio' && (!seg[1] || sectionBySlug[seg[1]]) ? '/portfolio' : pathname
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <MotionConfig reducedMotion="user">
      <div className="site">
        <a href="#main" className="skip">
          Skip to content
        </a>
        <Header pathname={pathname} />
        <motion.main id="main" key={pageKey} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}>
          <Outlet />
        </motion.main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
