"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchWithRetry } from "./use-fetch-with-retry"
import type { CodingProblem, ProblemStatus, UserProblem, UserProblemStats } from "@/types"
import { useAuth } from "@/contexts/auth-context"

// Constants
const PAGE_SIZE = 50

// Fetch problems with pagination
export function useProblems(
  page = 1,
  company: string | null = null,
  sortOption = "none",
  options: { initialData?: any } = {},
) {
  const queryKey = ["problems", page, company, sortOption]

  return useQuery({
    queryKey,
    queryFn: async () => {
      let url = `/api/problems/paginated?page=${page}&pageSize=${PAGE_SIZE}`

      if (company) {
        url += `&company=${company}`
      }

      if (sortOption !== "none") {
        url += `&sort=${sortOption}`
      }

      try {
        const response = await fetchWithRetry(url)
        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        // Ensure pagination data is complete
        if (!data.pagination) {
          data.pagination = {
            currentPage: page,
            pageSize: PAGE_SIZE,
            totalItems: data.data?.length || 0,
            totalPages: 1,
            from: 0,
            to: data.data?.length || 0,
          }
        }

        return data
      } catch (error) {
        console.error("Error fetching problems:", error)
        throw error
      }
    },
    // Use initialData if provided
    initialData: options.initialData,
    // Don't refetch automatically - only when explicitly requested or when dependencies change
    refetchOnMount: false,
    refetchOnReconnect: false,
  })
}

// Fetch user problem stats
export function useUserProblemStats() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ["userProblemStats", user?.id],
    queryFn: async () => {
      if (!user) {
        return {
          solved: 0,
          attempted: 0,
          saved: 0,
          total: 0,
        }
      }

      try {
        const response = await fetchWithRetry(`/api/user-problems/stats?userId=${user.id}`)
        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        return data as UserProblemStats
      } catch (error) {
        console.error("Error fetching user problem stats:", error)
        throw error
      }
    },
    // Only fetch when user is available
    enabled: !!user,
    // Keep fresh for 2 minutes
    staleTime: 2 * 60 * 1000,
  })
}

// Fetch user problems
export function useUserProblems() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ["userProblems", user?.id],
    queryFn: async () => {
      if (!user) {
        return new Map<number, UserProblem>()
      }

      try {
        const response = await fetchWithRetry(`/api/user-problems?userId=${user.id}`)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || `API error: ${response.status}`)
        }

        const data = await response.json()

        // Convert to Map for easier lookup
        const problemsMap = new Map<number, UserProblem>()
        if (Array.isArray(data)) {
          data.forEach((problem: UserProblem) => {
            if (problem && problem.problem_id) {
              problemsMap.set(problem.problem_id, problem)
            }
          })
        }

        return problemsMap
      } catch (error) {
        console.error("Error fetching user problems:", error)
        throw error
      }
    },
    // Only fetch when user is available
    enabled: !!user,
    // Add retry configuration
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  })
}

// Update problem status mutation
export function useUpdateProblemStatus() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      problemId,
      status,
      notes,
    }: {
      problemId: number
      status: ProblemStatus
      notes?: string
    }) => {
      if (!user) {
        throw new Error("User not authenticated")
      }

      try {
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

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || `API error: ${response.status}`)
        }

        const data = await response.json()
        return data
      } catch (error) {
        console.error("Error updating problem status:", error)
        throw error
      }
    },
    // When mutation is successful, invalidate relevant queries to trigger refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProblems", user?.id] })
      queryClient.invalidateQueries({ queryKey: ["userProblemStats", user?.id] })
    },
  })
}

// Fetch problem details by IDs (for batch fetching)
export function useProblemsByIds(ids: number[] | null) {
  return useQuery({
    queryKey: ["problemsByIds", ids ? ids.join(",") : "none"],
    queryFn: async () => {
      if (!ids || ids.length === 0) {
        return []
      }

      try {
        // Split into chunks of 50 to avoid URL length limits
        const chunks = []
        for (let i = 0; i < ids.length; i += 50) {
          chunks.push(ids.slice(i, i + 50))
        }

        // Only fetch the first chunk initially
        const chunk = chunks[0]
        const response = await fetchWithRetry(`/api/problems?ids=${chunk.join(",")}`)

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || `API error: ${response.status}`)
        }

        const data = await response.json()
        return data as CodingProblem[]
      } catch (error) {
        console.error("Error fetching problems by IDs:", error)
        throw error
      }
    },
    // Only fetch when IDs are available
    enabled: !!ids && ids.length > 0,
    // Cache for longer since problem details rarely change
    staleTime: 30 * 60 * 1000,
  })
}

// Batch update user problems
export function useBatchUpdateUserProblems() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (
      operations: Array<{
        type: "update" | "delete"
        problemId?: number
        status?: ProblemStatus
        notes?: string
        id?: string
      }>,
    ) => {
      if (!user) {
        throw new Error("User not authenticated")
      }

      try {
        const response = await fetchWithRetry("/api/user-problems/batch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            operations,
          }),
        })

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || `API error: ${response.status}`)
        }

        const data = await response.json()
        return data
      } catch (error) {
        console.error("Error in batch update:", error)
        throw error
      }
    },
    // When mutation is successful, invalidate relevant queries to trigger refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProblems", user?.id] })
      queryClient.invalidateQueries({ queryKey: ["userProblemStats", user?.id] })
    },
  })
}
