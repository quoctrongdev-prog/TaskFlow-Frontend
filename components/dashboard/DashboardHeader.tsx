import Link from "next/link";
import { Plus } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm text-slate-500">
          Tuesday, September 17, 2026
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">
          Good evening, Alex 👋
        </h1>
      </div>

      <Link href="/tasks" className="btn-primary">
        <Plus size={17} />
        New task
      </Link>
    </div>
  );
}