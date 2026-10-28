import { describe, expect, it } from 'vitest'

/**
 * The visual contract (landing-page-design skill, part B) as checks over the source.
 * Class names live in .tsx files and in @apply lines of global.css, so both are scanned.
 */
const modules = import.meta.glob(['../**/*.tsx', '../**/*.css', '!../**/*.test.tsx'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const files = Object.entries(modules).map(([file, text]) => ({ file: file.replace('../', ''), text }))
const css = files.find((entry) => entry.file.endsWith('global.css'))!.text
const tsx = files.filter((entry) => entry.file.endsWith('.tsx'))

function offenders(pattern: RegExp, scope = files) {
  return scope.flatMap(({ file, text }) => [...text.matchAll(pattern)].map((match) => `${file}: ${match[0]}`))
}

describe('design rules', () => {
  it('scans the whole UI source, not an empty list', () => {
    expect(tsx.length).toBeGreaterThan(15)
    expect(css).toContain('@theme')
  })

  it('uses only the spacing scale: 0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80 and 96 px', () => {
    const allowed = ['0', '0.5', '1', '2', '3', '4', '6', '8', '10', '12', '16', '20', '24', 'px', 'auto']
    const spacing =
      /(?<![\w-])-?(?:m[xytrbl]?|p[xytrbl]?|gap|gap-x|gap-y|space-x|space-y|inset|inset-x|inset-y|top|right|bottom|left|translate-x|translate-y)-(\d+(?:\.\d+)?|px|auto)(?![\w./%-])/g
    const wrong = files.flatMap(({ file, text }) =>
      [...text.matchAll(spacing)].filter((match) => !allowed.includes(match[1])).map((match) => `${file}: ${match[0]}`),
    )
    expect(wrong).toEqual([])
  })

  it('takes font sizes from the Tailwind scale and never sets arbitrary sizes, radii or spacing', () => {
    expect(
      offenders(/(?<![\w-])(?:text|p[xytrbl]?|m[xytrbl]?|gap|rounded|leading|tracking|top|left|right|bottom|inset)-\[[^\]]*\]/g),
    ).toEqual([])
    expect(offenders(/font-size:|line-height:/g, [{ file: 'global.css', text: css }])).toEqual([])
  })

  it('keeps arbitrary values to the layout widths the design needs', () => {
    const allowed = ['max-w-[680px]', 'md:grid-cols-[12rem_1fr]', 'lg:grid-cols-[minmax(0,680px)_1fr]', 'transition-[opacity,filter,translate]', 'transition-[opacity,visibility]', 'transition-[opacity]']
    const found = files.flatMap(({ file, text }) =>
      [...text.matchAll(/[\w:-]+-\[[^\]]+\]/g)].map((match) => `${file}: ${match[0]}`),
    )
    expect(found.filter((entry) => !allowed.some((value) => entry.endsWith(value)))).toEqual([])
  })

  it('has no italics and no weight above bold', () => {
    expect(offenders(/\bitalic\b|font-(?:extrabold|black)|font-style:\s*italic|font-weight:\s*[89]00/g)).toEqual([])
  })

  it('uses one typeface: Geist', () => {
    expect(css.match(/font-family:/g)).toHaveLength(1)
    expect(css).toContain("font-family: 'Geist'")
    expect(offenders(/\bfont-(?:serif|mono)\b|Inter|Roboto|Arial|Helvetica/g)).toEqual([])
  })

  it('draws flat backgrounds: the only gradient is the hero heading text', () => {
    expect(offenders(/(?:linear|radial|conic)-gradient\(/g)).toEqual([])
    const gradientUsers = offenders(/\bbg-(?:linear|radial|conic|gradient)[\w-]*/g)
    expect(gradientUsers).toHaveLength(1)
    expect(gradientUsers[0]).toContain('Hero.tsx')
  })

  it('never borders a single side', () => {
    expect(offenders(/(?<![\w-])border-(?:t|b|l|r|x|y|s|e)(?:-\w+)?(?![\w-])|border-(?:top|bottom|left|right)\b/g)).toEqual([])
  })

  it('colors everything through the tokens, never raw values or the default palette', () => {
    expect(offenders(/#[0-9a-fA-F]{3,8}\b|\brgba?\(|\bhsla?\(/g, tsx)).toEqual([])

    const outsideTokens = css.replace(/\/\*[\s\S]*?\*\//g, '').replace(/@theme\s*\{[\s\S]*?\n\}/, '')
    expect(outsideTokens.match(/#[0-9a-fA-F]{3,8}\b/g)).toBeNull()

    const palette =
      /\b(?:bg|text|border|from|to|via|ring|outline|fill|stroke|decoration|divide|accent|caret|shadow)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white)(?:-\d+)?\b/g
    expect(offenders(palette)).toEqual([])
  })

  it('animates with the fluid curve and no default transitions', () => {
    expect(offenders(/(?<![\w-])transition(?![\w-])/g, tsx)).toEqual([])
    const utility = css.match(/@utility transition-ui \{[\s\S]*?\n\}/)?.[0] ?? ''
    expect(utility).toContain('var(--ease-fluid)')
    expect(utility).not.toContain('outline')

    const applyLines = css.split('\n').filter((line) => /@apply.*\btransition-/.test(line))
    expect(applyLines.length).toBeGreaterThan(0)
    for (const line of applyLines) expect(line, line).toMatch(/ease-fluid|transition-ui/)
    expect(offenders(/ease-(?:in|out|linear)(?![\w-])/g)).toEqual([])
  })

  it('never listens to scroll events: reveals use IntersectionObserver', () => {
    expect(offenders(/addEventListener\(\s*['"]scroll['"]|onscroll|onScroll/g)).toEqual([])
  })

  it('keeps one control height token for buttons and the language and theme controls', () => {
    expect(css).toContain('--control-h')
    expect(offenders(/\bh-(?:8|9|10|11|12)\b/g, tsx)).toEqual([])
  })
})
