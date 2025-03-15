import type { Problem } from "@/types/problem"
import { ExternalLink } from "lucide-react"

interface ProblemsListProps {
  problems: Problem[]
}

export function ProblemsList({ problems }: ProblemsListProps) {
  // Function to get badge class based on difficulty
  const getDifficultyBadgeClass = (difficulty: string) => {
    const lowerDifficulty = difficulty.toLowerCase()
    if (lowerDifficulty.includes("hard")) return "bg-red-900/30 text-red-300"
    if (lowerDifficulty.includes("medium")) return "bg-yellow-900/30 text-yellow-300"
    return "bg-green-900/30 text-green-300"
  }

  return (
    <div className="bg-slate-800/50 rounded-xl shadow-lg backdrop-blur-sm border border-slate-700">
      {problems.length === 0 ? (
        <div className="p-8 text-center text-slate-400">
          <p>No problems found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900/40">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Problem
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                  Difficulty
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {problems.map((problem) => (
                <tr
                  key={problem.id}
                  className="hover:bg-slate-700/40 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {problem.problem_id}
                  </td>
                  <td className="px-6 py-4">
                    {problem.url ? (
                      <a
                        href={problem.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <span className="mr-1">{problem.problem_name}</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="text-slate-300">{problem.problem_name}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">
                    {problem.company_name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyBadgeClass(problem.difficulty)}`}
                    >
                      {problem.difficulty}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
