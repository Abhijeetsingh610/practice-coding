"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Crown, Code } from "lucide-react"
import { motion } from "framer-motion"
import { fetchWithRetry } from "@/hooks/use-fetch-with-retry"
import { useAuth } from "@/contexts/auth-context"

interface LeaderboardUser {
  user_id: string
  name: string
  solved_count: number
  rank: number
}

export function LeaderboardFull() {
  const { user } = useAuth()
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetchWithRetry("/api/leaderboard")
        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setLeaderboard(data.leaderboard || [])
      } catch (err: any) {
        console.error("Error fetching leaderboard:", err)
        setError(err.message || "Failed to load leaderboard data")
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboard()
  }, [])

  // Get current month name and year
  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" })

  // Render rank badge based on position
  const renderRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-500">
            <Crown className="h-6 w-6" />
          </div>
        )
      case 2:
        return (
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <Trophy className="h-6 w-6" />
          </div>
        )
      case 3:
        return (
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500">
            <Medal className="h-6 w-6" />
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-lg font-medium">
            {rank}
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Trophy className="mr-2 h-6 w-6 text-yellow-500" />
          {currentMonth} Leaderboard
        </CardTitle>
        <CardDescription>Top problem solvers ranked by number of problems solved this month</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse dark:bg-gray-700" />
                <div className="h-5 w-40 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
                <div className="h-5 w-10 ml-auto bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-6 text-red-500 dark:text-red-400">
            <p>{error}</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            <Trophy className="h-16 w-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No one has solved problems yet this month.</p>
            <p className="mt-2">Be the first to make it to the leaderboard!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leaderboard.map((entry, index) => (
              <motion.div
                key={entry.user_id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  entry.rank <= 3
                    ? "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50"
                    : ""
                } ${user?.id === entry.user_id ? "border-2 border-blue-200 dark:border-blue-800" : ""}`}
              >
                {renderRankBadge(entry.rank)}
                <div>
                  <div className="font-medium text-lg flex items-center gap-2">
                    {entry.name}
                    {user?.id === entry.user_id && (
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                        You
                      </span>
                    )}
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    <span className="font-bold text-xl">{entry.solved_count}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    problem{entry.solved_count !== 1 ? "s" : ""} solved
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
