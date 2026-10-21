import { CalendarDays, CircleCheck, Flag, X } from "lucide-react";
import type { Task } from "../types/task";

type Props = Readonly<{
  task: Task;
  onClose: () => void;
}>;

const priorityLabels = {
  LOW: "Baja",
  MEDIUM: "Media",
  HIGH: "Alta",
};

export function TaskInfoModal({ task, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-info-title"
        className="w-full max-w-lg rounded-2xl border border-app-border bg-app-surface p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id="task-info-title" className="text-2xl font-bold text-app-text">
            {task.title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar detalles"
            className="rounded-lg p-2 text-app-muted hover:bg-app-bg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-app-text">
              Descripción
            </h3>
            <p className="whitespace-pre-wrap break-words text-sm text-app-muted">
              {task.description || "Sin descripción"}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3">
              <Flag size={20} className="text-app-primary" />
              <div>
                <p className="text-xs text-app-muted">Prioridad</p>
                <p className="font-medium text-app-text">
                  {priorityLabels[task.priority]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CircleCheck size={20} className="text-app-primary" />
              <div>
                <p className="text-xs text-app-muted">Estado</p>
                <p className="font-medium text-app-text">
                  {task.status === "COMPLETED" ? "Completada" : "Pendiente"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays size={20} className="text-app-primary" />
              <div>
                <p className="text-xs text-app-muted">Fecha de creación</p>
                <p className="font-medium text-app-text">
                  {new Date(task.startDate).toLocaleString("es-MX")}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CalendarDays size={20} className="text-app-primary" />
              <div>
                <p className="text-xs text-app-muted">Fecha límite</p>
                <p className="font-medium text-app-text">
                  {task.dueDate ?? "Sin fecha límite"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end border-t border-app-border pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-app-primary px-5 py-2 text-white hover:bg-app-primary-hover"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
