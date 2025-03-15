import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase.from("coding_problems").select("company_name").order("company_name")

    if (error) {
      console.error("Error fetching companies:", error)
      return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 })
    }

    // Extract unique company names
    const uniqueCompanies = Array.from(new Set(data.map((item) => item.company_name))).filter(Boolean)

    return NextResponse.json(uniqueCompanies)
  } catch (error) {
    console.error("Error fetching companies:", error)
    return NextResponse.json({ error: "Failed to fetch companies" }, { status: 500 })
  }
}

