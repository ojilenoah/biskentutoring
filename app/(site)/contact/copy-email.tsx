"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CONTACT } from "@/lib/content"

export function CopyEmail() {
  const [copied, setCopied] = useState(false)
  return (
    <Button
      variant="secondary"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(CONTACT.email)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch {}
      }}
    >
      {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy email"}
    </Button>
  )
}
