import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const ids = searchParams.get("ids")

    if (!ids) {
      return NextResponse.json({ error: "Problem IDs are required" }, { status: 400 })
    }

    const problemIds = ids.split(",").map((id) => Number.parseInt(id))

    // Limit the number of IDs to prevent rate limiting
    const limitedIds = problemIds.slice(0, 100)

    const supabase = getSupabaseAdmin()

    try {
      // Only select the fields we need
      const { data, error } = await supabase
        .from("coding_problems")
        .select("id, problem_id, problem_name, company_name, difficulty, url")
        .in("id", limitedIds)

      if (error) {
        throw error
      }

      return NextResponse.json(data)
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

      // Return other errors as JSON
      return NextResponse.json({ error: supabaseError.message || "Database error" }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Error fetching problems:", error)

    // Return a proper JSON error response
    return NextResponse.json({ error: error.message || "Error fetching problems" }, { status: 500 })
  }
}
