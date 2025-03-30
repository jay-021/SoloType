"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertCircle, X, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuthComingSoonProps {
  isOpen: boolean
  onClose: () => void
  type: "login" | "signup"
}

export default function AuthComingSoon({ isOpen, onClose, type }: AuthComingSoonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // Slight delay for dramatic effect
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  const title = type === "login" ? "HUNTER LOGIN" : "HUNTER REGISTRATION"
  const description =
    type === "login"
      ? "Hunter login system is currently under development."
      : "Hunter registration system is currently under development."

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="system-icon-container mr-4">
                    <Lock className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div className="system-title">{title}</div>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-cyan-300 transition-colors">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="system-message space-y-4">
                <div className="flex items-center bg-cyan-950/30 p-4 rounded-md border border-cyan-900/50">
                  <AlertCircle className="h-5 w-5 text-cyan-300 mr-2 flex-shrink-0" />
                  <p>SYSTEM NOTIFICATION: Feature coming soon</p>
                </div>

                <p>{description}</p>
                <p className="mb-4">
                  The Hunter Association is currently upgrading their systems. This feature will be available in a
                  future update.
                </p>

                <div className="flex justify-center">
                  <Button
                    onClick={onClose}
                    className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-2 system-button"
                  >
                    Return to Main Gate
                  </Button>
                </div>
              </div>
            </div>

            {/* Bottom border with circuit pattern */}
            <div className="system-border-bottom"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

