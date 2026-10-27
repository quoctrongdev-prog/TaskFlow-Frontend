"use client";

import { CalendarDays, Pencil, Trash2, UserRound } from "lucide-react";
import type { Task, TaskStatus } from "@/lib/types";

type TaskCardProps = {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: TaskStatus) => void;
};

const statuses: TaskStatus[] = [
  "Todo",
  "In_Progress",
  "Review",
  "Done",
  "Cancelled",
];

const statusColors: Record<TaskStatus, string> = {
  Todo: "bg-slate-100 text-slate-700 border-slate-200",
  In_Progress: "bg-blue-100 text-blue-700 border-blue-200",
  Review: "bg-amber-100 text-amber-700 border-amber-200",
  Done: "bg-green-100 text-green-700 border-green-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
};

const priorityStyles: Record<Task["priority"], string> = {
  Low: "bg-slate-100 text-slate-600",
  Medium: "bg-blue-100 text-blue-700",
  High: "bg-orange-100 text-orange-700",
  Urgent: "bg-red-100 text-red-700",
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 transition hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="break-words font-semibold text-slate-900">
            {task.title}
          </h3>

          <p className="mt-1 whitespace-pre-wrap break-words text-sm text-slate-500">
            {task.description || "No description provided."}
          </p>
        </div>

        <div className="flex shrink-0 gap-1">
          <button
            type="button"
            onClick={onEdit}
            aria-label="Edit task"
            title="Edit task"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-indigo-600"
          >
            <Pencil size={16} />
          </button>

          <button
            type="button"
            onClick={onDelete}
            aria-label="Delete task"
            title="Delete task"
            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}
        >
          {task.priority}
        </span>

        <select
          aria-label={`Status of ${task.title}`}
          value={task.status}
          onChange={(event) => onStatusChange(event.target.value as TaskStatus)}
          className={`max-w-full rounded-full border border-slate-200 px-2.5 py-1 text-xs outline-none transition-colors ${
            statusColors[task.status]
          }`}
        >
          {statuses.map((status) => (
            <option
              key={status}
              value={status}
              className="bg-white text-slate-700"
            >
              {status.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
        <div className="inline-flex min-w-0 items-center gap-2">
          {task.assignee_avatar_url ? (
            <img
              src={task.assignee_avatar_url}
              alt=""
              className="h-6 w-6 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <UserRound size={14} />
            </span>
          )}

          <span className="truncate">
            {task.assignee_name ||
              (task.assignee_id ? "Assigned" : "Unassigned")}
          </span>
        </div>

        {task.due_date && (
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} />
            Due  {" "}
            {(() => {
              const [year, month, day] = task.due_date.slice(0, 10).split("-");

              return `${day}/${month}/${year}`;
            })()}

          </span>
        )}
      </div>

      {task.creator_name && (
        <p className="mt-3 text-xs text-slate-400">
          Created by {task.creator_name}
        </p>
      )}
    </article>
  );
}
