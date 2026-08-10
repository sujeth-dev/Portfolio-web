import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import Lenis from 'lenis'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { InteractionContext } from './InteractionContext'

const MOBILE_QUERY = '(max-width: 767px)'
const MOUSE_LERP = 0.08
const VELOCITY_LERP = 0.15
const VELOCITY_CEILING = 2000
const EPSILON = 0.0001

const neutralState = {
  scrollProgress: 0,
  scrollVelocity: 0,
  scrollDirection: 'idle',
  mouseX: 0.5,
  mouseY: 0.5,
  currentSection: 'hero',
  isMobile: false,
}

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

function setRootVariables({
  mouseX,
  mouseY,
  scrollVelocity,
  scrollDirection,
  sectionProgress,
}) {
  const root = document.documentElement
  root.style.setProperty('--mouse-x', mouseX.toFixed(4))
  root.style.setProperty('--mouse-y', mouseY.toFixed(4))
  root.style.setProperty('--mouse-x-norm', (mouseX - 0.5).toFixed(4))
  root.style.setProperty('--mouse-y-norm', (mouseY - 0.5).toFixed(4))
  root.style.setProperty(
    '--scroll-vel',
    clamp(Math.abs(scrollVelocity) / VELOCITY_CEILING).toFixed(4),
  )
  root.style.setProperty(
    '--scroll-dir',
    scrollDirection === 'down' ? '1' : scrollDirection === 'up' ? '-1' : '0',
  )
  root.style.setProperty('--section-progress', sectionProgress.toFixed(4))
}

function getSectionMetrics() {
  const sections = [...document.querySelectorAll('[data-section], main section')]

  if (!sections.length) {
    return { currentSection: 'page', sectionProgress: 0 }
  }

  const viewportAnchor = window.innerHeight * 0.5
  const activeSection =
    sections.find((section) => {
      const rect = section.getBoundingClientRect()
      return rect.top <= viewportAnchor && rect.bottom > viewportAnchor
    }) ?? sections.at(-1)
  const rect = activeSection.getBoundingClientRect()
  const currentSection =
    activeSection.dataset.section ||
    activeSection.id ||
    activeSection.classList[0] ||
    'section'

  return {
    currentSection,
    sectionProgress: clamp((viewportAnchor - rect.top) / Math.max(rect.height, 1)),
  }
}

function stateChanged(previous, next) {
  return (
    Math.abs(previous.scrollProgress - next.scrollProgress) > EPSILON ||
    Math.abs(previous.scrollVelocity - next.scrollVelocity) > 0.5 ||
    previous.scrollDirection !== next.scrollDirection ||
    Math.abs(previous.mouseX - next.mouseX) > EPSILON ||
    Math.abs(previous.mouseY - next.mouseY) > EPSILON ||
    previous.currentSection !== next.currentSection ||
    previous.isMobile !== next.isMobile
  )
}

export function InteractionProvider({ children }) {
  const reducedMotion = useReducedMotion()
  const lenisRef = useRef(null)
  const targetMouse = useRef({ x: 0.5, y: 0.5 })
  const currentMouse = useRef({ x: 0.5, y: 0.5 })
  const scrollSample = useRef({ position: 0, time: 0, velocity: 0 })
  const defaultGsapDuration = useRef(gsap.defaults().duration ?? 0.5)
  const [interaction, setInteraction] = useState(neutralState)

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY)
    const updateMobile = () => {
      setInteraction((previous) => ({
        ...previous,
        isMobile: mediaQuery.matches,
      }))
    }

    updateMobile()
    mediaQuery.addEventListener('change', updateMobile)
    return () => mediaQuery.removeEventListener('change', updateMobile)
  }, [])

  useEffect(() => {
    const duration = reducedMotion ? 0 : defaultGsapDuration.current
    gsap.defaults({ duration })

    return () => {
      gsap.defaults({ duration: defaultGsapDuration.current })
    }
  }, [reducedMotion])

  useEffect(() => {
    if (reducedMotion) {
      currentMouse.current = { x: 0.5, y: 0.5 }
      targetMouse.current = { x: 0.5, y: 0.5 }
      scrollSample.current = { position: window.scrollY, time: 0, velocity: 0 }
      setRootVariables({
        mouseX: 0.5,
        mouseY: 0.5,
        scrollVelocity: 0,
        scrollDirection: 'idle',
        sectionProgress: 0,
      })
      setInteraction((previous) => ({
        ...neutralState,
        isMobile: previous.isMobile,
      }))
      return undefined
    }

    const lenis = new Lenis({
      autoRaf: false,
      smoothWheel: true,
    })
    lenisRef.current = lenis
    scrollSample.current = {
      position: lenis.scroll,
      time: 0,
      velocity: 0,
    }

    const handleMouseMove = (event) => {
      targetMouse.current = {
        x: clamp(event.clientX / Math.max(window.innerWidth, 1)),
        y: clamp(event.clientY / Math.max(window.innerHeight, 1)),
      }
    }

    const tick = (time) => {
      lenis.raf(time * 1000)

      const mouse = currentMouse.current
      const target = targetMouse.current
      mouse.x += (target.x - mouse.x) * MOUSE_LERP
      mouse.y += (target.y - mouse.y) * MOUSE_LERP

      const sample = scrollSample.current
      const deltaTime = sample.time ? Math.max(time - sample.time, 1 / 240) : 0
      const rawVelocity = deltaTime ? (lenis.scroll - sample.position) / deltaTime : 0
      sample.velocity += (rawVelocity - sample.velocity) * VELOCITY_LERP
      sample.position = lenis.scroll
      sample.time = time

      if (Math.abs(sample.velocity) < 0.5) {
        sample.velocity = 0
      }

      const scrollDirection =
        sample.velocity > 0 ? 'down' : sample.velocity < 0 ? 'up' : 'idle'
      const { currentSection, sectionProgress } = getSectionMetrics()
      const next = {
        scrollProgress: clamp(lenis.progress),
        scrollVelocity: sample.velocity,
        scrollDirection,
        mouseX: mouse.x,
        mouseY: mouse.y,
        currentSection,
      }

      setRootVariables({
        mouseX: mouse.x,
        mouseY: mouse.y,
        scrollVelocity: sample.velocity,
        scrollDirection,
        sectionProgress,
      })
      setInteraction((previous) =>
        stateChanged(previous, { ...next, isMobile: previous.isMobile })
          ? { ...next, isMobile: previous.isMobile }
          : previous,
      )
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    gsap.ticker.add(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  const value = useMemo(
    () => ({
      lenisRef,
      ...interaction,
      reducedMotion,
    }),
    [interaction, reducedMotion],
  )

  return (
    <InteractionContext.Provider value={value}>
      {children}
    </InteractionContext.Provider>
  )
}
