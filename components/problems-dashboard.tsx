"use client"

import { useState, useEffect, useTransition } from "react"
import type { CompanyOption, PaginationState, CodingProblem } from "@/types"
import { SearchBar } from "./search-bar"
import { ProblemCard } from "./problem-card"
import { CompanyFilter } from "./company-filter"
import { Pagination } from "./pagination"
import { motion } from "framer-motion"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDebounce } from "@/hooks/use-debounce"
import { useProblems } from "@/hooks/use-api"
import { useRouter, useSearchParams, usePathname } from "next/navigation"

// Constants
const PAGE_SIZE = 50
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

type SortOption = "none" | "easy-first" | "hard-first"

// Add this to the component props
interface ProblemsDashboardProps {
  initialData?: {
    data: CodingProblem[]
    count: number
    pagination: PaginationState
  }
}

export function ProblemsDashboard({ initialData }: ProblemsDashboardProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // Get URL parameters with defaults
  const page = Number.parseInt(searchParams.get("page") || "1")
  const companyParam = searchParams.get("company")
  const sortParam = searchParams.get("sort") || "none"
  const searchQuery = searchParams.get("search") || ""

  // Local state
  const [companies, setCompanies] = useState<CompanyOption[]>([])
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)
  const debouncedSearchQuery = useDebounce(localSearchQuery, 500)

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

  // Update the useProblems hook to use initialData
  const {
    data: problemsData,
    isLoading,
    error: queryError,
  } = useProblems(page, companyParam, sortParam as SortOption, {
    initialData: initialData && page === 1 && !companyParam && sortParam === "none" ? initialData : undefined,
  })

  // Update URL when search query changes (debounced)
  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      startTransition(() => {
        const params = new URLSearchParams(searchParams)

        if (debouncedSearchQuery) {
          params.set("search", debouncedSearchQuery)
        } else {
          params.delete("search")
        }

        // Reset to page 1 when search changes
        params.set("page", "1")

        router.replace(`${pathname}?${params.toString()}`)
      })
    }
  }, [debouncedSearchQuery, searchQuery, searchParams, pathname, router])

  // Filter problems based on search query (client-side)
  const filteredProblems = problemsData?.data
    ? problemsData.data.filter(
        (problem) =>
          !debouncedSearchQuery ||
          problem.problem_name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          problem.company_name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          problem.problem_id.toLowerCase().includes(debouncedSearchQuery.toLowerCase()),
      )
    : []

  // Update URL parameters
  const updateUrlParams = (params: Record<string, string | null>) => {
    startTransition(() => {
      const newParams = new URLSearchParams(searchParams)

      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newParams.delete(key)
        } else {
          newParams.set(key, value)
        }
      })

      router.replace(`${pathname}?${newParams.toString()}`)
    })
  }

  // Handle company selection
  const handleCompanySelect = (company: string | null) => {
    updateUrlParams({ company: company, page: "1" })
  }

  // Handle sort option change
  const handleSortChange = (value: string) => {
    updateUrlParams({ sort: value, page: "1" })
  }

  // Handle page change
  const handlePageChange = (newPage: number) => {
    updateUrlParams({ page: newPage.toString() })
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Handle search query change
  const handleSearch = (query: string) => {
    setLocalSearchQuery(query)
  }

  // Extract pagination data with safe defaults
  const pagination = problemsData?.pagination || {
    currentPage: page,
    pageSize: PAGE_SIZE,
    totalPages: 1,
    totalItems: 0,
    from: 0,
    to: 0,
  }

  // Format error message
  const errorMessage = queryError ? (queryError instanceof Error ? queryError.message : "An error occurred") : null

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
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Practice company-specific coding questions and level up for your dream job.
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Ace Every Interview</p>
      </motion.div>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
          <Select value={sortParam as string} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No sorting</SelectItem>
              <SelectItem value="easy-first">Easy to Hard</SelectItem>
              <SelectItem value="hard-first">Hard to Easy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CompanyFilter companies={companies} selectedCompany={companyParam} onSelectCompany={handleCompanySelect} />
      </div>

      {errorMessage && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {isLoading || isPending ? (
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
                {pagination.totalItems > 0 ? (
                  <>
                    Showing {pagination.from} to {pagination.to} of {pagination.totalItems} problems
                  </>
                ) : (
                  "No problems found"
                )}
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
