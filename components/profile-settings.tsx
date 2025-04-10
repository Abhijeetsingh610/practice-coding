"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { getSupabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Check, AlertTriangle, Info } from "lucide-react"
import { differenceInDays } from "date-fns"
import { useRouter } from "next/navigation"

interface ProfileSettingsProps {
  profile: any
  onProfileUpdate: (updatedProfile: any) => void
}

export function ProfileSettings({ profile, onProfileUpdate }: ProfileSettingsProps) {
  const { user, updateUserMetadata } = useAuth()
  const [fullName, setFullName] = useState(profile?.full_name || "")
  const [isUpdating, setIsUpdating] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check if the user has changed their name before
  const hasChangedNameBefore = profile?.name_change_count > 0

  // Calculate if name change is allowed
  const lastNameChange = profile?.last_name_change ? new Date(profile.last_name_change) : null
  const today = new Date()
  const daysSinceLastChange = lastNameChange ? differenceInDays(today, lastNameChange) : 999
  const canChangeName = !hasChangedNameBefore || !lastNameChange || daysSinceLastChange >= 30

  const handleUpdateProfile = async () => {
    if (!user) return

    // Validate name
    if (!fullName.trim()) {
      setError("Name cannot be empty")
      return
    }

    // Check if name is actually changing
    if (fullName.trim() === profile.full_name) {
      setSuccess("No changes to save")
      return
    }

    // Check if name change is allowed
    if (hasChangedNameBefore && !canChangeName) {
      setError("You can only change your name once per month")
      return
    }

    try {
      setIsUpdating(true)
      setError(null)
      setSuccess(null)

      const supabase = getSupabase()

      // Prepare update data
      const updateData: any = {
        full_name: fullName.trim(),
        updated_at: new Date().toISOString(),
      }

      // If name is changing, update the last_name_change timestamp and increment the counter
      if (fullName.trim() !== profile.full_name) {
        updateData.last_name_change = new Date().toISOString()
        updateData.name_change_count = (profile.name_change_count || 0) + 1
      }

      // Update profile in database
      const { data, error: updateError } = await supabase.from("profiles").update(updateData).eq("id", user.id).select()

      if (updateError) throw updateError

      // Also update the user metadata in auth
      await updateUserMetadata({ full_name: fullName.trim() })

      // Update the profile in the parent component
      if (data && data.length > 0) {
        onProfileUpdate(data[0])
      }

      setSuccess("Profile updated successfully")

      // Refresh the page to update all components
      router.refresh()
    } catch (err: any) {
      console.error("Error updating profile:", err)
      setError(err.message || "Failed to update profile")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <Check className="h-4 w-4 mr-2" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {hasChangedNameBefore && !canChangeName && (
          <Alert className="bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
            <Info className="h-4 w-4 mr-2" />
            <AlertDescription>
              You can change your name again in {30 - daysSinceLastChange} days. Name changes are limited to once per
              month.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user?.email || ""} disabled className="bg-gray-100 dark:bg-gray-800" />
          <p className="text-xs text-gray-500 dark:text-gray-400">Your email cannot be changed</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={isUpdating} />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            This is the name that will appear on the leaderboard
            {hasChangedNameBefore && (
              <span className="block mt-1">
                You have changed your name {profile.name_change_count} time
                {profile.name_change_count !== 1 ? "s" : ""}.
              </span>
            )}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpdateProfile} disabled={isUpdating} className="ml-auto">
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
