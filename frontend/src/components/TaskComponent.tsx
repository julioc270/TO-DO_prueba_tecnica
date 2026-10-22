import { useEffect, useState } from "react";
import { Plus, ListTodo } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { TaskModal, type TaskFormData } from "./TaskModal";
import type { Task } from "../types/task";
import { TaskInfoModal } from "./TaskInfoModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { useTranslation } from "react-i18next";
import { taskService } from "../services/taskService";
export function TaskComponent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const { t } = useTranslation();

  async function loadTasks() {
    try {
      const loadedTasks = await taskService.getAll();
      setError("");
      setTasks(loadedTasks);
    } catch {
      setError(t("tasks.loadError"));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void taskService
      .getAll()
      .then((loadedTasks) => {
        setError("");
        setTasks(loadedTasks);
      })
      .catch(() => {
        setError("tasks.loadError");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function openCreateModal() {
    setSelectedTask(null);
    setIsModalOpen(true);
  }

  function openEditModal(task: Task) {
    setSelectedTask(task);
    setIsModalOpen(true);
  }

  async function saveTask(data: TaskFormData) {
    if (selectedTask) {
      await taskService.update(selectedTask.id, data);
    } else {
      await taskService.create(data);
    }

    setIsModalOpen(false);
    await loadTasks();
  }

  async function deleteTask() {
    if (!taskToDelete || deleting) return;

    const taskId = taskToDelete.id;

    setDeleting(true);
    setDeleteError("");

    try {
      await taskService.remove(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId),
      );

      setTaskToDelete(null);
    } catch {
      setError("tasks.loadError");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <section className="mt-8 rounded-xl border border-app-border bg-app-surface p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-app-text">
          <ListTodo size={22} />
          {t("app.taskList")}
        </h2>

        <button
          type="button"
          onClick={openCreateModal}
          className="flex items-center gap-2 rounded-lg bg-app-primary px-4 py-2 text-white hover:bg-app-primary-hover"
        >
          <Plus size={18} />
          {t("tasks.new")}
        </button>
      </div>

      {error && (
        <p role="alert" className="mb-4 text-sm text-red-500">
          {t(error)}
        </p>
      )}

      {loading ? (
        <p className="py-10 text-center text-app-muted">{t("tasks.loading")}</p>
      ) : (
        <TaskCard
          tasks={tasks}
          onView={(task) => {
            console.log("Tarea seleccionada:", task);
            setViewingTask(task);
          }}
          onEdit={openEditModal}
          onDelete={(id) => {
            const task = tasks.find((item) => item.id === id);

            if (task) {
              setDeleteError("");
              setTaskToDelete(task);
            }
          }}
        />
      )}

      {isModalOpen && (
        <TaskModal
          key={selectedTask?.id ?? "new"}
          task={selectedTask}
          onClose={() => setIsModalOpen(false)}
          onSave={saveTask}
        />
      )}
      {viewingTask && (
        <TaskInfoModal
          task={viewingTask}
          onClose={() => setViewingTask(null)}
        />
      )}
      {taskToDelete && (
        <DeleteConfirmModal
          task={taskToDelete}
          loading={deleting}
          error={deleteError}
          onClose={() => {
            setTaskToDelete(null);
            setDeleteError("");
          }}
          onConfirm={deleteTask}
        />
      )}
    </section>
  );
}
