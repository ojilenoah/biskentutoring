"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { LayoutDashboard, LogOut } from "lucide-react"

import { Logo } from "@/components/site/logo"
import { NAV, isActive } from "@/components/site/nav"
import { Button } from "@/components/ui/button"
import AdminLoginModal from "@/components/AdminLoginModal"
import AdminMessagesModal from "@/components/AdminMessagesModal"
import { firstName, signOut, useSession } from "@/lib/auth"
import { cn } from "@/lib/utils"

/** Desktop navigation: one ruled bar across the top with the page tabs. */
export function TopNav() {
  const pathname = usePathname()
  const router = useRouter()
  const user = useSession()
  const [adminLogin, setAdminLogin] = useState(false)
  const [adminMessages, setAdminMessages] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Hidden admin entry kept from the original site: hold the logo for 3s.
  const press = () => {
    timer.current = setTimeout(() => setAdminLogin(true), 3000)
  }
  const release = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }

  return (
    <header className="sticky top-0 z-40 hidden border-b-2 border-rule bg-page lg:block">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-7">
        <Link
          href="/"
          aria-label="Bisken home"
          className="shrink-0"
          onMouseDown={press}
          onMouseUp={release}
          onMouseLeave={release}
          onTouchStart={press}
          onTouchEnd={release}
          onContextMenu={(e) => e.preventDefault()}
        >
          <Logo className="[&>img:last-child]:hidden xl:[&>img:last-child]:block" />
        </Link>

        <nav aria-label="Main" className="mx-auto flex items-center gap-0.5">
          {NAV.map((item) => {
            const active = isActive(pathname, item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1.5 rounded-control px-3 py-2 text-[14.5px] font-medium transition-colors",
                  active ? "bg-purple text-white" : "text-ink hover:bg-ink/[0.05]",
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {user ? (
            <>
              <Button asChild size="sm">
                <Link href="/dashboard">
                  <LayoutDashboard /> {firstName(user)}
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Sign out"
                onClick={() => {
                  signOut()
                  router.push("/")
                }}
              >
                <LogOut />
              </Button>
            </>
          ) : (
            <>
              <Button asChild size="sm" variant="secondary">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Create account</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <AdminLoginModal open={adminLogin} onOpenChange={setAdminLogin} onLoginSuccess={() => setAdminMessages(true)} />
      <AdminMessagesModal open={adminMessages} onOpenChange={setAdminMessages} />
    </header>
  )
}
