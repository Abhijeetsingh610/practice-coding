"use client"

import { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/contexts/auth-context"
import type { ProblemStatus, UserProblem, UserProblemStats } from "@/types"
import { fetchWithRetry } from "./use-fetch-with-retry"

export function useUserProblems() {
  const { user } = useAuth()
  const [userProblems, setUserProblems] = useState<Map<number, UserProblem>>(new Map())
  const [stats, setStats] = useState<UserProblemStats>({
    solved: 0,
    attempted: 0,
    saved: 0,
    total: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch user problem stats
  const fetchStats = useCallback(async () => {
    if (!user) return

    try {
      const response = await fetchWithRetry(`/api/user-problems/stats?userId=${user.id}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      // Parse JSON response
      const data = await response.json()

      // Check if the response contains an error
      if (data.error) {
        throw new Error(data.error)
      }

      setStats(data)
    } catch (error: any) {
      console.error("Error fetching user problem stats:", error)
      // Don't set error state here to avoid UI disruption
    }
  }, [user])

  // Fetch user problems
  const fetchUserProblems = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      setError(null)

      const response = await fetchWithRetry(`/api/user-problems?userId=${user.id}`, {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      // Parse JSON response
      const data = await response.json()

      // Check if the response contains an error
      if (data.error) {
        throw new Error(data.error)
      }

      // Convert to Map for easier lookup
      const problemsMap = new Map<number, UserProblem>()
      if (Array.isArray(data)) {
        data.forEach((problem: UserProblem) => {
          if (problem && problem.problem_id) {
            problemsMap.set(problem.problem_id, problem)
          }
        })
      }

      setUserProblems(problemsMap)

      // Fetch stats with a delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500))
      await fetchStats()
    } catch (error: any) {
      console.error("Error fetching user problems:", error)
      setError(error.message || "Failed to load your problem data. Please refresh the page.")
    } finally {
      setLoading(false)
    }
  }, [user, fetchStats])

  // Update problem status with optimistic updates
  const updateProblemStatus = useCallback(
    async (problemId: number, status: ProblemStatus, notes?: string) => {
      if (!user) return null

      // Store previous state for potential rollback
      const previousProblem = userProblems.get(problemId)

      // Optimistically update UI
      setUserProblems((prev) => {
        const newMap = new Map(prev)

        if (status === "not_solved" && previousProblem) {
          // If setting to not_solved and we have a previous record, remove it
          newMap.delete(problemId)
        } else {
          // Otherwise update or add the record
          newMap.set(problemId, {
            ...(previousProblem || {}),
            id: previousProblem?.id || "",
            user_id: user.id,
            problem_id: problemId,
            status,
            notes,
            created_at: previousProblem?.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString(),
          } as UserProblem)
        }

        return newMap
      })

      try {
        setError(null)

        const response = await fetchWithRetry("/api/user-problems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            problemId,
            status,
            notes,
          }),
        })

        // Parse JSON response
        const updatedProblem = await response.json()

        // Check if the response contains an error
        if (updatedProblem.error) {
          throw new Error(updatedProblem.error)
        }

        // Validate the response data
        if (!updatedProblem || (status !== "not_solved" && !updatedProblem.id)) {
          throw new Error("Invalid response data")
        }

        // Update local state with server response
        setUserProblems((prev) => {
          const newMap = new Map(prev)

          if (status === "not_solved") {
            newMap.delete(problemId)
          } else if (updatedProblem) {
            newMap.set(problemId, updatedProblem)
          }

          return newMap
        })

        // Add a delay before fetching stats to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500))
        await fetchStats()

        return updatedProblem
      } catch (error: any) {
        console.error("Error updating problem status:", error)

        // Rollback optimistic update on error
        setUserProblems((prev) => {
          const newMap = new Map(prev)

          if (previousProblem) {
            newMap.set(problemId, previousProblem)
          } else {
            newMap.delete(problemId)
          }

          return newMap
        })

        setError(error.message || "Failed to update problem status")
        return null
      }
    },
    [user, userProblems, fetchStats],
  )

  // Delete user problem
  const deleteProblem = useCallback(
    async (id: string) => {
      if (!user) return false

      // Find the problem to delete for rollback
      let problemIdToDelete: number | null = null
      let problemToDelete: UserProblem | null = null

      for (const [key, value] of userProblems.entries()) {
        if (value.id === id) {
          problemIdToDelete = key
          problemToDelete = value
          break
        }
      }

      if (!problemIdToDelete || !problemToDelete) {
        return false
      }

      // Optimistically update UI
      setUserProblems((prev) => {
        const newMap = new Map(prev)
        newMap.delete(problemIdToDelete!)
        return newMap
      })

      try {
        setError(null)

        const response = await fetchWithRetry(`/api/user-problems?id=${id}`, {
          method: "DELETE",
        })

        // Check if the request was successful
        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Failed to delete: ${errorText}`)
        }

        // Add a delay before fetching stats to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 500))
        await fetchStats()

        return true
      } catch (error) {
        console.error("Error deleting problem:", error)

        // Rollback optimistic update
        if (problemIdToDelete && problemToDelete) {
          setUserProblems((prev) => {
            const newMap = new Map(prev)
            newMap.set(problemIdToDelete!, problemToDelete!)
            return newMap
          })
        }

        setError(
          typeof error === "object" && error !== null && "message" in error
            ? (error as Error).message
            : "Failed to delete problem",
        )

        return false
      }
    },
    [user, userProblems, fetchStats],
  )

  // Get problem status
  const getProblemStatus = useCallback(
    (problemId: number): ProblemStatus | null => {
      const problem = userProblems.get(problemId)
      return problem ? problem.status : null
    },
    [userProblems],
  )

  // Load user problems on mount or when user changes
  useEffect(() => {
    if (user) {
      fetchUserProblems()
    } else {
      setUserProblems(new Map())
      setStats({
        solved: 0,
        attempted: 0,
        saved: 0,
        total: 0,
      })
    }
  }, [user, fetchUserProblems])

  return {
    userProblems,
    stats,
    loading,
    error,
    fetchUserProblems,
    updateProblemStatus,
    getProblemStatus,
  }
}
