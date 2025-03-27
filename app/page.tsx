"use client"

import { ProblemsDashboard } from "@/components/problems-dashboard"
import { ProtectedRoute } from "@/components/protected-route"

export default function Home() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <ProblemsDashboard />
      </main>
    </ProtectedRoute>
  )
}

