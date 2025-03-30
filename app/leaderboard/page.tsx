"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, Users } from "lucide-react"
import TopTypistCard from "@/components/top-typist-card"
import LeaderboardTable from "@/components/leaderboard-table"
import ComingSoonSection from "@/components/coming-soon-section"
import { getLeaderboardData, type LeaderboardEntry } from "@/data/mock-leaderboard"

export default function LeaderboardPage() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data from an API
    const timer = setTimeout(() => {
      setLeaderboardData(getLeaderboardData())
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Get top 3 typists
  const topTypists = leaderboardData.slice(0, 3)

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="flex items-center mb-8">
        <Button asChild variant="ghost" className="mr-4">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="solo-font text-3xl md:text-4xl font-bold glow-text">Hunter Rankings</h1>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-solo-purple/30 border-t-solo-purple-light rounded-full animate-spin mb-4"></div>
          <p className="text-gray-400">Loading hunter rankings...</p>
        </div>
      ) : (
        <>
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Trophy className="h-6 w-6 text-solo-purple-light mr-2" />
              <h2 className="text-2xl font-bold">Top S-Rank Hunters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topTypists.map((entry, index) => (
                <TopTypistCard key={entry.id} entry={entry} position={index + 1} />
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Users className="h-6 w-6 text-solo-purple-light mr-2" />
              <h2 className="text-2xl font-bold">All Hunters</h2>
            </div>

            <LeaderboardTable initialData={leaderboardData} />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Custom Quests</h2>
            <ComingSoonSection />
          </div>
        </>
      )}
    </div>
  )
}

