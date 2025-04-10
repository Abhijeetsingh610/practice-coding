"use client"

import { useRef } from "react"
import type { ProblemStatus } from "@/types"
import { Button } from "@/components/ui/button"
import { Bookmark, CheckCircle, Clock, Loader2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useUserProblems, useUpdateProblemStatus } from "@/hooks/use-api"

interface ProblemActionsProps {
  problemId: number
  className?: string
}

export function ProblemActions({ problemId, className }: ProblemActionsProps) {
  // Get user problems data from React Query
  const { data: userProblemsMap = new Map() } = useUserProblems()

  // Get the mutation function for updating problem status
  const { mutate: updateStatus, isPending: isUpdating, error: updateError } = useUpdateProblemStatus()

  // Track the latest update request
  const latestUpdateRef = useRef<number>(0)

  // Get current status
  const currentStatus = userProblemsMap.get(problemId)?.status || null

  // Error handling
  const errorMessage = updateError ? (updateError instanceof Error ? updateError.message : "An error occurred") : null

  const handleStatusUpdate = async (status: ProblemStatus) => {
    if (isUpdating) return // Prevent multiple simultaneous updates

    // Generate a unique ID for this update request
    const updateId = Date.now()
    latestUpdateRef.current = updateId

    // If clicking the same status, remove it
    const newStatus = currentStatus === status ? "not_solved" : status

    // Optimistically update UI through React Query mutation
    updateStatus({ problemId, status: newStatus })
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {errorMessage && (
        <Alert variant="destructive" className="mb-2 py-1">
          <AlertDescription className="text-xs">{errorMessage}</AlertDescription>
        </Alert>
      )}
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 relative",
                  currentStatus === "solved" && "text-green-500 bg-green-50 dark:bg-green-900/20",
                )}
                onClick={() => handleStatusUpdate("solved")}
                disabled={isUpdating}
              >
                {isUpdating && currentStatus === "solved" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                <span className="sr-only">Mark as Solved</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as Solved</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 relative",
                  currentStatus === "attempted" && "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
                )}
                onClick={() => handleStatusUpdate("attempted")}
                disabled={isUpdating}
              >
                {isUpdating && currentStatus === "attempted" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Clock className="h-4 w-4" />
                )}
                <span className="sr-only">Mark as Attempted</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mark as Attempted</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-8 w-8 relative",
                  currentStatus === "saved" && "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
                )}
                onClick={() => handleStatusUpdate("saved")}
                disabled={isUpdating}
              >
                {isUpdating && currentStatus === "saved" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
                <span className="sr-only">Save Problem</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Save Problem</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
