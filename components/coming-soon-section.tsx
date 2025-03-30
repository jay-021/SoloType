"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Sparkles } from "lucide-react"

export default function ComingSoonSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="relative"
    >
      <div className="absolute inset-0 z-10 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-solo-black/80 px-6 py-3 rounded-full border border-solo-purple/30 shadow-[0_0_15px_rgba(139,92,246,0.3)] flex items-center">
          <Sparkles className="h-5 w-5 text-solo-purple-light mr-2" />
          <span className="text-lg font-bold text-solo-purple-light">Feature Coming Soon</span>
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-b from-solo-darkgray/50 to-solo-black/30 border-solo-purple/20 relative overflow-hidden">
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-solo-black/50 border-solo-purple/20 mr-4">
            <Lock className="h-6 w-6 text-solo-purple-light" />
          </div>
          <div>
            <h3 className="text-2xl font-bold solo-font glow-text">Create Your Own Quest</h3>
            <div className="text-gray-400">Design custom typing challenges for yourself and others</div>
          </div>
        </div>

        <div className="space-y-4 mb-6 opacity-60">
          <p className="text-gray-300">
            Soon, you'll be able to create personalized typing quests with custom texts, time limits, and difficulty
            settings. Challenge your friends or the community with your own unique typing tests!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-solo-black/40 p-4 rounded-md">
              <h4 className="font-bold mb-2">Custom Texts</h4>
              <p className="text-sm text-gray-400">Use your favorite quotes, passages, or code snippets</p>
            </div>
            <div className="bg-solo-black/40 p-4 rounded-md">
              <h4 className="font-bold mb-2">Special Rules</h4>
              <p className="text-sm text-gray-400">Set unique challenges like "no backspace" mode</p>
            </div>
            <div className="bg-solo-black/40 p-4 rounded-md">
              <h4 className="font-bold mb-2">Share & Compete</h4>
              <p className="text-sm text-gray-400">Challenge others with your custom quests</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button disabled className="bg-solo-purple/50 hover:bg-solo-purple/50 text-white/70 cursor-not-allowed">
            Create Quest
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

