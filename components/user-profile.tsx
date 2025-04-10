"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, Settings } from "lucide-react"
import Link from "next/link"
import { getSupabase } from "@/lib/supabase"

export function UserProfile() {
  const { user, signOut } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [profileName, setProfileName] = useState<string>("")

  // Fetch the latest profile name
  useEffect(() => {
    const fetchProfileName = async () => {
      if (!user) return

      try {
        const supabase = getSupabase()
        const { data } = await supabase.from("profiles").select("full_name").eq("id", user.id).single()

        if (data?.full_name) {
          setProfileName(data.full_name)
        } else {
          // Fallback to user metadata
          setProfileName(user.user_metadata?.full_name || user.email?.split("@")[0] || "User")
        }
      } catch (error) {
        console.error("Error fetching profile name:", error)
        // Fallback to user metadata
        setProfileName(user.user_metadata?.full_name || user.email?.split("@")[0] || "User")
      }
    }

    fetchProfileName()
  }, [user])

  const handleSignOut = async () => {
    setIsLoggingOut(true)
    try {
      await signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!profileName) return "U"

    const names = profileName.split(" ")
    if (names.length === 1) return names[0].charAt(0).toUpperCase()
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">{getUserInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          <User className="mr-2 h-4 w-4" />
          <span>{profileName || user.email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link href="/profile">
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href="/settings">
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} disabled={isLoggingOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoggingOut ? "Signing out..." : "Sign out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
