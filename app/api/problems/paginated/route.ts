import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const pageSize = Number.parseInt(searchParams.get("pageSize") || "50")
    const company = searchParams.get("company")
    const sort = searchParams.get("sort")

    // Validate parameters
    if (isNaN(page) || page < 1) {
      return NextResponse.json({ error: "Invalid page number" }, { status: 400 })
    }

    if (isNaN(pageSize) || pageSize < 1 || pageSize > 100) {
      return NextResponse.json({ error: "Invalid page size" }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    try {
      // Build the query
      let query = supabase
        .from("coding_problems")
        .select("id, problem_id, problem_name, company_name, difficulty, url", { count: "exact" })

      // Apply company filter if provided
      if (company) {
        query = query.eq("company_name", company)
      }

      // Apply sorting if provided
      if (sort === "easy-first") {
        query = query.order("difficulty", { ascending: true })
      } else if (sort === "hard-first") {
        query = query.order("difficulty", { ascending: false })
      }

      // Calculate pagination
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      // Execute the query with pagination
      const { data, error, count } = await query.range(from, to)

      if (error) {
        throw error
      }

      // Ensure count is a number
      const totalItems = typeof count === "number" ? count : 0
      const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))

      // Return the paginated results with metadata
      return NextResponse.json({
        data: data || [],
        pagination: {
          currentPage: page,
          pageSize,
          totalItems,
          totalPages,
          from: totalItems > 0 ? from + 1 : 0,
          to: Math.min(from + pageSize, totalItems),
        },
      })
    } catch (supabaseError: any) {
      console.error("Supabase error:", supabaseError)

      // Return a proper JSON error for rate limiting
      if (supabaseError.message && supabaseError.message.includes("Too many requests")) {
        return NextResponse.json(
          { error: "Too many requests, please try again later" },
          {
            status: 429,
            headers: {
              "Retry-After": "5",
            },
          },
        )
      }

      throw supabaseError
    }
  } catch (error: any) {
    console.error("Error fetching paginated problems:", error)

    return NextResponse.json({ error: error.message || "Error fetching problems" }, { status: 500 })
  }
}
