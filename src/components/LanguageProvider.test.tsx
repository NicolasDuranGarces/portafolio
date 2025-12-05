import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { LanguageProvider, useLanguage } from './LanguageProvider'

describe('LanguageProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    // Reset window.location
    delete (window as any).location
    window.location = { href: 'http://localhost/', search: '', pathname: '/' } as any
    window.history.replaceState = vi.fn()
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

  it('should prioritize query param over localStorage', () => {
    localStorage.setItem('lang', 'es')
    window.location.search = '?lang=en'

    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.lang).toBe('en')
  })

  it('should toggle language from es to en', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.lang).toBe('es')

    act(() => {
      result.current.toggle()
    })

    expect(result.current.lang).toBe('en')
    expect(localStorage.getItem('lang')).toBe('en')
  })

  it('should toggle language from en to es', () => {
    localStorage.setItem('lang', 'en')

    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    expect(result.current.lang).toBe('en')

    act(() => {
      result.current.toggle()
    })

    expect(result.current.lang).toBe('es')
    expect(localStorage.getItem('lang')).toBe('es')
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
    localStorage.setItem('lang', 'en')

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

    expect(result.current.t('hero.title')).toBe('Diseño plataformas que escalan')
    expect(result.current.t('about.title')).toBe('Sobre mí')
  })

  it('should throw error when useLanguage is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})

    expect(() => {
      renderHook(() => useLanguage())
    }).toThrow('useLanguage must be used within LanguageProvider')

    consoleError.mockRestore()
  })

  it('should update URL with lang query param when language changes', () => {
    const { result } = renderHook(() => useLanguage(), {
      wrapper: LanguageProvider,
    })

    act(() => {
      result.current.set('en')
    })

    expect(window.history.replaceState).toHaveBeenCalled()
  })
})
