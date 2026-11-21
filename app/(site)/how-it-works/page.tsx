import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Backpack } from "@/components/site/illustrations"
import { Drift } from "@/components/site/drift"
import { Breadcrumb, PageBar, SectionHead } from "@/components/site/structure"
import { gutter } from "@/components/site/site-shell"
import { STEPS, services } from "@/lib/content"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "How it works | Bisken Tutoring Concepts",
  description: "Tell us what your child needs, meet a certified tutor, and start learning — online or at home.",
}

const TINTS = ["bg-lilac", "bg-sand", "bg-sage", "bg-peach"]

export default function HowItWorksPage() {
  return (
    <>
      <PageBar
        cells={[
          <Breadcrumb key="b" items={[{ label: "Home", href: "/" }, { label: "How it works" }]} />,
          <span key="s">3 steps</span>,
          <span key="m">Online &amp; at home</span>,
        ]}
      />
      <div className={cn(gutter, "pb-20 pt-8 sm:pt-12")}>
        <SectionHead as="h1" eyebrow="How it works" title="From first message to first lesson" />

        <section className="grid gap-6 rounded-panel bg-purple grain p-5 text-white sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="relative hidden min-h-[360px] place-items-center rounded-card bg-purple-2 lg:grid">
            <Drift className="grid w-[48%] max-w-[220px] place-items-center" distance={16} from={{ y: 40 }}>
              <Backpack className="w-full" />
            </Drift>
          </div>
          <div className="flex flex-col">
            <ol>
              {STEPS.map((s) => (
                <li key={s.n} className="grid grid-cols-[56px_1fr] border-t-2 border-rule py-5">
                  <span className="font-mono text-[13px] text-purple-ink">{s.n}</span>
                  <span>
                    <span className="block text-[22px] font-semibold tracking-[-0.02em]">{s.title}</span>
                    <span className="mt-1 block text-[15.5px] text-purple-ink">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-auto flex gap-2 border-t-2 border-rule pt-5">
              <Button asChild variant="surface">
                <Link href="/enroll">
                  Start step one <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="pt-20">
          <SectionHead eyebrow="What we offer" title="Lesson formats" />
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((s, i) => (
              <article key={s.title} className={cn("grain flex flex-col rounded-card p-6", TINTS[i % TINTS.length])}>
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <s.icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-8 text-[24px] tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-1 text-[14.5px] font-medium">{s.description}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{s.details}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}
