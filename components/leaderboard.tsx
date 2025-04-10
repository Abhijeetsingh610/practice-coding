"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Medal, Award } from "lucide-react"
import { motion } from "framer-motion"
import { fetchWithRetry } from "@/hooks/use-fetch-with-retry"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface LeaderboardUser {
  user_id: string
  name: string
  solved_count: number
  rank: number
}

export function Leaderboard() {
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

  // Get current month name
  const currentMonth = new Date().toLocaleString("default", { month: "long" })

  // Render rank badge based on position
  const renderRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-500">
            <Trophy className="h-5 w-5" />
          </div>
        )
      case 2:
        return (
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
            <Medal className="h-5 w-5" />
          </div>
        )
      case 3:
        return (
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-500">
            <Award className="h-5 w-5" />
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-sm font-medium">
            {rank}
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
          {currentMonth} Leaderboard
        </CardTitle>
        <CardDescription>Top problem solvers this month</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse dark:bg-gray-700" />
                <div className="h-4 w-40 bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
                <div className="h-4 w-8 ml-auto bg-gray-200 rounded animate-pulse dark:bg-gray-700" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500 dark:text-red-400">
            <p>{error}</p>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400">
            <p>No one has solved problems yet this month.</p>
            <p className="mt-2 text-sm">Be the first to make it to the leaderboard!</p>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {leaderboard.slice(0, 5).map((user, index) => (
                <motion.div
                  key={user.user_id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex items-center gap-3 p-2 rounded-lg ${
                    user.rank <= 3 ? "bg-gray-50 dark:bg-gray-800/50" : ""
                  }`}
                >
                  {renderRankBadge(user.rank)}
                  <div className="font-medium truncate">{user.name}</div>
                  <div className="ml-auto flex items-center gap-1">
                    <span className="font-semibold">{user.solved_count}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">solved</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {leaderboard.length > 5 && (
              <div className="mt-4 text-center">
                <Link href="/leaderboard">
                  <Button variant="outline" size="sm">
                    View Full Leaderboard
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
