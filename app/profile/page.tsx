"use client"

import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { UserStats } from "@/components/user-stats"
import { UserProblemsList } from "@/components/user-problems-list"
import { motion } from "framer-motion"
import { ErrorBoundary } from "@/components/error-boundary"

export default function ProfilePage() {
  const { user } = useAuth()

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
            Your Profile
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Track your progress and manage your coding problems</p>
        </motion.div>

        <div className="space-y-8">
          <ErrorBoundary>
            <UserStats />
          </ErrorBoundary>
          <ErrorBoundary>
            <UserProblemsList />
          </ErrorBoundary>
        </div>
      </div>
    </ProtectedRoute>
  )
}

