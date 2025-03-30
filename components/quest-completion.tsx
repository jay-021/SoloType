"use client"

import { useState, useEffect } from "react"
import SystemNotification from "@/components/system-notification"

interface QuestCompletionProps {
  wpm: number
  accuracy: number
  rank: string
  questName?: string
  xpGained?: number
  onClose: () => void
}

export default function QuestCompletion({
  wpm,
  accuracy,
  rank,
  questName = "Typing Test",
  xpGained = 100,
  onClose,
}: QuestCompletionProps) {
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    // Show notification after a short delay
    const timer = setTimeout(() => {
      setShowNotification(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleNotificationClose = () => {
    setShowNotification(false)
    onClose()
  }

  return (
    <>
      {showNotification && (
        <SystemNotification
          type="quest"
          onClose={handleNotificationClose}
          data={{
            questName,
            rank,
            wpm,
            accuracy,
            xpGained,
          }}
        />
      )}
    </>
  )
}

