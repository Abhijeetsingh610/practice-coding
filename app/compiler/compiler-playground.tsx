"use client"

import { useState, useRef, useEffect } from "react"
import { Editor } from "@monaco-editor/react"
import { useTheme } from "next-themes"
import { Split } from "@geoffcox/react-splitter"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

// Define language options
const LANGUAGES = [
  { id: "cpp", name: "C++", extension: "cpp" },
  { id: "python", name: "Python", extension: "py" },
  { id: "javascript", name: "JavaScript", extension: "js" },
]

// Default code templates for each language
const DEFAULT_CODE = {
  cpp: `#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`,
  python: `print("Hello, World!")`,
  javascript: `console.log("Hello, World!");`,
}

export default function CompilerPlayground() {
  const { theme } = useTheme()
  const [language, setLanguage] = useState("cpp")
  const [code, setCode] = useState(DEFAULT_CODE.cpp)
  const [stdin, setStdin] = useState("")
  const [output, setOutput] = useState("")
  const [error, setError] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState("output")
  const editorRef = useRef(null)

  // Update code when language changes
  useEffect(() => {
    setCode(DEFAULT_CODE[language] || "")
  }, [language])

  // Handle language change
  const handleLanguageChange = (value) => {
    setLanguage(value)
  }

  // Handle editor mount
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor
  }

  // Run code
  const runCode = async () => {
    setIsRunning(true)
    setOutput("")
    setError("")
    setActiveTab("output")

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          code,
          stdin,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to execute code")
      }

      // Set output and error
      setOutput(data.stdout || "")
      setError(data.stderr || "")

      // Switch to error tab if there's an error
      if (data.stderr && !data.stdout) {
        setActiveTab("error")
      }
    } catch (err) {
      setError(err.message || "An error occurred while executing the code")
      setActiveTab("error")
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="bg-gradient-to-r from-blue-600 via-purple-500 to-teal-400 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
          Online Compiler
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          Write, compile, and run code in multiple programming languages
        </p>
      </motion.div>

      <div className="flex flex-col space-y-4">
        {/* Top controls */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="w-full sm:w-48">
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={runCode} disabled={isRunning} className="w-full sm:w-auto" size="lg">
            {isRunning ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Run Code
              </>
            )}
          </Button>
        </div>

        {/* Editor and output */}
        <div className="h-[calc(100vh-300px)] min-h-[500px] rounded-lg border overflow-hidden">
          <Split
            initialPrimarySize="60%"
            minPrimarySize="30%"
            minSecondarySize="20%"
            splitterSize="6px"
            resetOnDoubleClick
          >
            {/* Code editor */}
            <div className="h-full">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(value) => setCode(value)}
                theme={theme === "dark" ? "vs-dark" : "light"}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 2,
                  wordWrap: "on",
                }}
                onMount={handleEditorDidMount}
              />
            </div>

            {/* Input and output */}
            <div className="h-full flex flex-col">
              <Split
                horizontal
                initialPrimarySize="30%"
                minPrimarySize="20%"
                minSecondarySize="30%"
                splitterSize="6px"
                resetOnDoubleClick
              >
                {/* Standard input */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900 h-full flex flex-col">
                  <h3 className="text-sm font-medium mb-2">Standard Input</h3>
                  <Textarea
                    placeholder="Enter input for your program..."
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    className="flex-1 resize-none font-mono text-sm"
                  />
                </div>

                {/* Output */}
                <div className="bg-gray-50 dark:bg-gray-900 h-full flex flex-col">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                    <div className="px-4 pt-4">
                      <TabsList className="mb-2">
                        <TabsTrigger value="output">Output</TabsTrigger>
                        <TabsTrigger value="error">Error</TabsTrigger>
                      </TabsList>
                    </div>

                    <TabsContent value="output" className="flex-1 p-4 pt-0 overflow-auto">
                      <Card className="h-full">
                        <CardContent className="p-4 h-full">
                          <pre className="font-mono text-sm whitespace-pre-wrap h-full overflow-auto">
                            {output || "No output"}
                          </pre>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="error" className="flex-1 p-4 pt-0 overflow-auto">
                      <Card className="h-full">
                        <CardContent className="p-4 h-full">
                          <pre className="font-mono text-sm whitespace-pre-wrap text-red-500 dark:text-red-400 h-full overflow-auto">
                            {error || "No errors"}
                          </pre>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </Split>
            </div>
          </Split>
        </div>
      </div>
    </div>
  )
}
