import type { Metadata } from "next"
import LeaderboardPageClient from "./LeaderboardPageClient"

export const metadata: Metadata = {
  title: "Coding Leaderboard | AceCode",
  description:
    "See the top problem solvers on AceCode. Join the community and climb the ranks by solving coding interview questions from top tech companies.",
  openGraph: {
    title: "Coding Leaderboard | AceCode",
    description:
      "See the top problem solvers on AceCode. Join the community and climb the ranks by solving coding interview questions from top tech companies.",
  },
}

export default function LeaderboardPage() {
  return <LeaderboardPageClient />
}
