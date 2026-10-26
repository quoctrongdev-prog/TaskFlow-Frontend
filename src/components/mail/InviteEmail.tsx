"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AxiosError } from "axios";
import {
  CheckCircle2,
  Clock3,
  LoaderCircle,
  MailCheck,
  ShieldAlert,
  Users,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { acceptProjectInvitation } from "@/lib/api";

type ApiError = {
  message?: string;
};

function InviteEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const { user, loading: authLoading } = useAuth();

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");



  async function handleAccept() {
    if (!token || submitting) return;

    setSubmitting(true);
    setError("");

    try {
      await acceptProjectInvitation(token);
      setSuccess(true);
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;

      setError(
        axiosError.response?.data?.message ||
          "Unable to accept this invitation. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  const returnUrl = `/invite-email?token=${encodeURIComponent(token ?? "")}`;
  const loginUrl = `/login?redirect=${encodeURIComponent(returnUrl)}`;
  const registerUrl = `/register?redirect=${encodeURIComponent(returnUrl)}`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <section className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            {success ? <CheckCircle2 size={34} /> : <MailCheck size={34} />}
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {success ? "You're in!" : "You've been invited"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {success
              ? "You have successfully joined the project. You can now continue to your projects."
              : "Someone has invited you to collaborate on a project in TaskFlow. Accept the invitation to become a project member."}
          </p>
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 p-4">
          <Users size={20} className="mt-0.5 shrink-0 text-indigo-600" />
          <div>
            <p className="text-sm font-semibold text-slate-800">
              Collaborate with your team
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Manage tasks, track progress, and work together in TaskFlow.
            </p>
          </div>
        </div>

        {!token && (
          <div
            role="alert"
            className="mt-5 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <ShieldAlert size={18} className="shrink-0" />
            This invitation link is missing its token. Please use the link from
            your invitation email.
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mt-5 flex gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            <ShieldAlert size={18} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="mt-6 space-y-3">
          {success ? (
            <button
              type="button"
              onClick={() => router.push("/projects")}
              className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Go to my projects
            </button>
          ) : authLoading ? (
            <div className="flex justify-center py-3 text-slate-500">
              <LoaderCircle size={22} className="animate-spin" />
            </div>
          ) : !token ? null : !user ? (
            <>
              <p className="text-center text-sm text-slate-600">
                Please sign in with the email address that received this
                invitation.
              </p>

              <Link
                href={loginUrl}
                className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Sign in to accept
              </Link>

              <Link
                href={registerUrl}
                className="flex w-full items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Create an account
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleAccept}
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Accepting invitation...
                  </>
                ) : (
                  "Accept invitation"
                )}
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                You must be signed in with the email address to which the
                invitation was sent.
              </p>
            </>
          )}
        </div>

        {!success && (
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Clock3 size={14} />
            Invitation links expire after 15 minutes.
          </div>
        )}
      </section>
    </main>
  );
}

export default function InviteEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
          <LoaderCircle size={28} className="animate-spin text-indigo-600" />
        </main>
      }
    >
      <InviteEmailContent />
    </Suspense>
  );
}
