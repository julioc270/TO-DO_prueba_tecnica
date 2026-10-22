import { useEffect, useRef } from "react";
import { CalendarDays, CircleCheck, Flag, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { Task } from "../types/task";

type Props = Readonly<{
  task: Task;
  onClose: () => void;
}>;

export function TaskInfoModal({ task, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const { t, i18n } = useTranslation();
  const locale = i18n.language === "en" ? "en-US" : "es-MX";

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="task-info-title"
      className="w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-app-border bg-app-surface p-6 text-app-text shadow-2xl backdrop:bg-black/60"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        margin: 0,
      }}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <h2 id="task-info-title" className="text-2xl font-bold">
          {task.title}
        </h2>

        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label={t("modal.close")}
          className="rounded-lg p-2 text-app-muted hover:bg-app-bg"
        >
          <X size={20} />
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <h3 className="mb-2 text-sm font-semibold">
            {t("tasks.description")}
          </h3>
          <p className="whitespace-pre-wrap break-words text-sm text-app-muted">
            {task.description || t("tasks.noDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <Flag size={20} className="text-app-primary" />
            <div>
              <p className="text-xs text-app-muted">{t("tasks.priority")}</p>
              <p className="font-medium">
                {t(`tasks.priorityValues.${task.priority}`)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CircleCheck size={20} className="text-app-primary" />
            <div>
              <p className="text-xs text-app-muted">{t("tasks.status")}</p>
              <p className="font-medium">
                {t(`tasks.statusValues.${task.status}`)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays size={20} className="text-app-primary" />
            <div>
              <p className="text-xs text-app-muted">{t("tasks.createdAt")}</p>
              <p className="font-medium">
                {new Date(task.startDate).toLocaleString(locale)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays size={20} className="text-app-primary" />
            <div>
              <p className="text-xs text-app-muted">{t("tasks.dueDate")}</p>
              <p className="font-medium">
                {task.dueDate
                  ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(
                      locale,
                    )
                  : t("tasks.noDueDate")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end border-t border-app-border pt-4">
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="rounded-lg bg-app-primary px-5 py-2 text-white hover:bg-app-primary-hover"
        >
          {t("modal.close")}
        </button>
      </div>
    </dialog>
  );
}
