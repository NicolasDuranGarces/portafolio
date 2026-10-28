import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { setTheme, useTheme } from './useTheme'

describe('useTheme', () => {
  it('follows the system preference until the visitor chooses', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    const { result } = renderHook(() => useTheme())
    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBeNull()
  })

  it('lets an explicit choice win over the system and stores it', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })
    const { result } = renderHook(() => useTheme())

    act(() => result.current.toggle())
    expect(result.current.theme).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('still applies the theme when storage is blocked', () => {
    vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
      throw new DOMException('blocked', 'SecurityError')
    })
    const { result } = renderHook(() => useTheme())

    expect(() => act(() => setTheme('dark'))).not.toThrow()
    expect(result.current.theme).toBe('dark')
  })
})
