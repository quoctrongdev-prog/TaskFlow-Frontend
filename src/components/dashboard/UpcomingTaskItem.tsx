import { CheckCircle2 } from "lucide-react";

import PriorityBadge from "./PriorityBadge";

type UpcomingTaskItemProps = {
  title: string;
  project: string;
  dueDate: string;
  priority: string;
  status: string;
};

export default function UpcomingTaskItem({
  title,
  project,
  dueDate,
  priority,
  status,
}: UpcomingTaskItemProps) {
  const completed = status === "DONE";

  return (
    <div className="rounded-xl border border-slate-100 p-3">
      <div className="flex items-start gap-3">
        <CheckCircle2
          size={18}
          className={
            completed
              ? "text-emerald-500"
              : "text-slate-300"
          }
        />

        <div className="min-w-0 flex-1">
          <p
            className={`truncate text-sm font-medium ${
              completed
                ? "text-slate-400 line-through"
                : ""
            }`}
          >
            {title}
          </p>

          <p className="mt-1 text-xs text-slate-400">
            {project} · {dueDate}
          </p>
        </div>

        <PriorityBadge priority={priority} />
      </div>
    </div>
  );
}