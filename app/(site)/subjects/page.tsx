import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { FamilyFigure } from "@/components/site/illustrations"
import { Breadcrumb, PageBar, SectionHead } from "@/components/site/structure"
import { gutter } from "@/components/site/site-shell"
import { families, subjects } from "@/lib/content"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Subjects | Bisken Tutoring Concepts",
  description: "Mathematics, sciences, English and languages, exam preparation and creative subjects — taught by certified tutors.",
}

export default function SubjectsPage() {
  return (
    <>
      <PageBar
        cells={[
          <Breadcrumb key="b" items={[{ label: "Home", href: "/" }, { label: "Subjects" }]} />,
          <span key="f">{families.length} groups</span>,
          <span key="s">{subjects.length}+ subjects</span>,
        ]}
      />
      <div className={cn(gutter, "pb-20 pt-8 sm:pt-12")}>
        <SectionHead as="h1" eyebrow="Subjects" title="Subjects available" />
        <p className="-mt-1 mb-8 max-w-xl text-ink-2">
          From early numeracy and phonics to GCSE, A-levels and IELTS. Pick a group to see the levels we cover and the tutors who teach it.
        </p>

        <div className="flex flex-col gap-3">
          {families.map((f) => {
            return (
              <Link
                key={f.slug}
                href={`/subjects/${f.slug}`}
                className={cn("grain group grid items-center gap-5 rounded-card p-5 sm:grid-cols-[minmax(0,1fr)_200px_auto] sm:p-6", f.tint)}
              >
                <span>
                  <span className="block text-[30px] font-bold leading-tight tracking-[-0.03em] sm:text-[36px]">{f.name}</span>
                  <span className="mt-1 block text-[15.5px] font-medium">{f.subjects.join(" · ")}</span>
                  <span className="mt-2 block max-w-xl text-[15px] text-ink-2">{f.intro}</span>
                </span>
                <FamilyFigure slug={f.slug} className="hidden h-[120px] w-auto sm:block" />
                <span className="flex items-center gap-3 sm:flex-col sm:items-end">
                                    <span className="grid size-10 place-items-center rounded-full bg-white/60 transition-transform group-hover:translate-x-1">
                    <ArrowRight className="size-4" />
                  </span>
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
