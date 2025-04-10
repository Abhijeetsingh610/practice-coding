import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()

    // Get all users from auth.users
    const { data: authData, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) {
      throw authError
    }

    if (!authData || !authData.users || authData.users.length === 0) {
      return NextResponse.json({ message: "No users found in auth" })
    }

    const results = {
      total: authData.users.length,
      created: 0,
      alreadyExisted: 0,
      failed: 0,
      details: [] as any[],
    }

    // Process each user
    for (const user of authData.users) {
      try {
        // Check if profile already exists
        const { data: existingProfile } = await supabase.from("profiles").select("id").eq("id", user.id).single()

        if (existingProfile) {
          results.alreadyExisted++
          continue
        }

        // Create profile for user
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            full_name: user.user_metadata?.full_name || "",
            email: user.email,
            updated_at: new Date().toISOString(),
          },
        ])

        if (insertError) {
          throw insertError
        }

        results.created++
      } catch (error: any) {
        results.failed++
        results.details.push({
          userId: user.id,
          error: error.message,
        })
      }
    }

    return NextResponse.json(results)
  } catch (error: any) {
    console.error("Error fixing profiles:", error)
    return NextResponse.json({ error: error.message || "Failed to fix profiles" }, { status: 500 })
  }
}
