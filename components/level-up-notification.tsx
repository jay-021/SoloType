"use client"

import { useState, useEffect } from "react"
import SystemNotification from "@/components/system-notification"

interface LevelUpNotificationProps {
  level: number
  onClose: () => void
}

export default function LevelUpNotification({ level, onClose }: LevelUpNotificationProps) {
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
          type="levelup"
          onClose={handleNotificationClose}
          data={{
            level,
          }}
        />
      )}
    </>
  )
}

