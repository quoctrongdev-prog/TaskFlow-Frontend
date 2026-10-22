import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="pricing" className="mx-auto max-w-5xl px-5 py-24 lg:px-8">
      <div className="rounded-3xl bg-indigo-600 p-8 text-white shadow-xl sm:p-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="font-semibold text-indigo-200">Start today</p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Everything you need to get organized.
            </h2>

            <p className="mt-5 leading-7 text-indigo-100">
              Start using the TaskFlow dashboard and build your workflow around
              projects, tasks and your team.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 text-slate-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">TaskFlow</p>

                <p className="mt-1 text-2xl font-bold">Free to get started</p>
              </div>

              <Sparkles className="text-indigo-600" />
            </div>

            <div className="mt-6 space-y-3">
              {[
                "Unlimited tasks",
                "Project management",
                "Team collaboration",
                "Responsive dashboard",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <CheckCircle2 size={17} className="text-emerald-500" />
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/dashboard"
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Open dashboard
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
