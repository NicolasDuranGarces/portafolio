type Props = {
  github?: string
  linkedin?: string
  twitter?: string
  email?: string
}

export function SocialLinks({ github, linkedin, twitter, email }: Props) {
  const items = [
    github && { label: 'GitHub', href: github },
    linkedin && { label: 'LinkedIn', href: linkedin },
    twitter && { label: 'Twitter/X', href: twitter },
    email && { label: 'Email', href: `mailto:${email}` },
  ].filter(Boolean) as { label: string; href: string }[]

  if (!items.length) return null
  return (
    <div style={{ display: 'flex', gap: '.6rem', flexWrap: 'wrap' }}>
      {items.map(i => (
        <a key={i.label} className="btn ghost" href={i.href} target={i.href.startsWith('mailto:') ? undefined : '_blank'} rel="noreferrer">
          {i.label}
        </a>
      ))}
    </div>
  )
}

