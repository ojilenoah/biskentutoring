"use client"

import React, { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLoginSuccess: () => void
}

export default function AdminLoginModal({ open, onOpenChange, onLoginSuccess }: Props) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = () => {
    if (username === "BISKEN" && password === "b1sk3n360*") {
      setError("")
      onLoginSuccess()
      onOpenChange(false)
      setUsername("")
      setPassword("")
    } else {
      setError("Invalid credentials")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Admin Login</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleLogin} className="w-full">
            Login
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}