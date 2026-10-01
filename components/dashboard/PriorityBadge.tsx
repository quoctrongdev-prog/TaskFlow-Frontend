type PriorityBadgeProps = {
  priority: string;
};

export default function PriorityBadge({
  priority,
}: PriorityBadgeProps) {
  const className =
    priority === "HIGH"
      ? "bg-rose-50 text-rose-600"
      : priority === "MEDIUM"
        ? "bg-amber-50 text-amber-600"
        : "bg-slate-100 text-slate-500";

  return (
    <span
      className={`rounded-md px-2 py-1 text-[10px] font-bold ${className}`}
    >
      {priority}
    </span>
  );
}