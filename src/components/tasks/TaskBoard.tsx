"use client";

import { Task, TaskStatus } from "@/lib/types";
import TaskCard from "./TaskCard";

const columns: { key: TaskStatus; label: string }[] = [
  { key: "TODO", label: "To do" },
  { key: "IN_PROGRESS", label: "In progress" },
  { key: "REVIEW", label: "Review" },
  { key: "DONE", label: "Done" },
];

type TaskBoardProps = {
  tasks: Task[];
  onMove: (id: string, status: TaskStatus) => void;
};

export default function TaskBoard({ tasks, onMove }: TaskBoardProps) {
  return (
    <div className="mt-6 grid gap-4 xl:grid-cols-4">
      {columns.map((column) => {
        const columnTasks = tasks.filter((task) => task.status === column.key);

        return (
          <div key={column.key} className="rounded-2xl bg-slate-100/80 p-3">
            <div className="flex items-center justify-between px-2 py-2">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    column.key === "DONE"
                      ? "bg-emerald-500"
                      : column.key === "IN_PROGRESS"
                        ? "bg-blue-500"
                        : column.key === "REVIEW"
                          ? "bg-amber-500"
                          : "bg-slate-400"
                  }`}
                />

                <h2 className="text-sm font-bold">{column.label}</h2>
              </div>

              <span className="text-xs text-slate-400">
                {columnTasks.length}
              </span>
            </div>

            <div className="space-y-3">
              {columnTasks.map((task) => (
                <TaskCard key={task.id} task={task} onMove={onMove} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
