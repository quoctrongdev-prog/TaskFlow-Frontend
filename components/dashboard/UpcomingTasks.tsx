import Link from "next/link";

import { tasks } from "@/lib/mock-data";
import UpcomingTaskItem from "./UpcomingTaskItem";

export default function UpcomingTasks() {
  return (
    <section className="card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold">
            Upcoming tasks
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            What needs attention
          </p>
        </div>

        <Link
          href="/tasks"
          className="text-sm font-semibold text-brand-600"
        >
          View all
        </Link>
      </div>

      <div className="mt-5 space-y-2">
        {tasks.slice(0, 5).map((task) => (
          <UpcomingTaskItem
            key={task.id}
            title={task.title}
            project={task.project}
            dueDate={task.dueDate}
            priority={task.priority}
            status={task.status}
          />
        ))}
      </div>
    </section>
  );
}