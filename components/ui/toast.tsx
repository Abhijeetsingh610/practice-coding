"use client"

import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className={`rounded-lg shadow-lg p-4 flex items-start ${
              toast.variant === "destructive"
                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                : "bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100"
            }`}
          >
            <div className="flex-1">
              <h4 className="font-medium">{toast.title}</h4>
              {toast.description && <p className="text-sm mt-1">{toast.description}</p>}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="ml-4 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
