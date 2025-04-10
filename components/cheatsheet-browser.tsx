"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheatsheetCard } from "./cheatsheet-card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSupabase } from "@/lib/supabase"
import { motion } from "framer-motion"
import { Loader2, FileText } from "lucide-react"

// Define the categories
const CATEGORIES = [
  { id: "dsa", name: "DSA" },
  { id: "ai-ml", name: "AI/ML" },
  { id: "devops", name: "DevOps" },
  { id: "interview-prep", name: "Interview Prep" },
  { id: "system-design", name: "System Design" },
  { id: "dbms-sql", name: "DBMS/SQL" },
  { id: "operating-systems", name: "Operating Systems" },
]

// Define the cheatsheet interface
interface Cheatsheet {
  name: string
  path: string
  url: string
  size: number
  updatedAt: string
}

export function CheatsheetBrowser() {
  const [activeCategory, setActiveCategory] = useState("dsa")
  const [cheatsheets, setCheatsheets] = useState<Cheatsheet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCheatsheets = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const supabase = getSupabase()

        // Fetch files from the selected category
        const { data, error } = await supabase.storage.from("cheatsheets").list(activeCategory, {
          sortBy: { column: "name", order: "asc" },
        })

        if (error) {
          throw error
        }

        if (!data || data.length === 0) {
          setCheatsheets([])
          return
        }

        // Filter out folders and only keep files
        const files = data.filter(
          (item) => !item.metadata?.mimetype?.includes("directory") && item.name.toLowerCase().endsWith(".pdf"),
        )

        // Get public URLs for each file
        const cheatsheetsWithUrls = await Promise.all(
          files.map(async (file) => {
            const { data: publicUrl } = supabase.storage
              .from("cheatsheets")
              .getPublicUrl(`${activeCategory}/${file.name}`)

            // Format the file name for display (remove extension, replace underscores with spaces)
            const displayName = file.name
              .replace(/\.[^/.]+$/, "") // Remove extension
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")

            return {
              name: displayName,
              path: `${activeCategory}/${file.name}`,
              url: publicUrl.publicUrl,
              size: file.metadata?.size || 0,
              updatedAt: file.updated_at || "",
            }
          }),
        )

        setCheatsheets(cheatsheetsWithUrls)
      } catch (err: any) {
        console.error("Error fetching cheatsheets:", err)
        setError(err.message || "Failed to load cheatsheets")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCheatsheets()
  }, [activeCategory])

  return (
    <div className="max-w-6xl mx-auto">
      <Tabs defaultValue="dsa" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="mb-8 w-full overflow-x-auto flex flex-nowrap justify-start sm:justify-center p-1">
          {CATEGORIES.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {CATEGORIES.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2">Loading cheatsheets...</span>
              </div>
            ) : error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : cheatsheets.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <FileText className="h-16 w-16 mx-auto mb-4 opacity-20" />
                <p className="text-lg">No cheatsheets available for this category yet.</p>
                <p className="mt-2 text-sm">Check back later or try another category.</p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {cheatsheets.map((cheatsheet, index) => (
                  <CheatsheetCard key={cheatsheet.path} cheatsheet={cheatsheet} index={index} />
                ))}
              </motion.div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
