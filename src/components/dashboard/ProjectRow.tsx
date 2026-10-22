import { projects } from "@/lib/mock-data";

export default function ProjectRow({
  name,
  description,
  progress,
  completed,
  tasks: total,
  color,
}: (typeof projects)[number]) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <div className={`h-9 w-9 rounded-lg ${color}`} />

        <div className="min-w-0 flex-1">
          <p className="font-semibold">{name}</p>

          <p className="truncate text-xs text-slate-500">{description}</p>
        </div>

        <span className="text-sm font-semibold">{progress}%</span>
      </div>

      <div className="mt-3 h-2 rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-brand-600"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-2 text-xs text-slate-400">
        {completed} of {total} tasks completed
      </p>
    </div>
  );
}
