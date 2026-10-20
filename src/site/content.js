// 콘텐츠 인덱스 — vite-plugin-content.js가 마크다운을 meta/post 모듈로 변환한다.
import { CATEGORIES } from '../data/categories.js'

const portfolioMeta = import.meta.glob('/content/portfolio/*/index.md', { query: '?meta', eager: true, import: 'default' })
const portfolioPost = import.meta.glob('/content/portfolio/*/index.md', { query: '?post', import: 'default' })
const blogMeta = import.meta.glob('/content/blog/*/index.md', { query: '?meta', eager: true, import: 'default' })
const blogPost = import.meta.glob('/content/blog/*/index.md', { query: '?post', import: 'default' })

const byOrderThenDate = (a, b) => a.order - b.order || b.date.localeCompare(a.date)
const byDateDesc = (a, b) => b.date.localeCompare(a.date)

// 기존 사이트와 같은 규칙: category === 'portfolio'인 글만 공개
export const projects = Object.values(portfolioMeta)
  .filter((p) => p.category === 'portfolio')
  .sort(byDateDesc)

export const posts = Object.values(blogMeta)
  .filter((p) => p.category === 'blog')
  .sort(byDateDesc)

// 벽의 홀드와 같은 색·이름. 'main'(Theater 홀드)은 대표작 모음.
const WALL = Object.fromEntries(CATEGORIES.map((c) => [c.slug, c]))
export const SECTIONS = [
  { slug: 'main', label: 'Featured', color: WALL.main?.color ?? '#e67e22', text: 'var(--accent-text)', on: 'var(--ink)',
    blurb: 'A few climbs I keep coming back to — games, XR, graphics and teaching.' },
  { slug: 'games', label: 'Games', color: WALL.games?.color, text: 'var(--cat-games-text)', on: 'var(--ink)',
    blurb: 'Engines, web 3D worlds and apps — things you play or poke at.' },
  { slug: 'graphics', label: WALL.graphics?.label ?? 'Creative Technology', color: WALL.graphics?.color, text: 'var(--cat-graphics-text)', on: '#fff',
    blurb: 'Exhibitions, creative coding and 3D — shaders, light and form.' },
  { slug: 'xr', label: 'XR', color: WALL.xr?.color, text: 'var(--cat-xr-text)', on: 'var(--ink)',
    blurb: 'VR, AR and spatial computing, from hackathons to Vision Pro.' },
  { slug: 'web', label: 'Web', color: WALL.web?.color, text: 'var(--cat-web-text)', on: 'var(--ink)',
    blurb: 'Front-end work and the sites behind the art.' },
  { slug: 'edu', label: 'Education', color: WALL.edu?.color, text: 'var(--cat-edu-text)', on: 'var(--ink)',
    blurb: 'Talks, workshops and classes — teaching code as a creative tool.' },
]
export const sectionBySlug = Object.fromEntries(SECTIONS.map((s) => [s.slug, s]))

export function projectsIn(slug) {
  if (slug === 'main') return projects.filter((p) => p.featured).sort(byOrderThenDate)
  return projects.filter((p) => p.subcategory === slug).sort(byOrderThenDate)
}

export const sectionOf = (p) => sectionBySlug[p.subcategory] ?? sectionBySlug.main

export const findProject = (slug) => projects.find((p) => p.slug === slug)
export const findPost = (slug) => posts.find((p) => p.slug === slug)

export function loadProject(slug) {
  const key = `/content/portfolio/${slug}/index.md`
  return portfolioPost[key] ? portfolioPost[key]() : Promise.resolve(null)
}
export function loadPost(slug) {
  const key = `/content/blog/${slug}/index.md`
  return blogPost[key] ? blogPost[key]() : Promise.resolve(null)
}

export const yearOf = (d) => (d ? String(d).slice(0, 4) : '')
export function formatDate(d) {
  if (!d) return ''
  const [y, m, day] = String(d).split('-').map(Number)
  if (!y || !m) return String(d)
  const dt = new Date(Date.UTC(y, m - 1, Math.min(day || 1, 28)))
  return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', timeZone: 'UTC' })
}

// 한글이 들어간 글은 에세이 서체로
export const isKorean = (s = '') => /[가-힣]/.test(s)
