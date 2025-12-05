import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeProvider'

describe('ThemeProvider', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    // Reset matchMedia mock
    vi.clearAllMocks()
  })

  it('should initialize with system preference (dark)', () => {
    // Mock prefers-color-scheme: dark
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    expect(result.current.theme).toBe('dark')
  })

  it('should initialize with system preference (light)', () => {
    // Mock prefers-color-scheme: light
    window.matchMedia = vi.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    expect(result.current.theme).toBe('light')
  })

  it('should load theme from localStorage if available', () => {
    localStorage.setItem('theme', 'dark')

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    expect(result.current.theme).toBe('dark')
  })

  it('should toggle theme from light to dark', () => {
    localStorage.setItem('theme', 'light')

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    expect(result.current.theme).toBe('light')

    act(() => {
      result.current.toggle()
    })

    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('should toggle theme from dark to light', () => {
    localStorage.setItem('theme', 'dark')

    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    expect(result.current.theme).toBe('dark')

    act(() => {
      result.current.toggle()
    })

    expect(result.current.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('should set theme directly', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    act(() => {
      result.current.set('dark')
    })

    expect(result.current.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')

    act(() => {
      result.current.set('light')
    })

    expect(result.current.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('should set data-theme attribute on document element', () => {
    const { result } = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    })

    act(() => {
      result.current.set('dark')
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe('dark')

    act(() => {
      result.current.set('light')
    })

    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('should throw error when useTheme is used outside provider', () => {
    // Suppress console.error for this test
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      renderHook(() => useTheme())
    }).toThrow('useTheme must be used within ThemeProvider')

    consoleError.mockRestore()
  })
})
