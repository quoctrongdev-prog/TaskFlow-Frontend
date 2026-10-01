import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CheckSquareIcon from "./ui/CheckSquareIcon";

export default function FinalCTA() {
  return (
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-brand-600">
            <CheckSquareIcon />
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to get your work organized?
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            Create your workspace, add your projects and start moving tasks
            forward.
          </p>

          <Link href="/dashboard" className="btn-primary mt-8 px-6 py-3.5">
            Get started with TaskFlow
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
  );
}
