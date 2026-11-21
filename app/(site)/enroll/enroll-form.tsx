"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowRight, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { CONTACT, getTutor } from "@/lib/content"

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your name"),
  email: z.string().min(1, "Enter your email").email("That email doesn't look right"),
  phone: z.string().trim().min(6, "Enter a phone number we can reach you on"),
  subject: z.string().trim().min(2, "Which subject or exam?"),
  message: z.string().optional(),
})
type Values = z.infer<typeof schema>

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-[13px] font-medium text-destructive">{error}</p>}
    </div>
  )
}

export function EnrollForm() {
  const params = useSearchParams()
  const tutor = getTutor(params.get("tutor") ?? "")
  const { toast } = useToast()
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", subject: tutor ? tutor.tags[0] : "", message: "" },
  })

  // Same delivery as the original site: opens the parent's mail app, addressed to Bisken.
  const onSubmit = (v: Values) => {
    const lines = [
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      `Phone: ${v.phone}`,
      `Subject: ${v.subject}`,
      tutor ? `Preferred tutor: ${tutor.name}` : "",
      v.message ? `Goals: ${v.message}` : "",
    ].filter(Boolean)
    const href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Enrollment request — ${v.subject}`)}&body=${encodeURIComponent(lines.join("\n"))}`
    window.open(href)
    toast({ title: "Request ready to send", description: "Your email app has opened with the details filled in." })
    setSent(true)
    reset()
  }

  if (sent) {
    return (
      <div className="py-10 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-sage">
          <Check className="size-6" />
        </span>
        <h2 className="mt-5 text-[32px]">Thanks — we&apos;ll be in touch.</h2>
        <p className="mx-auto mt-2 max-w-sm text-ink-2">Send the email that just opened and we&apos;ll match you with a tutor.</p>
        <Button variant="secondary" className="mt-6" onClick={() => setSent(false)}>
          Send another request
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {tutor && (
        <div className="flex items-center gap-3 rounded-control bg-lilac p-3">
          <img src={tutor.image} alt="" className="size-10 rounded-full object-cover" />
          <p className="text-sm">
            Requesting lessons with <strong className="font-semibold">{tutor.name}</strong>
          </p>
        </div>
      )}
      <Field id="name" label="Parent or student name" error={errors.name?.message}>
        <Input id="name" autoComplete="name" placeholder="Ada Okafor" aria-invalid={!!errors.name} {...register("name")} />
      </Field>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" error={errors.email?.message}>
          <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} {...register("email")} />
        </Field>
        <Field id="phone" label="Phone or WhatsApp" error={errors.phone?.message}>
          <Input id="phone" type="tel" autoComplete="tel" placeholder="0801 234 5678" aria-invalid={!!errors.phone} {...register("phone")} />
        </Field>
      </div>
      <Field id="subject" label="Subject or exam" error={errors.subject?.message}>
        <Input id="subject" placeholder="e.g. GCSE Maths, 11+ English, Yorùbá" aria-invalid={!!errors.subject} {...register("subject")} />
      </Field>
      <Field id="message" label="Your child's level and goals (optional)">
        <Textarea id="message" placeholder="Year 9, wants to feel confident with algebra before GCSEs…" {...register("message")} />
      </Field>
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Send enrollment request <ArrowRight />
      </Button>
    </form>
  )
}
