import {
  BookOpen, Users, Clock, GraduationCap, Calculator, Microscope, FileText, BookMarked,
  TrendingUp, Building, Music, Code, Lightbulb, Languages, Palette,
} from "lucide-react"

/* Single source of truth for marketing content. Copy is the client's own. */

export const CONTACT = {
  phone: "07067256623",
  phoneIntl: "+2347067256623",
  whatsapp: "https://wa.me/2347067256623",
  email: "biskentutoring@gmail.com",
}

export type Tutor = { name: string; image: string; tags: string[]; description: string; role?: string }

export const subjects = [
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

export const services = [
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

export const testimonials = [
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

export const tutors: Tutor[] = [
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

export const leadTutor: Tutor = {
  name: "Bisilola Umoren",
  image: "/bisilola-profile.jpeg",
  role: "Lead Tutor",
  tags: ["Lead Tutor", "Education"],
  description: `Bisilola Umoren is a Principal Education Officer with the Lagos State Universal Basic Education Board and a certified, experienced educationist with over a decade of professional practice. She is driven by a deep belief in the transformative power of education and is committed to creating meaningful, impactful learning experiences.

Her career spans teaching, curriculum development, and educational leadership, shaping her approach to education as a powerful tool for empowerment and social change.

Beyond the classroom, Bisilola is deeply committed to community development.`,
}

/* ---------------------------------------------------------------------------
 * Derived data for the multi-page site
 * ------------------------------------------------------------------------- */

export const TINTS = ["bg-lilac", "bg-sand", "bg-sage", "bg-peach"] as const

export function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

export type TutorEntry = Tutor & { slug: string; tint: string; index: number }

/** Lead tutor first, then the rest in the client's order. */
export const allTutors: TutorEntry[] = [leadTutor, ...tutors].map((t, i) => ({
  ...t,
  slug: slugify(t.name),
  tint: TINTS[i % TINTS.length],
  index: i + 1,
}))

export function getTutor(slug: string) {
  return allTutors.find((t) => t.slug === slug)
}

export type Family = {
  slug: string
  letter: string
  name: string
  tint: string
  subjects: string[]
  intro: string
  levels: string[]
  /** lower-case fragments matched against tutor tags */
  match: string[]
}

export const families: Family[] = [
  {
    slug: "maths",
    letter: "M",
    name: "Maths",
    tint: "bg-lilac",
    subjects: ["Mathematics", "Mental Ability", "Economics"],
    intro:
      "Clear, step-by-step teaching from early numeracy to A-level. Tutors break hard ideas into simple, relatable steps and connect them to real life.",
    levels: ["Pre-school and primary numeracy", "Secondary mathematics", "SATs and 11+ grammar school", "GCSE / IGCSE", "A-levels"],
    match: ["math"],
  },
  {
    slug: "sciences",
    letter: "S",
    name: "Sciences",
    tint: "bg-sage",
    subjects: ["Science", "Physics", "Coding"],
    intro:
      "Science that makes sense: concepts explained plainly, practical examples, and steady practice for homework, tests and exams.",
    levels: ["Primary science", "Secondary sciences", "GCSE / IGCSE sciences", "Coding for kids"],
    match: ["science", "physics"],
  },
  {
    slug: "languages",
    letter: "L",
    name: "Languages",
    tint: "bg-sand",
    subjects: ["English", "Literature", "Reading", "Yorùbá"],
    intro:
      "Reading, writing and speaking with confidence — from blending first words to GCSE English Language, plus Yorùbá taught with patience.",
    levels: ["Early years phonics and reading", "Primary and secondary English", "GCSE English Language", "Yorùbá"],
    match: ["english", "reading", "literature", "yor", "early years"],
  },
  {
    slug: "exams",
    letter: "E",
    name: "Exams",
    tint: "bg-peach",
    subjects: ["SATs", "SAT", "11+ grammar school", "GCSE / IGCSE", "A-levels", "IELTS", "Common Entrance"],
    intro:
      "Targeted preparation with practice papers, exam technique and one-to-one coaching for the exams that matter most.",
    levels: ["SATs and 11+ grammar school", "Common Entrance, BECE", "GCSE / IGCSE, WASSCE", "A-levels", "SAT and IELTS"],
    match: ["exam", "gcse"],
  },
  {
    slug: "creative",
    letter: "C",
    name: "Creative",
    tint: "bg-card",
    subjects: ["Music", "Crafts", "Government"],
    intro: "Room to grow beyond the core subjects: music, crafts and civic studies, taught with the same care and structure.",
    levels: ["Music lessons", "Crafts and hands-on learning", "Government"],
    match: [],
  },
]

export function getFamily(slug: string) {
  return families.find((f) => f.slug === slug)
}

export function tutorsFor(family: Family) {
  if (family.match.length === 0) return []
  return allTutors.filter((t) => t.tags.some((tag) => family.match.some((m) => tag.toLowerCase().includes(m))))
}

export const STEPS = [
  { n: "01", title: "Tell us what you need", body: "Your child's level, subjects and goals — a two-minute form." },
  { n: "02", title: "Meet your tutor", body: "We match you with a certified tutor, usually within 24 hours." },
  { n: "03", title: "Start learning", body: "Online or at home, one-to-one or in a small group." },
]

/**
 * Transparent cut-outs of children that rise from the bottom-right edge of the
 * hero band. Drop PNGs (transparent background, head-and-shoulders, cropped
 * flat along the bottom) into public/kids/ and list them here, e.g.
 *   { src: "/kids/girl.png", alt: "" }
 */
export const HERO_KIDS: { src: string; alt: string; height: string; tilt: string }[] = [
  { src: "/kids/girl-books.webp", alt: "", height: "h-[280px] lg:h-[380px]", tilt: "-rotate-[4deg]" },
  { src: "/kids/boy-thumbs-up.webp", alt: "", height: "h-[230px] lg:h-[320px]", tilt: "rotate-[5deg]" },
]

/** Cut-out rising out of the "How it works" card; its head breaks out over the top. */
export const HOW_KIDS: { src: string; alt: string; height: string; center?: boolean }[] = [
  { src: "/kids/boy-notebook.webp", alt: "", height: "h-[660px]", center: true },
]

/** Cut-out that peeks into the closing call-to-action card. */
export const CTA_KID = { src: "/kids/girl-cardigan.webp", alt: "" }
