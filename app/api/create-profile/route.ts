import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { userId, email, name } = await request.json()

    if (!userId || !email) {
      return NextResponse.json({ error: "User ID and email are required" }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()

    // Check if profile already exists - don't use .single() which causes the error
    const { data: existingProfiles, error: checkError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .limit(1)

    if (checkError) {
      console.error("Error checking existing profile:", checkError)
      return NextResponse.json({ error: "Failed to check existing profile" }, { status: 500 })
    }

    // Check if we found any profiles
    const existingProfile = existingProfiles && existingProfiles.length > 0 ? existingProfiles[0] : null

    if (existingProfile) {
      // Profile exists, update it if needed
      if (name && (!existingProfile.full_name || existingProfile.full_name !== name)) {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            full_name: name,
            updated_at: new Date().toISOString(),
          })
          .eq("id", userId)

        if (updateError) {
          console.error("Error updating profile:", updateError)
          return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
        }
      }

      return NextResponse.json({ message: "Profile already exists and was updated if needed" })
    }

    // Create new profile
    const { error: insertError } = await supabase.from("profiles").insert([
      {
        id: userId,
        full_name: name || email.split("@")[0], // Use name or fallback to email username
        email: email,
        updated_at: new Date().toISOString(),
        name_change_count: 0, // Initialize name change count to 0
        last_name_change: null, // Initialize last name change to null
      },
    ])

    if (insertError) {
      console.error("Error creating profile:", insertError)
      return NextResponse.json({ error: "Failed to create profile" }, { status: 500 })
    }

    return NextResponse.json({ message: "Profile created successfully" })
  } catch (error) {
    console.error("Error in create-profile API:", error)
    return NextResponse.json({ error: "Failed to create profile" }, { status: 500 })
  }
}
