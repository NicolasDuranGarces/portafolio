import { TechIcon } from './TechIcon'

type Props = {
  items: string[]
}

export function IconTiles({ items }: Props) {
  return (
    <div className="tiles">
      {items.map((n) => (
        <div key={n} className="tile">
          <div className="iconbox" aria-hidden>
            <TechIcon name={n} />
          </div>
          <span className="label">{n}</span>
        </div>
      ))}
    </div>
  )
}

