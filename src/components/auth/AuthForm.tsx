"use client";

import Link from "next/link";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import AuthField from "./AuthField";
import PasswordField from "./PasswordField";
import { register } from "@/lib/api";
import ResendVerificationForm from "../mail/ResendVerificationForm";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

type AuthFormProps = {
  mode: "login" | "register";
};

type ApiError = {
  message?: string;
};

export default function AuthForm({ mode }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { login: loginUser } = useAuth();

  // Lấy URL cần quay lại sau khi đăng nhập/đăng ký.
  // Chỉ chấp nhận đường dẫn nội bộ để tránh open redirect.
  const searchParams = useSearchParams();

  const rawRedirect = searchParams.get("redirect");

  const redirectUrl =
    rawRedirect &&
    rawRedirect.startsWith("/") &&
    !rawRedirect.startsWith("//") &&
    !rawRedirect.includes("\\")
      ? rawRedirect
      : null;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setNeedsVerification(false);
    setLoading(true);
    try {
      if (mode === "register") {
        const data = await register({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
          redirectUrl
        });

        toast.success(data.message || "Registration successful!");

        // Giữ redirect khi chuyển từ đăng ký sang đăng nhập.
        const loginUrl = redirectUrl
          ? `/login?redirect=${encodeURIComponent(redirectUrl)}`
          : "/login";

        router.push(loginUrl);
      } else {
        await loginUser({
          email: email.trim().toLowerCase(),
          password,
        });

        toast.success("Login successful!");

        // Có link mời thì quay lại link mời.
        // Đăng nhập bình thường thì vào dashboard.
        router.push(redirectUrl ?? "/dashboard");
      }
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;
      const message =
        axiosError.response?.data?.message || "Something went wrong.";

      setError(message);

      if (message === "Please verify your email first") {
        setNeedsVerification(true);
      }

      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold">
        {mode === "register" ? "Create your account" : "Welcome back"}
      </h1>

      <p className="mt-2 text-slate-500">
        {mode === "register"
          ? "Start organizing your work today."
          : "Sign in to continue to your workspace."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        {mode === "register" && (
          <AuthField
            label="Full name"
            placeholder="Alex Morgan"
            value={name}
            onChange={setName}
          />
        )}

        <AuthField
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          autoComplete="email"
          onChange={setEmail}
        />

        <PasswordField
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          value={password}
          onChange={setPassword}
        />

        {mode === "login" && (
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-brand-600 transition hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        {needsVerification && mode === "login" && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            Please verify your email before signing in.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Please wait..."
            : mode === "register"
              ? "Create account"
              : "Sign in"}
        </button>

        {mode === "register" && <ResendVerificationForm />}
      </form>

      <p className="mt-7 text-center text-sm text-slate-500">
        {mode === "register"
          ? "Already have an account?"
          : "Don't have an account?"}{" "}
        <Link
          href={
            mode === "register"
              ? `/login${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`
              : `/register${redirectUrl ? `?redirect=${encodeURIComponent(redirectUrl)}` : ""}`
          }
          className="font-semibold text-brand-600"
        >
          {mode === "register" ? "Sign in" : "Create one"}
        </Link>
      </p>
    </>
  );
}
