"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProblemCard } from "./problem-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { CodingProblem } from "@/types"
import { motion } from "framer-motion"
import { ErrorBoundary } from "./error-boundary"
import { useUserProblems, useProblemsByIds } from "@/hooks/use-api"

export function UserProblemsList() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<"solved" | "attempted" | "saved">("solved")

  // Fetch user problems with React Query
  const {
    data: userProblemsMap = new Map(),
    isLoading: loadingUserProblems,
    error: userProblemsError,
  } = useUserProblems()

  // Extract problem IDs for the active tab
  const getIdsForTab = () => {
    if (!userProblemsMap.size) return []

    return Array.from(userProblemsMap.entries())
      .filter(([_, problem]) => problem.status === activeTab)
      .map(([id]) => id)
  }

  const problemIds = getIdsForTab()

  // Fetch problem details for the active tab only
  const {
    data: problemsData = [],
    isLoading: loadingProblemDetails,
    error: problemDetailsError,
  } = useProblemsByIds(problemIds.length > 0 ? problemIds : null)

  // Loading state
  const isLoading = loadingUserProblems || loadingProblemDetails

  // Error handling
  const error = userProblemsError || problemDetailsError
  const errorMessage = error ? (error instanceof Error ? error.message : "An error occurred") : null

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-40 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
        ))}
      </div>
    )
  }

  if (errorMessage) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{errorMessage}</AlertDescription>
      </Alert>
    )
  }

  const hasNoProblems = problemIds.length === 0

  if (hasNoProblems) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          You haven't tracked any problems yet. Start by marking problems as solved, attempted, or saved.
        </p>
      </motion.div>
    )
  }

  return (
    <ErrorBoundary>
      <Tabs
        defaultValue="solved"
        className="mt-8"
        onValueChange={(value) => setActiveTab(value as "solved" | "attempted" | "saved")}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="solved">
            Solved ({Array.from(userProblemsMap.values()).filter((p) => p.status === "solved").length})
          </TabsTrigger>
          <TabsTrigger value="attempted">
            Attempted ({Array.from(userProblemsMap.values()).filter((p) => p.status === "attempted").length})
          </TabsTrigger>
          <TabsTrigger value="saved">
            Saved ({Array.from(userProblemsMap.values()).filter((p) => p.status === "saved").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {problemsData.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {problemsData.map((problem: CodingProblem, index: number) => (
                <ProblemCard key={problem.id} problem={problem} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              You haven't {activeTab === "solved" ? "solved" : activeTab === "attempted" ? "attempted" : "saved"} any
              problems yet.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </ErrorBoundary>
  )
}
