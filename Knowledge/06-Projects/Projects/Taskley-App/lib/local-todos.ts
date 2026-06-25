import type { Database } from '@/lib/supabase'

export type LocalTodo = Database['public']['Tables']['todos']['Row']

const STORAGE_KEY = 'taskley-todos-v1'

function isTodoRow(x: unknown): x is LocalTodo {
  if (x == null || typeof x !== 'object') return false
  const o = x as Record<string, unknown>
  return (
    typeof o.id === 'string' &&
    typeof o.task === 'string' &&
    typeof o.is_complete === 'boolean' &&
    typeof o.created_at === 'string' &&
    (o.details === null || typeof o.details === 'string') &&
    typeof o.priority === 'number' &&
    (o.due_at === null || typeof o.due_at === 'string')
  )
}

export function loadLocalTodos(): {
  todos: LocalTodo[]
  hadStoredData: boolean
} {
  if (typeof window === 'undefined') {
    return { todos: [], hadStoredData: false }
  }
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw === null) {
    return { todos: [], hadStoredData: false }
  }
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) {
      return { todos: [], hadStoredData: true }
    }
    const todos = parsed.filter(isTodoRow)
    return { todos, hadStoredData: true }
  } catch {
    return { todos: [], hadStoredData: true }
  }
}

export function saveLocalTodos(todos: LocalTodo[]): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (e) {
    console.error('Could not save todos to localStorage:', e)
  }
}

export function getDefaultSeedTodos(): LocalTodo[] {
  const now = new Date().toISOString()
  return [
    {
      id: 'local-seed-1',
      task: 'Welcome to Taskley',
      is_complete: false,
      created_at: now,
      details:
        'You are in local mode. Data stays in this browser. Add Supabase URL and anon key in .env.local if you want cloud sync.',
      priority: 2,
      due_at: null,
    },
    {
      id: 'local-seed-2',
      task: 'Try adding a task below',
      is_complete: false,
      created_at: now,
      details: null,
      priority: 1,
      due_at: null,
    },
  ]
}
