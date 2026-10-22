
import { Plus } from "lucide-react";

type CreateProjectCardProps = {
  onClick: () => void;
};

export default function CreateProjectCard({
  onClick,
}: CreateProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white text-slate-400 transition hover:border-indigo-300 hover:text-brand-600"
    >
      <Plus size={25} />
      <span className="mt-2 text-sm font-semibold">
        Create a new project
      </span>
    </button>
  );
}
