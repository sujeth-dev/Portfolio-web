import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/layout/Nav'
import CompactHeader from './components/layout/CompactHeader'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Work from './pages/Work'
import ProjectPage from './pages/ProjectPage'
import Lab from './pages/Lab'
import About from './pages/About'
import NotFound from './pages/NotFound'
import { useScrollTop } from './hooks/useScrollTop'
import { InteractionProvider } from './systems/InteractionProvider'
import { getBySlug } from './data/projects'

function getFeaturedProject(pathname) {
  if (!pathname.startsWith('/work/')) return null

  const project = getBySlug(pathname.slice('/work/'.length))
  return project?.tier === 'featured' ? project : null
}

function getPageTitle(pathname) {
  if (pathname === '/') return 'Sujeth A S — Software Engineer'
  if (pathname === '/work') return 'Work — Sujeth A S'
  if (pathname === '/lab') return 'Lab — Sujeth A S'
  if (pathname === '/about') return 'About — Sujeth A S'
  const project = getFeaturedProject(pathname)
  if (project) return `${project.name} — Sujeth A S`
  return 'Page Not Found — Sujeth A S'
}

export default function App() {
  const location = useLocation()
  const activeProject = getFeaturedProject(location.pathname)
  useScrollTop(location.pathname)

  useEffect(() => {
    document.title = getPageTitle(location.pathname)
  }, [location.pathname])

  return (
    <InteractionProvider>
      {activeProject ? (
        <CompactHeader
          breadcrumb={`WORK / ${activeProject.name.toUpperCase()}`}
          accent={activeProject.visual?.accent || 'var(--red)'}
        />
      ) : (
        <Nav />
      )}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </InteractionProvider>
  )
}
