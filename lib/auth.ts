"use client"

/*
 * DUMMY AUTH — front-end only, for UI work.
 * Stores a fake session in localStorage. No passwords are kept or checked.
 * Replace with a real provider (NextAuth / Supabase / Clerk) when the
 * learning platform gets a backend.
 */

import { useSyncExternalStore } from "react"

export type Role = "parent" | "student" | "tutor"

export type SessionUser = {
  name: string
  email: string
  role: Role
}

const KEY = "bisken.session"
const EVENT = "bisken:session"

function read(): string | null {
  try {
    return window.localStorage.getItem(KEY)
  } catch {
    return null
  }
}

let cachedRaw: string | null = null
let cachedUser: SessionUser | null = null

function getSnapshot(): SessionUser | null {
  const raw = read()
  if (raw !== cachedRaw) {
    cachedRaw = raw
    try {
      cachedUser = raw ? (JSON.parse(raw) as SessionUser) : null
    } catch {
      cachedUser = null
    }
  }
  return cachedUser
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb)
  window.addEventListener(EVENT, cb)
  return () => {
    window.removeEventListener("storage", cb)
    window.removeEventListener(EVENT, cb)
  }
}

export function useSession() {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}

/** Simulates network latency so loading states can be designed. */
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))

export async function signIn(email: string): Promise<SessionUser> {
  await delay(700)
  const existing = getSnapshot()
  const user: SessionUser =
    existing && existing.email === email
      ? existing
      : { name: email.split("@")[0].replace(/[._-]+/g, " "), email, role: "parent" }
  persist(user)
  return user
}

export async function signUp(user: SessionUser): Promise<SessionUser> {
  await delay(900)
  persist(user)
  return user
}

export function signOut() {
  try {
    window.localStorage.removeItem(KEY)
  } catch {}
  window.dispatchEvent(new Event(EVENT))
}

function persist(user: SessionUser) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(user))
  } catch {}
  window.dispatchEvent(new Event(EVENT))
}

export function firstName(user: SessionUser) {
  const n = user.name.trim().split(/\s+/)[0] || "there"
  return n.charAt(0).toUpperCase() + n.slice(1)
}

/** Direct read, for effects that must not run on the hydration snapshot. */
export function getSession(): SessionUser | null {
  if (typeof window === "undefined") return null
  return getSnapshot()
}
