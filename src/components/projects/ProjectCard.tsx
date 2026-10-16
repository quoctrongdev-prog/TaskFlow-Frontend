
import Link from "next/link";
import { FolderKanban, MoreHorizontal } from "lucide-react";
import { Project } from "@/lib/types";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card relative p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link
        href={`/projects/${project.project_id}`}
        className="block"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-white">
          <FolderKanban size={21} />
        </div>

        <h2 className="mt-5 font-bold text-slate-900">
          {project.name}
        </h2>

        <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
          {project.description || "No description provided."}
        </p>

        {project.created_by_name && (
          <span className="mt-4 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            {project.created_by_name}
          </span>
        )}
      </Link>

      <button
        type="button"
        className="absolute right-5 top-5 text-slate-400 hover:text-slate-700"
        aria-label="More options"
        onClick={() => {
          // Sẽ nối menu Edit/Delete ở bước tiếp theo.
        }}
      >
        <MoreHorizontal />
      </button>
    </div>
  );
}
