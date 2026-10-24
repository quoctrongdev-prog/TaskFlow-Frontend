"use client";

import { useState, type FormEvent } from "react";
import { AxiosError } from "axios";
import { LoaderCircle, Mail, UserPlus, X } from "lucide-react";
import toast from "react-hot-toast";
import { sendProjectInvitation } from "@/lib/api";

type Props = {
  projectId: string;
};

type ApiError = {
  message?: string;
};

export default function InviteMemberButton({ projectId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function closeModal() {
    if (loading) return;

    setIsOpen(false);
    setEmail("");
    setError("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      setError("Please enter an email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await sendProjectInvitation(projectId, normalizedEmail);

      toast.success(data.message || "Invitation sent successfully!");
      setEmail("");
      setIsOpen(false);
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>;

      const message =
        axiosError.response?.data?.message ||
        "Unable to send invitation. Please try again.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Open modal button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <UserPlus size={17} />
        Invite member
      </button>

      {/* Invitation modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onKeyDown={(e) => {
            if (e.key === "Escape") closeModal();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-modal-title"
            className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Modal header */}
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <UserPlus size={22} />
                </div>

                <div>
                  <h2
                    id="invite-modal-title"
                    className="text-lg font-bold text-slate-900"
                  >
                    Invite a member
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Add someone to collaborate on this project.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={loading}
                aria-label="Close invitation dialog"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label
                  htmlFor="invite-email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    id="invite-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="member@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    disabled={loading}
                    required
                    autoFocus
                    className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:bg-slate-50"
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  An invitation email will be sent to this address.
                </p>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {/* Modal footer */}
              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loading}
                  className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading || !email.trim()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <LoaderCircle size={17} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail size={17} />
                      Send invitation
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
