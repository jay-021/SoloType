"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trophy, BarChart2, Clock, Target } from "lucide-react"

interface TestResultsProps {
  wpm: number
  accuracy: number
  duration: number
  rank: string
  charactersTyped: number
  onRetry: () => void
  onNewTest: () => void
}

export default function TestResults({
  wpm,
  accuracy,
  duration,
  rank,
  charactersTyped,
  onRetry,
  onNewTest,
}: TestResultsProps) {
  // Calculate performance score (weighted combination of WPM and accuracy)
  const performanceScore = Math.round(wpm * 0.6 + accuracy * 0.4)

  // Get rank display name
  const getRankName = (rankId: string) => {
    switch (rankId) {
      case "s":
        return "S-Rank"
      case "a":
        return "A-Rank"
      case "b":
        return "B-Rank"
      case "c":
        return "C-Rank"
      case "d":
        return "D-Rank"
      case "e":
        return "E-Rank"
      case "custom":
        return "Custom"
      default:
        return "Unknown Rank"
    }
  }

  // Get performance rating based on WPM and accuracy
  const getPerformanceRating = () => {
    if (wpm >= 80 && accuracy >= 95) return "S-Rank Hunter"
    if (wpm >= 70 && accuracy >= 92) return "A-Rank Hunter"
    if (wpm >= 60 && accuracy >= 90) return "B-Rank Hunter"
    if (wpm >= 50 && accuracy >= 85) return "C-Rank Hunter"
    if (wpm >= 40 && accuracy >= 80) return "D-Rank Hunter"
    return "E-Rank Hunter"
  }

  return (
    <Card className="p-6 bg-solo-darkgray/80 border-solo-purple/20">
      <div className="text-center mb-8">
        <h2 className="solo-font text-3xl font-bold glow-text mb-2">Test Complete!</h2>
        <p className="text-gray-300">
          You've completed a {duration === 0.5 ? "30-second" : `${duration}-minute`} typing test at {getRankName(rank)} difficulty.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-solo-black/50 rounded-md flex flex-col items-center">
          <BarChart2 className="h-8 w-8 text-solo-purple-light mb-2" />
          <div className="text-sm text-gray-300">Words Per Minute</div>
          <div className="text-3xl font-mono">{wpm}</div>
        </div>

        <div className="p-4 bg-solo-black/50 rounded-md flex flex-col items-center">
          <Target className="h-8 w-8 text-solo-purple-light mb-2" />
          <div className="text-sm text-gray-300">Accuracy</div>
          <div className="text-3xl font-mono">{accuracy}%</div>
        </div>

        <div className="p-4 bg-solo-black/50 rounded-md flex flex-col items-center">
          <Clock className="h-8 w-8 text-solo-purple-light mb-2" />
          <div className="text-sm text-gray-300">Duration</div>
          <div className="text-3xl font-mono">{duration} min</div>
        </div>

        <div className="p-4 bg-solo-black/50 rounded-md flex flex-col items-center">
          <Trophy className="h-8 w-8 text-solo-purple-light mb-2" />
          <div className="text-sm text-gray-300">Characters Typed</div>
          <div className="text-3xl font-mono">{charactersTyped}</div>
        </div>
      </div>

      <div className="bg-solo-black/50 p-6 rounded-md mb-8 text-center">
        <div className="text-sm text-gray-300 mb-2">Your Performance Rating</div>
        <div className="solo-font text-4xl font-bold glow-text mb-4">{getPerformanceRating()}</div>
        <div className="text-sm text-gray-300">Performance Score: {performanceScore}</div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={onRetry} className="bg-solo-purple hover:bg-solo-purple-dark text-white">
          Retry Same Test
        </Button>
        <Button
          onClick={onNewTest}
          variant="outline"
          className="border-solo-purple-light text-solo-purple-light hover:bg-solo-purple hover:text-white"
        >
          Try Different Test
        </Button>
      </div>
    </Card>
  )
}

