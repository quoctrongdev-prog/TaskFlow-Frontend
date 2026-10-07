"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, RefreshCw } from "lucide-react";
import { resendVerificationEmail } from "@/lib/api";

export default function ResendVerificationForm() {
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    //"Mỗi khi countdown thay đổi,
    // hãy chạy lại effect; trước khi chạy effect mới
    // hãy cleanup effect cũ.
    if (countdown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  async function handleResend() {
    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    try {
      setResending(true);
      setMessage("");

      const response = await resendVerificationEmail(email.trim());

      setMessage(response.message || "A new verification email has been sent.");

      // Bắt đầu đếm 60 giây sau khi gửi email thành công
      setCountdown(60);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Unable to resend verification email.",
      );
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="mt-7 border-t border-slate-100 pt-6">
      <div className="flex items-center gap-2">
        <Mail size={18} className="text-slate-400" />

        <p className="text-sm font-semibold text-slate-700">
          Didn't receive the verify link?
        </p>
      </div>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="mt-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />

      <button
        type="button"
        onClick={handleResend}
        disabled={resending || countdown > 0}
        className="btn-secondary mt-3 flex w-full items-center justify-center gap-2 py-3 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {resending ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            Sending...
          </>
        ) : countdown > 0 ? (
          <>
            <RefreshCw size={17} />
            Resend available in {countdown}s
          </>
        ) : (
          <>
            <RefreshCw size={17} />
            Resend verification email
          </>
        )}
      </button>

      {message && (
        <p className="mt-3 text-center text-sm text-slate-500">{message}</p>
      )}
    </div>
  );
}
