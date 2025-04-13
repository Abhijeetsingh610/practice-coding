import type { Metadata } from "next"
import ProfilePageClient from "./ProfilePageClient"

export const metadata: Metadata = {
  title: "Your Profile | AceCode",
  description:
    "Track your progress and manage your coding problems. See your stats and improve your interview preparation with AceCode.",
  robots: {
    index: false,
  },
}

export default function ProfilePage() {
  return <ProfilePageClient />
}
