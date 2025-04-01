export interface CodingProblem {
  id: number
  company_name: string
  problem_id: string
  problem_name: string
  url: string
  difficulty: "Easy" | "Medium" | "Hard"
}

export type CompanyOption = {
  label: string
  value: string
}

export interface PaginationState {
  currentPage: number
  pageSize: number
  totalPages: number
  totalItems: number
  from: number
  to: number
}

export type ProblemStatus = "solved" | "attempted" | "saved" | "not_solved"

export interface UserProblem {
  id: string
  user_id: string
  problem_id: number
  status: ProblemStatus
  notes?: string
  created_at: string
  updated_at: string
}

export interface UserProblemStats {
  solved: number
  attempted: number
  saved: number
  total: number
}

