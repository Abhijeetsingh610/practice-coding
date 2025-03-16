"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProblemsList } from "@/components/problems-list"
import type { Problem } from "@/types/problem"
import { supabase } from "@/lib/supabase"

const PAGE_SIZE = 100

const COMPANY_NAMES = [
  "accenture", "accolite", "activision", "adobe", "aetion", "affinity", "affirm", "airbnb", "airtel",
  "akamai", "akuna-capital", "alation", "alibaba", "amazon", "apple", "barclays", "bloomberg", "citadel",
  "coinbase", "coursera", "databricks", "deloitte", "discord", "doordash", "dropbox", "ebay", "facebook",
  "flipkart", "google", "honeywell", "ibm", "infosys", "intuit", "jpmorgan", "microsoft", "netflix",
  "nvidia", "oracle", "palantir-technologies", "paypal", "phonepe", "pinterest", "qualcomm", "quora",
  "reddit", "salesforce", "snapchat", "spotify", "stripe", "swiggy", "tesla", "tiktok", "twitch",
  "twitter", "uber", "visa", "vmware", "walmart-labs", "yahoo", "yandex", "zomato", "zoom"
]

export function CodingProblemsDashboard() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [companies, setCompanies] = useState<string[]>([])
  const [selectedCompany, setSelectedCompany] = useState<string>("")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)

  // ✅ Fetch companies from the database and combine with COMPANY_NAMES
  useEffect(() => {
    async function fetchCompanies() {
      try {
        const { data, error } = await supabase
          .from("coding_problems")
          .select("company_name", { distinct: true })

        if (error) throw error

        if (data) {
          const fetchedCompanyNames = [...new Set(data.map((item) => item.company_name))]
          const combinedCompanyNames = Array.from(new Set([...COMPANY_NAMES, ...fetchedCompanyNames]))
          setCompanies(combinedCompanyNames.sort()) // ✅ Sort alphabetically
        }
      } catch (error) {
        console.error("Error fetching companies:", error)
      }
    }

    fetchCompanies()
  }, [])

  // ✅ Fetch total problem count (to calculate pages)
  useEffect(() => {
    async function fetchTotalProblems() {
      try {
        let query = supabase.from("coding_problems").select("*", { count: "exact", head: true })

        if (selectedCompany) {
          query = query.eq("company_name", selectedCompany)
        }
        if (searchQuery) {
          query = query.or(
            `problem_name.ilike.%${searchQuery}%,problem_id.ilike.%${searchQuery}%`
          )
        }

        const { count, error } = await query
        if (error) throw error

        if (count) setTotalPages(Math.ceil(count / PAGE_SIZE))
      } catch (error) {
        console.error("Error fetching total problems:", error)
      }
    }

    fetchTotalProblems()
  }, [selectedCompany, searchQuery])

  // ✅ Fetch problems based on filters and pagination
  useEffect(() => {
    async function fetchProblems() {
      setIsLoading(true)
      try {
        let query = supabase
          .from("coding_problems")
          .select("id, problem_id, problem_name, company_name, difficulty, url")
          .range(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE - 1)

        if (selectedCompany) {
          query = query.eq("company_name", selectedCompany)
        }

        if (searchQuery) {
          query = query.or(
            `problem_name.ilike.%${searchQuery}%,problem_id.ilike.%${searchQuery}%`
          )
        }

        const { data, error } = await query
        if (error) throw error

        setProblems(data || [])
      } catch (error) {
        console.error("Error fetching problems:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const timeoutId = setTimeout(() => {
      fetchProblems()
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [selectedCompany, searchQuery, currentPage])

  // ✅ Handle reset
  const handleClearFilters = () => {
    setSelectedCompany("")
    setSearchQuery("")
    setCurrentPage(0)
  }

  return (
    <div className="space-y-6">
      {/* ✅ Filters Section */}
      <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg backdrop-blur-sm border border-slate-700">
        <h2 className="text-xl font-semibold mb-4 text-slate-100">Filters</h2>
        
        {/* ✅ Flex container for Company Filter and Search */}
        <div className="flex gap-4 items-end">
          {/* ✅ Company Filter */}
          <div className="flex-1">
            <label htmlFor="company" className="text-sm text-slate-300">
              Select Company
            </label>
            <Select value={selectedCompany} onValueChange={(value) => setSelectedCompany(value === "all" ? "" : value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600">
                <SelectValue placeholder="All Companies" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="all">All Companies</SelectItem>
                {companies.map((company) => (
                  <SelectItem key={company} value={company}>
                    {company}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ✅ Search Filter */}
          <div className="flex-1">
            <label htmlFor="search" className="text-sm text-slate-300">
              Search Problems
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                id="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by problem name or ID"
                className="pl-10 bg-black border-slate-600 text-white"
              />
            </div>
          </div>

          {/* ✅ Clear Filters */}
          <Button onClick={handleClearFilters} className="border-slate-600 hover:bg-slate-700 text-slate-300">
            Clear Filters
          </Button>
        </div>
      </div>

      {/* ✅ Problems List */}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ProblemsList problems={problems} />
      )}

      {/* ✅ Pagination */}
      <div className="flex justify-center space-x-4 mt-4">
        <Button onClick={() => setCurrentPage((prev) => prev - 1)} disabled={currentPage === 0}>
          Previous
        </Button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <Button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage >= totalPages - 1}>
          Next
        </Button>
      </div>
    </div>
  )
}
