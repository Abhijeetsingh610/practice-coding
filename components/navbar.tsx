"use client"

import { UserProfile } from "./user-profile"
import { ThemeToggle } from "./theme-toggle"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code } from "lucide-react"

export function Navbar() {
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">AceCode</span>
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <UserProfile />
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

