type Props = {
  tags: string[]
  active: string[]
  onToggle: (tag: string) => void
}

export function TagFilter({ tags, active, onToggle }: Props) {
  return (
    <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
      {tags.map(t => {
        const isOn = active.includes(t)
        return (
          <button
            key={t}
            type="button"
            className={`badge tag ${isOn ? 'on' : ''}`}
            aria-pressed={isOn}
            onClick={() => onToggle(t)}
            style={{ cursor: 'pointer', background: isOn ? 'color-mix(in oklab, var(--primary) 18%, transparent)' : 'transparent' }}
          >
            {t}
          </button>
        )
      })}
    </div>
  )
}

