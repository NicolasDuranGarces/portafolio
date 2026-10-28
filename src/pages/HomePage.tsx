import type { Lang } from '../lib/lang'
import { About } from '../sections/About'
import { Cases } from '../sections/Cases'
import { Contact } from '../sections/Contact'
import { Experience } from '../sections/Experience'
import { Hero } from '../sections/Hero'
import { OpenProjects } from '../sections/OpenProjects'
import { Stack } from '../sections/Stack'
import { Tagline } from '../sections/Tagline'

export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <Cases lang={lang} />
      <Tagline lang={lang} />
      <Experience lang={lang} />
      <Stack lang={lang} />
      <OpenProjects lang={lang} />
      <About lang={lang} />
      <Contact lang={lang} />
    </>
  )
}
