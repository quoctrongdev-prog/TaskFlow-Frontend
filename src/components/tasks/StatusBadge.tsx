import { TaskStatus } from "@/lib/types";

type StatusBadgeProps = {
  status: TaskStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const label = status === "IN_PROGRESS" ? "In progress" : status.toLowerCase();

  return (
    <span className="w-fit rounded-md bg-indigo-50 px-2 py-1 text-[10px] font-bold capitalize text-indigo-600">
      {label}
    </span>
  );
}
