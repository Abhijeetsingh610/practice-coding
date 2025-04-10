"use client"

import { useState } from "react"
import { getSupabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Upload, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

export function UploadPDFForm() {
  const [uploading, setUploading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [category, setCategory] = useState("dsa")
  const [customTitle, setCustomTitle] = useState("")
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    if (!file.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files are allowed")
      return
    }

    try {
      setUploading(true)
      setError(null)
      setSuccess(false)

      const supabase = getSupabase()

      // Create a file name based on custom title or original filename
      const baseName = customTitle
        ? customTitle.trim().replace(/\s+/g, "_").toLowerCase()
        : file.name.split(".")[0].replace(/\s+/g, "_").toLowerCase()

      const fileExt = file.name.split(".").pop()
      const fileName = `${baseName}.${fileExt}`
      const filePath = `${category}/${fileName}`

      // Upload the file
      const { error: uploadError } = await supabase.storage.from("cheatsheets").upload(filePath, file, {
        cacheControl: "3600",
        upsert: true, // Allow overwriting existing files
      })

      if (uploadError) throw uploadError

      setSuccess(true)
      setFile(null)
      setCustomTitle("")

      toast({
        title: "Upload successful",
        description: "The PDF has been uploaded successfully.",
      })
    } catch (err: any) {
      console.error("Error uploading file:", err)
      setError(err.message || "Failed to upload file")

      toast({
        title: "Upload failed",
        description: err.message || "Failed to upload file",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload PDF Cheatsheet</CardTitle>
        <CardDescription>Upload PDF files for different programming topics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400">
            <Check className="h-4 w-4 mr-2" />
            <AlertDescription>File uploaded successfully!</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Custom Title (Optional)</Label>
          <Input
            id="title"
            placeholder="Enter a custom title for the PDF"
            value={customTitle}
            onChange={(e) => setCustomTitle(e.target.value)}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">If left blank, the filename will be used</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="file">PDF File</Label>
          <Input
            id="file"
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="cursor-pointer"
          />
          {file && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={!file || uploading} className="w-full">
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload PDF
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
