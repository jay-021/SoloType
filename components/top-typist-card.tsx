"use client"

import { motion } from "framer-motion"
import { Trophy, Award, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import type { LeaderboardEntry } from "@/data/mock-leaderboard"

interface TopTypistCardProps {
  entry: LeaderboardEntry
  position: number
}

export default function TopTypistCard({ entry, position }: TopTypistCardProps) {
  // Determine which icon to use based on position
  const PositionIcon = position === 1 ? Trophy : position === 2 ? Award : Zap

  // Determine color scheme based on position
  const getColorScheme = () => {
    switch (position) {
      case 1:
        return {
          bg: "from-amber-950/30 to-amber-900/10",
          border: "border-amber-500/30",
          icon: "text-amber-400",
          glow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]",
          flame: "flame-gold",
        }
      case 2:
        return {
          bg: "from-slate-950/30 to-slate-900/10",
          border: "border-slate-400/30",
          icon: "text-slate-300",
          glow: "shadow-[0_0_12px_rgba(148,163,184,0.3)]",
          flame: "flame-silver",
        }
      case 3:
        return {
          bg: "from-amber-950/30 to-amber-900/10",
          border: "border-amber-700/30",
          icon: "text-amber-700",
          glow: "shadow-[0_0_10px_rgba(180,83,9,0.3)]",
          flame: "flame-bronze",
        }
      default:
        return {
          bg: "from-solo-darkgray/50 to-solo-black/30",
          border: "border-solo-purple/20",
          icon: "text-solo-purple-light",
          glow: "",
          flame: "",
        }
    }
  }

  const colors = getColorScheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: position * 0.1 }}
      className="relative"
    >
      <Card className={`p-6 bg-gradient-to-b ${colors.bg} ${colors.border} ${colors.glow} relative overflow-hidden`}>
        {/* Animated flames for top 3 */}
        {position <= 3 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`flames-container ${colors.flame}`}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flame"
                  style={{
                    left: `${10 + i * 20}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${1.5 + Math.random()}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center mb-4">
          <div
            className={`flex items-center justify-center w-12 h-12 rounded-full bg-solo-black/50 ${colors.border} mr-4`}
          >
            <PositionIcon className={`h-6 w-6 ${colors.icon}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold">{entry.username}</h3>
            <div className={`text-sm ${colors.icon}`}>
              {position === 1
                ? "Champion"
                : position === 2
                  ? "Runner-up"
                  : position === 3
                    ? "Third Place"
                    : `Rank #${position}`}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-solo-black/40 p-3 rounded-md text-center">
            <div className="text-sm text-gray-400">WPM</div>
            <div className="text-2xl font-mono font-bold">{entry.wpm}</div>
          </div>
          <div className="bg-solo-black/40 p-3 rounded-md text-center">
            <div className="text-sm text-gray-400">Accuracy</div>
            <div className="text-2xl font-mono font-bold">{entry.accuracy}%</div>
          </div>
        </div>

        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <div>Test: {entry.testType}</div>
          <div>{entry.testDuration} min</div>
        </div>
      </Card>
    </motion.div>
  )
}

