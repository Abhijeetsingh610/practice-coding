"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { motion } from "framer-motion"

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
  initialValue?: string
}

export function SearchBar({ onSearch, placeholder = "Search problems...", initialValue = "" }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue)

  // Update search query when initialValue changes
  useEffect(() => {
    setSearchQuery(initialValue)
  }, [initialValue])

  // No need for debounce here as it's handled in the parent component
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch(value)
  }

  return (
    <motion.div
      className="relative w-full max-w-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder={placeholder}
          className="h-10 w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        />
      </div>
    </motion.div>
  )
}

