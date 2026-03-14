import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { LanguageProvider, useLanguage } from './LanguageProvider'

describe('LanguageProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    window.history.replaceState({}, '', '/')
    vi.restoreAllMocks()
  })

  it('should initialize with default language (es)', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.lang).toBe('es')
  })

  it('should load language from localStorage if available', () => {
    localStorage.setItem('lang', 'en')

    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.lang).toBe('en')
  })

  it('should use legacy query param as a fallback when path is root', () => {
    localStorage.setItem('lang', 'es')
    window.history.replaceState({}, '', '/?lang=en')

    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.lang).toBe('en')
  })

  it('should toggle language from es to en', () => {
    const replaceState = vi.spyOn(window.history, 'replaceState')
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.lang).toBe('es')

    act(() => {
      result.current.toggle()
    })

    expect(result.current.lang).toBe('en')
    expect(localStorage.getItem('lang')).toBe('en')
    expect(replaceState).toHaveBeenCalledWith({}, '', '/en/')
  })

  it('should toggle language from en to es', () => {
    window.history.replaceState({}, '', '/en/')

    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.lang).toBe('en')

    act(() => {
      result.current.toggle()
    })

    expect(result.current.lang).toBe('es')
    expect(localStorage.getItem('lang')).toBe('es')
    expect(window.location.pathname).toBe('/')
  })

  it('should set language directly', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    act(() => {
      result.current.set('en')
    })

    expect(result.current.lang).toBe('en')
    expect(localStorage.getItem('lang')).toBe('en')

    act(() => {
      result.current.set('es')
    })

    expect(result.current.lang).toBe('es')
    expect(localStorage.getItem('lang')).toBe('es')
  })

  it('should translate keys correctly in Spanish', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.t('hero.greeting')).toBe('Nicolas Duran Garces')
    expect(result.current.t('nav.about')).toBe('Sobre mí')
  })

  it('should translate keys correctly in English', () => {
    window.history.replaceState({}, '', '/en/')

    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.t('nav.about')).toBe('About')
    expect(result.current.t('nav.skills')).toBe('Skills')
  })

  it('should return key if translation not found', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.t('nonexistent.key')).toBe('nonexistent.key')
  })

  it('should handle nested translation keys', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.t('hero.title')).toBe('Backend Engineer especializado en Python, Node.js, Java, AWS y arquitectura de producto')
    expect(result.current.t('about.title')).toBe('Sobre mí')
  })

  it('should throw error when useLanguage is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      renderHook(() => useLanguage())
    }).toThrow('useLanguage must be used within LanguageProvider')

    consoleError.mockRestore()
  })

  it('should update URL with localized path when language changes', () => {
    const replaceState = vi.spyOn(window.history, 'replaceState')
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    act(() => {
      result.current.set('en')
    })

    expect(replaceState).toHaveBeenCalledWith({}, '', '/en/')
  })
})
