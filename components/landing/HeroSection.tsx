import Link from "next/link";
import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react";
import HeroDashboardPreview from "./HeroDashboardPreview";

export default function HeroSection() {
  return (
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-28">
          {/* Hero content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm">
              <Sparkles size={15} />
              Simple project management for modern teams
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Organize your work.
              <span className="block text-brand-600">Get things done.</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              TaskFlow gives your team one simple place to manage projects,
              tasks, deadlines, collaboration and progress without unnecessary
              complexity.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard" className="btn-primary px-6 py-3.5">
                Start for free
                <ArrowRight size={18} />
              </Link>

              <a href="#demo" className="btn-secondary px-6 py-3.5">
                <Play size={17} />
                See how it works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-500" />
                Unlimited tasks
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-500" />
                Team collaboration
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-500" />
                Responsive
              </span>
            </div>
          </div>

          <HeroDashboardPreview />
        </div>
      </section>
  );
}
