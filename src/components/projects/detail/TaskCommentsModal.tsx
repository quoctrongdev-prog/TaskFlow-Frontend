
"use client";

import { X } from "lucide-react";
import CommentsSection from "./CommentsSection";
import type { Task } from "@/lib/types";

type TaskCommentsModalProps = {
  task: Task;
  onClose: () => void;
};

export default function TaskCommentsModal({
  task,
  onClose,
}: TaskCommentsModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-comments-title"
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-slate-50 shadow-xl"
      >
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 bg-white p-4 sm:p-5">
          <div className="min-w-0">
            <h2
              id="task-comments-title"
              className="text-lg font-bold text-slate-900 sm:text-xl"
            >
              Task discussion
            </h2>
            <p className="mt-1 break-words text-sm text-slate-500">
              {task.title}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close comments"
            className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          >
            <X size={20} />
          </button>
        </header>

        <div className="overflow-y-auto p-3 sm:p-5">
          <CommentsSection taskId={task.task_id} />
        </div>
      </section>
    </div>
  );
}
