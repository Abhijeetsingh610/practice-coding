import { getSupabase } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId, email, name } = await request.json()
    const supabase = getSupabase()

    // Check if profile already exists
    const { data: existingProfile } = await supabase.from("profiles").select("*").eq("id", userId).single()

    if (existingProfile) {
      return NextResponse.json({ message: "Profile already exists" })
    }

    // Create new profile
    const { error } = await supabase.from("profiles").insert([
      {
        id: userId,
        full_name: name,
        email: email,
        updated_at: new Date().toISOString(),
      },
    ])

    if (error) {
      throw error
    }

    return NextResponse.json({ message: "Profile created successfully" })
  } catch (error) {
    console.error("Error creating profile:", error)
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 })
  }
}

