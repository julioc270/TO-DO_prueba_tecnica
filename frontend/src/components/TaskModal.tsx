import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import type { Task, TaskPriority, TaskStatus } from "../types/task";

export type TaskFormData = {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
};

type Props = Readonly<{
  task: Task | null;
  onClose: () => void;
  onSave: (data: TaskFormData) => Promise<void>;
}>;

export function TaskModal({ task, onClose, onSave }: Props) {
  const [form, setForm] = useState<TaskFormData>({
    title: task?.title ?? "",
    description: task?.description ?? "",
    dueDate: task?.dueDate ?? "",
    priority: task?.priority ?? "MEDIUM",
    status: task?.status ?? "PENDING",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await onSave(form);
    } catch {
      setError("No se pudo guardar la tarea.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        className="w-full max-w-lg rounded-xl bg-app-surface p-6 shadow-xl"
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 id="task-modal-title" className="text-xl font-bold text-app-text">
            {task ? "Editar tarea" : "Nueva tarea"}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="text-app-muted hover:text-app-text"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="task-title"
              className="mb-1 block text-sm text-app-text"
            >
              Título
            </label>
            <input
              id="task-title"
              required
              maxLength={150}
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
              className="w-full rounded-lg border border-app-border bg-app-bg p-3 text-app-text"
            />
          </div>

          <div>
            <label
              htmlFor="task-description"
              className="mb-1 block text-sm text-app-text"
            >
              Descripción
            </label>
            <textarea
              id="task-description"
              maxLength={1000}
              rows={3}
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              className="w-full rounded-lg border border-app-border bg-app-bg p-3 text-app-text"
            />
          </div>

          <div>
            <label
              htmlFor="task-date"
              className="mb-1 block text-sm text-app-text"
            >
              Fecha límite
            </label>
            <input
              id="task-date"
              type="date"
              value={form.dueDate}
              onChange={(event) =>
                setForm({ ...form, dueDate: event.target.value })
              }
              className="w-full rounded-lg border border-app-border bg-app-bg p-3 text-app-text"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="task-priority"
                className="mb-1 block text-sm text-app-text"
              >
                Prioridad
              </label>
              <select
                id="task-priority"
                value={form.priority}
                onChange={(event) =>
                  setForm({
                    ...form,
                    priority: event.target.value as TaskPriority,
                  })
                }
                className="w-full rounded-lg border border-app-border bg-app-bg p-3 text-app-text"
              >
                <option value="LOW">Baja</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="task-status"
                className="mb-1 block text-sm text-app-text"
              >
                Estado
              </label>
              <select
                id="task-status"
                value={form.status}
                onChange={(event) =>
                  setForm({
                    ...form,
                    status: event.target.value as TaskStatus,
                  })
                }
                className="w-full rounded-lg border border-app-border bg-app-bg p-3 text-app-text"
              >
                <option value="PENDING">Pendiente</option>
                <option value="COMPLETED">Completada</option>
              </select>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-app-border px-4 py-2 text-app-text"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-app-primary px-4 py-2 font-medium text-white hover:bg-app-primary-hover disabled:opacity-50"
            >
              {saving ? "Guardando..." : "Guardar tarea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
