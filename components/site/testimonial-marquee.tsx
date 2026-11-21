import { testimonials } from "@/lib/content"
import { cn } from "@/lib/utils"

const TINTS = ["bg-card", "bg-lilac", "bg-sand", "bg-sage"]

/**
 * All parent testimonials scrolling in one slim row. The list is rendered
 * twice and the track slides by exactly half its width, so the loop is
 * seamless. Hover (or focus) pauses it.
 */
export function TestimonialMarquee() {
  const row = [...testimonials, ...testimonials]
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <ul className="flex w-max animate-marquee py-1 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
        {row.map((t, i) => (
          <li
            key={i}
            aria-hidden={i >= testimonials.length ? true : undefined}
            className={cn("grain mr-3 flex min-h-[168px] w-[290px] shrink-0 flex-col rounded-card p-5 sm:w-[340px]", TINTS[i % TINTS.length])}
          >
            <p className="line-clamp-4 text-[15px] leading-snug tracking-[-0.005em]">&ldquo;{t.text}&rdquo;</p>
            <p className="mt-auto pt-4 text-[13px]">
              <span className="font-semibold">{t.name}</span>
              <span className="text-ink-3"> · {t.role === "Dr" ? "Parent" : t.role}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
