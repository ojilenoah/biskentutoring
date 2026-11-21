"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Phone,
  Sparkles,
  TrendingUp,
  Users,
  X,
} from "lucide-react"

import { Logo } from "@/components/site/logo"
import { Pencil } from "@/components/site/illustrations"
import { Drift } from "@/components/site/drift"
import { Button } from "@/components/ui/button"
import { firstName, getSession, signOut, useSession, type SessionUser } from "@/lib/auth"
import { CONTACT, families } from "@/lib/content"
import { cn } from "@/lib/utils"

const NAV = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Lessons", icon: CalendarDays },
  { label: "Tutors", icon: Users },
  { label: "Messages", icon: MessageCircle },
]

function greeting() {
  const h = new Date().getHours()
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"
}

const COPY: Record<SessionUser["role"], { lede: string; cta: string; emptyTitle: string; emptyCopy: string; href: string }> = {
  parent: {
    lede: "Everything about your child's learning, in one place.",
    cta: "Book a first lesson",
    emptyTitle: "No lessons booked yet",
    emptyCopy: "Tell us what your child needs and we'll match you with a certified tutor, usually within 24 hours.",
    href: "/enroll",
  },
  student: {
    lede: "Your lessons, tutors and progress live here.",
    cta: "Book a first lesson",
    emptyTitle: "No lessons booked yet",
    emptyCopy: "Pick a subject and we'll match you with a tutor who explains things the way you learn best.",
    href: "/enroll",
  },
  tutor: {
    lede: "Welcome to the team. Let's get your teaching profile ready.",
    cta: "Contact the team",
    emptyTitle: "No students assigned yet",
    emptyCopy: "Once your profile is reviewed, we'll start matching you with learners who fit your subjects.",
    href: "/contact",
  },
}

function DashboardInner() {
  const router = useRouter()
  const params = useSearchParams()
  const user = useSession()
  const [welcome, setWelcome] = useState(params.get("welcome") === "1")

  useEffect(() => {
    if (!getSession()) router.replace("/login")
  }, [router])

  if (!user) {
    return <div className="grid min-h-dvh place-items-center font-mono text-xs tracking-[0.08em] text-ink-3">LOADING…</div>
  }

  const copy = COPY[user.role]
  const initials = user.name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-30 border-b-2 border-rule bg-page">
        <div className="flex h-16 items-center gap-4 px-4 sm:px-7">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="ml-6 hidden items-center gap-1 md:flex" aria-label="Dashboard">
            {NAV.map((n) => (
              <span
                key={n.label}
                aria-current={n.active ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-control px-3 py-2 text-sm font-medium",
                  n.active ? "bg-purple text-white" : "text-ink-3",
                )}
              >
                <n.icon className="size-4" />
                {n.label}
                {!n.active && <span className="rounded-tag bg-sunk px-1.5 font-mono text-[9.5px] text-ink-2">SOON</span>}
              </span>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            <span className="hidden text-right sm:block">
              <span className="block text-sm font-semibold capitalize">{user.name}</span>
              <span className="block font-mono text-[10px] uppercase tracking-[0.06em] text-ink-3">{user.role}</span>
            </span>
            <span className="grid size-10 place-items-center rounded-full bg-lilac font-mono text-sm font-medium">{initials}</span>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Sign out"
              title="Sign out"
              onClick={() => {
                signOut()
                router.push("/")
              }}
            >
              <LogOut />
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 pb-16 pt-8 sm:px-7 sm:pt-10">
        {welcome && (
          <div className="relative mb-8 flex items-center gap-4 rounded-card bg-sage p-4 pr-12">
            <span className="grid size-10 shrink-0 place-items-center rounded-control bg-card">
              <Sparkles className="size-5" />
            </span>
            <p className="text-[15px]">
              <strong className="font-semibold">Your account is ready.</strong> This is an early preview of the Bisken learning app — more is on the
              way.
            </p>
            <button onClick={() => setWelcome(false)} aria-label="Dismiss" className="absolute right-3 top-3 grid size-8 place-items-center rounded-control hover:bg-ink/10">
              <X className="size-4" />
            </button>
          </div>
        )}

        <div className="border-b-2 border-rule pb-6">
          <h1 className="text-[40px] sm:text-[52px]">
            {greeting()}, <span className="capitalize text-purple">{firstName(user)}</span>.
          </h1>
          <p className="mt-3 text-lg text-ink-2">{copy.lede}</p>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          <section className="relative overflow-hidden rounded-panel bg-card p-6 sm:p-7 lg:col-span-2">
            <p className="eyebrow !text-[11px] text-ink-3">{user.role === "tutor" ? "Your students" : "Next lesson"}</p>
            <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <span className="grid size-20 shrink-0 place-items-center rounded-card bg-lilac">
                <CalendarDays className="size-9" />
              </span>
              <div>
                <h2 className="text-[28px] tracking-[-0.03em]">{copy.emptyTitle}</h2>
                <p className="mt-2 max-w-md text-ink-2">{copy.emptyCopy}</p>
              </div>
            </div>
            <div className="mt-7 flex gap-2">
              <Button asChild className="flex-1 sm:flex-none">
                <Link href={copy.href}>
                  {copy.cta} <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="flex-1 sm:flex-none">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Chat with us
                </a>
              </Button>
            </div>
            <Drift className="pointer-events-none absolute -right-2 bottom-4 hidden sm:block" axis="x" distance={8} spin={8} from={{ x: 60 }}>
              <Pencil className="w-[18px] rotate-[60deg]" />
            </Drift>
          </section>

          <section className="flex flex-col rounded-panel bg-purple grain p-6 text-white sm:p-7">
            <h2 className="text-[28px] !text-white">We&apos;re a message away.</h2>
            <div className="mt-auto space-y-2 pt-6">
              <Button asChild variant="surface" className="w-full justify-start">
                <a href={`tel:${CONTACT.phoneIntl}`}>
                  <Phone /> {CONTACT.phone}
                </a>
              </Button>
              <Button asChild variant="surface" className="w-full justify-start">
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> WhatsApp
                </a>
              </Button>
            </div>
          </section>

          <section className="rounded-panel bg-card p-6 sm:p-7">
            <div className="flex items-center justify-between">
              <p className="eyebrow !text-[11px] text-ink-3">Progress</p>
              <span className="rounded-tag bg-sunk px-1.5 py-0.5 font-mono text-[9.5px] text-ink-2">SOON</span>
            </div>
            <div className="mt-6 flex h-28 items-end gap-2 border-b-2 border-rule">
              {[30, 45, 38, 60, 52, 74, 88].map((h, i) => (
                <span key={i} className="flex-1 rounded-t-[3px] bg-lilac" style={{ height: `${h}%` }} />
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-2">
              <TrendingUp className="size-4 text-purple" /> Weekly progress reports will show here.
            </p>
          </section>

          <section className="rounded-panel bg-card p-6 sm:p-7 lg:col-span-2">
            <p className="eyebrow !text-[11px] text-ink-3">{user.role === "tutor" ? "Subjects you can teach" : "Explore subjects"}</p>
            <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {families.map((f) => (
                <Link key={f.slug} href={`/subjects/${f.slug}`} className={cn("grain flex items-center gap-3 rounded-card p-3", f.tint)}>
                  <span className="min-w-0">
                    <span className="block text-[17px] font-bold">{f.name}</span>
                    <span className="block truncate text-[13px] text-ink-2">{f.subjects.join(" · ")}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <p className="mt-8 flex items-center gap-2 border-t-2 border-rule pt-5 text-sm text-ink-3">
          <BookOpen className="size-4" /> Live classes, homework and lesson notes are coming soon.
        </p>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={null}>
      <DashboardInner />
    </Suspense>
  )
}
