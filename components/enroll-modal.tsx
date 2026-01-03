"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

type Props = { onClose: () => void; tutorName?: string }

import { supabase } from "@/lib/supabaseClient"

export default function EnrollModal({ onClose, tutorName }: Props) {
  const form = useForm<any>({ defaultValues: { name: "", email: "", phone: "", subject: tutorName || "", message: "" } })

  const onSubmit = async (data: any) => {
    try {
      const { error } = await supabase.from('enrollments').insert([{ 
        name: data.name,
        email: data.email,
        phone: data.phone,
        subject: data.subject,
        message: data.message,
      }])

      if (error) {
        console.error('Failed to save enrollment to Supabase:', error)
      }
    } catch (err) {
      console.error('Supabase error:', err)
    }

    const body = `Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone}%0D%0ASubject: ${data.subject}%0D%0AMessage: ${data.message}`
    const mailto = `mailto:biskentutoring@gmail.com?subject=Enrollment%20Request%20${encodeURIComponent(data.subject || "")}&body=${body}`
    window.open(mailto)
    form.reset()
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">Start Learning Today</DialogTitle>
          <DialogDescription>
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

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white mt-2">Submit Request</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
