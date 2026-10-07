import ProjectCard from "./ProjectCard";
import CreateProjectCard from "./CreateProjectCard";
import { projects } from "@/lib/mock-data";

export default function ProjectGrid() {
  return (
    <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}

      <CreateProjectCard />
    </div>
  );
}
