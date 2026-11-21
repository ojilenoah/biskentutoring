import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { TutorEntry } from "@/lib/content"
import { cn } from "@/lib/utils"

/**
 * Duotone photo treatment: the photo goes greyscale and is multiplied onto
 * the tile's pastel tint, so every tutor gets a soft colour wash.
 * Hovering restores the original colours.
 */
export function TutorPhoto({
  tutor,
  className,
  imgClassName,
  priority,
}: {
  tutor: TutorEntry
  className?: string
  imgClassName?: string
  priority?: boolean
}) {
  return (
    <div className={cn("overflow-hidden rounded-control", tutor.tint, className)}>
      <img
        src={tutor.image}
        alt={tutor.name}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn("block size-full object-cover mix-blend-multiply grayscale contrast-[1.05] group-hover:grayscale-0", imgClassName)}
      />
    </div>
  )
}

/** Text scales down on narrow cards; names wrap instead of overflowing. */
export function TutorCard({ tutor, square = false }: { tutor: TutorEntry; square?: boolean }) {
  return (
    <Link
      href={`/tutors/${tutor.slug}`}
      className="group flex min-w-0 flex-col rounded-card bg-card p-2 pb-3 transition-colors hover:bg-white sm:p-2.5 sm:pb-4"
    >
      <div className="relative">
        <TutorPhoto tutor={tutor} className={square ? "aspect-square" : "aspect-[4/5]"} />
        {tutor.role && (
          <span className="absolute left-2 top-2 rounded-tag bg-card/95 px-1.5 py-0.5 font-mono text-[9.5px] tracking-[0.06em] sm:left-2.5 sm:top-2.5 sm:px-2 sm:py-1 sm:text-[10.5px]">
            {tutor.role.toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col px-1 pt-2.5 sm:px-2 sm:pt-3.5">
        <h3 className="break-words text-[15px] leading-tight tracking-[-0.01em] sm:text-[17px] lg:text-[18px]">{tutor.name}</h3>
        <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-ink-2 sm:mt-1.5 sm:text-[13.5px]">{tutor.tags.join(" · ")}</p>
        <span className="mt-auto flex items-center justify-between gap-2 pt-3 text-[13px] font-medium sm:pt-4 sm:text-[13.5px]">
          <span className="inline-flex w-full items-center justify-center gap-1.5 rounded-control bg-page px-3 py-1.5 transition-colors group-hover:bg-lilac sm:w-auto">
            View <ArrowRight className="size-3.5" />
          </span>
        </span>
      </div>
    </Link>
  )
}
