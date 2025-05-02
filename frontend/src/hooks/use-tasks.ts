import { useState, useCallback } from "react";
import { Task } from "@/types/task";
import { Mail } from "@/types/mail";

export function useTasks(emails: Mail[]) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails }),
      });

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      setTasks(data);
    } catch (err: unknown) {
      console.error("Task fetch error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setIsLoading(false);
    }
  }, [emails]);

  return {
    tasks,
    isLoading,
    error,
    fetchTasks, // expose manual trigger
  };
}
