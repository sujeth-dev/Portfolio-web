import { useInView } from '../../hooks/useInView'
import { cn } from '../../utils/cn'

export default function ScrollReveal({ children, className, delay = 0 }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      className={cn('reveal', inView && 'visible', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
