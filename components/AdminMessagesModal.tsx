"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Mail, Phone } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

type Enrollment = {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  message: string | null
  created_at: string
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AdminMessagesModal({ open, onOpenChange }: Props) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([])
  const [selectedEnrollment, setSelectedEnrollment] = useState<Enrollment | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      fetchEnrollments()
    }
  }, [open])

  const fetchEnrollments = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching enrollments:', error)
      } else {
        setEnrollments(data || [])
      }
    } catch (err) {
      console.error('Supabase error:', err)
    }
    setLoading(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    alert(`${label} copied to clipboard!`)
  }

  const sendEmail = (email: string) => {
    window.open(`mailto:${email}`, "_blank")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={true}>
      <DialogContent 
        className="sm:max-w-[900px] max-h-[90vh] overflow-hidden flex flex-col"
        onPointerDownOutside={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {selectedEnrollment && (
              <Button variant="ghost" size="sm" onClick={() => setSelectedEnrollment(null)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            {selectedEnrollment ? `Message from ${selectedEnrollment.name}` : "Enrollment Messages"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto">
          {selectedEnrollment ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{selectedEnrollment.subject}</span>
                    <Badge variant="secondary">{formatDate(selectedEnrollment.created_at)}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="text-lg">{selectedEnrollment.name}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg">{selectedEnrollment.email}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => copyToClipboard(selectedEnrollment.email, "Email")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => sendEmail(selectedEnrollment.email)}
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <div className="flex items-center gap-2">
                        <p className="text-lg">{selectedEnrollment.phone}</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => copyToClipboard(selectedEnrollment.phone, "Phone number")}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Subject</p>
                      <p className="text-lg">{selectedEnrollment.subject}</p>
                    </div>
                  </div>
                  {selectedEnrollment.message && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-500">Message</p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="whitespace-pre-wrap">{selectedEnrollment.message}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              {loading ? (
                <div className="flex justify-center items-center py-8">
                  <p className="text-lg">Loading messages...</p>
                </div>
              ) : enrollments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg text-gray-500">No enrollment messages yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {enrollments.map((enrollment) => (
                    <Card 
                      key={enrollment.id} 
                      className="cursor-pointer hover:bg-gray-50 transition-colors" 
                      onClick={() => setSelectedEnrollment(enrollment)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-semibold text-lg">{enrollment.name}</h3>
                              <Badge variant="outline">{enrollment.subject}</Badge>
                            </div>
                            <p className="text-gray-600">{enrollment.email}</p>
                            {enrollment.message && (
                              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                {enrollment.message.length > 100 
                                  ? `${enrollment.message.substring(0, 100)}...` 
                                  : enrollment.message}
                              </p>
                            )}
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            {formatDate(enrollment.created_at)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}