import { act, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MockIntersectionObserver } from '../test/intersection'
import { useReveal } from './useReveal'

function Page() {
  useReveal()
  return (
    <>
      <div data-reveal data-testid="below" />
      <div data-testid="plain" />
    </>
  )
}

describe('useReveal', () => {
  it('shows a block the first time it enters the viewport and stops watching it', () => {
    const { getByTestId } = render(<Page />)
    const block = getByTestId('below')
    const observer = MockIntersectionObserver.watching(block)[0]

    expect(block).not.toHaveAttribute('data-in-view')
    act(() => observer.report(block, { isIntersecting: false }))
    expect(block).not.toHaveAttribute('data-in-view')

    act(() => observer.report(block, { isIntersecting: true }))
    expect(block).toHaveAttribute('data-in-view')
    expect(observer.observed.has(block)).toBe(false)
  })

  it('leaves elements without data-reveal alone', () => {
    const { getByTestId } = render(<Page />)
    expect(MockIntersectionObserver.watching(getByTestId('plain'))).toHaveLength(0)
  })

  it('stops observing when the page unmounts', () => {
    const { getByTestId, unmount } = render(<Page />)
    const block = getByTestId('below')
    const observer = MockIntersectionObserver.watching(block)[0]
    unmount()
    expect(observer.observed.size).toBe(0)
  })
})
