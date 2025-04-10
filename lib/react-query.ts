"use client"

import { QueryClient } from "@tanstack/react-query"

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Keep cached data for 5 minutes before considering it stale
      staleTime: 5 * 60 * 1000,
      // Retry failed queries 3 times
      retry: 3,
      // Don't refetch on window focus by default
      refetchOnWindowFocus: false,
      // Cache successful responses for 10 minutes
      cacheTime: 10 * 60 * 1000,
    },
  },
})
