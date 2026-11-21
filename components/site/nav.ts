export const NAV = [
  { label: "Home", href: "/" },
  { label: "Find a tutor", href: "/tutors" },
  { label: "Subjects", href: "/subjects" },
  { label: "How it works", href: "/how-it-works" },
  { label: "About", href: "/about" },
  { label: "Enroll", href: "/enroll" },
  { label: "Contact", href: "/contact" },
] as const

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/")
}
