"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SystemNotificationProps {
  type: "signup" | "login" | "levelup" | "quest"
  onClose: () => void
  data?: any
}

export default function SystemNotification({ type, onClose, data }: SystemNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Slight delay for dramatic effect
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Handle notification content based on type
  const getNotificationContent = () => {
    switch (type) {
      case "signup":
        return {
          title: "NOTIFICATION",
          content: (
            <>
              <p className="mb-4">
                You have acquired the qualifications to become a <span className="text-cyan-300 font-bold">Player</span>
                .
              </p>
              <p className="mb-4">
                Welcome to <span className="text-cyan-300 font-bold">SoloType</span>, the system that allows you to{" "}
                <span className="text-cyan-300 font-bold">level up your typing</span> skills just like a hunter!
              </p>
              <p className="mb-6">Will you accept this challenge?</p>
              <div className="flex justify-center">
                <Button
                  onClick={onClose}
                  className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-2 system-button"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Accept
                </Button>
              </div>
            </>
          ),
          requiresAction: true,
        }
      case "login":
        return {
          title: "NOTIFICATION",
          content: (
            <>
              <p className="mb-4">
                Welcome back, Hunter! Your <span className="text-cyan-300 font-bold">typing journey</span> continues.
              </p>
              <p>
                Prepare to face new <span className="text-cyan-300 font-bold">quests</span> and sharpen your{" "}
                <span className="text-cyan-300 font-bold">skills</span>.
              </p>
            </>
          ),
          requiresAction: false,
        }
      case "levelup":
        return {
          title: "LEVEL UP",
          content: (
            <>
              <p className="mb-4">
                <span className="text-cyan-300 font-bold">Congratulations!</span> You have reached{" "}
                <span className="text-cyan-300 font-bold">Level {data?.level || "?"}</span>
              </p>
              <p className="mb-4">
                Your typing skills have improved significantly. Continue your journey to become an S-Rank Hunter.
              </p>
              <div className="flex justify-center">
                <Button
                  onClick={onClose}
                  className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-2 system-button"
                >
                  Continue
                </Button>
              </div>
            </>
          ),
          requiresAction: true,
        }
      case "quest":
        return {
          title: "QUEST COMPLETED",
          content: (
            <>
              <p className="mb-4">
                Quest Completed: <span className="text-cyan-300 font-bold">{data?.questName || "Typing Test"}</span>
              </p>
              <p className="mb-4">
                🎉 Congratulations! You have gained{" "}
                <span className="text-cyan-300 font-bold">{data?.xpGained || "XP"}</span> and leveled up.
              </p>
              <p className="mb-4">
                Current Rank: <span className="text-cyan-300 font-bold">{data?.rank?.toUpperCase() || "E"}</span>
              </p>
              <p>Next Challenge Awaits...</p>
            </>
          ),
          requiresAction: false,
        }
      default:
        return {
          title: "NOTIFICATION",
          content: <p>System notification</p>,
          requiresAction: false,
        }
    }
  }

  const notificationContent = getNotificationContent()

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={notificationContent.requiresAction ? undefined : onClose}
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="system-notification-container relative z-10"
          >
            {/* Top border with circuit pattern */}
            <div className="system-border-top"></div>

            {/* Main content */}
            <div className="system-notification-content">
              <div className="flex items-center mb-6">
                <div className="system-icon-container mr-4">
                  <AlertCircle className="h-6 w-6 text-cyan-300" />
                </div>
                <div className="system-title">{notificationContent.title}</div>
              </div>

              <div className="system-message">{notificationContent.content}</div>
            </div>

            {/* Bottom border with circuit pattern */}
            <div className="system-border-bottom"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

