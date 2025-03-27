"use client"

import { AlertDescription } from "@/components/ui/alert"

import { Alert } from "@/components/ui/alert"

import { useState, useEffect } from "react"
import { getSupabase } from "@/lib/supabase"
import type { CodingProblem, CompanyOption, PaginationState } from "@/types"
import { SearchBar } from "./search-bar"
import { ProblemCard } from "./problem-card"
import { CompanyFilter } from "./company-filter"
import { Pagination } from "./pagination"
import { motion } from "framer-motion"

// Constants
const PAGE_SIZE = 100
const COMPANY_NAMES = [
  "accenture",
  "accolite",
  "activision",
  "adobe",
  "aetion",
  "affinity",
  "affirm",
  "airbnb",
  "airtel",
  "akamai",
  "akuna-capital",
  "alation",
  "alibaba",
  "amazon",
  "apple",
  "barclays",
  "bloomberg",
  "citadel",
  "coinbase",
  "coursera",
  "databricks",
  "deloitte",
  "discord",
  "doordash",
  "dropbox",
  "ebay",
  "facebook",
  "flipkart",
  "google",
  "honeywell",
  "ibm",
  "infosys",
  "intuit",
  "jpmorgan",
  "microsoft",
  "netflix",
  "nvidia",
  "oracle",
  "palantir-technologies",
  "paypal",
  "phonepe",
  "pinterest",
  "qualcomm",
  "quora",
  "reddit",
  "salesforce",
  "snapchat",
  "spotify",
  "stripe",
  "swiggy",
  "tesla",
  "tiktok",
  "twitch",
  "twitter",
  "uber",
  "visa",
  "vmware",
  "walmart-labs",
  "yahoo",
  "yandex",
  "zomato",
  "zoom",
]

export function ProblemsDashboard() {
  const [problems, setProblems] = useState<CodingProblem[]>([])
  const [filteredProblems, setFilteredProblems] = useState<CodingProblem[]>([])
  const [companies, setCompanies] = useState<CompanyOption[]>([])
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  })
  const supabase = getSupabase()

  // Format company names for the dropdown
  useEffect(() => {
    const formattedCompanies = COMPANY_NAMES.map((company) => ({
      label: company
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      value: company,
    }))
    setCompanies(formattedCompanies)
  }, [])

  // Fetch problems from Supabase when company changes
  useEffect(() => {
    async function fetchProblems() {
      try {
        setLoading(true)
        setError(null)

        // Build the query
        let query = supabase.from("coding_problems").select("*", { count: "exact" })

        // Apply company filter if selected
        if (selectedCompany) {
          query = query.eq("company_name", selectedCompany)
        }

        // Apply pagination
        const from = (pagination.currentPage - 1) * PAGE_SIZE
        const to = from + PAGE_SIZE - 1
        query = query.range(from, to)

        // Execute the query
        const { data, error, count } = await query

        if (error) {
          throw error
        }

        if (data) {
          setProblems(data as CodingProblem[])

          // Update pagination
          if (count !== null) {
            setPagination((prev) => ({
              ...prev,
              totalItems: count,
              totalPages: Math.ceil(count / PAGE_SIZE),
            }))
          }
        }
      } catch (error) {
        console.error("Error fetching problems:", error)
        setError("Failed to load problems. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProblems()
  }, [selectedCompany, pagination.currentPage])

  // Filter problems based on search query
  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const filtered = problems.filter(
        (problem) =>
          problem.problem_name.toLowerCase().includes(query) ||
          problem.company_name.toLowerCase().includes(query) ||
          problem.problem_id.toLowerCase().includes(query),
      )
      setFilteredProblems(filtered)
    } else {
      setFilteredProblems(problems)
    }
  }, [problems, searchQuery])

  // Handle company selection
  const handleCompanySelect = (company: string | null) => {
    setSelectedCompany(company)
    setPagination((prev) => ({ ...prev, currentPage: 1 })) // Reset to first page
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: page }))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="bg-gradient-to-r from-blue-600 via-purple-500 to-teal-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
          Your Gateway to FAANG & Beyond
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Ace Every Interview</p>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Practice company-specific coding questions and level up for your dream job.</p>
      </motion.div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar onSearch={setSearchQuery} />
        <CompanyFilter companies={companies} selectedCompany={selectedCompany} onSelectCompany={handleCompanySelect} />
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="h-40 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
          ))}
        </div>
      ) : filteredProblems.length > 0 ? (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProblems.map((problem, index) => (
              <ProblemCard key={problem.id} problem={problem} index={index} />
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
              <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                Showing {(pagination.currentPage - 1) * PAGE_SIZE + 1} to{" "}
                {Math.min(pagination.currentPage * PAGE_SIZE, pagination.totalItems)} of {pagination.totalItems}{" "}
                problems
              </p>
            </div>
          )}
        </>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">No problems found. Try adjusting your filters.</p>
        </motion.div>
      )}


      <footer className="mt-8 text-center text-sm text-slate-400">
        Made with ❤️ by{" "}
        <a
          href="https://www.linkedin.com/in/singhabhijeet16/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-slate-200 hover:underline"
        >
          Abhijeet Singh
        </a>        
      </footer>

    </div>
  )
}

