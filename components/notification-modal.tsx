import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect } from 'react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationModal({
  isOpen,
  onClose,
}: NotificationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-blur-active');
    } else {
      document.body.classList.remove('modal-blur-active');
    }

    return () => {
      document.body.classList.remove('modal-blur-active');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="notification-modal fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      {/* Modal content */}
      <div className="relative w-full max-w-lg p-4">
        <Card className="border-solo-purple/30 bg-solo-darkgray/95 p-8 shadow-[0_0_50px_rgba(139,92,246,0.5)]">
          <div className="relative z-10">
            <h2 className="solo-font glow-text mb-2 text-center text-3xl font-bold text-solo-purple-light">
              HUNTER LOGIN
            </h2>

            <div className="mb-8 text-center">
              <p className="mb-4 font-semibold text-yellow-400">
                SYSTEM NOTIFICATION: Feature coming soon
              </p>
              <p className="mb-4 text-xl text-white">
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
                className="bg-solo-purple px-8 py-6 text-lg font-semibold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:bg-solo-purple-dark"
              >
                <Link href="/">Return to Main Gate</Link>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
