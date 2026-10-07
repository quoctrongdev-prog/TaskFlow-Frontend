"use client";

import { CalendarDays, MoreHorizontal } from "lucide-react";
import PriorityBadge from "./PriorityBadge";
import { Task, TaskStatus } from "@/lib/types";

type TaskCardProps = {
  task: Task;
  onMove: (id: string, status: TaskStatus) => void;
};

export default function TaskCard({ task, onMove }: TaskCardProps) {
  const next: Record<TaskStatus, TaskStatus> = {
    TODO: "IN_PROGRESS",
    IN_PROGRESS: "REVIEW",
    REVIEW: "DONE",
    DONE: "TODO",
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <PriorityBadge priority={task.priority} />

        <button className="text-slate-400">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <p
        className={`mt-3 text-sm font-semibold leading-5 ${
          task.status === "DONE"
            ? "text-slate-400 line-through"
            : "text-slate-800"
        }`}
      >
        {task.title}
      </p>

      <p className="mt-1 text-xs text-slate-400">{task.project}</p>

      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
            {task.assignee}
          </div>

          <span className="flex items-center gap-1 text-xs text-slate-400">
            <CalendarDays size={13} />
            {task.dueDate}
          </span>
        </div>

        <button
          onClick={() => onMove(task.id, next[task.status])}
          className="text-xs font-semibold text-brand-600"
        >
          {task.status === "DONE" ? "Reopen" : "Move →"}
        </button>
      </div>
    </div>
  );
}
