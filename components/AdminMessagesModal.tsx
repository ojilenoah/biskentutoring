"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Enrollment Messages</DialogTitle>
        </DialogHeader>
        {selectedEnrollment ? (
          <div>
            <Button onClick={() => setSelectedEnrollment(null)} className="mb-4">
              Back to List
            </Button>
            <Card>
              <CardHeader>
                <CardTitle>{selectedEnrollment.name} - {selectedEnrollment.subject}</CardTitle>
              </CardHeader>
              <CardContent>
                <p><strong>Email:</strong> {selectedEnrollment.email}</p>
                <p><strong>Phone:</strong> {selectedEnrollment.phone}</p>
                <p><strong>Subject:</strong> {selectedEnrollment.subject}</p>
                <p><strong>Message:</strong> {selectedEnrollment.message || 'No message'}</p>
                <p><strong>Submitted:</strong> {formatDate(selectedEnrollment.created_at)}</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : enrollments.length === 0 ? (
              <p>No enrollments yet.</p>
            ) : (
              <div className="space-y-2">
                {enrollments.map((enrollment) => (
                  <Card key={enrollment.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedEnrollment(enrollment)}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">{enrollment.name}</p>
                          <p className="text-sm text-gray-600">{enrollment.subject}</p>
                        </div>
                        <p className="text-sm text-gray-500">{formatDate(enrollment.created_at)}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}