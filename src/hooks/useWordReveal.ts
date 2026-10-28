import { useEffect, type RefObject } from 'react'

const STAGGER_MS = 60

/**
 * Activates each [data-word] inside the container once it has crossed a trigger line at 65% of the viewport,
 * one after another in reading order. A word that sits below the line again (scrolling back up) goes muted.
 * Words that are already above the line on load, for example after a hash jump, activate too.
 */
export function useWordReveal(container: RefObject<HTMLElement>) {
  useEffect(() => {
    const root = container.current
    if (!root || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      (entries) => {
        const index = (entry: IntersectionObserverEntry) => Number((entry.target as HTMLElement).dataset.word)
        let step = 0

        for (const entry of [...entries].sort((a, b) => index(a) - index(b))) {
          const word = entry.target as HTMLElement
          const crossed = entry.boundingClientRect.top < (entry.rootBounds?.bottom ?? window.innerHeight)
          if (crossed) {
            word.style.transitionDelay = `${step++ * STAGGER_MS}ms`
            word.setAttribute('data-active', '')
          } else {
            word.style.transitionDelay = '0ms'
            word.removeAttribute('data-active')
          }
        }
      },
      { rootMargin: '0px 0px -35% 0px' },
    )

    root.querySelectorAll('[data-word]').forEach((word) => observer.observe(word))
    return () => observer.disconnect()
  }, [container])
}
