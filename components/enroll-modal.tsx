"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

type Props = { onClose: () => void; tutorName?: string }

export default function EnrollModal({ onClose, tutorName }: Props) {
  const { toast } = useToast()
  const [submitted, setSubmitted] = useState(false)
  const form = useForm<any>({ defaultValues: { name: "", email: "", phone: "", subject: tutorName || "", message: "" } })

  const onSubmit = async (data: any) => {
    const body = `Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone}%0D%0ASubject: ${data.subject}%0D%0AMessage: ${data.message}`
    const mailto = `mailto:biskentutoring@gmail.com?subject=Enrollment%20Request%20${encodeURIComponent(data.subject || "")}&body=${body}`
    window.open(mailto)

    toast({
      title: "Success!",
      description: "Your enrollment request has been submitted. We'll contact you soon!",
    })
    setSubmitted(true)
    form.reset()
  }

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-[480px] !bg-white !backdrop-blur-none !shadow-xl border border-slate-200">
        {submitted ? (
          <div className="text-center py-8">
            <div className="mb-4 mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center ring-1 ring-emerald-200">
              <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Message sent</h3>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Your enrollment request has been submitted successfully. We'll be in touch soon!
            </p>
            <Button onClick={onClose} className="w-full bg-gradient-to-br from-primary to-fuchsia-600 text-white btn-magnetic rounded-full border-0">
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <span className="inline-block px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase rounded-full chip-glass text-primary mb-2 w-fit">Enrollment</span>
              <DialogTitle className="text-3xl font-bold leading-tight">
                Start learning{" "}
                <span className="display-font-italic bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">today</span>
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed">
                Fill out the form below and we'll match you with the perfect tutor within 24 hours.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject Needed</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Mathematics, Piano, SAT Prep" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specific Goals (Optional)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="My son needs help with Algebra 2..." className="resize-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-gradient-to-br from-primary to-fuchsia-600 text-white btn-magnetic rounded-full border-0 mt-2 h-11">
                  Submit Request
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
