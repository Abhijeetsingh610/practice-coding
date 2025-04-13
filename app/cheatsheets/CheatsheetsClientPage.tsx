"use client"
import { CheatsheetBrowser } from "@/components/cheatsheet-browser"
import { ProtectedRoute } from "@/components/protected-route"
import { motion } from "framer-motion"

export default function CheatsheetsClientPage() {
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
            Coding Cheatsheets
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Download helpful cheatsheets for various programming topics
          </p>
        </motion.div>

        <CheatsheetBrowser />
      </div>
    </ProtectedRoute>
  )
}
