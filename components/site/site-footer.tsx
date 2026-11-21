import Link from "next/link"
import { LogoLockup } from "@/components/site/logo"
import { CONTACT } from "@/lib/content"

const COLUMNS = [
  {
    title: "Learn",
    links: [
      { label: "Find a tutor", href: "/tutors" },
      { label: "Subjects", href: "/subjects" },
      { label: "How it works", href: "/how-it-works" },
      { label: "About", href: "/about" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Create account", href: "/signup" },
      { label: "Log in", href: "/login" },
      { label: "Teach with us", href: "/signup?role=tutor" },
      { label: "Enroll", href: "/enroll" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: CONTACT.phone, href: `tel:${CONTACT.phoneIntl}` },
      { label: "WhatsApp", href: CONTACT.whatsapp },
      { label: CONTACT.email, href: `mailto:${CONTACT.email}` },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-ink text-page/75">
      <div className="px-5 pb-7 pt-12 sm:px-10 lg:px-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
          <div className="col-span-2 flex max-w-md items-center gap-4 md:col-span-1">
            <span className="inline-block shrink-0 rounded-card bg-card p-3">
              <LogoLockup className="w-24" />
            </span>
            <p className="text-sm leading-relaxed">Certified tutors, personalised learning and real progress — from pre-school to A-levels, at home or online.</p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="eyebrow !text-[11px] !font-normal !tracking-[0.1em] !text-[#c9a8f5]">{col.title}</h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="break-all text-sm text-page/80 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="mt-10 select-none overflow-hidden text-[26vw] font-bold leading-[0.8] tracking-[-0.07em] text-page/[0.06] lg:text-[200px]">
          bisken
        </div>
        <div className="mt-5 flex flex-col gap-1 border-t border-page/15 pt-5 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Bisken Tutoring Concepts. All rights reserved.</p>
          <p className="font-mono tracking-[0.08em] text-page/50">PRE-SCHOOL TO A-LEVEL · ONLINE &amp; AT HOME</p>
        </div>
      </div>
    </footer>
  )
}
