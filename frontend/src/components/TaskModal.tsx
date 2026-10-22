import { useEffect, useRef, useState, type SubmitEvent } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [form, setForm] = useState<TaskFormData>({
    title: task?.title ?? "",
    description: task?.description ?? "",
    dueDate: task?.dueDate ?? "",
    priority: task?.priority ?? "MEDIUM",
    status: task?.status ?? "PENDING",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      await onSave(form);
    } catch {
      setError("error.saveError");
    } finally {
      setSaving(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="task-modal-title"
      className="w-[calc(100%-2rem)] max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-app-surface p-6 text-app-text shadow-xl backdrop:bg-black/50"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        margin: 0,
      }}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 id="task-modal-title" className="text-xl font-bold">
          {task ? t("tasks.edit") : t("tasks.new")}
        </h2>

        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          aria-label={t("modal.close")}
          className="text-app-muted hover:text-app-text"
        >
          <X size={22} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="task-title" className="mb-1 block text-sm">
            {t("tasks.title")}
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
          <label htmlFor="task-description" className="mb-1 block text-sm">
            {t("tasks.description")}
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
          <label htmlFor="task-date" className="mb-1 block text-sm">
            {t("tasks.dueDate")}
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
            <label htmlFor="task-priority" className="mb-1 block text-sm">
              {t("tasks.priority")}
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
              <option value="LOW">{t("tasks.priorityValues.LOW")}</option>
              <option value="MEDIUM">{t("tasks.priorityValues.MEDIUM")}</option>
              <option value="HIGH">{t("tasks.priorityValues.HIGH")}</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-status" className="mb-1 block text-sm">
              {t("tasks.status")}
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
              <option value="PENDING">{t("tasks.statusValues.PENDING")}</option>
              <option value="COMPLETED">
                {t("tasks.statusValues.COMPLETED")}
              </option>
            </select>
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-500">
            {t(error)}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="rounded-lg border border-app-border px-4 py-2"
          >
            {t("modal.cancel")}
          </button>

          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-app-primary px-4 py-2 font-medium text-white hover:bg-app-primary-hover disabled:opacity-50"
          >
            {saving ? t("modal.saving") : t("modal.save")}
          </button>
        </div>
      </form>
    </dialog>
  );
}
