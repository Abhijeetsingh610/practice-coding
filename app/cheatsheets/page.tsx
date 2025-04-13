import type { Metadata } from "next"
import CheatsheetsClientPage from "./CheatsheetsClientPage"

export const metadata: Metadata = {
  title: "Coding Cheatsheets | AceCode",
  description:
    "Download helpful cheatsheets for various programming topics. Prepare for coding interviews with our curated resources for algorithms, data structures, and more.",
  openGraph: {
    title: "Coding Cheatsheets | AceCode",
    description:
      "Download helpful cheatsheets for various programming topics. Prepare for coding interviews with our curated resources for algorithms, data structures, and more.",
  },
}

export default function CheatsheetsPage() {
  return <CheatsheetsClientPage />
}
