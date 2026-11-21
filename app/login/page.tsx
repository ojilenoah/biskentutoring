"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowRight, Loader2 } from "lucide-react"

import { AuthDivider, AuthShell, GoogleMark } from "@/components/auth/auth-shell"
import { PasswordInput } from "@/components/auth/password-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { signIn } from "@/lib/auth"

const schema = z.object({
  email: z.string().min(1, "Enter your email").email("That email doesn't look right"),
  password: z.string().min(1, "Enter your password"),
  remember: z.boolean().optional(),
})
type Values = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: "", password: "", remember: true } })

  const onSubmit = async (v: Values) => {
    setLoading(true)
    await signIn(v.email)
    router.push("/dashboard")
  }

  const soon = (what: string) => toast({ title: `${what} is coming soon`, description: "This is a preview of the new Bisken learning app." })

  return (
    <AuthShell
      aside={{
        eyebrow: "Welcome back",
        title: (
          <>
            Pick up right <span className="text-purple-ink">where you left off.</span>
          </>
        ),
        quote: "Amazing job by the teaching team! If you register, you will surely get value for your money.",
        author: "Precious E. Ekpenyong",
        role: "Parent",
        image: "/teenage-students-studying-mathematics-with-tutor.jpg",
      }}
    >
      <h1 className="text-[40px] sm:text-[48px]">Good to see you again.</h1>
      <p className="mt-3 text-ink-2">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-purple underline underline-offset-4">
          Create an account
        </Link>
      </p>

      <Button variant="surface" className="mt-8 w-full" onClick={() => soon("Google sign-in")} type="button">
        <GoogleMark /> Continue with Google
      </Button>

      <div className="my-6">
        <AuthDivider label="or with email" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" aria-invalid={!!errors.email} {...register("email")} />
          {errors.email && <p className="text-[13px] font-medium text-destructive">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button type="button" onClick={() => soon("Password reset")} className="text-[13px] font-medium text-purple hover:underline">
              Forgot password?
            </button>
          </div>
          <PasswordInput id="password" autoComplete="current-password" placeholder="••••••••" aria-invalid={!!errors.password} {...register("password")} />
          {errors.password && <p className="text-[13px] font-medium text-destructive">{errors.password.message}</p>}
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 text-sm text-ink-2">
          <Checkbox checked={watch("remember")} onCheckedChange={(c) => setValue("remember", c === true)} />
          Keep me signed in
        </label>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Signing in…
            </>
          ) : (
            <>
              Log in <ArrowRight />
            </>
          )}
        </Button>
      </form>
    </AuthShell>
  )
}
