"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { getSupabase } from "@/lib/supabase"
import type { Session, User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signUp: (
    email: string,
    password: string,
    name: string,
  ) => Promise<{
    error: Error | null
    data: any
  }>
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: Error | null
    data: any
  }>
  signOut: () => Promise<void>
  updateUserMetadata: (metadata: Record<string, any>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Use the singleton Supabase instance
  const supabase = getSupabase()

  // Ensure user profile exists
  const ensureProfile = async (userId: string, userData: any) => {
    try {
      // Check if we have user metadata
      const name = userData?.user_metadata?.full_name || ""
      const email = userData?.email || ""

      if (!userId || !email) return

      // Call the API to create/update profile
      await fetch("/api/create-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          email,
          name,
        }),
      })
    } catch (error) {
      console.error("Error ensuring profile exists:", error)
    }
  }

  useEffect(() => {
    const setData = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)

          // If it's a refresh token error, clear the session and redirect to login
          if (error.message?.includes("refresh_token_not_found") || error.message?.includes("invalid refresh token")) {
            await supabase.auth.signOut()
            router.push("/login?message=Your session has expired. Please log in again.")
          }

          setIsLoading(false)
          return
        }

        setSession(session)
        setUser(session?.user ?? null)

        // Ensure profile exists for the user
        if (session?.user) {
          await ensureProfile(session.user.id, session.user)
        }
      } catch (error) {
        console.error("Unexpected error during session check:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "TOKEN_REFRESHED" || event === "SIGNED_IN") {
        setSession(session)
        setUser(session?.user ?? null)

        // Ensure profile exists when user signs in
        if (session?.user) {
          await ensureProfile(session.user.id, session.user)
        }
      } else if (event === "SIGNED_OUT") {
        setSession(null)
        setUser(null)
      } else if (event === "USER_UPDATED") {
        // Update the user state when user metadata changes
        setUser(session?.user ?? null)
      }
    })

    setData()

    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true)

      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      })

      if (error) {
        console.error("Sign up error:", error)
        return { data: null, error }
      }

      // If sign up successful but no user returned, it might be due to email confirmation requirement
      if (!data?.user) {
        return {
          data,
          error: new Error("Please check your email for a confirmation link."),
        }
      }

      return { data, error: null }
    } catch (error) {
      console.error("Unexpected error during sign up:", error)
      return {
        data: null,
        error: new Error("An unexpected error occurred. Please try again."),
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Sign in error:", error)
        return { data: null, error }
      }

      // Ensure profile exists for the user
      if (data?.user) {
        await ensureProfile(data.user.id, data.user)
      }

      return { data, error: null }
    } catch (error) {
      console.error("Unexpected error during sign in:", error)
      return {
        data: null,
        error: new Error("An unexpected error occurred. Please try again."),
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  // Add method to update user metadata
  const updateUserMetadata = async (metadata: Record<string, any>) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: metadata,
      })

      if (error) {
        throw error
      }

      // Update the local user state
      if (data.user) {
        setUser(data.user)
      }
    } catch (error) {
      console.error("Error updating user metadata:", error)
      throw error
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    updateUserMetadata,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
