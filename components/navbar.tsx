"use client"

import { UserProfile } from "./user-profile"
import { ThemeToggle } from "./theme-toggle"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Code, Trophy, User, FileText, Settings, Terminal } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function Navbar() {
  const { user } = useAuth()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    {
      href: "/leaderboard",
      label: "Leaderboard",
      icon: <Trophy className="h-4 w-4" />,
      active: pathname === "/leaderboard",
    },
    {
      href: "/cheatsheets",
      label: "Cheatsheets",
      icon: <FileText className="h-4 w-4" />,
      active: pathname === "/cheatsheets",
    },
    {
      href: "/compiler",
      label: "Compiler",
      icon: <Terminal className="h-4 w-4" />,
      active: pathname === "/compiler",
    },
    {
      href: "/profile",
      label: "Profile",
      icon: <User className="h-4 w-4" />,
      active: pathname === "/profile",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
      active: pathname === "/settings",
      className: "md:hidden lg:flex",
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">AceCode</span>
        </Link>

        {/* Mobile menu */}
        <div className="flex md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col gap-4 py-4">
                {user ? (
                  <>
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                        <Button variant={link.active ? "default" : "ghost"} size="sm" className="w-full justify-start">
                          {link.icon}
                          <span className="ml-2">{link.label}</span>
                        </Button>
                      </Link>
                    ))}
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Sign Up</Button>
                    </Link>
                  </div>
                )}
                <div className="mt-2 flex justify-end">
                  <ThemeToggle />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-2">
          {user ? (
            <>
              <div className="hidden md:flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant={link.active ? "default" : "ghost"}
                      size="sm"
                      className={`flex items-center gap-1 ${link.className || ""}`}
                    >
                      {link.icon}
                      <span className="hidden sm:inline">{link.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
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
