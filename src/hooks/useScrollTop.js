import { useEffect } from 'react'

// A native `window.scrollTo` doesn't inform Lenis's internal scroll state,
// so its own raf loop then "corrects" the page back to its last virtual
// position on the next frame. Route to `lenis.scrollTo` when a Lenis
// instance is active (i.e. not reduced motion) so the reset actually sticks.
export function useScrollTop(dep, lenis) {
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    } else {
      window.scrollTo(0, 0)
    }
  }, [dep, lenis])
}
