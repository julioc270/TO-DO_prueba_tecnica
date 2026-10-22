import { api } from "../api/axios";
import type { Task } from "../types/task";
import type { TaskFormData } from "../components/TaskModal";

export const taskService = {
  async getAll(): Promise<Task[]> {
    const response = await api.get<Task[]>("/tasks");
    return response.data;
  },

  async create(data: TaskFormData): Promise<void> {
    await api.post("/tasks", {
      ...data,
      dueDate: data.dueDate || null,
    });
  },

  async update(id: Task["id"], data: TaskFormData): Promise<void> {
    await api.put(`/tasks/${id}`, {
      ...data,
      dueDate: data.dueDate || null,
    });
  },

  async remove(id: Task["id"]): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};
