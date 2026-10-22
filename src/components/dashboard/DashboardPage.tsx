import DashboardHeader from "./DashboardHeader";
import DashboardMetrics from "./DashboardMetrics";
import ProjectsOverview from "./ProjectsOverview";
import UpcomingTasks from "./UpcomingTasks";
import RecentActivity from "./RecentActivity";

export default function DashboardPage() {
  return (
      <div className="mx-auto max-w-7xl">
        <DashboardHeader />

        <DashboardMetrics />

        <div className="mt-7 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <ProjectsOverview />
          <UpcomingTasks />
        </div>

        <RecentActivity />
      </div>
  );
}
