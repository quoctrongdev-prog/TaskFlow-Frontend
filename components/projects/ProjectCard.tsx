import Link from "next/link";
import { FolderKanban, MoreHorizontal, Users } from "lucide-react";

type ProjectCardProps = {
  project: {
    id: string;
    name: string;
    description: string;
    color: string;
    completed: number;
    tasks: number;
    progress: number;
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="card relative p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
      <Link href="/tasks" className="block">
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${project.color} text-white`}
          >
            <FolderKanban size={21} />
          </div>
        </div>

        <h2 className="mt-5 font-bold">{project.name}</h2>

        <p className="mt-1 h-10 text-sm leading-5 text-slate-500">
          {project.description}
        </p>

        <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
          <span>
            {project.completed}/{project.tasks} tasks
          </span>

          <span className="font-bold text-slate-700">{project.progress}%</span>
        </div>

        <div className="mt-2 h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-brand-600"
            style={{ width: `${project.progress}%` }}
          />
        </div>

        <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs text-slate-400">
          <Users size={15} />8 members
        </div>
      </Link>

      <button
        type="button"
        className="absolute right-5 top-5 text-slate-400"
        aria-label="More options"
      >
        <MoreHorizontal />
      </button>
    </div>
  );
}
