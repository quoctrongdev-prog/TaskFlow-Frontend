"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AuthBrand from "./AuthBrand";
import AuthForm from "./AuthForm";

export default function AuthPage({
  mode,
}: {
  mode: "login" | "register";
}) {
  const register = mode === "register";

  return (
    <main className="flex min-h-screen bg-white">
      {/* Left side */}
      <AuthBrand />

      {/* Right side */}
      <div className="flex w-full items-center justify-center px-5 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <AuthForm mode={mode}/>
        </div>
      </div>
    </main>
  );
}