import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/site/logo"
import { Pencil, Ruler } from "@/components/site/illustrations"
import { Drift } from "@/components/site/drift"

/**
 * Split layout for auth screens: form on the page (left), purple brand panel
 * (right, desktop only).
 */
export function AuthShell({
  children,
  aside,
}: {
  children: React.ReactNode
  aside: { eyebrow: string; title: React.ReactNode; quote: string; author: string; role: string; image: string }
}) {
  return (
    <div className="grid grid-cols-1 min-h-dvh lg:grid-cols-[1fr_1.05fr]">
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b-2 border-rule px-5 py-3.5 sm:px-8">
          <Link href="/" aria-label="Bisken home">
            <Logo />
          </Link>
          <Link href="/" className="flex items-center gap-1.5 font-mono text-[11.5px] tracking-[0.06em] text-ink-2 hover:text-purple">
            <ArrowLeft className="size-3.5" /> BACK TO SITE
          </Link>
        </div>
        <main className="mx-auto flex w-full max-w-[440px] flex-1 flex-col justify-center px-5 py-12">{children}</main>
        <p className="border-t-2 border-rule px-5 py-3 text-center font-mono text-[10.5px] tracking-[0.06em] text-ink-3">
          PREVIEW BUILD · ACCOUNTS ARE STORED ON THIS DEVICE ONLY
        </p>
      </div>

      <aside className="relative hidden p-4 lg:block">
        <div className="relative flex h-full flex-col overflow-hidden rounded-panel bg-purple grain text-white">
          <div className="flex justify-between border-b-2 border-rule px-8 py-4 font-mono text-[11.5px] tracking-[0.08em] text-purple-ink">
            <span>{aside.eyebrow.toUpperCase()}</span>
            <span>BISKEN</span>
          </div>
          <div className="px-10 pt-10 xl:px-14">
            <h2 className="max-w-md text-[48px] leading-[0.98] !text-white xl:text-[60px]">{aside.title}</h2>
          </div>

          <div className="relative mx-auto mt-auto w-full max-w-[460px] px-10 pb-14">
            <div aria-hidden="true" className="pointer-events-none absolute -top-[56px] right-14 h-[58px] w-[90px] overflow-hidden">
              <Drift className="absolute left-8 top-0" distance={6} spin={8} from={{ y: 70 }} style={{ transformOrigin: "50% 100%" }}>
                <Pencil className="rotate-[205deg]" />
              </Drift>
            </div>
            <div className="overflow-hidden rounded-card bg-purple-2">
              <img src={aside.image} alt="" className="aspect-[4/3] w-full object-cover mix-blend-multiply grayscale contrast-[1.05]" />
            </div>
            <figure className="relative -mt-14 ml-8 rounded-card bg-card p-5 text-ink">
              <blockquote className="text-[15px] leading-snug">&ldquo;{aside.quote}&rdquo;</blockquote>
              <figcaption className="mt-3 text-sm font-semibold">
                {aside.author} <span className="ml-1 font-mono text-[10.5px] font-normal text-ink-3">{aside.role.toUpperCase()}</span>
              </figcaption>
            </figure>
          </div>

          <div className="grid grid-cols-3 border-t-2 border-rule font-mono text-[10.5px] tracking-[0.06em] text-purple-ink">
            <span className="border-r-2 border-rule px-5 py-3">1-TO-1 &amp; GROUPS</span>
            <span className="border-r-2 border-rule px-5 py-3">PRE-SCHOOL TO A-LEVEL</span>
            <span className="px-5 py-3">ONLINE &amp; AT HOME</span>
          </div>
          <Drift className="pointer-events-none absolute -right-24 top-1/2 hidden xl:block" axis="x" distance={14} from={{ x: 120 }}>
            <Ruler className="w-[260px] rotate-[80deg] opacity-90" />
          </Drift>
        </div>
      </aside>
    </div>
  )
}

export function AuthDivider({ label = "or" }: { label?: string }) {
  return (
    <div className="flex items-center gap-3" role="separator">
      <span className="h-0.5 flex-1 bg-rule" />
      <span className="font-mono text-[10.5px] tracking-[0.08em] text-ink-3">{label.toUpperCase()}</span>
      <span className="h-0.5 flex-1 bg-rule" />
    </div>
  )
}

export function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.8-5.5 3.8-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.2 14.6 2.2 12 2.2 6.6 2.2 2.2 6.6 2.2 12s4.4 9.8 9.8 9.8c5.7 0 9.4-4 9.4-9.6 0-.6-.1-1.1-.2-1.6H12z" />
    </svg>
  )
}
