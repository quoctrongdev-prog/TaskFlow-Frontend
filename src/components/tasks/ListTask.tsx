import { CheckCircle2 } from "lucide-react";
import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";
import { Task } from "@/lib/types";

type ListTaskProps = {
  task: Task;
};

export default function ListTask({ task }: ListTaskProps) {
  return (
    <div className="grid gap-2 border-b border-slate-100 px-5 py-4 md:grid-cols-[2fr_1fr_120px_100px_100px] md:items-center md:gap-4">
      <div className="flex items-center gap-3">
        <CheckCircle2
          size={18}
          className={
            task.status === "DONE" ? "text-emerald-500" : "text-slate-300"
          }
        />

        <div>
          <p className="text-sm font-semibold">{task.title}</p>

          <p className="text-xs text-slate-400 md:hidden">
            {task.project} · {task.dueDate}
          </p>
        </div>
      </div>

      <span className="hidden text-sm text-slate-500 md:block">
        {task.project}
      </span>

      <StatusBadge status={task.status} />

      <PriorityBadge priority={task.priority} />

      <span className="hidden text-sm text-slate-500 md:block">
        {task.dueDate}
      </span>
    </div>
  );
}
