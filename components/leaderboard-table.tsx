"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Medal, Calendar } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { getLeaderboardData, type LeaderboardEntry } from "@/data/mock-leaderboard"

interface LeaderboardTableProps {
  initialData: LeaderboardEntry[]
}

export default function LeaderboardTable({ initialData }: LeaderboardTableProps) {
  const [timeFilter, setTimeFilter] = useState<"all" | "week" | "month">("all")
  const [rankFilter, setRankFilter] = useState<"all" | "s" | "a" | "b" | "c" | "d" | "e">("all")
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(initialData)

  // Handle filter changes
  const handleFilterChange = (
    newTimeFilter: "all" | "week" | "month" = timeFilter,
    newRankFilter: "all" | "s" | "a" | "b" | "c" | "d" | "e" = rankFilter,
  ) => {
    setTimeFilter(newTimeFilter)
    setRankFilter(newRankFilter)
    setLeaderboardData(getLeaderboardData(newTimeFilter, newRankFilter))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        {/* Time filters */}
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-solo-purple-light" />
          <div className="flex space-x-2">
            <Button
              variant={timeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("all", rankFilter)}
              className={timeFilter === "all" ? "bg-solo-purple hover:bg-solo-purple-dark" : ""}
            >
              All Time
            </Button>
            <Button
              variant={timeFilter === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("month", rankFilter)}
              className={timeFilter === "month" ? "bg-solo-purple hover:bg-solo-purple-dark" : ""}
            >
              This Month
            </Button>
            <Button
              variant={timeFilter === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("week", rankFilter)}
              className={timeFilter === "week" ? "bg-solo-purple hover:bg-solo-purple-dark" : ""}
            >
              This Week
            </Button>
          </div>
        </div>

        {/* Rank filters */}
        <div className="flex items-center space-x-2">
          <Medal className="h-5 w-5 text-solo-purple-light" />
          <div className="flex space-x-2">
            <Button
              variant={rankFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => handleFilterChange(timeFilter, "all")}
              className={rankFilter === "all" ? "bg-solo-purple hover:bg-solo-purple-dark" : ""}
            >
              All Ranks
            </Button>
            <div className="flex space-x-1">
              {["s", "a", "b", "c", "d", "e"].map((rank) => (
                <Button
                  key={rank}
                  variant={rankFilter === rank ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange(timeFilter, rank as any)}
                  className={rankFilter === rank ? "bg-solo-purple hover:bg-solo-purple-dark" : ""}
                >
                  {rank.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-solo-purple/20 overflow-hidden">
        <Table>
          <TableHeader className="bg-solo-darkgray/80">
            <TableRow>
              <TableHead className="w-16 text-center">Rank</TableHead>
              <TableHead>Hunter</TableHead>
              <TableHead className="text-center">WPM</TableHead>
              <TableHead className="text-center">Accuracy</TableHead>
              <TableHead className="hidden md:table-cell">Test Type</TableHead>
              <TableHead className="hidden md:table-cell text-center">Duration</TableHead>
              <TableHead className="hidden lg:table-cell">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((entry, index) => (
              <motion.tr
                key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`${
                  index % 2 === 0 ? "bg-solo-black/50" : "bg-solo-darkgray/30"
                } hover:bg-solo-purple/10 transition-colors`}
              >
                <TableCell className="text-center font-mono">
                  <div className={`dungeon-rank ${entry.rank}-rank mx-auto`}>{entry.rank.toUpperCase()}</div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    {entry.position && entry.position <= 3 && (
                      <span className="mr-2">
                        {entry.position === 1 ? (
                          <Trophy className="h-4 w-4 text-amber-400" />
                        ) : entry.position === 2 ? (
                          <Trophy className="h-4 w-4 text-slate-300" />
                        ) : (
                          <Trophy className="h-4 w-4 text-amber-700" />
                        )}
                      </span>
                    )}
                    {entry.username}
                  </div>
                </TableCell>
                <TableCell className="text-center font-mono font-bold">{entry.wpm}</TableCell>
                <TableCell className="text-center font-mono">{entry.accuracy}%</TableCell>
                <TableCell className="hidden md:table-cell">{entry.testType}</TableCell>
                <TableCell className="hidden md:table-cell text-center">{entry.testDuration} min</TableCell>
                <TableCell className="hidden lg:table-cell text-gray-400">{entry.dateCompleted}</TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

