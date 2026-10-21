export type TaskStatus = "PENDING" | "COMPLETED";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export type Task = {
  id: number;
  title: string;
  description: string | null;
  startDate: string;
  dueDate: string | null;
  status: TaskStatus;
  priority: TaskPriority;
};
