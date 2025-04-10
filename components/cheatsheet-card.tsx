"use client"

import { FileText, Download, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { formatFileSize } from "@/lib/utils"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface CheatsheetCardProps {
  cheatsheet: {
    name: string
    path: string
    url: string
    size: number
    updatedAt: string
  }
  index: number
}

export function CheatsheetCard({ cheatsheet, index }: CheatsheetCardProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const { toast } = useToast()

  const handleDownload = async () => {
    try {
      setIsDownloading(true)

      // Create a temporary anchor element to trigger the download
      const link = document.createElement("a")
      link.href = cheatsheet.url
      link.download = cheatsheet.path.split("/").pop() || "cheatsheet.pdf"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast({
        title: "Download started",
        description: `${cheatsheet.name} is downloading.`,
      })
    } catch (error) {
      console.error("Download error:", error)
      toast({
        title: "Download failed",
        description: "There was an error downloading the file. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  // Format the date if available
  const formattedDate = cheatsheet.updatedAt ? new Date(cheatsheet.updatedAt).toLocaleDateString() : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 h-full">
        <CardContent className="p-0">
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-start mb-4">
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-lg">
                <FileText className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="font-semibold text-lg line-clamp-2">{cheatsheet.name}</h3>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span>{formatFileSize(cheatsheet.size)}</span>
                  {formattedDate && (
                    <>
                      <span className="mx-1">•</span>
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{formattedDate}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Button onClick={handleDownload} className="mt-auto w-full" variant="outline" disabled={isDownloading}>
              <Download className="h-4 w-4 mr-2" />
              {isDownloading ? "Downloading..." : "Download PDF"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
