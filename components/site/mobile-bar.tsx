"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"

import { Logo } from "@/components/site/logo"
import { NAV, isActive } from "@/components/site/nav"
import { Button } from "@/components/ui/button"
import { useSession } from "@/lib/auth"
import { CONTACT } from "@/lib/content"
import { cn } from "@/lib/utils"

/** Phone/tablet navigation: slim top bar + full-screen index. */
export function MobileBar() {
  const pathname = usePathname()
  const user = useSession()
  const [open, setOpen] = useState(false)

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-40 flex items-center justify-between border-b-2 border-rule bg-page py-2.5 pl-4 pr-3 lg:hidden">
        <Link href="/" aria-label="Bisken home">
          <Logo />
        </Link>
        <Button variant="surface" size="icon" onClick={() => setOpen(true)} aria-expanded={open} aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-page transition-[opacity,visibility] duration-200 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Site index"
      >
        <div className="flex items-center justify-between border-b-2 border-rule py-2.5 pl-4 pr-3">
          <Logo />
          <Button variant="surface" size="icon" onClick={() => setOpen(false)} aria-label="Close index">
            <X />
          </Button>
        </div>
        <nav aria-label="Main" className="flex-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "block border-b-2 border-rule px-4 py-4 text-[28px] font-semibold tracking-[-0.04em]",
                  active && "text-purple",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="flex gap-2 p-4">
          {user ? (
            <Button asChild className="flex-1">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button asChild className="flex-1">
                <Link href="/signup">Create account</Link>
              </Button>
              <Button asChild variant="secondary" className="flex-1">
                <Link href="/login">Log in</Link>
              </Button>
            </>
          )}
        </div>
        <a
          href={CONTACT.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 border-t-2 border-rule px-4 py-3 font-mono text-xs text-ink-2"
        >
          {CONTACT.phone} · WhatsApp <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </>
  )
}
