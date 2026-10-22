import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AxiosError } from "axios";
import { UserPlus } from "lucide-react";
import { api } from "../api/axios";

export function RegisterPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError(t("register.passwordMismatch"));
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        name: form.name.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      await navigate("/login", { replace: true });
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 409) {
        setError(t("register.emailExists"));
      } else {
        setError(t("register.error"));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-app-bg p-6">
      <div className="w-full max-w-md rounded-xl border border-app-border bg-app-surface p-8 shadow-sm">
        <div className="mb-6 flex justify-center">
          <div className="rounded-xl bg-app-primary p-3 text-white">
            <UserPlus size={28} />
          </div>
        </div>

        <h1 className="text-center text-2xl font-bold text-app-text">
          {t("register.title")}
        </h1>

        <p className="mt-2 text-center text-sm text-app-muted">
          {t("register.subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-app-text"
            >
              {t("register.name")}
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="given-name"
              className="w-full rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-app-text outline-none focus:border-app-primary"
            />
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="mb-1 block text-sm font-medium text-app-text"
            >
              {t("register.lastName")}
            </label>

            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              required
              autoComplete="family-name"
              className="w-full rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-app-text outline-none focus:border-app-primary"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-app-text"
            >
              {t("register.email")}
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-app-text outline-none focus:border-app-primary"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-app-text"
            >
              {t("register.password")}
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-app-text outline-none focus:border-app-primary"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-sm font-medium text-app-text"
            >
              {t("register.confirmPassword")}
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-lg border border-app-border bg-app-bg px-4 py-2.5 text-app-text outline-none focus:border-app-primary"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-app-primary px-4 py-2.5 font-medium text-white transition hover:bg-app-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? t("register.loading") : t("register.submit")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-app-muted">
          {t("register.hasAccount")}{" "}
          <Link
            to="/login"
            className="font-medium text-app-primary hover:underline"
          >
            {t("register.login")}
          </Link>
        </p>
      </div>
    </main>
  );
}
