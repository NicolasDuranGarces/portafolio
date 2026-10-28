import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { MockIntersectionObserver } from './intersection'

/** In memory Storage. Node 25+ ships a global localStorage that throws without a file flag and hides jsdom's, so tests bring their own. */
class MemoryStorage implements Storage {
  private data = new Map<string, string>()

  get length() {
    return this.data.size
  }
  clear() {
    this.data.clear()
  }
  getItem(key: string) {
    return this.data.get(key) ?? null
  }
  key(index: number) {
    return [...this.data.keys()][index] ?? null
  }
  removeItem(key: string) {
    this.data.delete(key)
  }
  setItem(key: string, value: string) {
    this.data.set(key, String(value))
  }
}

beforeEach(() => {
  Object.defineProperty(window, 'localStorage', { value: new MemoryStorage(), configurable: true, writable: true })
  // Light system theme unless a test says otherwise.
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
  globalThis.IntersectionObserver = MockIntersectionObserver
})

afterEach(() => {
  cleanup()
  MockIntersectionObserver.reset()
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.removeAttribute('style')
})
