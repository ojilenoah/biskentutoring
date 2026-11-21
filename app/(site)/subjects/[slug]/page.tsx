import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { FamilyFigure } from "@/components/site/illustrations"
import { Breadcrumb } from "@/components/site/structure"
import { families, getFamily, tutorsFor } from "@/lib/content"

export function generateStaticParams() {
  return families.map((f) => ({ slug: f.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const f = getFamily(params.slug)
  if (!f) return {}
  return { title: `${f.name} tutoring — ${f.subjects.join(", ")} | Bisken`, description: f.intro }
}

export default function SubjectPage({ params }: { params: { slug: string } }) {
  const family = getFamily(params.slug)
  if (!family) notFound()

  const i = families.findIndex((f) => f.slug === family.slug)
  const prev = families[(i - 1 + families.length) % families.length]
  const next = families[(i + 1) % families.length]
  const teachers = tutorsFor(family)

  return (
    <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-2">
      {/* drawing panel */}
      <div className="flex flex-col rounded-panel bg-purple grain lg:min-h-[calc(100dvh-104px)]">
        <div className="flex justify-between border-b-2 border-rule px-6 py-4 font-mono text-[11.5px] tracking-[0.08em] text-purple-ink">
          <span>
            {family.letter} — {family.name.toUpperCase()}
          </span>
          <span>
            FIG. {String(i + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="grid flex-1 place-items-center p-8 sm:p-10">
          <FamilyFigure key={family.slug} slug={family.slug} className="w-[80%] max-w-[440px]" />
        </div>
        <div className="flex justify-center gap-2.5 pb-6">
          <Link
            href={`/subjects/${prev.slug}`}
            aria-label={`Previous: ${prev.name}`}
            className="grid size-11 place-items-center rounded-full bg-white/[0.18] text-white transition-colors hover:bg-white/30"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <Link
            href={`/subjects/${next.slug}`}
            aria-label={`Next: ${next.name}`}
            className="grid size-11 place-items-center rounded-full bg-white/[0.18] text-white transition-colors hover:bg-white/30"
          >
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      {/* content */}
      <div className="flex flex-col px-2 pb-10 pt-4 sm:px-6 lg:pt-10">
        <div className="font-mono text-xs">
          <Breadcrumb items={[{ label: "Subjects", href: "/subjects" }, { label: family.name }]} />
        </div>
        <h1 className="mt-8 text-[52px] leading-[0.95] sm:text-[72px]">{family.name}</h1>
        <p className="mt-6 max-w-[520px] text-[17px] leading-relaxed text-ink-2">{family.intro}</p>

        <p className="mt-6 text-[17px] text-ink-2">Subjects:</p>
        <p className="mt-1 text-[17px] font-medium">{family.subjects.join(" · ")}</p>

        <p className="mt-6 text-[17px] text-ink-2">Levels we cover:</p>
        <ul className="mt-2 border-b-2 border-rule">
          {family.levels.map((l) => (
            <li key={l} className="grid grid-cols-[48px_1fr] items-center border-t-2 border-rule py-3 text-base">
              <span className="h-px w-7 bg-ink" aria-hidden="true" />
              {l}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-card bg-card p-4">
            {teachers.length > 0 ? (
              <div className="flex items-center gap-3">
                <div className="flex">
                  {teachers.slice(0, 3).map((t, k) => (
                    <img
                      key={t.slug}
                      src={t.image}
                      alt=""
                      className="size-10 rounded-full border-2 border-card object-cover"
                      style={{ marginLeft: k === 0 ? 0 : -10 }}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  Tutors who teach {family.name.toLowerCase()}
                </span>
              </div>
            ) : (
              <span className="text-sm font-medium">Ask us and we&apos;ll match you with the right tutor.</span>
            )}
            <Button asChild>
              <Link href={teachers.length > 0 ? "/tutors" : "/enroll"}>
                {teachers.length > 0 ? `See ${family.name.toLowerCase()} tutors` : "Enroll"} <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
