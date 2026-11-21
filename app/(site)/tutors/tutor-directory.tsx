"use client"

import { useMemo, useState } from "react"
import { Search } from "lucide-react"

import { TutorCard } from "@/components/site/tutor-card"
import { CrayonsUp } from "@/components/site/illustrations"
import { Drift } from "@/components/site/drift"
import { Button } from "@/components/ui/button"
import { allTutors, families, tutorsFor } from "@/lib/content"
import { cn } from "@/lib/utils"

const FILTERABLE = families.filter((f) => f.match.length > 0)

export function TutorDirectory() {
  const [query, setQuery] = useState("")
  const [family, setFamily] = useState<string | null>(null)

  const results = useMemo(() => {
    const fam = FILTERABLE.find((f) => f.slug === family)
    const pool = fam ? tutorsFor(fam) : allTutors
    const q = query.trim().toLowerCase()
    if (!q) return pool
    return pool.filter((t) => t.name.toLowerCase().includes(q) || t.tags.some((tag) => tag.toLowerCase().includes(q)))
  }, [query, family])

  return (
    <>
      <div className="relative mt-24 flex flex-col gap-1.5 rounded-card bg-card p-1.5 md:flex-row">
        {/* crayons poke up from behind the bar's top edge */}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-full right-4 h-[88px] w-[170px] [clip-path:inset(-300px_-300px_0_-300px)] sm:right-10">
          <Drift className="absolute left-8 top-1" distance={8} spin={8} from={{ y: 90 }} style={{ transformOrigin: "50% 100%" }}>
            <CrayonsUp className="w-[104px] origin-bottom rotate-[18deg]" />
          </Drift>
        </div>
        <label className="flex min-h-12 flex-1 items-center gap-2.5 rounded-control bg-page px-4">
          <Search className="size-[18px] shrink-0 text-ink-2" />
          <span className="sr-only">Search tutors</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or subject"
            className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-3"
          />
        </label>
        <div className="flex gap-1 overflow-x-auto scrollbar-hide" role="group" aria-label="Filter by subject">
          <button
            onClick={() => setFamily(null)}
            aria-pressed={family === null}
            className={cn(
              "shrink-0 rounded-control px-4 text-sm font-medium transition-colors min-h-12",
              family === null ? "bg-ink text-page" : "hover:bg-page",
            )}
          >
            All subjects
          </button>
          {FILTERABLE.map((f) => (
            <button
              key={f.slug}
              onClick={() => setFamily(f.slug)}
              aria-pressed={family === f.slug}
              className={cn(
                "shrink-0 rounded-control px-4 text-sm font-medium transition-colors min-h-12",
                family === f.slug ? "bg-ink text-page" : "hover:bg-page",
              )}
            >
              {f.name}
            </button>
          ))}
        </div>
      </div>

      {results.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {results.map((t) => (
            <TutorCard key={t.slug} tutor={t} square />
          ))}
        </div>
      ) : (
        <div className="rounded-card bg-card px-6 py-14 text-center">
          <p className="text-lg font-semibold">No tutors match that search.</p>
          <p className="mt-1 text-ink-2">Try another subject, or clear the filters.</p>
          <Button
            variant="secondary"
            className="mt-5"
            onClick={() => {
              setQuery("")
              setFamily(null)
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </>
  )
}
