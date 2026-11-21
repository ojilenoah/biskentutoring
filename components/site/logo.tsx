import { cn } from "@/lib/utils"

/*
 * The real Bisken logo, cut to transparent PNGs from public/tutors/logo.jpg
 * (see public/brand/). Colours are untouched.
 */

/** The "B" mark on its own (speech bubble + open book). */
export function LogoMark({ className }: { className?: string }) {
  return <img src="/brand/bisken-mark.png" alt="Bisken" width={233} height={256} className={cn("h-9 w-auto", className)} />
}

/** Horizontal lockup for bars: B mark + BISKEN wordmark. */
export function Logo({ className, wordmark = true }: { className?: string; wordmark?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <img src="/brand/bisken-mark.png" alt={wordmark ? "" : "Bisken"} width={233} height={256} className="h-9 w-auto" />
      {wordmark && (
        <img src="/brand/bisken-wordmark.png" alt="Bisken Tutoring Concepts" width={512} height={96} className="h-[17px] w-auto" />
      )}
    </span>
  )
}

/** The full stacked lockup with "Tutoring Concepts", for larger placements. */
export function LogoLockup({ className }: { className?: string }) {
  return <img src="/brand/bisken-logo.png" alt="Bisken Tutoring Concepts" width={428} height={480} className={cn("h-auto w-28", className)} />
}
