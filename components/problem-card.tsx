"use client"

import type { CodingProblem } from "@/types"
import { DifficultyBadge } from "./difficulty-badge"
import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { ProblemActions } from "./problem-actions"

interface ProblemCardProps {
  problem: CodingProblem
  index: number
}

export function ProblemCard({ problem, index }: ProblemCardProps) {
  // Format company name for display (convert from kebab-case if needed)
  const formatCompanyName = (name: string) => {
    if (name.includes("-")) {
      return name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    }
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">{problem.problem_id}</p>
            <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">{problem.problem_name}</h3>
          </div>
          <DifficultyBadge difficulty={problem.difficulty as "Easy" | "Medium" | "Hard"} />
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{formatCompanyName(problem.company_name)}</p>
        <div className="mt-4 flex items-center justify-between">
          <ProblemActions problemId={problem.id} />
          <a
            href={problem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Solve <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}

