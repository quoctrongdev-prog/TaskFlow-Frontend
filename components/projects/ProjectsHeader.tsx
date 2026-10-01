import { Plus } from "lucide-react";

export default function ProjectsHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Projects</h1>

        <p className="mt-1 text-sm text-slate-500">
          All projects in your workspace.
        </p>
      </div>

      <button className="btn-primary">
        <Plus size={17} />
        New project
      </button>
    </div>
  );
}
