"use client"

import { forwardRef, useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export const PasswordInput = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(function PasswordInput(
  { className, ...props },
  ref,
) {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <Input ref={ref} type={show ? "text" : "password"} className={cn("pr-11", className)} {...props} />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-1.5 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-ink-3 hover:bg-ink/5 hover:text-ink"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  )
})
