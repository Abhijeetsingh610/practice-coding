"use client"

import { UserProfile } from "./user-profile"
import { ThemeToggle } from "./theme-toggle"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code, Trophy, User, FileText, Settings } from "lucide-react"
import { usePathname } from "next/navigation"

export function Navbar() {
  const { user } = useAuth()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">AceCode</span>
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link href="/leaderboard">
                <Button
                  variant={pathname === "/leaderboard" ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Trophy className="h-4 w-4" />
                  <span>Leaderboard</span>
                </Button>
              </Link>
              <Link href="/cheatsheets">
                <Button
                  variant={pathname === "/cheatsheets" ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <FileText className="h-4 w-4" />
                  <span>Cheatsheets</span>
                </Button>
              </Link>
              <Link href="/profile">
                <Button
                  variant={pathname === "/profile" ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Button>
              </Link>
              <Link href="/settings">
                <Button
                  variant={pathname === "/settings" ? "default" : "ghost"}
                  size="sm"
                  className="flex items-center gap-1 md:hidden lg:flex"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Button>
              </Link>
              <UserProfile />
            </>
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
