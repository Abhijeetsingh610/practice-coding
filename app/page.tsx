import { Suspense } from "react"
import { ProblemsDashboard } from "@/components/problems-dashboard"
import { ProtectedRoute } from "@/components/protected-route"
import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { Skeleton } from "@/components/ui/skeleton"

// Number of problems to pre-fetch on the server
const INITIAL_PAGE_SIZE = 50

// This function runs on the server during SSR
async function getInitialProblems() {
  try {
    const supabase = getSupabaseAdmin()

    // Get total count
    const { count } = await supabase.from("coding_problems").select("*", { count: "exact", head: true })

    // Get first page of problems
    const { data, error } = await supabase
      .from("coding_problems")
      .select("id, problem_id, problem_name, company_name, difficulty, url")
      .range(0, INITIAL_PAGE_SIZE - 1)

    if (error) {
      console.error("Error fetching initial problems:", error)
      return { data: [], count: 0 }
    }

    // Ensure count is a number
    const totalItems = typeof count === "number" ? count : 0
    const totalPages = Math.max(1, Math.ceil(totalItems / INITIAL_PAGE_SIZE))

    return {
      data: data || [],
      count: totalItems,
      pagination: {
        currentPage: 1,
        pageSize: INITIAL_PAGE_SIZE,
        totalItems,
        totalPages,
        from: totalItems > 0 ? 1 : 0,
        to: Math.min(INITIAL_PAGE_SIZE, totalItems),
      },
    }
  } catch (error) {
    console.error("Error in getInitialProblems:", error)
    return {
      data: [],
      count: 0,
      pagination: {
        currentPage: 1,
        pageSize: INITIAL_PAGE_SIZE,
        totalItems: 0,
        totalPages: 1,
        from: 0,
        to: 0,
      },
    }
  }
}

export default async function Home() {
  // Pre-fetch initial data on the server
  const initialData = await getInitialProblems()

  // Hydrate this data to the client component
  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-8">
              <div className="mb-8 text-center">
                <Skeleton className="mx-auto h-12 w-3/4 rounded-lg" />
                <Skeleton className="mx-auto mt-4 h-6 w-1/2 rounded-lg" />
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="h-40 rounded-lg" />
                ))}
              </div>
            </div>
          }
        >
          <ProblemsDashboard initialData={initialData} />
        </Suspense>
      </main>
    </ProtectedRoute>
  )
}
