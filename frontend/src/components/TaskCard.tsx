import { useTranslation } from "react-i18next";
import type { Task } from "../types/task";
import { Card } from "./Card";
type Props = Readonly<{
  tasks: Task[];
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}>;

export function TaskCard({ tasks, onView, onEdit, onDelete }: Props) {
  const { t } = useTranslation();
  if (tasks.length === 0) {
    return (
      <p className="py-10 text-center text-app-muted">{t("tasks.empty")}</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <Card
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
}
