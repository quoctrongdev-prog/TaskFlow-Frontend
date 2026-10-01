import AppShell from "@/components/layout/AppShell";
import ProjectsHeader from "./ProjectsHeader";
import ProjectGrid from "./ProjectGrid";

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