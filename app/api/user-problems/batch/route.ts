import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId, operations } = await request.json()

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    if (!operations || !Array.isArray(operations) || operations.length === 0) {
      return NextResponse.json({ error: "Valid operations array is required" }, { status: 400 })
    }

    // Limit batch size to prevent abuse
    if (operations.length > 10) {
      return NextResponse.json({ error: "Batch size limit exceeded (max 10)" }, { status: 400 })
    }

    // Use admin client for server operations to bypass RLS
    const supabase = getSupabaseAdmin()
    const results = []

    // Process each operation
    for (const op of operations) {
      const { type, problemId, status, notes, id } = op

      try {
        let result

        switch (type) {
          case "update":
            // Use upsert for simplified operation
            result = await supabase.from("user_problems").upsert(
              {
                user_id: userId,
                problem_id: problemId,
                status,
                notes,
                updated_at: new Date().toISOString(),
              },
              {
                onConflict: "user_id,problem_id",
                returning: "representation",
              },
            )
            break

          case "delete":
            if (!id) {
              throw new Error("ID is required for delete operations")
            }

            result = await supabase.from("user_problems").delete().eq("id", id)
            break

          default:
            throw new Error(`Unknown operation type: ${type}`)
        }

        if (result.error) {
          throw result.error
        }

        results.push({
          success: true,
          operation: op,
          data: result.data,
        })
      } catch (error: any) {
        console.error(`Error processing operation ${op.type}:`, error)
        results.push({
          success: false,
          operation: op,
          error: error.message || "Operation failed",
        })
      }
    }

    return NextResponse.json({ results })
  } catch (error: any) {
    console.error("Error processing batch operations:", error)
    return NextResponse.json(
      {
        error: "Error processing batch operations",
        message: error.message || "Unknown error",
      },
      { status: 500 },
    )
  }
}

