/** Monochrome mark from an SVG path: the page has one accent color, so brand colors stay out. */
export function TechIcon({ path, className }: { path: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={path} />
    </svg>
  )
}
