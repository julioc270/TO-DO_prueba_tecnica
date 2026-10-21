import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import type { Task } from "../types/task";

type Props = Readonly<{
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}>;

const priorityLabels = {
  LOW: "Baja",
  MEDIUM: "Media",
  HIGH: "Alta",
};

const priorityColors = {
  LOW: "bg-green-500",
  MEDIUM: "bg-yellow-500",
  HIGH: "bg-red-500",
};

export function Card({ task, onEdit, onDelete, onView }: Props) {
  return (
    <article className="relative flex flex-col rounded-xl border border-app-border bg-app-surface p-5 shadow-sm transition hover:shadow-md">
      {/* Botón invisible que cubre la card */}
      <button
        type="button"
        onClick={() => onView(task)}
        aria-label={`Ver detalles de ${task.title}`}
        className="absolute inset-0 z-0 cursor-pointer rounded-xl focus-visible:outline-2 focus-visible:outline-app-primary"
      />

      {/* Prioridad y estado */}
      <div className="pointer-events-none relative z-10 mb-4 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-xs text-app-muted">
          <span
            className={`h-2 w-2 rounded-full ${priorityColors[task.priority]}`}
          />
          Prioridad {priorityLabels[task.priority]}
        </span>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            task.status === "COMPLETED"
              ? "bg-green-500/10 text-green-600"
              : "bg-yellow-500/10 text-yellow-600"
          }`}
        >
          {task.status === "COMPLETED" ? "Completada" : "Pendiente"}
        </span>
      </div>

      {/* Contenido */}
      <div className="pointer-events-none relative z-10 flex-1">
        <h3 className="mb-2 text-lg font-semibold text-app-text">
          {task.title}
        </h3>

        <p className="line-clamp-3 text-sm text-app-muted">
          {task.description || "Sin descripción"}
        </p>
      </div>

      {/* Fecha y acciones */}
      <div className="pointer-events-none relative z-10 mt-5 flex items-center justify-between gap-3 border-t border-app-border pt-4">
        <span className="flex items-center gap-2 text-xs text-app-muted">
          <CalendarDays size={16} />
          {task.dueDate ?? "Sin fecha límite"}
        </span>

        <div className="pointer-events-auto flex gap-1">
          <button
            type="button"
            onClick={() => onEdit(task)}
            aria-label={`Editar ${task.title}`}
            title="Editar tarea"
            className="rounded-lg p-2 text-app-primary transition hover:bg-app-bg"
          >
            <Pencil size={18} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            aria-label={`Eliminar ${task.title}`}
            title="Eliminar tarea"
            className="rounded-lg p-2 text-red-500 transition hover:bg-app-bg"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
