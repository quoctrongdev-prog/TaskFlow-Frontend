import { ArrowUpRight } from "lucide-react";

const activities = [
  "Alex completed Create homepage wireframe",
  "Jordan moved API tests to In Progress",
  "Sofia submitted pricing section for review",
];

export default function RecentActivity() {
  return (
    <section className="card mt-6 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold">
            Recent activity
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Latest workspace updates
          </p>
        </div>

        <ArrowUpRight
          size={18}
          className="text-slate-400"
        />
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {activities.map((activity, index) => (
          <div
            key={activity}
            className="rounded-xl bg-slate-50 p-4"
          >
            <p className="text-sm text-slate-700">
              {activity}
            </p>

            <p className="mt-2 text-xs text-slate-400">
              {index + 1} hour{index ? "s" : ""} ago
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}