"use client";

import type { FormEvent } from "react";
import { LoaderCircle, LockKeyhole } from "lucide-react";

type ChangePasswordCardProps = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  changing: boolean;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ChangePasswordCard({
  currentPassword,
  newPassword,
  confirmPassword,
  changing,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: ChangePasswordCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-xl bg-violet-50 p-3 text-violet-600">
          <LockKeyhole className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Change Password
          </h2>
          <p className="text-sm text-slate-500">
            Thay đổi mật khẩu để bảo vệ tài khoản của bạn.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="current-password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Mật khẩu hiện tại
          </label>

          <input
            id="current-password"
            type="password"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(event) => onCurrentPasswordChange(event.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="new-password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Mật khẩu mới
          </label>

          <input
            id="new-password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={newPassword}
            onChange={(event) => onNewPasswordChange(event.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Xác nhận mật khẩu mới
          </label>

          <input
            id="confirm-password"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => onConfirmPasswordChange(event.target.value)}
            required
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-5">
          <button
            type="submit"
            disabled={changing}
            className="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {changing && <LoaderCircle className="h-4 w-4 animate-spin" />}

            {!changing && <LockKeyhole className="h-4 w-4" />}

            {changing ? "Đang cập nhật..." : "Đổi mật khẩu"}
          </button>
        </div>
      </form>
    </section>
  );
}
