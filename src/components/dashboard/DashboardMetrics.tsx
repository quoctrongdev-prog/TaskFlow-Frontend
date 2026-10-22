import { CheckCircle2, Clock3, FolderKanban, ListTodo } from "lucide-react";

import MetricCard from "./MetricCard";
import { tasks } from "@/lib/mock-data";

export default function DashboardMetrics() {
  const done = tasks.filter((task) => task.status === "DONE").length;

  const inProgress = tasks.filter(
    (task) => task.status === "IN_PROGRESS",
  ).length;

  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        icon={<FolderKanban />}
        label="Total projects"
        value="12"
        change="+2 this month"
      />

      <MetricCard
        icon={<ListTodo />}
        label="Total tasks"
        value="117"
        change="+14 this week"
      />

      <MetricCard
        icon={<Clock3 />}
        label="In progress"
        value={String(inProgress + 24)}
        change="8 due this week"
      />

      <MetricCard
        icon={<CheckCircle2 />}
        label="Completed"
        value={String(done + 94)}
        change="+12 this week"
      />
    </div>
  );
}
