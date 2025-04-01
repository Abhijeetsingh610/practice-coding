import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"

// Helper function to safely serialize dates and objects
function safelySerialize(data: any) {
  if (!data) return null

  // Handle date fields specifically
  const safeData = {
    id: data.id,
    user_id: data.user_id,
    problem_id: data.problem_id,
    status: data.status,
    notes: data.notes,
    created_at: data.created_at ? new Date(data.created_at).toISOString() : null,
    updated_at: data.updated_at ? new Date(data.updated_at).toISOString() : null,
  }

  return safeData
}

// Get all user problems
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
      // Only select the fields we need
      const { data, error } = await supabase
        .from("user_problems")
        .select("id, user_id, problem_id, status, notes, created_at, updated_at")
        .eq("user_id", userId)

      if (error) {
        console.error("Supabase error details:", JSON.stringify(error, null, 2))
        throw error
      }

      // Safely serialize the data
      const safeData = data ? data.map((item) => safelySerialize(item)) : []

      return NextResponse.json(safeData)
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
    console.error("Error fetching user problems:", error)
    return NextResponse.json(
      {
        error: "Error fetching user problems",
        message: error.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Create or update a user problem
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, problemId, status, notes } = body

    // Validate required fields
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    if (!problemId || typeof problemId !== "number") {
      return NextResponse.json({ error: "Valid problem ID is required" }, { status: 400 })
    }

    const validStatuses = ["solved", "attempted", "saved", "not_solved"]
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: "Valid status is required" }, { status: 400 })
    }

    // Use admin client for server operations to bypass RLS
    const supabase = getSupabaseAdmin()

    try {
      // Use upsert for simplified operation
      const { data, error } = await supabase.from("user_problems").upsert(
        {
          user_id: userId,
          problem_id: problemId,
          status,
          notes,
          updated_at: new Date().toISOString(),
        },
        {
          // This tells Supabase to match on these columns for the upsert
          onConflict: "user_id,problem_id",
          // Return the updated/inserted row
          returning: "representation",
        },
      )

      if (error) {
        console.error("Supabase upsert error:", error)
        throw error
      }

      // Safely serialize the response data
      const safeData = data && data.length > 0 ? safelySerialize(data[0]) : null

      return NextResponse.json(safeData)
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
    console.error("Error updating user problem:", error)
    return NextResponse.json(
      {
        error: "Error updating user problem",
        message: error.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}

// Delete a user problem
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Problem ID is required" }, { status: 400 })
    }

    // Use admin client for server operations to bypass RLS
    const supabase = getSupabaseAdmin()

    try {
      const { error } = await supabase.from("user_problems").delete().eq("id", id)

      if (error) {
        console.error("Supabase delete error:", error)
        throw error
      }

      return NextResponse.json({ message: "Problem deleted successfully" })
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
    console.error("Error deleting user problem:", error)
    return NextResponse.json(
      {
        error: "Error deleting user problem",
        message: error.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}

