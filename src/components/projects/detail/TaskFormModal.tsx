
"use client";

import { useState, type FormEvent } from "react";
import type {
  Task,
  TaskPriority,
  TaskStatus,
  CreateTaskData,
} from "@/lib/types";

type TaskFormModalProps = {
  task?: Task;
  loading: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTaskData) => Promise<void>;
};

const priorities: TaskPriority[] = ["Low", "Medium", "High", "Urgent"];

const statuses: TaskStatus[] = [
  "Todo",
  "In_Progress",
  "Review",
  "Done",
  "Cancelled",
];

export default function TaskFormModal({
  task,
  loading,
  onClose,
  onSubmit,
}: TaskFormModalProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [priority, setPriority] = useState<TaskPriority>(
    task?.priority ?? "Medium",
  );
  const [status, setStatus] = useState<TaskStatus>(
    task?.status ?? "Todo",
  );
  const [assigneeId, setAssigneeId] = useState(task?.assignee_id ?? "");
  const [dueDate, setDueDate] = useState(
    task?.due_date ? task.due_date.slice(0, 10) : "",
  );
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        status,
        assignee_id: assigneeId.trim() || null,
        due_date: dueDate || null,
      });
    } catch (err) {
      const message =
        typeof err === "object" && err !== null && "response" in err
          ? (
              err as {
                response?: { data?: { message?: string } };
              }
            ).response?.data?.message
          : undefined;

      setError(message || "Unable to save task.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        className="my-auto max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"
      >
        <h2 id="task-form-title" className="text-xl font-bold text-slate-900">
          {task ? "Edit task" : "Create a task"}
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="task-title" className="mb-1 block text-sm font-medium">
              Title
            </label>
            <input
              id="task-title"
              required
              maxLength={200}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label htmlFor="task-description" className="mb-1 block text-sm font-medium">
              Description
            </label>
            <textarea
              id="task-description"
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900"
              placeholder="Describe this task"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="task-priority" className="mb-1 block text-sm font-medium">
                Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(event) => setPriority(event.target.value as TaskPriority)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                {priorities.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="task-status" className="mb-1 block text-sm font-medium">
                Status
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(event) => setStatus(event.target.value as TaskStatus)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
              >
                {statuses.map((item) => (
                  <option key={item} value={item}>{item.replaceAll("_", " ")}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="task-assignee" className="mb-1 block text-sm font-medium">
              Assignee user ID (optional)
            </label>
            <input
              id="task-assignee"
              value={assigneeId}
              onChange={(event) => setAssigneeId(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="Paste a project member's user ID"
            />
            <p className="mt-1 text-xs text-slate-500">
              Người được giao phải là thành viên của project.
            </p>
          </div>

          <div>
            <label htmlFor="task-due-date" className="mb-1 block text-sm font-medium">
              Due date
            </label>
            <input
              id="task-due-date"
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              disabled={loading}
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Saving..." : task ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
