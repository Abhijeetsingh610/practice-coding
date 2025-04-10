import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a singleton instance that works in both client and server contexts
let supabaseInstance: ReturnType<typeof createClient> | null = null

export function getSupabase() {
  if (!supabaseInstance) {
    // Create a new instance only if one doesn't exist
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: typeof window !== "undefined", // Only persist session on client-side
        autoRefreshToken: true,
        detectSessionInUrl: typeof window !== "undefined", // Only detect session in URL on client-side
        storageKey: "supabase.auth.token", // Specify the storage key
      },
    })
  }
  return supabaseInstance
}

// For server components or API routes, use this function to get a fresh instance when needed
// This should only be used in server contexts where you don't need auth state
export function createServerSupabase() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}
