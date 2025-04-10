"use client"

/**
 * Helper function for retrying failed requests with exponential backoff
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 3,
  initialDelay = 1000,
): Promise<Response> {
  let retries = 0
  let lastError: Error | null = null

  while (retries <= maxRetries) {
    try {
      // Add a small random delay to stagger requests (jitter)
      if (retries > 0) {
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 200))
      }

      const response = await fetch(url, {
        ...options,
        // Add cache control headers to prevent caching issues
        headers: {
          ...options.headers,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
        },
      })

      // If response is ok, return it
      if (response.ok) return response

      // For 429 Too Many Requests, wait longer before retry
      if (response.status === 429) {
        if (retries >= maxRetries) {
          const errorBody = await response.text().catch(() => "Rate limited")
          throw new Error(`Rate limited after ${maxRetries} retries: ${errorBody}`)
        }

        const retryAfter = response.headers.get("Retry-After")
        const delayMs = retryAfter ? Number.parseInt(retryAfter) * 1000 : initialDelay * Math.pow(2, retries)

        console.log(`Rate limited, waiting ${delayMs}ms before retry ${retries + 1}/${maxRetries}`)
        await new Promise((resolve) => setTimeout(resolve, delayMs))
        retries++
        continue
      }

      // For 4xx errors (except 429), don't retry (client error)
      if (response.status >= 400 && response.status < 500) {
        const errorBody = await response.text().catch(() => `HTTP error ${response.status}`)
        throw new Error(`Client error (${response.status}): ${errorBody}`)
      }

      // For 5xx errors, retry with backoff
      if (retries >= maxRetries) {
        const errorBody = await response.text().catch(() => `HTTP error ${response.status}`)
        throw new Error(`Server error (${response.status}) after ${maxRetries} retries: ${errorBody}`)
      }

      const delayMs = initialDelay * Math.pow(2, retries)
      console.log(`Server error (${response.status}), waiting ${delayMs}ms before retry ${retries + 1}/${maxRetries}`)
      await new Promise((resolve) => setTimeout(resolve, delayMs))
      retries++
    } catch (error: any) {
      lastError = error

      if (retries >= maxRetries) {
        console.error(`Failed after ${maxRetries} retries:`, error)
        throw error
      }

      const delayMs = initialDelay * Math.pow(2, retries)
      console.log(`Network error, waiting ${delayMs}ms before retry ${retries + 1}/${maxRetries}`)
      await new Promise((resolve) => setTimeout(resolve, delayMs))
      retries++
    }
  }

  // This should never happen, but TypeScript needs a return statement
  throw lastError || new Error(`Failed after ${maxRetries} retries`)
}
