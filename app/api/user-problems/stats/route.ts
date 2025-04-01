import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Use admin client for server operations to bypass RLS
    const supabase = getSupabaseAdmin()

    try {
      // Get total problems count - only count, don't fetch data
      const { count: totalProblems, error: totalError } = await supabase
        .from("coding_problems")
        .select("*", { count: "exact", head: true })

      if (totalError) {
        console.error("Supabase total count error:", totalError)
        throw totalError
      }

      // Get user problems by status - only select the status field
      const { data: userProblems, error: userError } = await supabase
        .from("user_problems")
        .select("status")
        .eq("user_id", userId)

      if (userError) {
        console.error("Supabase user problems error:", userError)
        throw userError
      }

      // Calculate stats
      const stats = {
        solved: 0,
        attempted: 0,
        saved: 0,
        total: totalProblems || 0,
      }

      if (Array.isArray(userProblems)) {
        userProblems.forEach((problem) => {
          if (problem.status === "solved") {
            stats.solved++
          } else if (problem.status === "attempted") {
            stats.attempted++
          } else if (problem.status === "saved") {
            stats.saved++
          }
        })
      }

      return NextResponse.json(stats)
    } catch (supabaseError: any) {
      console.error("Supabase error:", supabaseError)
      return NextResponse.json(
        {
          error: "Database error",
          message: supabaseError.message,
          details: supabaseError.details || "No additional details",
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("Error fetching user problem stats:", error)
    return NextResponse.json(
      {
        error: "Error fetching user problem stats",
        message: error.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}

