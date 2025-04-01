"use client"

import { useUserProblems } from "@/hooks/use-user-problems"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Bookmark } from "lucide-react"
import { motion } from "framer-motion"

export function UserStats() {
  const { stats, loading } = useUserProblems()

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
        ))}
      </div>
    )
  }

  const solvedPercentage = stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0
  const attemptedPercentage = stats.total > 0 ? Math.round((stats.attempted / stats.total) * 100) : 0
  const savedPercentage = stats.total > 0 ? Math.round((stats.saved / stats.total) * 100) : 0

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              Solved Problems
            </CardTitle>
            <CardDescription>
              {stats.solved} of {stats.total} problems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={solvedPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">{solvedPercentage}% Complete</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="mr-2 h-4 w-4 text-yellow-500" />
              Attempted Problems
            </CardTitle>
            <CardDescription>
              {stats.attempted} of {stats.total} problems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={attemptedPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">{attemptedPercentage}% In Progress</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Bookmark className="mr-2 h-4 w-4 text-blue-500" />
              Saved Problems
            </CardTitle>
            <CardDescription>
              {stats.saved} of {stats.total} problems
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Progress value={savedPercentage} className="h-2" />
              <p className="text-xs text-muted-foreground">{savedPercentage}% Saved</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

