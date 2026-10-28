import { useEffect } from 'react'

/**
 * Reveals every [data-reveal] element the first time it enters the viewport.
 * CSS hides them only when <html class="js"> is set, so the page stays readable without JavaScript.
 */
export function useReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const targets = document.querySelectorAll('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-in-view', '')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 },
    )
    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [])
}
