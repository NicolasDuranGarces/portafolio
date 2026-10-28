import { Fragment, useRef } from 'react'
import { homeCopy } from '../content/home'
import { useWordReveal } from '../hooks/useWordReveal'
import type { Lang } from '../lib/lang'

/** Large type moment: words turn from muted to full color one by one as they cross the trigger line. */
export function Tagline({ lang }: { lang: Lang }) {
  const { label, text } = homeCopy[lang].tagline
  const paragraph = useRef<HTMLParagraphElement>(null)
  useWordReveal(paragraph)
  const words = text.split(' ')

  return (
    <section aria-label={label} className="py-20 md:py-24">
      <div className="wrap">
        <p ref={paragraph} className="max-w-[680px] text-4xl font-semibold tracking-tight text-balance md:text-5xl">
          {words.map((word, index) => (
            <Fragment key={index}>
              <span data-word={index}>{word}</span>
              {index < words.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </p>
      </div>
    </section>
  )
}
