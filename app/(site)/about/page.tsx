import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Brain, Hand, Heart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Ruler } from "@/components/site/illustrations"
import { Drift } from "@/components/site/drift"
import { Breadcrumb, PageBar, SectionHead } from "@/components/site/structure"
import { TutorPhoto } from "@/components/site/tutor-card"
import { gutter } from "@/components/site/site-shell"
import { allTutors } from "@/lib/content"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "About | Bisken Tutoring Concepts",
  description: "Bisken Tutoring Concepts — certified tutors, specialised support for learning differences, led by Bisilola Umoren.",
}

const SUPPORT = [
  { icon: Brain, title: "Cognitive development", body: "through structured learning" },
  { icon: Heart, title: "Emotional support", body: "and confidence building" },
  { icon: Hand, title: "Practical skills", body: "and hands-on learning" },
]

export default function AboutPage() {
  const lead = allTutors[0]
  return (
    <>
      <PageBar
        cells={[
          <Breadcrumb key="b" items={[{ label: "Home", href: "/" }, { label: "About" }]} />,
          <span key="t">TRCN certified</span>,
          <span key="q">BSc.Ed / M.Ed</span>,
        ]}
      />
      <div className={cn(gutter, "pb-20 pt-8 sm:pt-12")}>
        <SectionHead as="h1" eyebrow="About Bisken" title="We don't just teach subjects." />
        <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
          Bisken Tutoring Concepts is an educational support company dedicated to unlocking every child&apos;s potential through personalised
          tutoring, skill development and academic coaching — helping learners build confidence and achieve academic excellence.
        </p>

        {/* lead tutor */}
        <section className="mt-14 grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Link href={`/tutors/${lead.slug}`} className={cn("group relative grid place-items-center rounded-panel p-8", lead.tint)}>
            <TutorPhoto tutor={lead} priority className="aspect-[4/5] w-full max-w-[340px] rounded-card" />
          </Link>
          <div className="flex flex-col rounded-panel bg-card p-6 sm:p-8">
            <h2 className="text-[40px] sm:text-[52px]">{lead.name}</h2>
            <p className="mt-2 font-mono text-[12px] tracking-[0.06em] text-ink-3">BSc.Ed · M.Ed · MAID · TRCN · STAN</p>
            <div className="mt-5 space-y-3 leading-relaxed text-ink-2">
              {lead.description.split(/\n\n+/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Button asChild variant="secondary" className="mt-6 self-start">
              <Link href={`/tutors/${lead.slug}`}>
                View profile <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>

        {/* specialised support */}
        <section className="relative pt-20 lg:pb-24">
          <SectionHead eyebrow="Inclusive approach" title="Specialised support for every child" />
          <div className="grid gap-8 lg:grid-cols-2">
            <p className="max-w-xl text-lg leading-relaxed text-ink-2">
              We provide specialised support for children with <strong className="font-semibold text-ink">learning differences</strong>. Our
              qualified teachers use evidence-based approaches to create supportive learning environments tailored to each child&apos;s unique
              needs.
            </p>
            <ul className="border-b-2 border-rule">
              {SUPPORT.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[52px_1fr_auto] items-center border-t-2 border-rule py-4">
                  <span className="font-mono text-[13px] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[16.5px]">
                    <strong className="font-semibold">{s.title}</strong> <span className="text-ink-2">{s.body}</span>
                  </span>
                  <s.icon className="size-5 text-purple" aria-hidden="true" />
                </li>
              ))}
            </ul>
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute bottom-6 hidden lg:block" style={{ right: "calc((100% - 100vw) / 2)" }}>
            <Drift axis="x" distance={22} from={{ x: 160 }}>
              <Ruler className="w-[220px] translate-x-[30%] rotate-[10deg]" />
            </Drift>
          </div>
        </section>
      </div>
    </>
  )
}
