// 랜딩(3D 벽)을 제외한 모든 페이지. App.jsx에서 lazy load → 랜딩 번들과 분리.
import { Route, Routes } from 'react-router-dom'
import SiteLayout from './SiteLayout.jsx'
import { Archive, BlogIndex, BlogPost, CV, NotFound, PortfolioHome, PortfolioRoute } from './pages.jsx'

export default function SiteRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="portfolio" element={<PortfolioHome />} />
        <Route path="portfolio/:slug" element={<PortfolioRoute />} />
        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="cv" element={<CV />} />
        <Route path="archive" element={<Archive />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
