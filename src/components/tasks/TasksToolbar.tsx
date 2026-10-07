"use client";

import { Priority } from "@/lib/types";
import { Filter, Search, SlidersHorizontal } from "lucide-react";

type TasksToolbarProps = {
  search: string;
  priority: "ALL" | Priority;
  view: "board" | "list";
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: "ALL" | Priority) => void;
  onViewChange: () => void;
};

export default function TasksToolbar({
  search,
  priority,
  view,
  onSearchChange,
  onPriorityChange,
  onViewChange,
}: TasksToolbarProps) {
  return (
    <div className="card mt-6 p-3">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-3 text-slate-400" />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search tasks, projects or people..."
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Filter
              size={16}
              className="pointer-events-none absolute left-3 top-3 text-slate-400"
            />

            <select
              value={priority}
              onChange={(e) =>
                onPriorityChange(e.target.value as "ALL" | Priority)
              }
              className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-9 text-sm"
            >
              <option value="ALL">All priorities</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <button onClick={onViewChange} className="btn-secondary">
            <SlidersHorizontal size={17} />

            <span className="hidden sm:inline">
              {view === "board" ? "List view" : "Board view"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
