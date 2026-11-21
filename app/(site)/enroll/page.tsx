import type { Metadata } from "next"
import { Suspense } from "react"
import { Pencil } from "@/components/site/illustrations"
import { Drift } from "@/components/site/drift"
import { Breadcrumb, PageBar, SectionHead } from "@/components/site/structure"
import { gutter } from "@/components/site/site-shell"
import { EnrollForm } from "./enroll-form"
import { STEPS } from "@/lib/content"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Enroll | Bisken Tutoring Concepts",
  description: "Tell us about your child and we'll match you with a certified tutor.",
}

export default function EnrollPage() {
  return (
    <>
      <PageBar
        cells={[
          <Breadcrumb key="b" items={[{ label: "Home", href: "/" }, { label: "Enroll" }]} />,
          <span key="s">Step 01 of 03</span>,
          <span key="t">About 2 minutes</span>,
        ]}
      />
      <div className={cn(gutter, "pb-20 pt-8 sm:pt-12")}>
        <SectionHead as="h1" eyebrow="Enroll" title="Start learning today" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div className="rounded-panel bg-card p-5 sm:p-8">
            <Suspense fallback={null}>
              <EnrollForm />
            </Suspense>
          </div>
          <aside className="grain relative flex flex-col overflow-hidden rounded-panel bg-sunk p-6 pb-28 sm:p-8 sm:pb-28">
            <h2 className="text-[22px] tracking-[-0.03em]">What happens next</h2>
            <ol className="mt-4 border-b-2 border-rule">
              {STEPS.map((s) => (
                <li key={s.n} className="grid grid-cols-[40px_1fr] border-t-2 border-rule py-4">
                  <span className="font-mono text-xs text-ink-3">{s.n}</span>
                  <span>
                    <span className="block font-semibold">{s.title}</span>
                    <span className="mt-0.5 block text-sm text-ink-2">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Drift className="pointer-events-none absolute -bottom-16 right-12 sm:right-16" distance={10} spin={8} from={{ y: 90 }} style={{ transformOrigin: "50% 100%" }}>
              <Pencil className="w-[24px] rotate-[212deg]" />
            </Drift>
          </aside>
        </div>
      </div>
    </>
  )
}
