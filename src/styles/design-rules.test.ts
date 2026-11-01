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
      /(?<![\w-])-?(?:m[xytrbl]?|p[xytrbl]?|gap|gap-x|gap-y|space-x|space-y|size|inset|inset-x|inset-y|top|right|bottom|left|translate-x|translate-y)-(\d+(?:\.\d+)?|px|auto)(?![\w./%-])/g
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

  it('keeps arbitrary values to the layout values the design needs', () => {
    const allowed = [
      'min-h-[70vh]',
      'grid-cols-[2.5rem_minmax(0,1fr)]',
      'grid-cols-[8rem_minmax(0,1fr)]',
      'grid-cols-[9rem_minmax(0,1fr)]',
    ]
    const found = files.flatMap(({ file, text }) =>
      [...text.matchAll(/[\w:-]+-\[[^\]]+\]/g)].map((match) => `${file}: ${match[0]}`),
    )
    expect(found.filter((entry) => !allowed.some((value) => entry.endsWith(value)))).toEqual([])
  })

  it('has no italics and no weight above bold', () => {
    expect(offenders(/\bitalic\b|font-(?:extrabold|black)|font-style:\s*italic|font-weight:\s*[89]00/g)).toEqual([])
  })

  it('uses one typeface: the Helvetica Neue system stack, with nothing to download', () => {
    const declarations = css.match(/(?:--font-sans|font-family):[^;]*;/g) ?? []
    expect(declarations).toHaveLength(1)
    expect(declarations[0]).toMatch(/:\s*'Helvetica Neue',/)
    expect(css).not.toContain('@font-face')
    expect(offenders(/\bfont-(?:serif|mono)\b|\bInter\b|Roboto|Geist/g)).toEqual([])
  })

  it('draws flat: no gradient anywhere', () => {
    expect(offenders(/(?:linear|radial|conic)-gradient\(/g)).toEqual([])
    expect(offenders(/\bbg-(?:linear|radial|conic|gradient)[\w-]*|(?<![\w-])(?:from|via|to)-(?:canvas|ink|ink-muted|line|accent)\b/g)).toEqual([])
  })

  it('allows hairlines on top and bottom only, and never colors a side border with the accent', () => {
    expect(offenders(/(?<![\w-])border-(?:l|r|s|e|x)(?:-\w+)?(?![\w-])|border-(?:left|right|inline)\b/g)).toEqual([])
    expect(offenders(/border-(?:top|bottom|block)[^;\n]*accent/g)).toEqual([])

    // A class list that sets a top or bottom border and an accent border color is a colored stripe.
    const stripes = files.flatMap(({ file, text }) =>
      [...text.matchAll(/["'`]([^"'`\n]*)["'`]|@apply ([^;\n]*);/g)]
        .map((match) => match[1] ?? match[2] ?? '')
        .filter((classes) => /(?<![\w-])border-(?:t|b|y)(?![\w-])/.test(classes) && /(?<![\w-])border-accent\b|border-(?:t|b|y)-accent/.test(classes))
        .map((classes) => `${file}: ${classes}`),
    )
    expect(stripes).toEqual([])
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

  it('drives scroll animations with a view timeline, forwards fill and a range that starts where the element first covers the viewport', () => {
    const timelines = [...css.matchAll(/\{[^{}]*animation-timeline:[^{}]*\}/g)].map((match) => match[0])
    expect(timelines.length).toBeGreaterThan(0)
    for (const block of timelines) {
      expect(block.indexOf('animation:'), block).toBeGreaterThan(-1)
      expect(block.indexOf('animation:'), block).toBeLessThan(block.indexOf('animation-timeline:'))
      expect(block, block).toMatch(/animation:[^;]*\bforwards\b/)
      expect(block, block).not.toMatch(/animation:[^;]*\bboth\b/)
      expect(block, block).toMatch(/animation-range:\s*cover 0%/)
    }
    expect(css).toContain('@supports (animation-timeline: view())')
  })

  it('never listens to scroll events: reveals use IntersectionObserver', () => {
    expect(offenders(/addEventListener\(\s*['"]scroll['"]|onscroll|onScroll/g)).toEqual([])
  })

  it('keeps one control height token for buttons and the language and theme controls', () => {
    expect(css).toContain('--control-h')
    expect(offenders(/\bh-(?:8|9|10|11|12)\b/g, tsx)).toEqual([])
  })
})
