import { useEffect, useState } from 'react'

/** Id of the section crossing a thin band near the middle of the viewport (the first one at scroll 0). Pass a stable array. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    // At the very top no section crosses the band yet, but the first one is the one in front of the visitor.
    if (window.scrollY === 0 && ids.length > 0) setActive(ids[0])
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    }
    return () => observer.disconnect()
  }, [ids])

  return active
}
