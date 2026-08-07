import { useEffect } from 'react'

export function useScrollTop(dep) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [dep])
}
