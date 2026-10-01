import { ReactNode } from "react";

type MetricCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  change: string;
};

export default function MetricCard({
  icon,
  label,
  value,
  change,
}: MetricCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-brand-600">
          {icon}
        </div>

        <span className="text-xs font-medium text-emerald-600">
          {change}
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}