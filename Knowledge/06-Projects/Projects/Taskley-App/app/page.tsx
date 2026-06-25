"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Plus,
  Trash2,
  CheckCircle2,
  ListTodo,
  CalendarIcon,
  FileText,
  Flag,
} from "lucide-react";
import {
  getSupabase,
  isSupabaseConfigured,
  type Database,
} from "@/lib/supabase";
import {
  getDefaultSeedTodos,
  loadLocalTodos,
  saveLocalTodos,
} from "@/lib/local-todos";
import { cn } from "@/lib/utils";

type Todo = Database["public"]["Tables"]["todos"]["Row"];

function normalizeRow(t: Record<string, unknown>): Todo {
  return {
    id: String(t.id),
    task: String(t.task),
    is_complete: Boolean(t.is_complete),
    created_at: String(t.created_at),
    details: t.details != null ? String(t.details) : null,
    priority: typeof t.priority === "number" ? t.priority : 1,
    due_at: t.due_at != null ? String(t.due_at) : null,
  };
}

function endOfLocalDayISO(d: Date): string {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x.toISOString();
}

function formatDueShort(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

/** Stored 2 = P1 (highest) … 0 = P3 (lowest). Minimal: single soft border, transparent fill, light hover; Flags need text-* to bypass SelectTrigger svg muted rule. */
const PRIORITY_TRIGGER_CLASS: Record<number, string> = {
  2: cn(
    "border border-red-200/70 bg-transparent text-red-700 shadow-none hover:bg-red-50/40 dark:border-red-800/45 dark:text-red-400 dark:hover:bg-red-950/25",
    "[&>svg]:text-red-600/45"
  ),
  1: cn(
    "border border-amber-200/70 bg-transparent text-amber-800 shadow-none hover:bg-amber-50/40 dark:border-amber-800/45 dark:text-amber-400 dark:hover:bg-amber-950/25",
    "[&>svg]:text-amber-700/45 dark:[&>svg]:text-amber-500/45"
  ),
  0: cn(
    "border border-border/60 bg-transparent text-muted-foreground shadow-none hover:bg-muted/40 dark:border-border dark:hover:bg-muted/30",
    "[&>svg]:text-muted-foreground/45"
  ),
};

function priorityTriggerClass(priority: number) {
  return PRIORITY_TRIGGER_CLASS[priority] ?? PRIORITY_TRIGGER_CLASS[1];
}

function priorityAccentClass(priority: number): string {
  if (priority >= 2) return "border-l-red-600";
  if (priority >= 1) return "border-l-amber-500";
  return "border-l-slate-300 dark:border-l-slate-600";
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const editCommittedRef = useRef(false);

  const [detailsTodoId, setDetailsTodoId] = useState<string | null>(null);
  const [detailsDraft, setDetailsDraft] = useState("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    if (!isSupabaseConfigured()) {
      const { todos: loaded, hadStoredData } = loadLocalTodos();
      if (!hadStoredData) {
        const seed = getDefaultSeedTodos();
        saveLocalTodos(seed);
        setTodos(seed);
      } else {
        setTodos(loaded);
      }
      setLoading(false);
      return;
    }

    const sb = getSupabase();
    if (!sb) {
      setLoading(false);
      return;
    }
    try {
      const { data, error } = await sb
        .from("todos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTodos((data ?? []).map((row) => normalizeRow(row as Record<string, unknown>)));
    } catch (error) {
      console.error("Error loading todos:", error);
      toast.error("Failed to load todos from Supabase.");
      setTodos([]);
    } finally {
      setLoading(false);
    }
  };

  const newLocalTodoId = () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : String(Date.now());

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setAdding(true);
    if (!isSupabaseConfigured()) {
      const newTodo: Todo = {
        id: newLocalTodoId(),
        task: newTask.trim(),
        is_complete: false,
        created_at: new Date().toISOString(),
        details: null,
        priority: 1,
        due_at: null,
      };
      setTodos((prev) => {
        const next = [newTodo, ...prev];
        saveLocalTodos(next);
        return next;
      });
      setNewTask("");
      toast.success("Todo added!");
      setAdding(false);
      return;
    }

    const sb = getSupabase();
    if (!sb) {
      setAdding(false);
      return;
    }
    try {
      const { data, error } = await sb
        .from("todos")
        .insert([{ task: newTask.trim() }])
        .select();

      if (error) throw error;

      if (data?.[0]) {
        setTodos((prev) => [normalizeRow(data[0] as Record<string, unknown>), ...prev]);
        setNewTask("");
        toast.success("Todo added!");
      }
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error("Could not add todo.");
    } finally {
      setAdding(false);
    }
  };

  const toggleTodo = async (id: string, is_complete: boolean) => {
    if (!isSupabaseConfigured()) {
      setTodos((prev) => {
        const next = prev.map((todo) =>
          todo.id === id ? { ...todo, is_complete: !is_complete } : todo
        );
        saveLocalTodos(next);
        return next;
      });
      toast.success(is_complete ? "Todo marked as active" : "Todo completed!");
      return;
    }

    const sb = getSupabase();
    if (!sb) return;
    try {
      const { error } = await sb
        .from("todos")
        .update({ is_complete: !is_complete })
        .eq("id", id);

      if (error) throw error;

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, is_complete: !is_complete } : todo
        )
      );
      toast.success(is_complete ? "Todo marked as active" : "Todo completed!");
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Could not update todo.");
    }
  };

  const deleteTodo = async (id: string) => {
    if (!isSupabaseConfigured()) {
      setTodos((prev) => {
        const next = prev.filter((todo) => todo.id !== id);
        saveLocalTodos(next);
        return next;
      });
      toast.success("Todo deleted!");
      return;
    }

    const sb = getSupabase();
    if (!sb) return;
    try {
      const { error } = await sb.from("todos").delete().eq("id", id);

      if (error) throw error;

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      toast.success("Todo deleted!");
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast.error("Could not delete todo.");
    }
  };

  const clearCompleted = async () => {
    setClearing(true);
    if (!isSupabaseConfigured()) {
      setTodos((prev) => {
        const next = prev.filter((t) => !t.is_complete);
        saveLocalTodos(next);
        return next;
      });
      toast.success("Completed tasks cleared.");
      setClearing(false);
      setClearDialogOpen(false);
      return;
    }

    const sb = getSupabase();
    if (!sb) {
      setClearing(false);
      setClearDialogOpen(false);
      return;
    }
    try {
      const { error } = await sb
        .from("todos")
        .delete()
        .eq("is_complete", true);

      if (error) throw error;

      setTodos((prev) => prev.filter((t) => !t.is_complete));
      toast.success("Completed tasks cleared.");
    } catch (error) {
      console.error("Error clearing completed:", error);
      toast.error("Could not clear completed tasks.");
    } finally {
      setClearing(false);
      setClearDialogOpen(false);
    }
  };

  const updatePriority = async (id: string, priority: number) => {
    if (!isSupabaseConfigured()) {
      setTodos((prev) => {
        const next = prev.map((t) => (t.id === id ? { ...t, priority } : t));
        saveLocalTodos(next);
        return next;
      });
      return;
    }

    const sb = getSupabase();
    if (!sb) return;
    try {
      const { error } = await sb
        .from("todos")
        .update({ priority })
        .eq("id", id);

      if (error) throw error;

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, priority } : t))
      );
    } catch (error) {
      console.error("Error updating priority:", error);
      toast.error("Could not update priority.");
    }
  };

  const updateDueAt = async (id: string, due_at: string | null) => {
    if (!isSupabaseConfigured()) {
      setTodos((prev) => {
        const next = prev.map((t) => (t.id === id ? { ...t, due_at } : t));
        saveLocalTodos(next);
        return next;
      });
      toast.success(due_at ? "Due date updated" : "Due date cleared");
      return;
    }

    const sb = getSupabase();
    if (!sb) return;
    try {
      const { error } = await sb
        .from("todos")
        .update({ due_at })
        .eq("id", id);

      if (error) throw error;

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, due_at } : t))
      );
      toast.success(due_at ? "Due date updated" : "Due date cleared");
    } catch (error) {
      console.error("Error updating due date:", error);
      toast.error("Could not update due date.");
    }
  };

  const saveTaskTitle = async (id: string, task: string) => {
    const trimmed = task.trim();
    if (!trimmed) {
      toast.error("Task cannot be empty");
      return;
    }
    if (!isSupabaseConfigured()) {
      setTodos((p) => {
        const next = p.map((t) => (t.id === id ? { ...t, task: trimmed } : t));
        saveLocalTodos(next);
        return next;
      });
      toast.success("Task updated");
      return;
    }

    const prevTodos = todos;
    setTodos((p) =>
      p.map((t) => (t.id === id ? { ...t, task: trimmed } : t))
    );
    const sb = getSupabase();
    if (!sb) {
      setTodos(prevTodos);
      return;
    }
    try {
      const { error } = await sb
        .from("todos")
        .update({ task: trimmed })
        .eq("id", id);

      if (error) throw error;
      toast.success("Task updated");
    } catch (error) {
      console.error("Error updating task:", error);
      setTodos(prevTodos);
      toast.error("Could not save task.");
    }
  };

  const openDetails = (todo: Todo) => {
    setDetailsTodoId(todo.id);
    setDetailsDraft(todo.details ?? "");
  };

  const saveDetails = async () => {
    if (!detailsTodoId) return;
    const id = detailsTodoId;
    const value = detailsDraft.trim() ? detailsDraft.trim() : null;

    if (!isSupabaseConfigured()) {
      setTodos((prev) => {
        const next = prev.map((t) => (t.id === id ? { ...t, details: value } : t));
        saveLocalTodos(next);
        return next;
      });
      toast.success("Notes saved");
      setDetailsTodoId(null);
      return;
    }

    const sb = getSupabase();
    if (!sb) return;
    try {
      const { error } = await sb
        .from("todos")
        .update({ details: value })
        .eq("id", id);

      if (error) throw error;

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, details: value } : t))
      );
      toast.success("Notes saved");
      setDetailsTodoId(null);
    } catch (error) {
      console.error("Error saving details:", error);
      toast.error("Could not save notes.");
    }
  };

  const beginEdit = (todo: Todo) => {
    editCommittedRef.current = false;
    setEditingId(todo.id);
    setEditText(todo.task);
  };

  const commitEdit = async () => {
    if (!editingId) return;
    const id = editingId;
    const text = editText;
    editCommittedRef.current = true;
    setEditingId(null);
    await saveTaskTitle(id, text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  const sortedFilteredTodos = useMemo(() => {
    const filtered = todos.filter((todo) => {
      if (filter === "active") return !todo.is_complete;
      if (filter === "completed") return todo.is_complete;
      return true;
    });
    return [...filtered].sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [todos, filter]);

  const stats = {
    total: todos.length,
    active: todos.filter((t) => !t.is_complete).length,
    completed: todos.filter((t) => t.is_complete).length,
  };

  const detailsTodo =
    detailsTodoId == null
      ? null
      : todos.find((t) => t.id === detailsTodoId) ?? null;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          Loading todos...
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider delayDuration={400}>
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-light tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Taskley
            </span>
          </h1>
          <p className="mx-auto max-w-md text-lg leading-snug text-muted-foreground">
            Your tasks, priorities, and deadlines in one clear view—so you always
            know what to tackle next.
          </p>
          {!isSupabaseConfigured() ? (
            <p
              role="status"
              className="mx-auto mt-4 max-w-lg rounded-md border border-border/60 bg-muted/30 px-3 py-2 text-center text-sm text-muted-foreground">
              Running locally—tasks stay in this browser. Add{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                NEXT_PUBLIC_SUPABASE_URL
              </code>{" "}
              and{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                NEXT_PUBLIC_SUPABASE_ANON_KEY
              </code>{" "}
              to <code className="rounded bg-muted px-1 py-0.5 text-xs">.env.local</code> to sync
              with Supabase.
            </p>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-3 mb-6 md:grid-cols-3">
          <Card className="text-center">
            <CardContent className="pt-4 pb-4">
              <div className="text-2xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Total Tasks</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 pb-4">
              <div className="text-2xl font-bold text-orange-500">{stats.active}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-4 pb-4">
              <div className="text-2xl font-bold text-green-500">{stats.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
        </div>

        <Card className="backdrop-blur-sm bg-background/80 border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="h-5 w-5" />
              Your Tasks
            </CardTitle>
            <CardDescription>
              Add, complete, and manage your daily tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={addTodo} className="flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-center">
              <Input
                placeholder="What needs to be done?"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-1 min-h-10"
                disabled={adding}
              />
              <Button
                type="submit"
                size="default"
                className="min-h-10 w-full min-[420px]:w-auto shrink-0"
                disabled={adding || !newTask.trim()}>
                {adding ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
                Add
              </Button>
            </form>

            <Tabs
              value={filter}
              onValueChange={(v) => setFilter(v as typeof filter)}>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <TabsList className="grid w-full grid-cols-3 sm:max-w-md">
                  <TabsTrigger value="all">All ({stats.total})</TabsTrigger>
                  <TabsTrigger value="active">Active ({stats.active})</TabsTrigger>
                  <TabsTrigger value="completed">
                    Completed ({stats.completed})
                  </TabsTrigger>
                </TabsList>
                <Button
                  type="button"
                  variant="outline"
                  size="default"
                  className="h-10 min-h-10 w-full shrink-0 sm:h-9 sm:min-h-9 sm:w-auto"
                  disabled={stats.completed === 0 || clearing}
                  onClick={() => setClearDialogOpen(true)}>
                  {clearing ? "Clearing…" : "Clear completed"}
                </Button>
              </div>

              <TabsContent value={filter} className="mt-6">
                {sortedFilteredTodos.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <ListTodo className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium mb-2">No tasks found</p>
                    <p className="text-sm">
                      {filter === "all"
                        ? "Add your first task to get started!"
                        : filter === "active"
                          ? "All your tasks are completed!"
                          : "No completed tasks yet."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {sortedFilteredTodos.map((todo) => {
                      const overdue =
                        Boolean(todo.due_at) &&
                        !todo.is_complete &&
                        new Date(todo.due_at!) < new Date();
                      const hasNotes = Boolean(todo.details?.trim());
                      const dueTriggerLabel = todo.due_at
                        ? formatDueShort(todo.due_at)
                        : "Set due";
                      return (
                        <div
                          key={todo.id}
                          className={cn(
                            "group rounded-lg border border-l-4 bg-card transition-colors hover:bg-accent/50",
                            overdue
                              ? "border-destructive/40 bg-destructive/5 border-l-destructive"
                              : priorityAccentClass(todo.priority)
                          )}>
                          <div className="flex flex-col gap-3 p-3 sm:flex-row sm:items-start sm:gap-4 sm:p-4">
                            <div className="flex min-w-0 flex-1 gap-3">
                              <Checkbox
                                checked={todo.is_complete}
                                onCheckedChange={() =>
                                  toggleTodo(todo.id, todo.is_complete)
                                }
                                className="mt-1 shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                {editingId === todo.id ? (
                                  <Input
                                    autoFocus
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                    onBlur={() => {
                                      if (editCommittedRef.current) return;
                                      void commitEdit();
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") {
                                        e.preventDefault();
                                        void commitEdit();
                                      }
                                      if (e.key === "Escape") {
                                        e.preventDefault();
                                        cancelEdit();
                                      }
                                    }}
                                    className="h-9"
                                  />
                                ) : (
                                  <button
                                    type="button"
                                    className={cn(
                                      "w-full rounded-sm px-0.5 -mx-0.5 text-left transition-colors hover:bg-accent/80",
                                      todo.is_complete
                                        ? "text-muted-foreground line-through"
                                        : "text-foreground"
                                    )}
                                    onClick={() => beginEdit(todo)}>
                                    {todo.task}
                                  </button>
                                )}
                                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                                  <span>
                                    Created{" "}
                                    {new Date(
                                      todo.created_at
                                    ).toLocaleDateString()}
                                  </span>
                                  {todo.due_at && (
                                    <span
                                      className={cn(
                                        overdue && "font-medium text-destructive"
                                      )}>
                                      Due{" "}
                                      {new Date(
                                        todo.due_at
                                      ).toLocaleDateString()}
                                      {overdue ? " (overdue)" : ""}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="w-full border-t border-border/60 pt-3 sm:w-auto sm:shrink-0 sm:border-l sm:border-t-0 sm:pl-3 sm:pt-0">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
                                  <Select
                                    value={String(todo.priority)}
                                    onValueChange={(v) =>
                                      updatePriority(todo.id, Number(v))
                                    }>
                                    <SelectTrigger
                                      className={cn(
                                        "h-10 w-full rounded-full font-medium shadow-none sm:h-8 sm:w-[108px]",
                                        priorityTriggerClass(todo.priority)
                                      )}
                                      size="sm">
                                      <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="2">
                                        <span className="flex items-center gap-2 text-red-700 dark:text-red-400">
                                          <Flag
                                            className="size-3.5 shrink-0 text-red-600 dark:text-red-400"
                                            aria-hidden
                                          />
                                          P1
                                        </span>
                                      </SelectItem>
                                      <SelectItem value="1">
                                        <span className="flex items-center gap-2 text-amber-800 dark:text-amber-400">
                                          <Flag
                                            className="size-3.5 shrink-0 text-amber-700 dark:text-amber-500"
                                            aria-hidden
                                          />
                                          P2
                                        </span>
                                      </SelectItem>
                                      <SelectItem value="0">
                                        <span className="flex items-center gap-2 text-muted-foreground">
                                          <Flag
                                            className="size-3.5 shrink-0 text-muted-foreground"
                                            aria-hidden
                                          />
                                          P3
                                        </span>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>

                                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 sm:flex-none sm:flex-nowrap">
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Button
                                          type="button"
                                          variant="outline"
                                          className={cn(
                                            "h-10 min-h-10 min-w-0 flex-1 gap-1.5 rounded-full border-border/60 bg-background px-3 shadow-none hover:bg-muted/30 sm:h-8 sm:min-h-8 sm:min-w-[7.5rem] sm:flex-none",
                                            overdue &&
                                              "border-destructive/40 text-destructive hover:bg-destructive/5 hover:text-destructive"
                                          )}
                                          aria-label={
                                            todo.due_at
                                              ? `Due date: ${dueTriggerLabel}`
                                              : "Set due date"
                                          }>
                                          <CalendarIcon className="size-4 shrink-0" />
                                          <span className="truncate text-sm font-medium leading-none">
                                            {dueTriggerLabel}
                                          </span>
                                        </Button>
                                      </PopoverTrigger>
                                      <PopoverContent
                                        className="w-auto p-0"
                                        align="end">
                                        <Calendar
                                          mode="single"
                                          selected={
                                            todo.due_at
                                              ? new Date(todo.due_at)
                                              : undefined
                                          }
                                          onSelect={(d) => {
                                            if (d)
                                              void updateDueAt(
                                                todo.id,
                                                endOfLocalDayISO(d)
                                              );
                                          }}
                                          initialFocus
                                        />
                                        <div className="flex gap-2 border-t p-2">
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="flex-1"
                                            onClick={() =>
                                              void updateDueAt(todo.id, null)
                                            }>
                                            Clear date
                                          </Button>
                                        </div>
                                      </PopoverContent>
                                    </Popover>

                                    <div className="flex items-center gap-1.5 sm:shrink-0">
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            className="relative size-10 shrink-0 sm:size-8"
                                            aria-label={
                                              hasNotes
                                                ? "Edit notes"
                                                : "Add notes"
                                            }
                                            onClick={() =>
                                              openDetails(todo)
                                            }>
                                            <FileText
                                              className={cn(
                                                "size-4",
                                                hasNotes && "text-primary"
                                              )}
                                            />
                                            {hasNotes ? (
                                              <span className="bg-primary absolute top-1.5 right-1.5 size-1.5 rounded-full sm:top-1 sm:right-1" />
                                            ) : null}
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                          {hasNotes
                                            ? "View or edit notes"
                                            : "Add notes"}
                                        </TooltipContent>
                                      </Tooltip>

                                      {todo.is_complete ? (
                                        <Badge
                                          variant="outline"
                                          className="flex h-10 items-center gap-1 border-green-200 px-2 text-green-600 sm:h-8 sm:px-2">
                                          <CheckCircle2 className="size-3.5 shrink-0" />
                                          Done
                                        </Badge>
                                      ) : null}

                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive hover:text-destructive size-10 shrink-0 opacity-80 sm:size-8 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity"
                                            aria-label="Delete task"
                                            onClick={() =>
                                              deleteTodo(todo.id)
                                            }>
                                            <Trash2 className="size-4" />
                                          </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">
                                          Delete task
                                        </TooltipContent>
                                      </Tooltip>
                                    </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear completed tasks?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all completed tasks. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button variant="destructive" onClick={() => void clearCompleted()}>
                Clear completed
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={detailsTodoId !== null}
        onOpenChange={(open) => !open && setDetailsTodoId(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Notes</DialogTitle>
            <DialogDescription className="truncate">
              {detailsTodo?.task ?? ""}
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={detailsDraft}
            onChange={(e) => setDetailsDraft(e.target.value)}
            placeholder="Add details, links, or context…"
            rows={6}
            className="resize-y min-h-[120px]"
          />
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setDetailsTodoId(null)}>
              Cancel
            </Button>
            <Button type="button" onClick={() => void saveDetails()}>
              Save notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
    </TooltipProvider>
  );
}
