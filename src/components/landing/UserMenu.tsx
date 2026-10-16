"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  LayoutDashboard,
  FolderKanban,
  LogOut,
  UserRound,
} from "lucide-react";

type UserMenuProps = {
  name: string;
  avatarUrl?: string | null;
  onLogout: () => void;
};

export default function UserMenu({ name, avatarUrl, onLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* User button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-slate-100"
      >
        {/* Avatar */}
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-9 w-9 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
            {name.charAt(0).toUpperCase()}
          </div>
        )}

        {/* Name */}
        <span className="max-w-32 truncate text-sm font-semibold text-slate-700">
          {name}
        </span>

        <ChevronDown
          size={16}
          className={`text-slate-500 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-100"
          >
            <LayoutDashboard size={17} />
            Dashboard
          </Link>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-100"
          >
            <UserRound size={17} />
            Profile
          </Link>

          <Link
            href="/projects"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-100"
          >
            <FolderKanban size={17} />
            Projects
          </Link>

          <div className="my-1 border-t border-slate-100" />

          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-500 hover:bg-red-50"
          >
            <LogOut size={17} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
