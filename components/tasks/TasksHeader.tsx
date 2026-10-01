import { Plus } from "lucide-react";

export default function TasksHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Tasks</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage and track work across your projects.
        </p>
      </div>

      <button className="btn-primary">
        <Plus size={17} />
        New task
      </button>
    </div>
  );
}
