import type { Metadata } from "next"
import CompilerPlayground from "./compiler-playground"
import { ProtectedRoute } from "@/components/protected-route"

export const metadata: Metadata = {
  title: "Online Compiler | AceCode",
  description: "Write, compile, and run code in multiple programming languages online.",
}

export default function CompilerPage() {
  return (
    <ProtectedRoute>
      <CompilerPlayground />
    </ProtectedRoute>
  )
}
