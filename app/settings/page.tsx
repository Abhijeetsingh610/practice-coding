import type { Metadata } from "next"
import SettingsPageClient from "./SettingsPageClient"

export const metadata: Metadata = {
  title: "Account Settings | AceCode",
  description: "Manage your profile and account preferences on AceCode.",
  robots: {
    index: false,
  },
}

export default function SettingsPage() {
  return <SettingsPageClient />
}
