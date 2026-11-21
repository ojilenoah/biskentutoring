import { TopNav } from "@/components/site/top-nav"
import { MobileBar } from "@/components/site/mobile-bar"
import { SiteFooter } from "@/components/site/site-footer"

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <TopNav />
      <MobileBar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

/** Standard centred content column inside the shell. */
export const gutter = "mx-auto w-full max-w-[1320px] px-4 sm:px-7"
