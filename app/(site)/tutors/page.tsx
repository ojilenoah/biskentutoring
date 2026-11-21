import type { Metadata } from "next"
import { Breadcrumb, PageBar } from "@/components/site/structure"
import { gutter } from "@/components/site/site-shell"
import { TutorDirectory } from "./tutor-directory"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Find a tutor | Bisken Tutoring Concepts",
  description: "Browse Bisken's certified tutors by subject — Mathematics, English, Science, exam preparation and more.",
}

export default function TutorsPage() {
  return (
    <>
      <PageBar
        cells={[
          <Breadcrumb key="b" items={[{ label: "Home", href: "/" }, { label: "Find a tutor" }]} />,
          <span key="c">Online &amp; at home</span>,
          <span key="t">TRCN certified</span>,
        ]}
      />
      <div className={cn(gutter, "pb-20 pt-8 sm:pt-12")}>
        <div className="flex items-end justify-between gap-6 border-b-2 border-rule pb-6">
          <div>
            <h1 className="text-[44px] sm:text-[64px]">Find a tutor</h1>
            <p className="mt-4 max-w-[440px] text-ink-2">Search by name or filter by subject. Every tutor is TRCN certified.</p>
          </div>
        </div>
        <TutorDirectory />
      </div>
    </>
  )
}
