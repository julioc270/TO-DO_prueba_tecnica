import { AlertTriangle, X } from "lucide-react";
import type { Task } from "../types/task";

type Props = Readonly<{
  task: Task;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  loading: boolean;
  error?: string;
}>;

export function DeleteConfirmModal({
  task,
  onClose,
  onConfirm,
  loading,
  error,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        className="w-full max-w-md rounded-2xl border border-app-border bg-app-surface p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="text-red-500" size={24} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Cerrar modal"
            className="rounded-lg p-2 text-app-muted hover:bg-app-bg disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <h2 id="delete-modal-title" className="text-xl font-bold text-app-text">
          ¿Eliminar tarea?
        </h2>

        <p
          id="delete-modal-description"
          className="mt-3 text-sm leading-relaxed text-app-muted"
        >
          ¿Estás seguro de que deseas eliminar la tarea{" "}
          <strong className="break-words text-app-text">{task.title}</strong>?
          Esta acción no se puede deshacer.
        </p>
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-500">
            {error}
          </p>
        )}
        <div className="mt-7 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-app-border px-4 py-2 text-sm font-medium text-app-text hover:bg-app-bg disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={() => void onConfirm()}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Eliminando..." : "Eliminar tarea"}
          </button>
        </div>
      </div>
    </div>
  );
}
