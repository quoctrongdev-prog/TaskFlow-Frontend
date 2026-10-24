"use client";

import Link from "next/link";
import { useState } from "react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
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
  
  //Dưới này đặt tên lại thì là dùng :
  //từ login sang loginUser
  const { login: loginUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      if (mode === "register") {
        const data = await register({
          name,
          email,
          password,
        });

        console.log("Register response:", data);

        toast.success(data.message)
        // alert(data.message);
        setName("");
        setEmail("");
        setPassword("");
        router.push("/login");
      } else {
        const data = await loginUser({
          email,
          password,
        });

        // console.log("Login response:", data);

        // alert(data.message);
        // Tạm thời chưa redirect.
        // Bước tiếp theo sẽ xử lý accessToken + auth state.
        router.push("/dashboard");
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;

      const message = axiosError.response?.data?.message;

      setError(message || "Something went wrong.");

      if (message === "Please verify your email first") {
        setNeedsVerification(true);
      }
      toast.error(message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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

        {/* {error && <p className="text-sm font-medium text-red-500">{error}</p>} */}

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
          href={mode === "register" ? "/login" : "/register"}
          className="font-semibold text-brand-600"
        >
          {mode === "register" ? "Sign in" : "Create one"}
        </Link>
      </p>
    </>
  );
}
