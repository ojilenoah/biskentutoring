import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/*
 * The structural moments of the system: ruled bars and ruled section heads.
 * Everything else is flat cards on the page.
 */

/** Full-bleed ruled strip of cells across the top of a page. */
export function PageBar({ cells, className }: { cells: React.ReactNode[]; className?: string }) {
  return (
    <div
      className={cn(
        "hidden border-b-2 border-rule font-mono text-[11.5px] tracking-[0.06em] sm:grid",
        className,
      )}
      style={{ gridTemplateColumns: `minmax(0, 1.4fr) repeat(${cells.length - 1}, minmax(0, 1fr))` }}
    >
      {cells.map((c, i) => (
        <div key={i} className={cn("flex min-w-0 items-center gap-2 px-6 py-3.5 uppercase", i < cells.length - 1 && "border-r-2 border-rule")}>
          {c}
        </div>
      ))}
    </div>
  )
}

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 normal-case">
      {items.map((it, i) => (
        <span key={i} className="flex min-w-0 items-center gap-1.5">
          {i > 0 && <ChevronRight className="size-3.5 shrink-0 text-ink-3" />}
          {it.href ? (
            <Link href={it.href} className="truncate underline-offset-4 hover:text-purple hover:underline">
              {it.label}
            </Link>
          ) : (
            <span className="truncate text-ink-3" aria-current="page">
              {it.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  )
}

/** Eyebrow + title + optional action, sitting on a 1px ink rule. */
export function SectionHead({
  eyebrow,
  title,
  action,
  as: Tag = "h2",
  className,
  tone = "ink",
}: {
  eyebrow?: string
  title: React.ReactNode
  action?: React.ReactNode
  as?: "h1" | "h2"
  className?: string
  tone?: "ink" | "paper"
}) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-wrap items-end justify-between gap-4 border-b-2 pb-5",
        tone === "ink" ? "border-rule" : "border-rule",
        className,
      )}
    >
      <div className="min-w-0">
        <Tag
          className={cn(
            "",
            Tag === "h1" ? "text-[44px] sm:text-[64px]" : "text-[34px] sm:text-[52px]",
            tone === "paper" && "!text-white",
          )}
        >
          {title}
        </Tag>
      </div>
      {action}
    </div>
  )
}
