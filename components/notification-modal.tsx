import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { useEffect } from "react"

interface NotificationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function NotificationModal({ isOpen, onClose }: NotificationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-blur-active')
    } else {
      document.body.classList.remove('modal-blur-active')
    }

    return () => {
      document.body.classList.remove('modal-blur-active')
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center notification-modal">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      {/* Modal content */}
      <div className="relative w-full max-w-lg p-4">
        <Card className="bg-solo-darkgray/95 border-solo-purple/30 p-8 shadow-[0_0_50px_rgba(139,92,246,0.5)]">
          <div className="relative z-10">
            <h2 className="solo-font text-3xl font-bold text-center mb-2 text-solo-purple-light glow-text">
              HUNTER LOGIN
            </h2>
            
            <div className="text-center mb-8">
              <p className="text-yellow-400 font-semibold mb-4">
                SYSTEM NOTIFICATION: Feature coming soon
              </p>
              <p className="text-xl text-white mb-4">
                Hunter login system is currently under development.
              </p>
              <p className="text-gray-300">
                The Hunter Association is currently upgrading their systems. 
                This feature will be available in a future update.
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                asChild
                className="bg-solo-purple hover:bg-solo-purple-dark text-white font-semibold px-8 py-6 text-lg shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              >
                <Link href="/">
                  Return to Main Gate
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 