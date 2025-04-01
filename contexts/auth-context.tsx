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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Use the singleton Supabase instance
  const supabase = getSupabase()

  useEffect(() => {
    const setData = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
          setIsLoading(false)
          return
        }

        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("Unexpected error during session check:", error)
      } finally {
        setIsLoading(false)
      }
    }

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    setData()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

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

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
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

