"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EnrollModal from "@/components/enroll-modal"
import AdminLoginModal from "@/components/AdminLoginModal"
import AdminMessagesModal from "@/components/AdminMessagesModal"
import {
  MessageCircle,
  Phone,
  Mail,
  BookOpen,
  Users,
  Clock,
  GraduationCap,
  Heart,
  Brain,
  Hand,
  Calculator,
  Microscope,
  FileText,
  BookMarked,
  TrendingUp,
  Building,
  Music,
  Code,
  Lightbulb,
  Languages,
  Palette,
  Menu,
  X,
  Award,
  Star,
} from "lucide-react"
import WordConnectionGame from "@/components/interactive/WordConnectionGame"
// CursorTracker removed from hero rotation to avoid arrow card
import MathPillGame from "@/components/interactive/MathPillGame"

// Animated count-up driven by framer-motion, fires when scrolled into view
function CountUp({ to, suffix = "", duration = 1.6 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const mv = useMotionValue(0)
  const display = useTransform(mv, (latest) => `${Math.round(latest)}${suffix}`)
  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration, ease: [0.22, 1, 0.36, 1] })
      return controls.stop
    }
  }, [inView, to, duration, mv])
  return <motion.span ref={ref}>{display}</motion.span>
}

// Stagger container for scroll-reveal grids
const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const staggerItem = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any } },
}

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedTutor, setSelectedTutor] = useState<any>(null)
  const [isEnrollOpen, setIsEnrollOpen] = useState(false)
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false)
  const [isAdminMessagesOpen, setIsAdminMessagesOpen] = useState(false)
  const [heroCardIndex, setHeroCardIndex] = useState(0)
  const [specialCardIndex, setSpecialCardIndex] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const testimonialRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)

  const heroItems: Array<any> = [
    { type: 'image', src: '/african-american-female-tutor-helping-teenagers-with-math.jpg', duration: 6000 },
    { type: 'component', Component: WordConnectionGame, duration: 9000 },
    { type: 'image', src: '/black-male-teacher-leading-group-study-session-teenagers.jpg', duration: 6000 },
    { type: 'image', src: '/african-american-tutor-online-session-with-teenage-student.jpg', duration: 6000 },
    { type: 'component', Component: MathPillGame, duration: 9000 },
    { type: 'image', src: '/black-female-teacher-helping-teenager-with-science-homework.jpg', duration: 6000 },
  ]

  const specialImages = [
    "/african-american-male-tutor-one-on-one-with-teenager.jpg",
    "/black-female-teacher-using-hands-on-learning-methods.jpg",
    "/african-american-tutor-working-with-special-needs-student.jpg",
  ]

  useEffect(() => {
    setIsVisible(true)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    )

    const animateElements = document.querySelectorAll(
      ".scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale",
    )
    animateElements.forEach((el) => observerRef.current?.observe(el))

    // Special-care images are click-to-advance only; no auto-rotation for a calmer feel.

    const handleWheel = (e: WheelEvent) => {
      if (testimonialRef.current) {
        e.preventDefault()
        testimonialRef.current.scrollLeft += e.deltaY
      }
    }

    const testimonialElement = testimonialRef.current
    if (testimonialElement) {
      testimonialElement.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      observerRef.current?.disconnect()
      if (testimonialElement) {
        testimonialElement.removeEventListener("wheel", handleWheel)
      }
    }
  }, [])

  // Note: hero items are driven by `heroItems` + `heroCardIndex` below so each item
  // displays for its configured `duration` before advancing.

  const handleHeroCardClick = () => {
    setHeroCardIndex((prev) => (prev + 1) % heroItems.length)
  }

  const handleSpecialCardClick = () => {
    setSpecialCardIndex((prev) => (prev + 1) % specialImages.length)
  }

  const handleLogoMouseDown = () => {
    longPressTimer.current = setTimeout(() => {
      setIsAdminLoginOpen(true)
    }, 3000) // 3 seconds
  }

  const handleLogoMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
      longPressTimer.current = null
    }
  }

  const handleLoginSuccess = () => {
    setIsAdminMessagesOpen(true)
  }

  // Hero rotation: advance based on item duration (images shorter, interactive components longer)
  useEffect(() => {
    const current = heroItems[heroCardIndex] || heroItems[0]
    const duration = current?.duration ?? 3000
    const t = setTimeout(() => {
      setHeroCardIndex((prev) => (prev + 1) % heroItems.length)
    }, duration)
    return () => clearTimeout(t)
  }, [heroCardIndex])

  const subjects = [
    { name: "Mathematics", icon: Calculator },
    { name: "Science", icon: Microscope },
    { name: "English", icon: FileText },
    { name: "Literature", icon: BookMarked },
    { name: "Economics", icon: TrendingUp },
    { name: "Government", icon: Building },
    { name: "Music", icon: Music },
    { name: "Coding", icon: Code },
    { name: "Mental Ability", icon: Lightbulb },
    { name: "Language", icon: Languages },
    { name: "Crafts", icon: Palette },
    { name: "Test Prep", icon: BookOpen },
  ]

  const services = [
    {
      icon: BookOpen,
      title: "Pre-school - Secondary Classes",
      description: "All subjects covered",
      details:
        "Comprehensive curriculum coverage from pre-school through secondary education. We provide structured learning programs tailored to each age group, ensuring strong foundational knowledge and progressive skill development across all core subjects including Mathematics, English, Science, and Social Studies.",
    },
    {
      icon: GraduationCap,
      title: "Exam Preparation",
      description: "SATs, SAT, IELTS, GCSE/IGCSE, 11+ grammar school & A-levels ",
      details:
        "Specialized preparation for major standardized tests and international examinations. Our expert tutors provide targeted practice, test-taking strategies, and comprehensive review sessions to help students achieve their best possible scores on SATs, SAT, IELTS, GCSE, IGCSE, Common Entrance, BECE, WASSCE, and GCE examinations. We also provide targeted preparation for 11+ grammar school entrance exams and A-Level coursework with focused practice, exam techniques and one-to-one coaching.",
    },
    {
      icon: Users,
      title: "Flexible Learning",
      description: "One-on-one & Group coaching",
      details:
        "Personalized learning experiences designed to meet individual student needs. Choose between intensive one-on-one sessions for focused attention or collaborative group coaching sessions that encourage peer learning and social interaction while maintaining high educational standards.",
    },
    {
      icon: Clock,
      title: "Online & Offline",
      description: "Choose your preferred mode",
      details:
        "Convenient learning options that fit your schedule and preferences. Our online classes use interactive platforms with real-time engagement, while offline classes provide traditional face-to-face instruction. Both modes maintain the same high-quality teaching standards and personalized attention.",
    },
    
  ]

  const testimonials = [
    {
      name: "Deborah Temisan Lawal",
      text: "Proud of the dedicated teachers here. Distance is no barrier to their commitment.",
      role: "Parent",
    },
    {
      name: "Dr Abimbola A Adegbuyi",
      text: "Thank you to the amazing teaching team for coaching my daughter to pass her British GCSE English Examination.",
      role: "Dr",
    },
    {
      name: "Precious Edem Ekpenyong",
      text: "Amazing job by the teaching team! If you register, you will surely get value for your money.",
      role: "Parent",
    },
    {
      name: "Parent (SATS Results)",
      text: "SATS was excellent. He did very well. Thank you to all the teachers for their hard work.",
      role: "Parent",
    },
    {
      name: "Dr Abimbola Adegbuyi",
      text: "The teachers go beyond and above. They are very committed to the success of their students.",
      role: "Dr",
    },
    {
      name: "Parent (UK)",
      text: "The teacher helped my daughter blend words and break them into syllables. Her writing is now eligible.",
      role: "Parent from UK",
    },
    {
      name: "Dr Bim",
      text: "My daughter passed her British GCSE mathematics. Thank you to the teaching team for their commitment.",
      role: "Dr",
    },
    {
      name: "Parent (Common Entrance)",
      text: "The results were good. Both children have been admitted! Thanks to the teaching team.",
      role: "Parent",
    },
  ]

  const navItems = [
    { name: "Subjects", href: "#subjects" },
    { name: "Tutors", href: "#tutors" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ]

  const tutors = [
    {
      name: "Oluwatosin Ojo",
      image: "/tutors/image1.jpg",
      tags: ["English", "Mathematics"],
      description:
        "Oluwatosin Ojo is an experienced and passionate educator with a strong commitment to helping students understand concepts clearly and build lasting confidence in their learning. She creates supportive learning environments where students feel encouraged to ask questions, think critically, and achieve steady academic progress.",
    },
    {
      name: "Babatunde Ajala",
      image: "/tutors/image2.jpg",
      tags: ["Physics", "Exam Prep"],
      description:
        "Babatunde Ajala is an experienced tutor who breaks down challenging concepts into clear, manageable steps to build understanding and confidence. He supports exam preparation (11+ Grammar School, SATs, A‑Levels) and offers one‑to‑one and small‑group coaching focused on steady, measurable progress.",
    },
    {
      name: "Andrew",
      image: "/tutors/image3.jpg",
      tags: ["Mathematics"],
      description:
        "Andrew is a passionate Mathematics tutor who simplifies complex ideas into clear, relatable concepts for every learner. He teaches with patience, structure, and real-life applications, helping students build confidence, think logically, and develop a deep understanding of Mathematics beyond examinations. His focus is on steady progress and academic excellence.",
    },
    {
      name: "Joshua Ojile",
      image: "/tutors/image4.jpg",
      tags: ["Mathematics", "Science"],
      description:
        "Joshua Ojile is an experienced tutor specializing in Mathematics and Science, supporting middle school, secondary, and advanced learners. He helps students develop strong conceptual understanding and academic confidence through a structured yet supportive approach that combines clear explanations, practical examples, and a professional tutor–student relationship.",
    },
    {
      name: "Ms. Mariam",
      image: "/tutors/image5.jpg",
      tags: ["Math", "English"],
      description:
        "Ms. Mariam is an online tutor specializing in Mathematics and English for young learners. Her core strength lies in breaking complex topics into simple, engaging lessons that build confidence and deliver steady, measurable progress. She creates interactive learning experiences that keep young students motivated and curious.",
    },
    {
      name: "Mabel",
      image: "/tutors/image6.jpg",
      tags: ["Mathematics", "Yorùbá"],
      description:
        "Mabel is a passionate Mathematics and Yorùbá tutor who helps learners build strong academic understanding and confidence. She breaks concepts down from simple to complex and supports students in understanding and speaking Yorùbá with ease through clear, patient instruction.",
    },
    {
      name: "Olajumoke Kolajo",
      image: "/tutors/image7.jpg",
      tags: ["GCSE English", "Mathematics", "Science"],
      description:
        "Olajumoke Kolajo is a dedicated and patient teacher specializing in Mathematics, English, and Science for younger learners, with experience tutoring GCSE students in English Language. She delivers structured and supportive lessons that build confidence, deepen understanding, and promote strong exam readiness.",
    },
    {
      name: "Bright",
      image: "/tutors/image8.jpg",
      tags: ["Science"],
      description:
        "Bright is a dedicated tutor with a passion for empowering students to achieve academic success. Specializing in science subjects, she creates personalized learning plans tailored to diverse learning needs. Her goal is to foster a supportive and engaging learning environment that promotes confidence and consistent academic growth.",
    },
    {
      name: "Ajala O. T.",
      image: "/tutors/image9.jpg",
      tags: ["Academic Support"],
      description:
        "Ajala O. T. supports learners through clear, well-structured lessons that build strong academic foundations. His teaching approach focuses on helping students develop confidence, deep understanding, and steady, measurable progress.",
    },
    {
      name: "Ms. Mopelola Dally",
      image: "/tutors/image10.jpg",
      tags: ["Early Years", "Reading"],
      description:
        "Ms. Mopelola Dally is an online tutor specializing in Early Years education, English, Yorùbá, Numeracy, and Reading. Her core strength lies in simplifying complex reading and writing tasks, making learning engaging and easy for young learners to understand.",
    },
    {
      name: "Abibat",
      image: "/tutors/image11.jpg",
      tags: ["Mathematics", "Reading"],
      description:
        "Abibat is an Elementary Mathematics Tutor and Reading Specialist who is passionate about fostering a love of learning. She supports young learners in building strong numeracy and literacy skills through patient, encouraging, and engaging instruction.",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-x-clip">
      {/* Aurora ambient background (fixed, static gradient — no filter blur, no animation) */}
      <div className="aurora-bg" aria-hidden="true" />

      {/* Navigation Bar — glass pill */}
      <nav className="sticky top-0 z-40 px-4 pt-3">
        <div className="container mx-auto max-w-6xl">
          <div className="chip-glass rounded-2xl px-4 sm:px-5 flex items-center justify-between h-14">
            <div className="flex items-center gap-2 min-w-0">
              <GraduationCap className="h-6 w-6 text-primary flex-shrink-0" />
              <span
                ref={logoRef}
                className="font-bold text-base sm:text-lg cursor-pointer select-none truncate"
                onMouseDown={handleLogoMouseDown}
                onMouseUp={handleLogoMouseUp}
                onMouseLeave={handleLogoMouseUp}
                onTouchStart={handleLogoMouseDown}
                onTouchEnd={handleLogoMouseUp}
              >
                biskentutoring
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium px-3 py-1.5 rounded-full text-foreground/75 hover:text-primary hover:bg-white/40 transition-all"
                >
                  {item.name}
                </a>
              ))}
              <Button
                size="sm"
                className="ml-2 h-9 px-4 rounded-full bg-gradient-to-br from-primary to-fuchsia-600 text-white btn-magnetic border-0 text-sm font-medium"
                onClick={() => setIsEnrollOpen(true)}
              >
                Enroll
              </Button>
            </div>

            {/* Mobile: compact enroll + menu */}
            <div className="flex md:hidden items-center gap-2">
              <Button
                size="sm"
                className="h-9 px-3 rounded-full bg-gradient-to-br from-primary to-fuchsia-600 text-white border-0 text-xs font-medium"
                onClick={() => setIsEnrollOpen(true)}
              >
                Enroll
              </Button>
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center bg-white/40 hover:bg-white/60 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation (animated) */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="md:hidden chip-glass rounded-2xl mt-2 p-2 flex flex-col"
              >
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-foreground/80 hover:text-primary hover:bg-white/40 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Certified Badge — glass chip */}
      <div className="flex justify-center px-4 mt-3">
        <div className="chip-glass rounded-full px-4 py-1.5 flex items-center gap-2 max-w-fit">
          <Award className="h-3.5 w-3.5 text-primary flex-shrink-0" />
          <span className="text-[11px] font-medium tracking-wide text-foreground/80">Certified by TRCN · BSc.Ed / M.Ed Qualified</span>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        href="https://wa.me/2347067256623"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full flex items-center justify-center group"
        style={{ boxShadow: '0 8px 24px -4px rgba(16, 185, 129, 0.55), 0 4px 8px rgba(16, 185, 129, 0.25)' }}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label="WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30" />
        <MessageCircle className="h-5 w-5 relative z-10" />
      </motion.a>

      <section id="home" className="relative overflow-hidden py-8 lg:py-12 px-4">
        {/* Static blobs in hero — no animation, lower blur, lighter opacity */}
        <div className="aurora-blob aurora-blob-violet" style={{ top: '-4rem', right: '-4rem', width: '28rem', height: '28rem' }} />
        <div className="aurora-blob aurora-blob-peach" style={{ bottom: '-6rem', left: '-4rem', width: '24rem', height: '24rem' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">

            {/* Left Column - text content, vertically centered, matches right card height */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="flex flex-col justify-center space-y-6 lg:min-h-[520px]"
            >
              <div className="flex items-center gap-3 min-w-0 flex-wrap">
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full chip-glass text-green-700"
                >
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                  </span>
                  <span className="text-xs font-medium tracking-wider uppercase">Accepting 2026 students</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/20 to-fuchsia-400/20 border-2 border-background flex items-center justify-center shadow-soft">
                        <Star className="h-3.5 w-3.5 text-primary fill-current" />
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Trusted by <CountUp to={100} suffix="+" /> families
                  </p>
                </motion.div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground text-balance leading-[1.15]">
                Unlock your{" "}
                <span className="display-font-italic relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">
                    child's potential
                  </span>
                </span>
                <br className="hidden sm:block" /> with expert tutors.
              </h1>
              <p className="support-text text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
                Personalized 1-on-1 tutoring that builds confidence and delivers results — trusted by over <span className="text-foreground"><CountUp to={100} suffix="+" /></span> families for excellence in education.
              </p>

              {/* CTA row: single primary action + quiet glass secondary */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex items-center gap-3 flex-wrap pt-2"
              >
                <Button
                  size="lg"
                  className="h-12 px-7 text-sm font-medium rounded-full bg-gradient-to-br from-primary via-primary to-fuchsia-600 text-white btn-magnetic border-0"
                  onClick={() => setIsEnrollOpen(true)}
                >
                  Enroll Now
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </Button>

                <div className="flex items-center rounded-full overflow-hidden chip-glass">
                  <button
                    onClick={() => window.open("tel:+2347067256623", "_self")}
                    className="px-4 h-12 text-sm font-medium text-foreground hover:text-primary hover:bg-white/40 transition-all flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> Call
                  </button>
                  <div className="w-px h-6 bg-border/60" />
                  <button
                    onClick={() => window.open("mailto:biskentutoring@gmail.com", "_self")}
                    className="px-4 h-12 text-sm font-medium text-foreground hover:text-primary hover:bg-white/40 transition-all flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" /> Email
                  </button>
                </div>
              </motion.div>

              
            </motion.div>

            {/* Right Column - interactive hero components (Tutor-Website style) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[420px] lg:h-[540px] w-full"
            >
              {/* Floating decorative chips — inside card bounds to avoid section overlap */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="absolute top-4 left-4 z-20 chip-glass rounded-2xl px-3 py-2 flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center">
                  <Award className="w-4 h-4 text-primary" />
                </div>
                <span className="text-[11px] font-medium tracking-wide leading-tight">TRCN Certified<br />Educators</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="absolute bottom-4 right-4 z-20 chip-glass rounded-2xl px-3 py-2 flex items-center gap-2"
              >
                <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-[11px] font-medium tracking-wide leading-tight">BSc.Ed / M.Ed<br />Qualified</span>
              </motion.div>

              <div className="relative w-full h-full rounded-3xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={heroCardIndex}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full h-full bg-white rounded-3xl overflow-hidden shadow-aurora ring-1 ring-white/60"
                  >
                  {(() => {
                    const current = heroItems[heroCardIndex] || heroItems[0]
                    if (current.type === 'image') {
                      return <img src={current.src} alt="hero" className="w-full h-full object-cover" />
                    }
                    const Component = current.Component
                    return Component ? <Component /> : null
                  })()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-10 lg:py-14 px-4 overflow-hidden">
        <div className="aurora-blob aurora-blob-violet" style={{ top: '20%', right: '-12rem', width: '32rem', height: '32rem', opacity: 0.35 }} />
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-[0.2em] uppercase rounded-full chip-glass-strong text-primary mb-4">What we offer</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 section-heading">Our Services</h2>
            <p className="support-text text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Comprehensive tutoring services designed to help your child excel
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {services.map((service, index) => (
              <motion.button
                key={index}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                onClick={() => setSelectedService(service)}
                className="group glass-card text-left rounded-2xl p-6 h-40 flex flex-col justify-between cursor-pointer overflow-hidden relative"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-fuchsia-400/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex items-center justify-center bg-gradient-to-br from-primary/15 to-fuchsia-400/10 rounded-xl w-12 h-12 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 relative">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="relative">
                  <div className="font-semibold text-base leading-snug text-foreground">{service.title}</div>
                  <div className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <div className="absolute inset-0 bg-[#1a0d2e]/55 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card-deep relative rounded-3xl p-7 max-w-md w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-primary/15 to-fuchsia-400/10 p-2.5 rounded-xl">
                    <selectedService.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold leading-tight">{selectedService.title}</h3>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-foreground/5 transition-colors"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-primary text-sm font-medium mb-4">{selectedService.description}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{selectedService.details}</p>
              <div className="mt-6 flex gap-3">
                <Button
                  className="flex-1 bg-gradient-to-br from-primary to-fuchsia-600 text-white btn-magnetic border-0 rounded-full"
                  onClick={() => {
                    setSelectedService(null)
                    window.open("tel:+2347067256623", "_self")
                  }}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-white/40 backdrop-blur-md border-border rounded-full"
                  onClick={() => {
                    setSelectedService(null)
                    window.open("https://wa.me/2347067256623", "_blank")
                  }}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tutor Modal */}
      <AnimatePresence>
        {selectedTutor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedTutor(null)}
          >
            <div className="absolute inset-0 bg-[#1a0d2e]/55 backdrop-blur-md" />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card-deep relative rounded-3xl p-3 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedTutor(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/70 backdrop-blur-md flex items-center justify-center hover:bg-white/95 transition-colors shadow-soft"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex flex-col md:flex-row items-stretch gap-3">
                <div className="flex-shrink-0 w-full md:w-auto flex items-center">
                  <div className="w-full h-52 md:w-44 md:h-64 rounded-2xl overflow-hidden bg-gray-100 ring-1 ring-primary/10">
                    <img src={selectedTutor.image || '/placeholder.svg'} alt={selectedTutor.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="px-2 md:px-4 py-2 flex-1 flex flex-col min-w-0">
                  <span className="inline-block text-[10px] font-medium tracking-[0.2em] uppercase text-primary mb-2">{(selectedTutor.tags?.[0]) || "Tutor"}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight pr-12">{selectedTutor.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line line-clamp-6">{selectedTutor.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(selectedTutor.tags || []).slice(0, 4).map((t: string, i: number) => (
                      <span key={i} className="text-[10px] px-2.5 py-0.5 bg-primary/8 border border-primary/15 rounded-full text-primary font-medium tracking-wide">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enroll Modal */}
      {isEnrollOpen && (
        <EnrollModal onClose={() => setIsEnrollOpen(false)} tutorName={selectedTutor?.name} />
      )}

      {/* Subjects Section */}
      <section id="subjects" className="relative py-10 lg:py-14 px-4 overflow-hidden">
        <div className="aurora-blob aurora-blob-peach" style={{ top: '30%', left: '-12rem', width: '28rem', height: '28rem', opacity: 0.35 }} />
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10"
          >
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-[0.2em] uppercase rounded-full chip-glass-strong text-primary mb-4">Curriculum</span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 section-heading">Subjects we teach</h2>
            <p className="support-text text-base lg:text-lg text-muted-foreground leading-relaxed">Comprehensive coverage across all academic areas</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {subjects.map((subject, index) => (
              <motion.button
                key={index}
                variants={staggerItem}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="glass-card rounded-xl cursor-pointer group p-3 flex items-center gap-3"
                aria-label={subject.name}
              >
                <div className="flex items-center justify-center bg-gradient-to-br from-primary/15 to-fuchsia-400/10 rounded-lg w-10 h-10 transition-transform duration-300 group-hover:rotate-6">
                  <subject.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-sm leading-tight">{subject.name}</h4>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Special Features Section */}
      <section id="about" className="relative py-10 lg:py-14 px-4 overflow-hidden">
        <div className="aurora-blob aurora-blob-mauve" style={{ bottom: '-8rem', right: '20%', width: '30rem', height: '30rem', opacity: 0.3 }} />
        <div className="container mx-auto max-w-6xl relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full min-h-[400px]"
            >
              <div
                className="relative group cursor-pointer overflow-hidden h-full rounded-3xl bg-muted shadow-aurora ring-1 ring-white/40"
                onClick={handleSpecialCardClick}
              >
                {specialImages.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`Special care ${index + 1}`}
                    loading="eager"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                      index === specialCardIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none" />

                {/* Floating glass quote */}
                <div className="absolute bottom-6 left-6 right-6 chip-glass rounded-2xl p-4 backdrop-blur-xl">
                  <p className="text-sm leading-relaxed text-foreground/90">
                    <span className="font-semibold">Every child learns differently.</span> Our tutors meet them where they are.
                  </p>
                </div>

                {/* Indicator dots */}
                <div className="absolute top-4 right-4 flex gap-1.5">
                  {specialImages.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        i === specialCardIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col justify-center gap-5"
            >
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-[0.2em] uppercase rounded-full chip-glass-strong text-primary w-fit">Inclusive approach</span>
              <h2 className="text-4xl lg:text-5xl font-bold leading-[1.15]">
                Specialized support<br />
                <span className="display-font-italic bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">for every child</span>
              </h2>
              <p className="support-text text-base lg:text-lg text-muted-foreground leading-relaxed">
                We provide specialized support for children with <span className="text-foreground">learning differences</span>. Our qualified teachers use evidence-based approaches to create supportive learning environments tailored to each child's unique needs.
              </p>

              <div className="space-y-3">
                {[
                  { icon: Brain, title: "Cognitive development", desc: "through structured learning" },
                  { icon: Heart, title: "Emotional support", desc: "and confidence building" },
                  { icon: Hand, title: "Practical skills", desc: "and hands-on learning" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                    className="flex items-center gap-4 glass-card rounded-xl p-4"
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-fuchsia-400/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-base">
                      <strong className="text-foreground">{item.title}</strong>
                      <span className="text-muted-foreground"> {item.desc}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="tutors" className="relative pt-10 lg:pt-14 pb-4 lg:pb-6 px-4 overflow-hidden">
        <div className="aurora-blob aurora-blob-violet" style={{ top: '10%', right: '-10rem', width: '30rem', height: '30rem', opacity: 0.3 }} />
        <div className="aurora-blob aurora-blob-peach" style={{ bottom: '10%', left: '-10rem', width: '24rem', height: '24rem', opacity: 0.3 }} />
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="-mx-4 px-4 grid lg:grid-cols-2 gap-8 items-stretch mb-10"
          >
            <div className="flex items-start justify-start order-2 lg:order-1">
              <div
                onClick={() => setSelectedTutor({
                  name: 'Bisilola Umoren',
                  image: '/bisilola-profile.jpeg',
                  tags: ['Lead Tutor', 'Education'],
                  description: `Bisilola Umoren is a Principal Education Officer with the Lagos State Universal Basic Education Board and a certified, experienced educationist with over a decade of professional practice. She is driven by a deep belief in the transformative power of education and is committed to creating meaningful, impactful learning experiences.\n\nHer career spans teaching, curriculum development, and educational leadership, shaping her approach to education as a powerful tool for empowerment and social change.\n\nBeyond the classroom, Bisilola is deeply committed to community development.`
                })}
                className="glass-card w-full rounded-3xl group cursor-pointer flex flex-col sm:flex-row items-stretch overflow-hidden p-3 gap-3"
              >
                <div className="flex items-center justify-center flex-shrink-0">
                  <div className="w-full sm:w-40 md:w-44 h-48 sm:h-44 md:h-48 rounded-2xl overflow-hidden bg-gray-100 ring-1 ring-primary/10">
                    <img
                      src="/bisilola-profile.jpeg"
                      alt="Bisilola Umoren"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="px-2 sm:px-3 py-2 flex-1 flex flex-col text-left min-w-0 justify-center">
                  <span className="inline-block text-[10px] font-medium tracking-[0.2em] uppercase text-primary mb-1.5">Lead Tutor</span>
                  <h3 className="text-2xl md:text-3xl font-extrabold mb-1.5 leading-tight">Bisilola Umoren</h3>
                  <p className="text-[11px] text-muted-foreground mb-2 leading-snug">BSc.Ed · M.Ed · MAID · TRCN · STAN</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">Principal Education Officer with a decade of professional practice — committed to meaningful, impactful learning.</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center order-1 lg:order-2 py-2">
              <span className="inline-block px-3 py-1 text-[11px] font-medium tracking-[0.2em] uppercase rounded-full chip-glass-strong text-primary mb-3 w-fit">Our team</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 text-left section-heading leading-[1.15]">
                Meet the{" "}
                <span className="display-font-italic bg-gradient-to-r from-primary via-fuchsia-500 to-orange-400 bg-clip-text text-transparent">tutors</span>
              </h2>
              <p className="support-text text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
                Experienced and certified educators dedicated to your child's success.
              </p>
            </div>
          </motion.div>

          {/* Chessboard grid — sharp tessellated tiles flush on the page, no outer frame */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border/40"
          >
            {tutors.map((tutor, index) => {
              const role = (tutor as any).role || (tutor.tags && tutor.tags[0]) || "Tutor"
              const isAlt = index % 2 === 1
              return (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  onClick={() => setSelectedTutor(tutor)}
                  className={`group cursor-pointer flex flex-row items-stretch h-40 md:h-44 overflow-hidden p-3 transition-colors duration-300 ${
                    isAlt
                      ? "bg-primary/[0.04] hover:bg-primary/[0.08]"
                      : "bg-white/55 hover:bg-white/75"
                  }`}
                >
                  <div className="w-28 md:w-32 h-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={(tutor as any).image || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name)}&background=6366f1&color=fff`}
                      alt={tutor.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="pl-3 pr-1 py-1 flex-1 flex flex-col h-full min-w-0">
                    <h3 className="text-base md:text-lg font-bold mb-0.5 truncate leading-tight">{tutor.name}</h3>
                    <p className="text-primary font-medium text-[11px] md:text-xs mb-1.5 truncate">{role}</p>
                    <p
                      className="text-muted-foreground text-xs flex-1 leading-relaxed"
                      style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                    >
                      {tutor.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {(tutor.tags || []).slice(0, 2).map((tag: string) => (
                        <span key={tag} className="text-[9px] px-1.5 py-0.5 bg-primary/10 border border-primary/15 text-primary font-medium tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      <section id="testimonials" className="relative pt-4 lg:pt-6 pb-10 lg:pb-16 px-4 overflow-hidden">
        <div className="aurora-blob aurora-blob-peach" style={{ top: '20%', right: '10%', width: '24rem', height: '24rem', opacity: 0.3 }} />
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-4"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-2 section-heading">
              What parents <span className="display-font-italic bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">say</span>
            </h2>
            <p className="support-text text-base text-muted-foreground leading-relaxed">Real testimonials from satisfied parents</p>
          </motion.div>

          <div className="testimonial-container-new relative">
            <div
              ref={testimonialRef}
              className="testimonial-scroll-new flex gap-6 animate-scroll-infinite hover:animation-play-state-paused"
            >
              {/* First set of testimonials */}
              {testimonials.map((testimonial, index) => (
                <div
                  key={`first-${index}`}
                  className="testimonial-review-card glass-card flex-shrink-0 rounded-2xl"
                >
                  <div className="p-4 relative">
                    <span className="absolute top-1 right-3 text-3xl font-serif text-primary/20 leading-none select-none">"</span>
                    <p className="text-foreground/80 text-xs leading-relaxed mb-3 line-clamp-4 relative">{testimonial.text}</p>
                    <div className="flex items-center gap-2.5 pt-3 border-t border-border/50">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary/15 to-fuchsia-400/15 rounded-full flex items-center justify-center flex-shrink-0 ring-1 ring-primary/15">
                        <span className="text-primary font-semibold text-[11px]">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-foreground text-xs truncate leading-tight">{testimonial.name}</h4>
                        <p className="text-[10px] text-muted-foreground leading-tight">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial, index) => (
                <div
                  key={`second-${index}`}
                  className="testimonial-review-card glass-card flex-shrink-0 rounded-2xl"
                >
                  <div className="p-4 relative">
                    <span className="absolute top-1 right-3 text-3xl font-serif text-primary/20 leading-none select-none">"</span>
                    <p className="text-foreground/80 text-xs leading-relaxed mb-3 line-clamp-4 relative">{testimonial.text}</p>
                    <div className="flex items-center gap-2.5 pt-3 border-t border-border/50">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary/15 to-fuchsia-400/15 rounded-full flex items-center justify-center flex-shrink-0 ring-1 ring-primary/15">
                        <span className="text-primary font-semibold text-[11px]">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-foreground text-xs truncate leading-tight">{testimonial.name}</h4>
                        <p className="text-[10px] text-muted-foreground leading-tight">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section — deep aurora */}
      <section id="contact" className="relative py-10 lg:py-14 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0d2e] via-[#2b1252] to-[#3a1c5a]" />
        <div className="aurora-blob" style={{ top: '-6rem', right: '-6rem', width: '28rem', height: '28rem', background: 'radial-gradient(circle, rgba(167, 139, 250, 0.45), transparent 60%)', opacity: 0.6, filter: 'blur(40px)' }} />
        <div className="aurora-blob" style={{ bottom: '-6rem', left: '-6rem', width: '24rem', height: '24rem', background: 'radial-gradient(circle, rgba(251, 191, 96, 0.35), transparent 60%)', opacity: 0.55, filter: 'blur(40px)' }} />

        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-stretch"
          >
            {/* Logo: fixed reasonable size, vertically centered in the row (self-center
                overrides items-stretch so it doesn't grow to fill the row height) */}
            <div className="flex-shrink-0 self-center relative w-40 h-40 lg:w-56 lg:h-56 mx-auto lg:mx-0">
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/30 via-fuchsia-400/20 to-orange-400/20 rounded-3xl blur-2xl" />
              <img
                src="/tutors/logo.jpg"
                alt="biskentutoringconcepts logo"
                className="relative w-full h-full rounded-3xl object-cover ring-1 ring-white/20 shadow-2xl"
              />
            </div>

            <div className="flex-1 text-center lg:text-left flex flex-col justify-center gap-3 text-white">
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-medium tracking-[0.2em] uppercase rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90">Get in touch</span>
                <h2 className="text-2xl lg:text-3xl font-bold section-heading leading-[1.15]">
                  Let's start your{" "}
                  <span className="display-font-italic bg-gradient-to-r from-orange-200 via-fuchsia-200 to-violet-200 bg-clip-text text-transparent">child's journey</span>
                </h2>
                <p className="support-text text-xs lg:text-sm text-white/80 leading-relaxed max-w-xl">Reach out for enrollment, questions, or to schedule a trial session.</p>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <a
                  href="tel:+2347067256623"
                  className="group flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-white/30 text-white py-1.5 px-3 rounded-lg transition-all duration-300 font-medium text-xs"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>07067256623</span>
                </a>
                <a
                  href="https://wa.me/2347067256623"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 bg-emerald-500/90 hover:bg-emerald-500 backdrop-blur-md border border-emerald-400/30 text-white py-1.5 px-3 rounded-lg transition-all duration-300 font-medium text-xs"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href="mailto:biskentutoring@gmail.com"
                  className="group flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-white/30 text-white py-1.5 px-3 rounded-lg transition-all duration-300 font-medium text-xs"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span className="truncate max-w-[180px]">biskentutoring@gmail.com</span>
                </a>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("biskentutoring@gmail.com")
                    alert("Email copied to clipboard!")
                  }}
                  className="bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 hover:border-white/30 text-white p-1.5 rounded-lg transition-all duration-300"
                  title="Copy email"
                  aria-label="Copy email"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2v8a2 2 0 002 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 bg-[#0f0820] text-white/70 overflow-hidden">
        <div className="aurora-blob" style={{ top: '-4rem', left: '50%', transform: 'translateX(-50%)', width: '32rem', height: '16rem', background: 'radial-gradient(ellipse, rgba(167, 139, 250, 0.25), transparent 60%)', opacity: 0.6, filter: 'blur(30px)' }} />
        <div className="container mx-auto max-w-6xl text-center relative">
          <div className="flex items-center justify-center gap-2 mb-3">
            <GraduationCap className="h-6 w-6 text-fuchsia-300" />
            <h3 className="text-xl font-bold text-white">biskentutoringconcepts</h3>
          </div>
          <p className="text-sm opacity-70 mb-4">by Certified Tutors</p>
          <p className="text-xs opacity-50">© 2025 biskentutoringconcepts. All rights reserved.</p>
        </div>
      </footer>

      {/* Admin Modals */}
      <AdminLoginModal 
        open={isAdminLoginOpen} 
        onOpenChange={setIsAdminLoginOpen} 
        onLoginSuccess={handleLoginSuccess} 
      />
      <AdminMessagesModal 
        open={isAdminMessagesOpen} 
        onOpenChange={setIsAdminMessagesOpen} 
      />
    </div>
  )
}
