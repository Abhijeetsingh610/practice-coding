"use client"

import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { ProfileSettings } from "@/components/profile-settings"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { getSupabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

export default function SettingsPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return

      try {
        setLoading(true)
        setError(null)

        const supabase = getSupabase()
        const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).limit(1)

        if (error) throw error

        if (data && data.length > 0) {
          setProfile(data[0])
        } else {
          setError("Profile not found")
        }
      } catch (err: any) {
        console.error("Error fetching profile:", err)
        setError(err.message || "Failed to load profile")
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  // Handle profile updates
  const handleProfileUpdate = (updatedProfile: any) => {
    setProfile(updatedProfile)

    // Invalidate any queries that might use the profile data
    queryClient.invalidateQueries({ queryKey: ["userProblemStats"] })
    queryClient.invalidateQueries({ queryKey: ["leaderboard"] })
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="bg-gradient-to-r from-blue-600 via-purple-500 to-teal-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
            Account Settings
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Manage your profile and account preferences</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading your profile...</span>
            </div>
          ) : error ? (
            <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300">
              <p>{error}</p>
            </div>
          ) : (
            <ProfileSettings profile={profile} onProfileUpdate={handleProfileUpdate} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
