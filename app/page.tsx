"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EnrollModal from "@/components/enroll-modal"
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

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [selectedTutor, setSelectedTutor] = useState<any>(null)
  const [isEnrollOpen, setIsEnrollOpen] = useState(false)
  const [heroCardIndex, setHeroCardIndex] = useState(0)
  const [specialCardIndex, setSpecialCardIndex] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const testimonialRef = useRef<HTMLDivElement>(null)

  const heroItems: Array<any> = [
    { type: 'image', src: '/african-american-female-tutor-helping-teenagers-with-math.jpg', duration: 3000 },
    { type: 'component', Component: WordConnectionGame, duration: 7000 },
    { type: 'image', src: '/black-male-teacher-leading-group-study-session-teenagers.jpg', duration: 3000 },
    // CursorTracker card removed
    { type: 'image', src: '/african-american-tutor-online-session-with-teenage-student.jpg', duration: 3000 },
    { type: 'component', Component: MathPillGame, duration: 7000 },
    { type: 'image', src: '/black-female-teacher-helping-teenager-with-science-homework.jpg', duration: 3000 },
  ]

  const specialImages = [
    "/caring-black-female-teacher-helping-learning-differences-student.jpg",
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

    // hero rotation now handled by a separate timeout-based effect below

    const specialInterval = setInterval(() => {
      setSpecialCardIndex((prev) => (prev + 1) % specialImages.length)
    }, 3500)

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
      
      clearInterval(specialInterval)
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
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Subjects", href: "#subjects" },
    { name: "About", href: "#about" },
    { name: "Tutors", href: "#tutors" },
    { name: "Testimonials", href: "#testimonials" },
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
        "Bright is a dedicated tutor with a passion for empowering students to achieve academic success. Specializing in science subjects, he creates personalized learning plans tailored to diverse learning needs. His goal is to foster a supportive and engaging learning environment that promotes confidence and consistent academic growth.",
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
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex items-center justify-between h-16">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-8 w-8 text-primary" />
                  <span className="font-bold text-lg">biskentutoringconcepts</span>
                </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <a key={item.name} href={item.href} className="nav-link px-3 py-2">
                  {item.name}
                </a>
              ))}
              <Button size="sm" className="ml-4 h-10 px-4 rounded-md bg-primary hover:bg-primary/90 text-white" onClick={() => setIsEnrollOpen(true)}>
                Enroll
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation (animated) */}
          <div
            className={`md:hidden overflow-hidden border-t transition-[max-height,opacity,transform] duration-300 ${
              isMenuOpen ? "max-h-96 py-4 opacity-100 translate-y-0" : "max-h-0 py-0 opacity-0 -translate-y-2"
            }`}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 nav-link transform transition-transform duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-3 px-4">
              <Button size="md" className="w-full bg-primary text-white" onClick={() => { setIsEnrollOpen(true); setIsMenuOpen(false); }}>
                Enroll
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Certified Badge below Navbar */}
      <div className="bg-primary text-primary-foreground text-center py-1 px-4">
        <div className="flex items-center justify-center gap-2">
          <Award className="h-4 w-4" />
          <span className="text-sm font-medium">Certified by TRCN • BSc Ed | M.Ed Qualified</span>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/2347067256623"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-md shadow-md transition-all duration-200 hover:scale-105 flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <MessageCircle className="h-5 w-5" />
      </a>

      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-6 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

            {/* Left Column - copy of Tutor-Website hero text, keep existing Enroll/Icons block below */}
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 min-w-0 md:order-0 order-4 flex-wrap">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-green-50 text-green-700 border border-green-200 truncate max-w-[65%] sm:max-w-[45%] md:max-w-none">
                  <span className="relative flex h-2 w-2 flex-shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                  </span>
                  <span className="text-sm font-semibold truncate">Accepting New Students for 2026</span>
                </div>

                <div className="flex items-center gap-3 min-w-0 whitespace-nowrap">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-md bg-primary/20 border-2 border-background flex items-center justify-center">
                        <Star className="h-4 w-4 text-primary fill-current" />
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground truncate max-w-[150px]">Trusted by 100+ families</p>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground text-balance leading-tight">
                Unlock your <span className="display-font-italic" style={{ color: '#7c3aed', textShadow: '0 0 4px rgba(124,58,237,0.45)' }}>child's potential</span>
                <br /> With Expert Tutors.
              </h1>
              <p className="text-base text-muted-foreground max-w-lg leading-normal">
                Personalized 1-on-1 tutoring that builds confidence and delivers results. Trusted by over 100+ families for excellence in education.
              </p>

              {/* CTA row: split pill (Call / Email) and Enroll next to it (compact) */}
              <div className="flex items-center gap-3 w-full flex-nowrap">
                <div className="flex items-center bg-primary text-white rounded-md overflow-hidden shadow-sm">
                  <button onClick={() => window.open("tel:+2347067256623", "_self")} className="px-3 py-1.5 text-sm bg-primary hover:bg-primary/95">
                    Call Now
                  </button>
                  <div className="w-px bg-white/20" />
                  <button onClick={() => window.open("mailto:biskentutoring@gmail.com", "_self")} className="px-3 py-1.5 text-sm bg-primary/95 hover:bg-primary flex items-center">
                    <Mail className="mr-2 w-4 h-4 inline" /> Email Us
                  </button>
                </div>

                <Button size="lg" className="h-9 px-3 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 ml-2" onClick={() => setIsEnrollOpen(true)}>
                  Enroll Now
                </Button>
              </div>

              
            </motion.div>

            {/* Right Column - interactive hero components (Tutor-Website style) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px] lg:h-[500px] w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-[2rem] opacity-60 transform blur-sm" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroCardIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-full bg-white rounded-[2rem] border-4 border-white shadow-lg overflow-hidden"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-8 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6 scroll-animate">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 section-heading">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tutoring services designed to help your child excel
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setSelectedService(service)}
                className="group w-full bg-card rounded-lg p-4 sm:p-5 h-32 sm:h-36 flex flex-row items-center gap-4 hover:bg-primary hover:text-primary-foreground transition-transform duration-200 transform hover:-translate-y-1 cursor-pointer scroll-animate-scale overflow-hidden relative"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-center bg-primary/10 rounded-md p-3 w-12 h-12 transition-colors duration-200 group-hover:bg-primary">
                  <service.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-200" />
                </div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-base leading-snug group-hover:text-white">{service.title}</div>
                  <div className="text-sm text-muted-foreground mt-1 group-hover:text-white">{service.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {selectedService && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-modal-overlay"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-card rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto shadow-xl animate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <selectedService.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{selectedService.title}</h3>
              </div>
              <button onClick={() => setSelectedService(null)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <p className="text-muted-foreground mb-4">{selectedService.description}</p>
            <p className="text-sm leading-relaxed">{selectedService.details}</p>
            <div className="mt-6 flex gap-3">
                  <Button
                className="flex-1"
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
                className="flex-1 bg-transparent"
                onClick={() => {
                  setSelectedService(null)
                  window.open("https://wa.me/2347067256623", "_blank")
                }}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Tutor Modal */}
      {selectedTutor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTutor(null)}>
          <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.25 }} className="bg-card rounded-lg p-0 max-w-3xl w-full shadow-xl overflow-auto" onClick={(e) => e.stopPropagation()}>
            <Card className="flex flex-col md:flex-row items-stretch !py-0 !gap-0">
              <div className="flex-shrink-0 w-full md:w-auto p-0 md:p-4 flex items-center">
                <div className="w-full h-56 md:w-44 md:h-56 rounded-t-2xl md:rounded-lg overflow-hidden bg-gray-100">
                  <img src={selectedTutor.image || '/placeholder.svg'} alt={selectedTutor.name} className="w-full h-full object-cover" />
                </div>
              </div>
              <CardContent className="!px-6 !py-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{selectedTutor.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{selectedTutor.description}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(selectedTutor.tags || []).map((t: string, i: number) => (
                    <span key={i} className="text-xs px-2 py-0.5 bg-secondary rounded-md text-secondary-foreground font-mono">{t}</span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Enroll Modal */}
      {isEnrollOpen && (
        <EnrollModal onClose={() => setIsEnrollOpen(false)} tutorName={selectedTutor?.name} />
      )}

      {/* Subjects Section */}
      <section id="subjects" className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6 scroll-animate">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 section-heading">Subjects We Teach</h2>
            <p className="text-xl text-muted-foreground">Comprehensive coverage across all academic areas</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {subjects.map((subject, index) => (
              <button
                key={index}
                className="w-full bg-card rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-pointer group scroll-animate p-2 flex items-center gap-3"
                style={{ animationDelay: `${index * 0.02}s` }}
                aria-label={subject.name}
              >
                <div className="flex items-center justify-center bg-primary/10 rounded-md p-2 w-10 h-10">
                  <subject.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="font-medium text-sm leading-tight">{subject.name}</h4>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Special Features Section */}
      <section id="about" className="py-8 px-4 bg-card overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            <div className="scroll-animate-left relative">
              <div className="relative group cursor-pointer overflow-hidden h-full" onClick={handleSpecialCardClick}>
                <div className="relative rounded-2xl overflow-hidden shadow-lg h-full">
                  {specialImages.map((image, index) => (
                    <img
                      key={index}
                      src={image || "/placeholder.svg"}
                      alt={`Special care ${index + 1}`}
                      loading={index === specialCardIndex ? "eager" : "lazy"}
                      decoding="async"
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                        index === specialCardIndex ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 scroll-animate-right">
              <h2 className="text-3xl lg:text-4xl font-bold">Specialized Support for Every Child</h2>
              <p className="text-lg text-muted-foreground">
                We provide specialized support for children with <strong>learning differences</strong>. Our
                qualified teachers use evidence-based approaches to create supportive learning environments tailored to
                each child's unique needs.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Brain className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-lg">
                    <strong>Cognitive development</strong> through structured learning
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-lg">
                    <strong>Emotional support</strong> and confidence building
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Hand className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-lg">
                    <strong>Practical skills</strong> and hands-on learning
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="tutors" className="py-10 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="-mx-4 px-4 grid lg:grid-cols-2 gap-8 items-start mb-6 scroll-animate">
            <div className="flex items-start justify-start">
              <Card onClick={() => setSelectedTutor({
                name: 'Bisilola Umoren',
                image: '/bisilola-profile.jpeg',
                tags: ['Lead Tutor', 'Education'],
                description: `Bisilola Umoren is a Principal Education Officer with the Lagos State Universal Basic Education Board and a certified, experienced educationist with over a decade of professional practice. She is driven by a deep belief in the transformative power of education and is committed to creating meaningful, impactful learning experiences.
\n\nHer career spans teaching, curriculum development, and educational leadership, shaping her approach to education as a powerful tool for empowerment and social change. She currently focuses on leveraging online platforms to mentor educators and guide learners in effective teaching practices and high-quality learning.
\n\nBeyond the classroom, Bisilola is deeply committed to community development. She believes education goes beyond academic knowledge, fostering empathy, responsibility, and lifelong growth. She continues to inspire learners and educators through her dedication to excellence, mentorship, and impact.`
              })} className="w-full max-w-[900px] hover-lift border-border group !py-0 !gap-0 cursor-pointer flex flex-row items-stretch">
                <div className="flex items-center justify-center pl-2.5 pt-2.5 pb-2.5"> 
                  <div className="w-44 h-44 md:w-56 md:h-56 rounded-lg overflow-hidden bg-gray-100">
                    <img src="/bisilola-profile.jpeg" alt="Bisilola Umorem" className="w-full h-full object-cover" />
                  </div>
                </div>
                <CardContent className="!px-6 !pt-2.5 !pb-2.5 !pl-2.5 md:!p-6 flex-1 flex flex-col h-44 md:h-56 text-left overflow-hidden">
                  <div className="overflow-hidden">
                    <h4 className="text-base text-muted-foreground mb-1">Meet our lead tutor</h4>
                    <h3 className="text-4xl lg:text-5xl font-extrabold mb-2">Bisilola Umoren</h3>
                    <p className="text-sm text-muted-foreground mb-1">BSc. Ed / M.Ed / MAID / TRCN certified / STAN member</p>
                    <p className="text-base text-muted-foreground mb-3 line-clamp-4">Experience/profile — profile and full description here.</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-auto">
                    <span className="text-xs px-2 py-0.5 bg-secondary rounded-md text-secondary-foreground font-mono">Lead Tutor</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="pt-2 h-44 md:h-56 flex flex-col justify-start">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-3 text-left section-heading">Meet the Tutors</h2>
              <p className="text-lg text-muted-foreground max-w-2xl flex-1">
                Our experienced and certified educators dedicated to your child's success
              </p>
            </div>
          </div>

          <div className="-mx-4 px-4 overflow-x-auto scrollbar-hide pb-4">
            <div className="flex gap-6 min-w-max">
              {tutors.map((tutor, index) => {
                const role = (tutor as any).role || (tutor.tags && tutor.tags[0]) || "Tutor"
                return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="min-w-[360px] max-w-[420px] snap-center"
                >
                <Card
                  onClick={() => setSelectedTutor(tutor)}
                  className="min-w-[360px] max-w-[420px] hover-lift border-border group !py-0 !gap-0 cursor-pointer flex flex-row items-stretch h-44 md:h-52"
                >
                    <div className="w-32 md:w-40 h-44 md:h-52 overflow-hidden rounded-l-xl bg-gray-100 flex-shrink-0">
                      <img
                        src={(tutor as any).image || `https://ui-avatars.com/api/?name=${encodeURIComponent(tutor.name)}&background=6366f1&color=fff`}
                        alt={tutor.name}
                        className="w-full h-full object-cover transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="!px-4 !py-3 md:!p-4 flex-1 flex flex-col h-full pb-4">
                      <h3 className="text-lg md:text-xl font-bold mb-1 truncate">{tutor.name}</h3>
                      <p className="text-primary font-medium text-xs md:text-sm mb-2 truncate">{role}</p>
                      <p
                        className="text-muted-foreground text-sm mb-2 flex-1"
                        style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                      >
                        {tutor.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-auto min-h-[28px]">
                        {(tutor.tags || []).slice(0,3).map((tag: string) => (
                          <span key={tag} className="text-xs px-2 py-0.5 bg-secondary rounded-md text-secondary-foreground font-mono">{tag}</span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-8 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-6 scroll-animate">
            <h2 className="text-3xl lg:text-4xl font-bold mb-3 section-heading">What Parents Say</h2>
            <p className="text-xl text-muted-foreground">Real testimonials from satisfied parents</p>
          </div>

          <div className="testimonial-container-new relative">
            <div
              ref={testimonialRef}
              className="testimonial-scroll-new flex gap-6 animate-scroll-infinite hover:animation-play-state-paused"
            >
              {/* First set of testimonials */}
              {testimonials.map((testimonial, index) => (
                <div
                  key={`first-${index}`}
                  className="testimonial-review-card flex-shrink-0 bg-white border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    {/* Review text */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 min-h-[60px]">"{testimonial.text}"</p>

                    {/* Reviewer info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-sm">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{testimonial.name}</h4>
                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {testimonials.map((testimonial, index) => (
                <div
                  key={`second-${index}`}
                  className="testimonial-review-card flex-shrink-0 bg-white border border-border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="p-6">
                    {/* Review text */}
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 min-h-[60px]">"{testimonial.text}"</p>

                    {/* Reviewer info */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-semibold text-sm">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm truncate">{testimonial.name}</h4>
                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-8 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl scroll-animate">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
            {/* Logo beside contact text and buttons (shows left on lg, above on small) */}
            <div className="flex-shrink-0 flex items-center justify-center lg:justify-start">
              <img
                src="/tutors/logo.jpg"
                alt="biskentutoringconcepts logo"
                className="w-36 h-36 lg:w-48 lg:h-48 rounded-2xl object-cover shadow-md"
              />
            </div>

            {/* Content Div - simple contact text */}
            <div className="flex-1 text-center lg:text-left space-y-6 flex flex-col justify-center md:min-h-[12rem] lg:min-h-[16rem]">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold section-heading">Contact Us</h2>
                <p className="text-lg lg:text-xl opacity-90">Reach out to us for enrollment, questions, or to schedule a trial session.</p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+2347067256623"
                    className="flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-primary hover:text-primary/90 py-2 px-3 rounded-md transition-all duration-300 text-sm flex-1 font-medium"
                  >
                    <Phone className="h-5 w-5" />
                    <span>07067256623</span>
                  </a>
                  <a
                    href="https://wa.me/2347067256623"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-md transition-all duration-300 text-sm flex-1 font-medium"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="mailto:biskentutoring@gmail.com"
                    className="flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-primary hover:text-primary/90 py-2 px-3 rounded-md transition-all duration-300 flex-1 font-medium"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="truncate">biskentutoring@gmail.com</span>
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("biskentutoring@gmail.com")
                      alert("Email copied to clipboard!")
                    }}
                    className="bg-white/90 hover:bg-white text-primary hover:text-primary/90 py-2 px-3 rounded-md transition-all duration-300"
                    title="Copy email"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-foreground text-background">
        <div className="container mx-auto max-w-6xl text-center">
          <h3 className="text-2xl font-bold mb-4">biskentutoringconcepts</h3>
          <p className="text-lg opacity-80 mb-6">by Certified Tutors</p>
          <p className="opacity-60">© 2025 biskentutoringconcepts. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
