import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

type FeatureCardProps = { icon: ReactNode; title: string; text: string };

export default function FeatureCard({ icon, title, text }: FeatureCardProps) {

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-6 font-bold text-slate-900">{title}</h3>

      <p className="mt-2 text-sm leading-7 text-slate-500">{text}</p>

      <div className="mt-5 flex items-center gap-1 text-xs font-semibold text-brand-600">
        Learn more
        <ChevronRight size={14} />
      </div>
    </div>
  );
}
