import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ChevronDown, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PaperClip } from "@/components/site/illustrations"
import { Drift } from "@/components/site/drift"
import { Breadcrumb, PageBar } from "@/components/site/structure"
import { TutorPhoto } from "@/components/site/tutor-card"
import { gutter } from "@/components/site/site-shell"
import { CONTACT, allTutors, getTutor } from "@/lib/content"
import { cn } from "@/lib/utils"

export function generateStaticParams() {
  return allTutors.map((t) => ({ slug: t.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const t = getTutor(params.slug)
  if (!t) return {}
  return { title: `${t.name} — ${t.tags.join(", ")} tutor | Bisken`, description: t.description.slice(0, 155) }
}

export default function TutorProfilePage({ params }: { params: { slug: string } }) {
  const tutor = getTutor(params.slug)
  if (!tutor) notFound()

  const i = allTutors.findIndex((t) => t.slug === tutor.slug)
  const prev = allTutors[(i - 1 + allTutors.length) % allTutors.length]
  const next = allTutors[(i + 1) % allTutors.length]
  const paragraphs = tutor.description.split(/\n\n+/)
  const lead = tutor.role === "Lead Tutor"

  const rows = [
    {
      title: "Subjects",
      body: (
        <div className="flex flex-wrap gap-1.5">
          {tutor.tags.map((t) => (
            <span key={t} className="rounded-tag bg-page px-2.5 py-1 text-[13px] font-medium">
              {t}
            </span>
          ))}
        </div>
      ),
    },
    {
      title: "Qualifications",
      body: lead ? (
        <p>BSc.Ed · M.Ed · MAID · TRCN · STAN. Principal Education Officer with over a decade of professional practice.</p>
      ) : (
        <p>Ask us about this tutor&apos;s qualifications and experience when you enroll.</p>
      ),
    },
    {
      title: "Lesson formats",
      body: <p>One-to-one or small-group coaching, online or at home. We&apos;ll confirm availability when you enroll.</p>,
    },
  ]

  return (
    <>
      <PageBar
        cells={[
          <Breadcrumb
            key="b"
            items={[
              { label: "Home", href: "/" },
              { label: "Find a tutor", href: "/tutors" },
              { label: tutor.name },
            ]}
          />,
          <span key="n" className="flex items-center gap-3">
            <Link href={`/tutors/${prev.slug}`} className="flex items-center gap-1 hover:text-purple" aria-label={`Previous tutor: ${prev.name}`}>
              <ArrowLeft className="size-3.5" /> Prev
            </Link>
            <Link href={`/tutors/${next.slug}`} className="flex items-center gap-1 hover:text-purple" aria-label={`Next tutor: ${next.name}`}>
              Next <ArrowRight className="size-3.5" />
            </Link>
          </span>,
          <span key="i">1-to-1 &amp; groups</span>,
        ]}
      />

      <div className={cn(gutter, "grid grid-cols-1 gap-4 pb-20 pt-6 lg:grid-cols-2")}>
        {/* photo panel */}
        <div className={cn("group relative flex items-center justify-center rounded-panel p-6 sm:p-10 lg:min-h-[720px]", tutor.tint)}>
          {/* clip grips the photo's top edge: part over the photo, part sticking out above it */}
          <div className="relative w-full max-w-[420px]">
            <Drift className="pointer-events-none absolute -top-14 left-8 z-10 sm:left-12" distance={6} from={{ y: -40, rotate: 30 }}>
              <PaperClip className="w-[52px] -rotate-[14deg]" />
            </Drift>
            <TutorPhoto tutor={tutor} priority className="aspect-[4/5] w-full rounded-card" />
          </div>
        </div>

        {/* details */}
        <div className="flex flex-col gap-3">
          <div className="rounded-panel bg-card p-6 sm:p-8">
            <h1 className="text-[44px] sm:text-[56px]">{tutor.name}</h1>
            <div className="mt-5 space-y-3 text-[16px] leading-relaxed text-ink-2">
              {paragraphs.map((p, k) => (
                <p key={k}>{p}</p>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {tutor.tags.map((t, k) => (
                <span key={t} className={cn("rounded-tag px-2.5 py-1 text-[13px] font-medium", k === 0 ? "bg-lilac" : "bg-page")}>
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-7 flex gap-2">
              <Button asChild size="lg" className="flex-1 sm:flex-none">
                <Link href={`/enroll?tutor=${tutor.slug}`}>
                  Book a lesson <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="flex-1 sm:flex-none">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Ask a question
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-panel bg-card px-6 sm:px-8">
            {rows.map((r, k) => (
              <details key={r.title} open={k === 0} className={cn("group/acc", k < rows.length - 1 && "border-b-2 border-rule")}>
                <summary className="flex cursor-pointer list-none items-center justify-between py-[18px] text-base font-medium [&::-webkit-details-marker]:hidden">
                  {r.title}
                  <span className="grid size-7 place-items-center rounded-full bg-page transition-transform group-open/acc:rotate-180">
                    <ChevronDown className="size-4" />
                  </span>
                </summary>
                <div className="pb-5 text-[15px] leading-relaxed text-ink-2">{r.body}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
