import { Header } from "../components/Header";
import { TaskComponent } from "../components/TaskComponent";
export function TasksPage() {
  return (
    <div className="min-h-screen bg-app-bg">
      <Header />

      <main className="mx-auto max-w-6xl px-2 py-4">
        <TaskComponent />
      </main>
    </div>
  );
}
