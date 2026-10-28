import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
import { resolveRoute } from './lib/routes'
import './styles/global.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App route={resolveRoute(window.location.pathname)} />
  </StrictMode>
)

// Prerendered pages hydrate. The dev server serves a root with only the placeholder comment, so it renders from scratch.
if (root.firstElementChild) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
