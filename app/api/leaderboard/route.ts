import { getSupabaseAdmin } from "@/lib/supabase-admin"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = getSupabaseAdmin()

    // Get the current month's start and end dates
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)

    // Format dates for Supabase query
    const startDate = startOfMonth.toISOString()
    const endDate = endOfMonth.toISOString()

    // First, get all solved problems for the current month
    const { data: solvedProblems, error: problemsError } = await supabase
      .from("user_problems")
      .select("user_id, problem_id")
      .eq("status", "solved")
      .gte("updated_at", startDate)
      .lte("updated_at", endDate)

    if (problemsError) {
      console.error("Error fetching solved problems:", problemsError)
      throw problemsError
    }

    if (!solvedProblems || solvedProblems.length === 0) {
      return NextResponse.json({ leaderboard: [] })
    }

    // Count problems solved by each user
    const userCounts = solvedProblems.reduce(
      (acc, problem) => {
        const userId = problem.user_id
        acc[userId] = (acc[userId] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Get unique user IDs
    const userIds = Object.keys(userCounts)

    // Fetch user profiles for these users
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .in("id", userIds)

    if (profilesError) {
      console.error("Error fetching user profiles:", profilesError)
      throw profilesError
    }

    // If no profiles were found, try to fetch from auth.users as a fallback
    const userMap = new Map()

    if (!profiles || profiles.length === 0) {
      console.warn("No profiles found in profiles table, trying auth.users fallback")

      // This is a fallback and might not work depending on your Supabase setup
      // as it requires special permissions to access auth.users
      try {
        const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers()

        if (authError) {
          console.error("Error fetching auth users:", authError)
        } else if (authUsers) {
          authUsers.users.forEach((user) => {
            userMap.set(user.id, {
              id: user.id,
              full_name: user.user_metadata?.full_name || user.email?.split("@")[0] || "User",
              email: user.email,
            })
          })
        }
      } catch (authFallbackError) {
        console.error("Auth users fallback failed:", authFallbackError)
      }
    } else {
      // Create a map of user profiles from the profiles table
      profiles.forEach((profile) => {
        userMap.set(profile.id, profile)
      })
    }

    // Combine data and create leaderboard
    const leaderboardData = userIds.map((userId) => {
      const profile = userMap.get(userId)

      // Get user name with fallbacks
      let name = "User"
      if (profile) {
        if (profile.full_name && profile.full_name.trim() !== "") {
          name = profile.full_name
        } else if (profile.email) {
          // Use part before @ in email
          name = profile.email.split("@")[0]
        }
      }

      return {
        user_id: userId,
        name,
        solved_count: userCounts[userId],
      }
    })

    // Sort by solved count (descending) and add rank
    const leaderboard = leaderboardData
      .sort((a, b) => b.solved_count - a.solved_count)
      .slice(0, 10) // Get top 10
      .map((user, index) => ({
        ...user,
        rank: index + 1,
      }))

    return NextResponse.json({ leaderboard })
  } catch (error: any) {
    console.error("Error in leaderboard API:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch leaderboard data" }, { status: 500 })
  }
}
