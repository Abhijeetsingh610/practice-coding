"use client"

import { ProtectedRoute } from "@/components/protected-route"
import { motion } from "framer-motion"
import { ErrorBoundary } from "@/components/error-boundary"
import { LeaderboardFull } from "@/components/leaderboard-full"

export default function LeaderboardPageClient() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="bg-gradient-to-r from-blue-600 via-purple-500 to-teal-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            Monthly Leaderboard
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Top problem solvers for this month</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <ErrorBoundary>
            <LeaderboardFull />
          </ErrorBoundary>
        </div>
      </div>
    </ProtectedRoute>
  )
}
