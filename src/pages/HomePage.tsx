import { homeSections } from '../content/sections'
import { useActiveSection } from '../hooks/useActiveSection'
import { useCurrentRole } from '../hooks/useCurrentRole'
import type { Lang } from '../lib/lang'
import { firstRole, lastRole } from '../lib/trajectory'
import { About } from '../sections/About'
import { Cases } from '../sections/Cases'
import { Contact } from '../sections/Contact'
import { Education } from '../sections/Education'
import { Experience } from '../sections/Experience'
import { Featured } from '../sections/Featured'
import { OpenProjects } from '../sections/OpenProjects'
import { Side } from '../sections/Side'
import { Stack } from '../sections/Stack'

/** Two columns from `lg`: identity and navigation stay put on the left while the sections scroll on the right. */
export function HomePage({ lang }: { lang: Lang }) {
  const active = useActiveSection(homeSections) ?? homeSections[0]
  const { current, live } = useCurrentRole(firstRole(lang), lastRole(lang))

  return (
    <main className="wrap lg:grid lg:grid-cols-12 lg:gap-x-6">
      <Side lang={lang} active={active} current={current} live={live} />
      {/* The skip link lands here: the side column is already in front of the visitor. */}
      <div id="main" tabIndex={-1} className="pb-16 lg:col-span-7 lg:col-start-6 lg:pt-12">
        <About lang={lang} />
        <Education lang={lang} />
        <Featured lang={lang} />
        <Cases lang={lang} />
        <Experience lang={lang} currentId={current.id} />
        <Stack lang={lang} />
        <OpenProjects lang={lang} />
        <Contact lang={lang} />
      </div>
    </main>
  )
}
