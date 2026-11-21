import Link from "next/link"
import { ArrowRight, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HeroFigure } from "@/components/site/hero-figure"
import { PaperClip, Ruler, ScribbleCircle } from "@/components/site/illustrations"
import { Drift } from "@/components/site/drift"
import { SectionHead } from "@/components/site/structure"
import { TutorCard } from "@/components/site/tutor-card"
import { gutter } from "@/components/site/site-shell"
import { TestimonialMarquee } from "@/components/site/testimonial-marquee"
import { CONTACT, CTA_KID, HERO_KIDS, HOW_KIDS, STEPS, allTutors, families } from "@/lib/content"
import { cn } from "@/lib/utils"

/* Bento layout for the five subject families + a help tile. */
/* The "tell us about your child" tile is the hero of the grid.
   Phone: 2 columns   [? ?][? ?][M M][S L][E C]
   Desktop: 4 columns [? ? M M][? ? S L][E E C C] */
const BENTO: Record<string, { span: string }> = {
  maths: { span: "col-span-2" },
  sciences: { span: "" },
  languages: { span: "" },
  exams: { span: "sm:col-span-2" },
  creative: { span: "sm:col-span-2" },
}


export default function HomePage() {
  const featured = allTutors.slice(0, 4)

  return (
    <>
      {/* ================= HERO: its own coloured band ================= */}
      <div className="grain relative overflow-hidden rounded-b-[10px] bg-lilac">
        <div className={gutter}>
          <section className="relative flex flex-col items-center justify-center lg:min-h-[calc(100dvh-96px)]">
            <div className="relative z-10 mx-auto flex max-w-[820px] flex-col items-center pb-6 pt-10 text-center sm:pt-14 lg:pb-10 lg:pt-0">
              <h1 className="text-[32px] leading-[1.05] sm:text-[50px] xl:text-[60px]">
                Unlock your child&apos;s{" "}
                <span className="relative inline-block whitespace-nowrap text-[#d9690f]">
                  <span className="relative z-10">potential</span>
                  <ScribbleCircle className="absolute -inset-x-[14%] -inset-y-[24%] z-0 h-[148%] w-[128%] max-w-none" />
                </span>{" "}
                with <span className="text-purple">expert tutors.</span>
              </h1>
              <p className="mt-5 max-w-[480px] text-[15.5px] text-ink-2 sm:mt-6 sm:text-[17px]">
                Tutoring that builds confidence and delivers results, trusted by over 100 families.
              </p>
              <div className="mt-7 flex w-full justify-center gap-2 sm:w-auto">
                <Button asChild size="lg" className="flex-1 sm:flex-none">
                  <Link href="/enroll">
                    Enroll your child <ArrowRight />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="surface" className="flex-1 sm:flex-none">
                  <Link href="/tutors">Find a tutor</Link>
                </Button>
              </div>
  
            </div>
  
            {/* phones/tablets: kids first, then the drawings */}
            <HeroFigure kids={HERO_KIDS} className="relative z-0 h-[215px] w-full lg:hidden" />
            {/* desktop: faint drawings tucked into the top-right corner */}
            <HeroFigure className="hidden lg:absolute lg:-right-[12%] lg:-top-24 lg:z-0 lg:flex lg:w-[58%] lg:-rotate-12 lg:opacity-35" />
  
            {/* ruler slides in from the page's left edge, below the buttons */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-6 z-10 lg:bottom-10"
              style={{ left: "calc((100% - 100vw) / 2)" }}
            >
              <Drift axis="x" distance={8} spin={7} from={{ x: -120 }}>
                <Ruler className="w-[150px] -translate-x-[66%] -rotate-45 lg:w-[220px]" />
              </Drift>
            </div>
  
          </section>
        </div>

        {/* kid cut-outs rise from the band's bottom-right edge (add files in lib/content.ts HERO_KIDS) */}
        {HERO_KIDS.length > 0 && (
          <div className="pointer-events-none absolute -bottom-12 right-[2%] z-20 hidden items-end lg:flex">
            {HERO_KIDS.map((k, i) => (
              <Drift key={k.src} distance={8} from={{ y: 340 }} className={i > 0 ? "-ml-8" : ""}>
                <img src={k.src} alt={k.alt} className={cn("block w-auto origin-bottom select-none", k.height, k.tilt)} draggable={false} />
              </Drift>
            ))}
          </div>
        )}
      </div>

      <div className="relative overflow-x-clip">
      <div className={cn(gutter, "relative pb-6")}>

        {/* ================= SUBJECTS (bento) ================= */}
        <section className="relative pt-12 lg:pt-14">
          <SectionHead
            eyebrow="Subjects"
            title="Subjects available"
            action={
              <Button asChild variant="surface" size="sm">
                <Link href="/subjects">
                  All subjects <ArrowRight />
                </Link>
              </Button>
            }
          />
          <div className="relative grid auto-rows-[124px] grid-cols-2 gap-2 sm:auto-rows-[150px] sm:grid-cols-4 sm:gap-3">
            <Drift className="pointer-events-none absolute -top-9 left-[68%] z-10" distance={6} from={{ y: -40, rotate: -30 }}>
              <PaperClip className="w-[36px] rotate-[12deg]" />
            </Drift>
            <Link
              href="/enroll"
              className="grain group col-span-2 row-span-2 flex min-w-0 flex-col justify-between gap-4 rounded-card bg-ink p-5 text-page sm:p-7"
            >
              <span className="block max-w-[460px] text-[26px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[40px]">
                Tell us about your child and we&apos;ll suggest a plan.
              </span>
              <span className="flex flex-wrap items-end justify-between gap-3">
                <span className="max-w-[300px] text-[13.5px] text-page/70 sm:text-[15px]">Not sure which subject or level to start with? We&apos;ll help you choose.</span>
                <span className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-control bg-purple px-4 text-[14px] font-medium text-white transition-colors group-hover:bg-purple-2 sm:h-11">
                  Ask us <ArrowRight className="size-4" />
                </span>
              </span>
            </Link>
            {families.map((f) => {
              const b = BENTO[f.slug]
              return (
                <Link
                  key={f.slug}
                  href={`/subjects/${f.slug}`}
                  className={cn("grain group relative flex min-w-0 flex-col overflow-hidden rounded-card p-3.5 sm:p-4", f.tint, b.span)}
                >
                  <h3 className="text-[20px] font-bold leading-none tracking-[-0.03em] sm:text-[28px]">{f.name}</h3>
                  <p className="mt-2 line-clamp-2 max-w-[400px] pr-8 text-[12.5px] leading-snug text-ink-2 sm:text-[13.5px]">
                    {f.subjects.join(" · ")}
                  </p>
                  <span className="absolute bottom-3 right-3 grid size-7 place-items-center rounded-full bg-white/55 transition-transform group-hover:translate-x-1 sm:size-8">
                    <ArrowRight className="size-3.5" />
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ================= HOW IT WORKS (purple panel) ================= */}
        <section className="grain relative left-1/2 mt-12 w-screen -translate-x-1/2 bg-purple text-white">
          <div className="mx-auto grid grid-cols-1 max-w-[1320px] gap-6 px-4 py-8 sm:px-7 sm:py-12 lg:grid-cols-2">
          {/* clip only the bottom edge: kids rise out of it, and the tallest one breaks out over the top */}
          <div className="relative mt-16 h-[150px] rounded-card bg-purple-2 [clip-path:inset(-900px_-60px_0_-60px_round_0_0_var(--radius-card)_var(--radius-card))] lg:mt-0 lg:h-auto lg:min-h-[400px]">
            <div className="pointer-events-none absolute inset-x-0 -bottom-[230px] flex items-end justify-center lg:-bottom-10">
              {HOW_KIDS.map((k, i) => (
                <Drift
                  key={k.src}
                  distance={k.center ? 12 : 8}
                  from={{ y: 420 }}
                  className={cn("relative", k.center ? "z-20" : "z-10")}
                >
                  <img src={k.src} alt={k.alt} className={cn("block w-auto select-none", k.height)} draggable={false} />
                </Drift>
              ))}
            </div>
            <span className="absolute left-5 top-4 font-mono text-[10.5px] tracking-[0.06em] text-purple-ink">READY FOR CLASS</span>
          </div>
          <div className="flex flex-col">
            <h2 className="mb-5 text-[34px] !text-white sm:text-[44px]">How it works</h2>
            <ol>
              {STEPS.map((s) => (
                <li key={s.n} className="grid grid-cols-[52px_1fr] border-t-2 border-rule py-4">
                  <span className="font-mono text-[13px] text-purple-ink">{s.n}</span>
                  <span>
                    <span className="block text-lg font-semibold">{s.title}</span>
                    <span className="mt-1 block text-[15px] text-purple-ink">{s.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-auto grid grid-cols-[1fr_auto] border-y-2 border-rule font-mono text-xs">
              <span className="py-2.5">Bisken Tutoring Concepts</span>
              <span className="border-l-2 border-rule py-2.5 pl-4">{new Date().getFullYear()}</span>
            </div>
            <Button asChild variant="surface" className="mt-5 self-end lg:self-start">
              <Link href="/how-it-works">
                More about how it works <ArrowRight />
              </Link>
            </Button>
          </div>
          </div>
        </section>

        {/* ================= TUTORS ================= */}
        <section className="pt-12 lg:pt-14">
          <SectionHead
            eyebrow="Tutors"
            title="Our tutors"
            action={
              <Button asChild variant="surface" size="sm">
                <Link href="/tutors">
                  All tutors <ArrowRight />
                </Link>
              </Button>
            }
          />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {featured.map((t) => (
              <TutorCard key={t.slug} tutor={t} square />
            ))}
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section className="pb-12 pt-12 lg:pt-14">
          <SectionHead title="What parents say" />
          <TestimonialMarquee />
        </section>

        {/* ================= CTA ================= */}
        <section className="relative mb-2 mt-20 flex min-h-[280px] flex-col justify-between gap-6 rounded-panel bg-sunk grain p-5 sm:p-10 md:mt-16 md:min-h-[290px] md:justify-center md:pr-[300px] lg:min-h-[330px] lg:p-12 lg:pr-[340px]">
          {/* kid stands flush to the card's right edge; her head rises out above the top and
              her cut-off bottom always sits below the card's bottom edge, which clips it */}
          <div className="pointer-events-none absolute inset-0 [clip-path:inset(-600px_0_0_0_round_0_0_var(--radius-panel)_var(--radius-panel))]">
            <Drift className="absolute -bottom-10 right-0" distance={6} from={{ y: 60 }}>
              <img src={CTA_KID.src} alt={CTA_KID.alt} className="block h-[380px] w-auto select-none md:h-[390px] lg:h-[440px]" draggable={false} />
            </Drift>
          </div>
          <h2 className="relative z-10 pr-[120px] text-[30px] sm:pr-[200px] sm:text-[44px] md:pr-0 md:text-[52px]">
            Let&apos;s start your child&apos;s <span className="text-purple">journey.</span>
          </h2>
          <div className="relative z-10 flex gap-2">
            <Button asChild size="lg" className="flex-1 sm:flex-none">
              <Link href="/enroll">
                Enroll now <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="surface" className="flex-1 sm:flex-none">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </div>
      </div>
    </>
  )
}
