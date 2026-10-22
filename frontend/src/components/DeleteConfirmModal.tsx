import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onCancel={(event) => {
        if (loading) event.preventDefault();
      }}
      aria-labelledby="delete-modal-title"
      aria-describedby="delete-modal-description"
      className="w-[calc(100%-2rem)] max-w-md rounded-2xl border border-app-border bg-app-surface p-6 text-app-text shadow-2xl backdrop:bg-black/60"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        margin: 0,
      }}
    >
      <div className="mb-5 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
          <AlertTriangle className="text-red-500" size={24} />
        </div>

        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          disabled={loading}
          aria-label={t("modal.close")}
          className="rounded-lg p-2 text-app-muted hover:bg-app-bg disabled:opacity-50"
        >
          <X size={20} />
        </button>
      </div>

      <h2 id="delete-modal-title" className="text-xl font-bold text-app-text">
        {t("modal.deleteTitle")}
      </h2>

      <p
        id="delete-modal-description"
        className="mt-3 break-words text-sm leading-relaxed text-app-muted"
      >
        {t("modal.deleteDescription", { title: task.title })}
      </p>

      {error && (
        <p role="alert" className="mt-4 text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="mt-7 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => dialogRef.current?.close()}
          disabled={loading}
          className="rounded-lg border border-app-border px-4 py-2 text-sm font-medium text-app-text hover:bg-app-bg disabled:opacity-50"
        >
          {t("modal.cancel")}
        </button>

        <button
          type="button"
          onClick={() => void onConfirm()}
          disabled={loading}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? t("modal.deleting") : t("modal.delete")}
        </button>
      </div>
    </dialog>
  );
}
