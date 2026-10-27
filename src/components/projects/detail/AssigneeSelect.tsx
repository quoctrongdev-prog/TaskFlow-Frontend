"use client";

import { Check, ChevronDown, LoaderCircle, UserRound } from "lucide-react";
import { useState } from "react";
import type { ProjectMember } from "@/lib/types";

type AssigneeSelectProps = {
  members: ProjectMember[];
  value: string;
  onChange: (userId: string) => void;
  disabled?: boolean;
  loading?: boolean;
};

function MemberAvatar({
  avatarUrl,
  name,
}: {
  avatarUrl: string | null;
  name: string;
}) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700">
      {avatarUrl ? (
        <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        name.trim().charAt(0).toUpperCase() || <UserRound size={18} />
      )}
    </span>
  );
}

export default function AssigneeSelect({
  members,
  value,
  onChange,
  disabled = false,
  loading = false,
}: AssigneeSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedMember = members.find((member) => member.user_id === value);

  return (
    <div className="relative">
      <label className="mb-2 block text-sm font-medium text-slate-700">
        Assignee
      </label>

      <button
        type="button"
        disabled={disabled || loading}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100  disabled:bg-slate-50"
      >
        <span className="flex min-w-0 items-center gap-3">
          {loading ? (
            <>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <LoaderCircle size={18} className="animate-spin" />
              </span>

              <span className="text-sm text-slate-500">Loading members...</span>
            </>
          ) : selectedMember ? (
            <>
              <MemberAvatar
                avatarUrl={selectedMember.avatar_url}
                name={selectedMember.name}
              />

              <span className="truncate text-sm font-medium text-slate-800">
                {selectedMember.name}
              </span>

              {selectedMember.role === "Admin" && (
                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700">
                  Admin
                </span>
              )}
            </>
          ) : (
            <>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <UserRound size={18} />
              </span>

              <span className="text-sm text-slate-500">Unassigned</span>
            </>
          )}
        </span>

        <ChevronDown
          size={16}
          className={`shrink-0 text-slate-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Choose assignee"
          className="absolute z-50 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
        >
          {loading ? (
            <li className="flex items-center justify-center gap-2 px-3 py-4 text-sm text-slate-500">
              <LoaderCircle size={16} className="animate-spin" />
              Loading members...
            </li>
          ) : (
            <>
              <li>
                <button
                  type="button"
                  role="option"
                  aria-selected={!value}
                  onClick={() => {
                    onChange("");
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-slate-50"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <UserRound size={18} />
                  </span>

                  <span className="flex-1 text-sm text-slate-600">
                    Unassigned
                  </span>

                  {!value && <Check size={16} className="text-indigo-600" />}
                </button>
              </li>

              {members.map((member) => (
                <li key={member.user_id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={value === member.user_id}
                    onClick={() => {
                      onChange(member.user_id);
                      setOpen(false);
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-slate-50"
                  >
                    <MemberAvatar
                      avatarUrl={member.avatar_url}
                      name={member.name}
                    />

                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-slate-800">
                      {member.name}
                    </span>

                    {member.role === "Admin" && (
                      <span className="rounded-full bg-violet-100 px-2 py-0.5 text-xs font-semibold text-violet-700">
                        Admin
                      </span>
                    )}

                    {value === member.user_id && (
                      <Check size={16} className="shrink-0 text-indigo-600" />
                    )}
                  </button>
                </li>
              ))}

              {members.length === 0 && (
                <li className="px-3 py-4 text-center text-sm text-slate-500">
                  No project members found.
                </li>
              )}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
