"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Suspense, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, ArrowRight, BookOpen, Check, GraduationCap, Heart, Loader2 } from "lucide-react"

import { AuthDivider, AuthShell, GoogleMark } from "@/components/auth/auth-shell"
import { PasswordInput } from "@/components/auth/password-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { signUp, type Role } from "@/lib/auth"
import { cn } from "@/lib/utils"

const ROLES: Array<{ id: Role; title: string; copy: string; icon: typeof Heart; color: string }> = [
  { id: "parent", title: "Parent", copy: "I'm looking for a tutor for my child", icon: Heart, color: "bg-lilac" },
  { id: "student", title: "Student", copy: "I want help with my own learning", icon: BookOpen, color: "bg-sage" },
  { id: "tutor", title: "Tutor", copy: "I want to teach with Bisken", icon: GraduationCap, color: "bg-sand" },
]

const schema = z.object({
  name: z.string().trim().min(2, "Tell us your full name"),
  email: z.string().min(1, "Enter your email").email("That email doesn't look right"),
  phone: z.string().optional(),
  password: z.string().min(8, "Use at least 8 characters"),
  terms: z.literal(true, { errorMap: () => ({ message: "Please accept to continue" }) }),
})
type Values = z.infer<typeof schema>

function isRole(v: string | null): v is Role {
  return v === "parent" || v === "student" || v === "tutor"
}

function SignupInner() {
  const params = useSearchParams()
  const initial = params.get("role")
  const router = useRouter()
  const { toast } = useToast()
  const [step, setStep] = useState<1 | 2>(isRole(initial) ? 2 : 1)
  const [role, setRole] = useState<Role>(isRole(initial) ? initial : "parent")
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", password: "", terms: false as unknown as true },
  })

  const onSubmit = async (v: Values) => {
    setLoading(true)
    await signUp({ name: v.name, email: v.email, role })
    router.push("/dashboard?welcome=1")
  }

  const current = ROLES.find((r) => r.id === role)!

  return (
    <>
      {/* progress */}
      <div className="mb-8 flex items-center gap-2">
        {[1, 2].map((n) => (
          <span
            key={n}
            className={cn("h-1.5 flex-1 rounded-full transition-colors", step >= n ? "bg-purple" : "bg-sunk")}
          />
        ))}
        <span className="ml-2 font-mono text-[10.5px] tracking-[0.06em] text-ink-3">Step {step} of 2</span>
      </div>

      {step === 1 ? (
        <>
          <h1 className="text-[40px] sm:text-[48px]">Who&apos;s joining?</h1>
          <p className="mt-3 text-ink-2">Pick the option that fits you best. You can change it later.</p>

          <div className="mt-8 space-y-3" role="radiogroup" aria-label="Account type">
            {ROLES.map((r) => {
              const active = r.id === role
              return (
                <button
                  key={r.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setRole(r.id)}
                  className={cn(
                    "flex w-full items-center gap-4 rounded-card p-4 text-left transition-colors",
                    active ? r.color : "bg-card hover:bg-white",
                  )}
                >
                  <span className={cn("grid size-11 shrink-0 place-items-center rounded-control", active ? "bg-card" : r.color)}>
                    <r.icon className="size-5 text-ink" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-lg font-semibold tracking-[-0.01em] text-ink">{r.title}</span>
                    <span className="block text-sm text-ink-2">{r.copy}</span>
                  </span>
                  <span
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-full border-[1.5px] border-ink/40",
                      active ? "border-ink bg-ink text-page" : "bg-card",
                    )}
                  >
                    {active && <Check className="size-3.5" strokeWidth={3.5} />}
                  </span>
                </button>
              )
            })}
          </div>

          <Button size="lg" className="mt-8 w-full" onClick={() => setStep(2)}>
            Continue as {current.title.toLowerCase()} <ArrowRight />
          </Button>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.06em] text-ink-3 hover:text-ink"
          >
            <ArrowLeft className="size-3.5" /> Change account type
          </button>
          <h1 className="mt-4 text-[40px] sm:text-[48px]">
            Your <span className="text-purple">details</span>
          </h1>
          <p className="mt-3 flex items-center gap-2 text-ink-2">
            Signing up as
            <span className={cn("rounded-tag px-2 py-0.5 text-[13px] font-medium text-ink", current.color)}>{current.title}</span>
          </p>

          <Button
            variant="surface"
            className="mt-7 w-full"
            type="button"
            onClick={() => toast({ title: "Google sign-up is coming soon", description: "This is a preview of the new Bisken learning app." })}
          >
            <GoogleMark /> Sign up with Google
          </Button>
          <div className="my-6">
            <AuthDivider label="or with email" />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="space-y-2">
              <Label htmlFor="name">{role === "parent" ? "Your full name" : "Full name"}</Label>
              <Input id="name" autoComplete="name" placeholder="Ada Okafor" aria-invalid={!!errors.name} {...register("name")} />
              {errors.name && <p className="text-[13px] font-medium text-destructive">{errors.name.message}</p>}
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} {...register("email")} />
                {errors.email && <p className="text-[13px] font-medium text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone <span className="font-normal text-ink-3">(optional)</span>
                </Label>
                <Input id="phone" type="tel" autoComplete="tel" placeholder="0801 234 5678" {...register("phone")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInput id="password" autoComplete="new-password" placeholder="At least 8 characters" aria-invalid={!!errors.password} {...register("password")} />
              {errors.password && <p className="text-[13px] font-medium text-destructive">{errors.password.message}</p>}
            </div>

            <div>
              <label className="flex cursor-pointer items-start gap-2.5 text-sm text-ink-2">
                <Checkbox
                  className="mt-0.5"
                  checked={!!watch("terms")}
                  onCheckedChange={(c) => setValue("terms", (c === true) as true, { shouldValidate: true })}
                  aria-invalid={!!errors.terms}
                />
                <span>I agree to the Terms of Service and Privacy Policy.</span>
              </label>
              {errors.terms && <p className="mt-1.5 text-[13px] font-medium text-destructive">{errors.terms.message}</p>}
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="animate-spin" /> Creating account…
                </>
              ) : (
                <>
                  Create account <ArrowRight />
                </>
              )}
            </Button>
          </form>
        </>
      )}

      <p className="mt-8 text-center text-sm text-ink-2">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-purple underline underline-offset-4">
          Log in
        </Link>
      </p>
    </>
  )
}

export default function SignupPage() {
  return (
    <AuthShell
      aside={{
        eyebrow: "Join Bisken",
        title: (
          <>
            Learning that fits <span className="text-purple-ink">your child.</span>
          </>
        ),
        quote: "The teachers go beyond and above. They are very committed to the success of their students.",
        author: "Dr Abimbola Adegbuyi",
        role: "Parent",
        image: "/diverse-teenage-students-getting-individual-attent.jpg",
      }}
    >
      <Suspense fallback={null}>
        <SignupInner />
      </Suspense>
    </AuthShell>
  )
}
