import Link from "next/link";

import ProjectRow from "./ProjectRow";
import { projects } from "@/lib/mock-data";

export default function ProjectsOverview() {
  return (
    <section className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold">Projects</h2>

          <p className="mt-1 text-sm text-slate-500">Track your active work</p>
        </div>

        <Link href="/projects" className="text-sm font-semibold text-brand-600">
          View all
        </Link>
      </div>

      <div className="mt-5 space-y-4">
        {projects.map((project) => (
          <ProjectRow key={project.id} {...project} />
        ))}
      </div>
    </section>
  );
}
