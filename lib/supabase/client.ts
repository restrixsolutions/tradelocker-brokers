import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseBrowserClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return a dummy client during build time if env vars are missing
    // This prevents build errors but the actual functionality won't work without proper env vars
    if (typeof window === 'undefined') {
      return {} as any
    }
    throw new Error('Missing Supabase environment variables')
  }

  supabaseClient = createBrowserClient(
    supabaseUrl,
    supabaseAnonKey,
  )

  return supabaseClient
}
