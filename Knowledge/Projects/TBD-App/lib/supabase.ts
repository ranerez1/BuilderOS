import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/** Priority: 0 = low, 1 = medium, 2 = high */
export type TodoPriority = 0 | 1 | 2

export type Database = {
  public: {
    Tables: {
      todos: {
        Row: {
          id: string
          task: string
          is_complete: boolean
          created_at: string
          details: string | null
          priority: number
          due_at: string | null
        }
        Insert: {
          id?: string
          task: string
          is_complete?: boolean
          created_at?: string
          details?: string | null
          priority?: number
          due_at?: string | null
        }
        Update: {
          id?: string
          task?: string
          is_complete?: boolean
          created_at?: string
          details?: string | null
          priority?: number
          due_at?: string | null
        }
      }
    }
  }
}

/**
 * True when both URL and anon key are set and look usable.
 * Leave env empty (or unset) to run the app in local-only mode (localStorage).
 */
export function isSupabaseConfigured(): boolean {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? '').trim()
  const key = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '').trim()
  if (!url || !key) return false
  if (key.length < 20) return false
  try {
    const u = new URL(url)
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return false
  } catch {
    return false
  }
  return true
}

let client: SupabaseClient | null = null

/** Lazily create a client, or null if not configured (no network calls). */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null
  if (!client) {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!.trim(),
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!.trim()
    )
  }
  return client
}
