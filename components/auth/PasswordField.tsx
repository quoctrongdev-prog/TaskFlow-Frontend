"use client";

import { Eye, EyeOff } from "lucide-react";

type PasswordFieldProps = {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
};

export default function PasswordField({
  showPassword,
  setShowPassword,
}: PasswordFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">
        Password
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-11 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-slate-400"
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );
}