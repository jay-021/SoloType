'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock, Sparkles } from 'lucide-react';

export default function ComingSoonSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative"
    >
      <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm">
        <div className="flex items-center rounded-full border border-solo-purple/30 bg-solo-black/80 px-6 py-3 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <Sparkles className="mr-2 h-5 w-5 text-solo-purple-light" />
          <span className="text-lg font-bold text-solo-purple-light">
            Feature Coming Soon
          </span>
        </div>
      </div>

      <Card className="relative overflow-hidden border-solo-purple/20 bg-gradient-to-b from-solo-darkgray/50 to-solo-black/30 p-6">
        <div className="mb-6 flex items-center">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full border-solo-purple/20 bg-solo-black/50">
            <Lock className="h-6 w-6 text-solo-purple-light" />
          </div>
          <div>
            <h3 className="solo-font glow-text text-2xl font-bold">
              Create Your Own Quest
            </h3>
            <div className="text-gray-400">
              Design custom typing challenges for yourself and others
            </div>
          </div>
        </div>

        <div className="mb-6 space-y-4 opacity-60">
          <p className="text-gray-300">
            Soon, you'll be able to create personalized typing quests with
            custom texts, time limits, and difficulty settings. Challenge your
            friends or the community with your own unique typing tests!
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-md bg-solo-black/40 p-4">
              <h4 className="mb-2 font-bold">Custom Texts</h4>
              <p className="text-sm text-gray-400">
                Use your favorite quotes, passages, or code snippets
              </p>
            </div>
            <div className="rounded-md bg-solo-black/40 p-4">
              <h4 className="mb-2 font-bold">Special Rules</h4>
              <p className="text-sm text-gray-400">
                Set unique challenges like "no backspace" mode
              </p>
            </div>
            <div className="rounded-md bg-solo-black/40 p-4">
              <h4 className="mb-2 font-bold">Share & Compete</h4>
              <p className="text-sm text-gray-400">
                Challenge others with your custom quests
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            disabled
            className="cursor-not-allowed bg-solo-purple/50 text-white/70 hover:bg-solo-purple/50"
          >
            Create Quest
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
