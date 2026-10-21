import { useState, type FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await login({ email, password });
      navigate("/tasks", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message ?? "No se pudo iniciar sesión.");
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return null;

  if (isAuthenticated) {
    return <Navigate to="/tasks" replace />;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-app-bg p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-xl border border-app-border bg-app-surface p-8"
      >
        <h1 className="text-2xl font-bold text-app-text">Iniciar sesión</h1>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-app-text">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-lg border border-app-border bg-app-bg p-3 text-app-text"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm text-app-text"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-lg border border-app-border bg-app-bg p-3 text-app-text"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-app-primary p-3 font-semibold text-white hover:bg-app-primary-hover disabled:opacity-50"
        >
          {submitting ? "Ingresando..." : "Iniciar sesión"}
        </button>

        <p className="text-center text-sm text-app-muted">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-app-primary hover:underline">
            Regístrate
          </Link>
        </p>
      </form>
    </main>
  );
}
