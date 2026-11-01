import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'

/** Renders a style prototype into #root. Prototypes are dev-only pages and never prerendered. */
export function mount(node: ReactNode) {
  const root = document.getElementById('root')
  if (!root) throw new Error('Missing #root')
  createRoot(root).render(<StrictMode>{node}</StrictMode>)
}
