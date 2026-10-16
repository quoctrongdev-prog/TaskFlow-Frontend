import { Plus } from "lucide-react";

type ProjectsHeaderProps = {
  onCreate: () => void;
};

export default function ProjectsHeader({ onCreate }: ProjectsHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Projects</h1>
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
