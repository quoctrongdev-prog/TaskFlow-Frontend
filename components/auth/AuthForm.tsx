"use client";

import Link from "next/link";
import { useState } from "react";
import AuthField from "./AuthField";
import PasswordField from "./PasswordField";

type AuthFormProps = {
  mode: "login" | "register";
};

export default function AuthForm({
  mode,
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    window.location.href = "/dashboard";
  };

  return (
    <>
      {/* Title */}
      <h1 className="text-3xl font-bold">
        {mode === "register" ? "Create your account" : "Welcome back"}
      </h1>

      {/* Description */}
      <p className="mt-2 text-slate-500">
        {mode === "register"
          ? "Start organizing your work today."
          : "Sign in to continue to your workspace."}
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        {/* Full name - Register only */}
        {mode === "register" && (
          <AuthField
            label="Full name"
            placeholder="Alex Morgan"
          />
        )}

        {/* Email */}
        <AuthField
          label="Email"
          type="email"
          placeholder="you@example.com"
        />

        {/* Password */}
        <PasswordField
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        {/* Submit */}
        <button className="btn-primary w-full py-3">
          {mode === "register" ? "Create account" : "Sign in"}
        </button>
      </form>

      {/* Switch Login/Register */}
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