import { useEffect, useRef, useState } from 'react'
import type { Role } from '../lib/trajectory'

/** A thin band a bit above the middle of the viewport: the role crossing it is the one being read. */
const BAND = '-40% 0px -55% 0px'

/**
 * Reports enter and leave of every element matching `selector` as it crosses a horizontal band of the viewport.
 * IntersectionObserver only: no scroll listener.
 */
function useSpy(selector: string, onChange: (record: IntersectionObserverEntry) => void) {
  const latest = useRef(onChange)
  useEffect(() => {
    latest.current = onChange
  })
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (records) => {
        for (const record of records) latest.current(record)
      },
      { rootMargin: BAND },
    )
    document.querySelectorAll<HTMLElement>(selector).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [selector])
}

/**
 * Which role sits under the reading band, and whether the band is inside the trajectory at all.
 * Roles are described by `data-entry`, `data-year`, `data-org` and `data-period` on `[data-entry]`, and the
 * whole list sits in `[data-track]`.
 */
export function useCurrentRole(first: Role, last: Role) {
  const [current, setCurrent] = useState(first)
  const [live, setLive] = useState(false)

  useSpy('[data-entry]', ({ target, isIntersecting }) => {
    if (!isIntersecting) return
    const { entry, year, org, period } = (target as HTMLElement).dataset
    if (entry && year && org && period) setCurrent({ id: entry, year, org, period })
  })
  // After a jump (anchor, reload) no entry crossed the band: settle on the first or last role by position.
  useSpy('[data-track]', ({ isIntersecting, boundingClientRect }) => {
    setLive(isIntersecting)
    if (!isIntersecting) setCurrent(boundingClientRect.top < 0 ? last : first)
  })

  return { current, live }
}
