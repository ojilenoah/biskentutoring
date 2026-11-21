import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { PaperClip } from "@/components/site/illustrations"
import { Drift } from "@/components/site/drift"
import { Breadcrumb, PageBar, SectionHead } from "@/components/site/structure"
import { gutter } from "@/components/site/site-shell"
import { CopyEmail } from "./copy-email"
import { CONTACT } from "@/lib/content"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Contact | Bisken Tutoring Concepts",
  description: "Call, WhatsApp or email Bisken Tutoring Concepts about enrollment, questions or a trial session.",
}

const CHANNELS = [
  { icon: Phone, label: "Call", value: CONTACT.phone, href: `tel:${CONTACT.phoneIntl}`, tint: "bg-lilac", external: false },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: CONTACT.whatsapp, tint: "bg-sage", external: true },
  { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, tint: "bg-sand", external: false },
]

export default function ContactPage() {
  return (
    <>
      <PageBar
        cells={[
          <Breadcrumb key="b" items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />,
          <span key="p">{CONTACT.phone}</span>,
          <span key="e" className="truncate normal-case">{CONTACT.email}</span>,
        ]}
      />
      <div className={cn(gutter, "relative pb-20 pt-8 sm:pt-12")}>
        <SectionHead as="h1" eyebrow="Contact" title="Get in touch" />
        <p className="max-w-xl text-lg text-ink-2">Reach out for enrollment, questions, or to schedule a trial session.</p>

        <div className="relative mt-10 grid gap-3 md:grid-cols-3">
          <Drift className="pointer-events-none absolute -top-9 left-[22%] z-10 hidden md:block" distance={6} from={{ y: -40, rotate: -30 }}>
            <PaperClip className="w-[36px] rotate-[10deg]" />
          </Drift>
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className={cn("grain group flex min-h-[200px] flex-col rounded-card p-6", c.tint)}
            >
              <div className="flex items-start justify-between">
                <c.icon className="size-6" aria-hidden="true" />
                <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </div>
              <p className="eyebrow mt-auto text-ink-3">{c.label}</p>
              <p className="mt-1.5 break-all text-[22px] font-semibold tracking-[-0.02em]">{c.value}</p>
            </a>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-4 rounded-card bg-card p-5">
          <p className="text-[15px] text-ink-2">Prefer to fill in a form? Tell us about your child and the subjects you need.</p>
          <div className="flex gap-2">
            <CopyEmail />
            <Button asChild>
              <Link href="/enroll">
                Enrollment form <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
