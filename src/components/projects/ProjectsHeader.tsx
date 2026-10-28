import { Plus } from "lucide-react";

type ProjectsHeaderProps = {
  onCreate: () => void;
  projectCount: number;
};

export default function ProjectsHeader({
  onCreate,
  projectCount,
}: ProjectsHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold md:text-3xl">Projects</h1>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
            {projectCount}
          </span>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          All projects in your workspace.
        </p>
      </div>

      <button type="button" onClick={onCreate} className="btn-primary">
        <Plus size={17} />
        New project
      </button>
    </div>
  );
}
