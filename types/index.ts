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
  totalPages: number
  totalItems: number
}

