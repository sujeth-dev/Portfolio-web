import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Work from './pages/Work'
import ProjectPage from './pages/ProjectPage'
import Lab from './pages/Lab'
import About from './pages/About'
import NotFound from './pages/NotFound'
import { useScrollTop } from './hooks/useScrollTop'

export default function App() {
  const location = useLocation()
  useScrollTop(location.pathname)

  return (
    <>
      <Nav />
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
    </>
  )
}
