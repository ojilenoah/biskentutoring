import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Bisken Tutoring - Nigeria's Leading Tutoring Company | Home & Online Tutoring",
  description:
    "Bisken Tutoring Concepts: Nigeria's leading certified tutoring company offering professional home and online tutoring services. Expert tutors for Pre-school to Secondary, SATs, IELTS, GCSE/IGCSE preparation. Personalized education with empathy and expertise.",
  generator: "v0.app",
  keywords: [
    "tutoring Nigeria",
    "online tutoring",
    "home tutoring",
    "certified tutors",
    "secondary education tutoring",
    "IELTS preparation",
    "GCSE tutoring",
    "IGCSE tutoring",
    "SAT preparation",
    "Bisken Tutoring",
    "professional tutoring services",
    "education Nigeria",
    "tutorial services Lagos",
    "English tutoring",
    "mathematics tutoring",
    "science tutoring",
    "personalized learning",
    "academic excellence"
  ],
  authors: [{ name: "Bisken Tutoring Concepts", url: "https://biskentutoring.com" }],
  creator: "Bisken Tutoring Concepts",
  publisher: "Bisken Tutoring Concepts",
  formatDetection: {
    email: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://biskentutoring.com",
    siteName: "Bisken Tutoring Concepts",
    title: "Bisken Tutoring - Nigeria's Leading Tutoring Company",
    description:
      "Professional home and online tutoring services by certified tutors in Nigeria. Excellence in education from Pre-school to Secondary.",
    images: [
      {
        url: "https://biskentutoring.com/tutors/logo.jpg",
        width: 1024,
        height: 1024,
        alt: "Bisken Tutoring Concepts Logo",
        type: "image/jpeg",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Bisken Tutoring - Nigeria's Leading Tutoring Company",
    description: "Professional home and online tutoring by certified tutors",
    images: ["https://biskentutoring.com/tutors/logo.jpg"],
    creator: "@biskentutoring",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://biskentutoring.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/tutors/logo.jpg" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#5B21B6" />
        <meta name="msapplication-TileColor" content="#5B21B6" />
        
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
        
        {/* Structured Data - Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Bisken Tutoring Concepts",
              alternateName: "Bisken Tutoring",
              url: "https://biskentutoring.com",
              logo: "https://biskentutoring.com/tutors/logo.jpg",
              description: "Nigeria's leading tutoring company offering professional home and online tutoring services",
              sameAs: [
                "https://www.facebook.com/biskentutoring",
                "https://www.instagram.com/biskentutoring",
                "https://www.twitter.com/biskentutoring",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Service",
                telephone: "+234-706-725-6623",
                email: "biskentutoring@gmail.com",
              },
              areaServed: "NG",
              priceRange: "$",
            }),
          }}
        />
        
        {/* Structured Data - Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Bisken Tutoring Concepts",
              image: "https://biskentutoring.com/tutors/logo.jpg",
              description: "Professional tutoring services for home and online learning",
              telephone: "+234-706-725-6623",
              email: "biskentutoring@gmail.com",
              url: "https://biskentutoring.com",
              priceRange: "$",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "150"
              }
            }),
          }}
        />
      </head>
      <body className={`font-sans`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
