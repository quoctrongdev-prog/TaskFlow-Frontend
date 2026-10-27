"use client";

import { useCallback, useEffect, useState } from "react";
import { Users, X, LoaderCircle } from "lucide-react";
import { getProjectMembers } from "@/lib/api";
import type { ProjectMember } from "@/lib/types";
import { useAuth } from "@/context/AuthContext";

type Props = {
  projectId: string;
};

export default function ProjectMembersSidebar({ projectId }: Props) {
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const { loading: authLoading, user } = useAuth();

  const loadMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProjectMembers(projectId);
      setMembers(data);
    } catch (err) {
      console.error("Load project members error:", err);
      setError("Unable to load project members.");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      setError("Please log in to view project members.");
      return;
    }

    void loadMembers();
  }, [authLoading, user, loadMembers]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          void loadMembers();
        }}
        aria-label={`View ${members.length} project members`}
        aria-expanded={open}
        className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <Users size={16} />
        Members
        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-700">
          {members.length}
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] bg-black/40"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setOpen(false);
            }
          }}
        >
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-members-title"
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <header className="flex items-center justify-between border-b border-slate-200 p-5">
              <div>
                <h2
                  id="project-members-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Project members
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {members.length} {members.length === 1 ? "member" : "members"}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close members sidebar"
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-500">
                  <LoaderCircle size={18} className="animate-spin" />
                  Loading members...
                </div>
              ) : error ? (
                <div className="py-6 text-center">
                  <p role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                  <button
                    type="button"
                    onClick={() => void loadMembers()}
                    className="mt-3 text-sm font-semibold text-indigo-600 hover:underline"
                  >
                    Try again
                  </button>
                </div>
              ) : members.length === 0 ? (
                <p className="py-10 text-center text-sm text-slate-500">
                  No members found.
                </p>
              ) : (
                <ul className="space-y-2">
                  {members.map((member) => (
                    <li
                      key={member.user_id}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
                    >
                      {member.avatar_url ? (
                        <img
                          src={member.avatar_url}
                          alt={`${member.name}'s avatar`}
                          className="h-11 w-11 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700"
                        >
                          {member.name.trim().charAt(0).toUpperCase() || "?"}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {member.name}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {member.email}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          member.role === "Admin"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {member.role}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
