import type React from "react"
import type { Metadata } from "next"
import { montserrat, playfair } from "../lib/fonts"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Biskentutoringconcepts Home and Online Tutoring - Certified Tutors for Your Child",
  description:
    "Professional home and online tutoring services by certified teachers. Pre-school to secondary education, SATs, IELTS, GCSE/IGCSE and more. Helping children succeed with empathy and expertise.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${montserrat.variable} ${playfair.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
