import ProjectsHeader from "./ProjectsHeader";
import ProjectGrid from "./ProjectGrid";
import AppShell from "../layout/AppShell";

export default function ProjectsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl">
        <ProjectsHeader />
        <ProjectGrid />
      </div>
    </AppShell>
  );
}
