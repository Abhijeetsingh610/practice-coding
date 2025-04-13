import { NextResponse } from "next/server"

// Define the Piston API URL
const PISTON_API_URL = "https://emkc.org/api/v2/piston/execute"

// Map our language IDs to Piston's language IDs
const LANGUAGE_MAP = {
  cpp: { language: "cpp", version: "10.2.0" },
  python: { language: "python", version: "3.10.0" },
  javascript: { language: "javascript", version: "18.15.0" },
}

export async function POST(request: Request) {
  try {
    // Parse request body
    const { language, code, stdin } = await request.json()

    // Validate input
    if (!language || !code) {
      return NextResponse.json({ error: "Language and code are required" }, { status: 400 })
    }

    // Get language config
    const langConfig = LANGUAGE_MAP[language]
    if (!langConfig) {
      return NextResponse.json({ error: "Unsupported language" }, { status: 400 })
    }

    // Prepare request to Piston API
    const pistonPayload = {
      language: langConfig.language,
      version: langConfig.version,
      files: [
        {
          name: `main.${language === "cpp" ? "cpp" : language === "python" ? "py" : "js"}`,
          content: code,
        },
      ],
      stdin: stdin || "",
      args: [],
      compile_timeout: 10000,
      run_timeout: 5000,
      compile_memory_limit: -1,
      run_memory_limit: -1,
    }

    // Call Piston API
    const response = await fetch(PISTON_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pistonPayload),
    })

    // Parse response
    const data = await response.json()

    // Check for API errors
    if (!response.ok) {
      return NextResponse.json({ error: data.message || "Failed to execute code" }, { status: response.status })
    }

    // Format and return the result
    return NextResponse.json({
      stdout: data.run?.stdout || "",
      stderr: data.run?.stderr || data.compile?.stderr || "",
      exitCode: data.run?.code,
      language: language,
    })
  } catch (error) {
    console.error("Error executing code:", error)
    return NextResponse.json({ error: "An error occurred while executing the code" }, { status: 500 })
  }
}
