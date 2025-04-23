'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AuthComingSoonProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
}

export default function AuthComingSoon({
  isOpen,
  onClose,
  type,
}: AuthComingSoonProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Slight delay for dramatic effect
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const title = type === 'login' ? 'HUNTER LOGIN' : 'HUNTER REGISTRATION';
  const description =
    type === 'login'
      ? 'Hunter login system is currently under development.'
      : 'Hunter registration system is currently under development.';

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
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
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="system-notification-container relative z-10"
          >
            {/* Top border with circuit pattern */}
            <div className="system-border-top"></div>

            {/* Main content */}
            <div className="system-notification-content">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="system-icon-container mr-4">
                    <Lock className="h-6 w-6 text-cyan-300" />
                  </div>
                  <div className="system-title">{title}</div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 transition-colors hover:text-cyan-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="system-message space-y-4">
                <div className="flex items-center rounded-md border border-cyan-900/50 bg-cyan-950/30 p-4">
                  <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0 text-cyan-300" />
                  <p>SYSTEM NOTIFICATION: Feature coming soon</p>
                </div>

                <p>{description}</p>
                <p className="mb-4">
                  The Hunter Association is currently upgrading their systems.
                  This feature will be available in a future update.
                </p>

                <div className="flex justify-center">
                  <Button
                    onClick={onClose}
                    className="system-button bg-cyan-500 px-8 py-2 font-bold text-black hover:bg-cyan-600"
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
  );
}
