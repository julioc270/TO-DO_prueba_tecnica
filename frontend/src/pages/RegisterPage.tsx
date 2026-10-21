import { Link } from "react-router-dom";

export function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-app-bg p-6">
      <div className="w-full max-w-md rounded-xl border border-app-border bg-app-surface p-8">
        <h1 className="text-2xl font-bold text-app-text">Crear cuenta</h1>

        <Link
          to="/login"
          className="mt-6 inline-block text-app-primary hover:underline"
        >
          Ya tengo una cuenta
        </Link>
      </div>
    </main>
  );
}
