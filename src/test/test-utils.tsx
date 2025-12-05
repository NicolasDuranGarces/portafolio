import { render, type RenderOptions } from '@testing-library/react'
import { ThemeProvider } from '../components/ThemeProvider'
import { LanguageProvider } from '../components/LanguageProvider'
import type { ReactElement } from 'react'

// Custom render with all providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <LanguageProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </LanguageProvider>
    )
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

// Re-export everything from React Testing Library
export * from '@testing-library/react'
export { renderWithProviders as render }
