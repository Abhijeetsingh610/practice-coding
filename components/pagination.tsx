"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { motion } from "framer-motion"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Ensure valid values
  const validCurrentPage = Math.max(1, Math.min(currentPage, Math.max(1, totalPages)))
  const validTotalPages = Math.max(1, totalPages)

  const canGoPrevious = validCurrentPage > 1
  const canGoNext = validCurrentPage < validTotalPages

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = []
    const maxPagesToShow = 5

    if (validTotalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than or equal to maxPagesToShow
      for (let i = 1; i <= validTotalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always include first page, last page, current page, and pages around current page
      pageNumbers.push(1)

      if (validCurrentPage > 3) {
        pageNumbers.push(-1) // Ellipsis
      }

      // Pages around current page
      const startPage = Math.max(2, validCurrentPage - 1)
      const endPage = Math.min(validTotalPages - 1, validCurrentPage + 1)

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      if (validCurrentPage < validTotalPages - 2) {
        pageNumbers.push(-2) // Ellipsis
      }

      pageNumbers.push(validTotalPages)
    }

    return pageNumbers
  }

  // Handle page change with validation
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= validTotalPages) {
      onPageChange(page)
    }
  }

  return (
    <motion.div
      className="flex items-center justify-center space-x-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(1)}
        disabled={!canGoPrevious}
        aria-label="First page"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(validCurrentPage - 1)}
        disabled={!canGoPrevious}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((pageNumber, index) => {
        if (pageNumber === -1 || pageNumber === -2) {
          return (
            <span key={`ellipsis-${index}`} className="px-2">
              ...
            </span>
          )
        }

        return (
          <Button
            key={pageNumber}
            variant={validCurrentPage === pageNumber ? "default" : "outline"}
            onClick={() => handlePageChange(pageNumber)}
            aria-label={`Page ${pageNumber}`}
            aria-current={validCurrentPage === pageNumber ? "page" : undefined}
          >
            {pageNumber}
          </Button>
        )
      })}

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(validCurrentPage + 1)}
        disabled={!canGoNext}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(validTotalPages)}
        disabled={!canGoNext}
        aria-label="Last page"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </motion.div>
  )
}

