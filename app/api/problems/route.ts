import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const company = searchParams.get("company")
  const search = searchParams.get("search")

  try {
    let query = supabase.from("coding_problems").select("id, problem_id, problem_name, company_name, difficulty , url")

    // Apply filters
    if (company && company !== "all") {
      query = query.eq("company_name", company)
    }

    if (search) {
      query = query.or(`problem_name.ilike.%${search}%,problem_id.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error("Error fetching problems:", error)
      return NextResponse.json({ error: "Failed to fetch problems" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching problems:", error)
    return NextResponse.json({ error: "Failed to fetch problems" }, { status: 500 })
  }
}

