import { act, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MockIntersectionObserver } from '../test/intersection'
import { Tagline } from './Tagline'

function words(container: HTMLElement) {
  return [...container.querySelectorAll<HTMLElement>('[data-word]')]
}

function observerOf(word: HTMLElement) {
  return MockIntersectionObserver.watching(word)[0]
}

describe('Tagline word reveal', () => {
  it('keeps the whole sentence readable text, one word per span', () => {
    const { container } = render(<Tagline lang="en" />)
    expect(container.querySelector('p')).toHaveTextContent(
      'I design systems that keep working when volume grows and nobody is watching.',
    )
    expect(words(container)).toHaveLength(13)
  })

  it('starts with every word muted', () => {
    const { container } = render(<Tagline lang="en" />)
    expect(words(container).some((word) => word.hasAttribute('data-active'))).toBe(false)
  })

  it('activates a word only once it crosses the trigger line, in reading order', () => {
    const { container } = render(<Tagline lang="en" />)
    const [first, second, third] = words(container)

    act(() => observerOf(first).report(first, { isIntersecting: true, top: 300, rootBottom: 600 }))
    expect(first).toHaveAttribute('data-active')
    expect(second).not.toHaveAttribute('data-active')

    // A word below the line stays muted.
    act(() => observerOf(second).report(second, { isIntersecting: false, top: 700, rootBottom: 600 }))
    expect(second).not.toHaveAttribute('data-active')

    act(() => observerOf(third).report(third, { isIntersecting: true, top: 590, rootBottom: 600 }))
    expect(third).toHaveAttribute('data-active')
  })

  it('keeps words active after they scroll out through the top, and mutes them again when they return below the line', () => {
    const { container } = render(<Tagline lang="en" />)
    const [word] = words(container)

    act(() => observerOf(word).report(word, { isIntersecting: false, top: -200, rootBottom: 600 }))
    expect(word).toHaveAttribute('data-active')

    act(() => observerOf(word).report(word, { isIntersecting: false, top: 650, rootBottom: 600 }))
    expect(word).not.toHaveAttribute('data-active')
  })

  it('staggers words that activate in the same batch, in reading order', () => {
    const { container } = render(<Tagline lang="en" />)
    const [first, second, third] = words(container)

    act(() =>
      observerOf(first).reportAll([
        { target: third, isIntersecting: true, top: 100 },
        { target: first, isIntersecting: true, top: 100 },
        { target: second, isIntersecting: true, top: 100 },
      ]),
    )
    expect(first.style.transitionDelay).toBe('0ms')
    expect(second.style.transitionDelay).toBe('60ms')
    expect(third.style.transitionDelay).toBe('120ms')
  })
})
