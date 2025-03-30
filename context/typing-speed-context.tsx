"use client"

import { createContext, useState, useContext, type ReactNode } from "react"

type TypingSpeed = "slow" | "fast"

interface TypingSpeedContextType {
  typingSpeed: TypingSpeed
  setTypingSpeed: (speed: TypingSpeed) => void
}

const TypingSpeedContext = createContext<TypingSpeedContextType | undefined>(undefined)

export function TypingSpeedProvider({ children }: { children: ReactNode }) {
  const [typingSpeed, setTypingSpeed] = useState<TypingSpeed>("slow")

  return <TypingSpeedContext.Provider value={{ typingSpeed, setTypingSpeed }}>{children}</TypingSpeedContext.Provider>
}

export function useTypingSpeed() {
  const context = useContext(TypingSpeedContext)
  if (context === undefined) {
    throw new Error("useTypingSpeed must be used within a TypingSpeedProvider")
  }
  return context
}

