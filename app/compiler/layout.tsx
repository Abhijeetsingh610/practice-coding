import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Online Compiler | AceCode",
  description: "Write, compile, and run code in multiple programming languages online.",
}

export default function CompilerLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
