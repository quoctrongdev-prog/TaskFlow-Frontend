import { CheckCircle2 } from "lucide-react";
import BenefitCard from "./ui/BenefitCard";

export default function BenefitsSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-4">
            <BenefitCard
              number="01"
              title="Less chaos"
              text="Keep all project work in one organized place."
            />

            <BenefitCard
              number="02"
              title="More clarity"
              text="Everyone knows what they own and what comes next."
            />

            <BenefitCard
              number="03"
              title="Better focus"
              text="Prioritize the work that matters most."
            />

            <BenefitCard
              number="04"
              title="Real progress"
              text="See completed work and project progress instantly."
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="font-semibold text-brand-600">
            Designed for productivity
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            A workspace that stays simple as your team grows.
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            TaskFlow is designed around a simple idea: your project management
            tool should help your team work, not become another project to
            manage.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Organize projects and tasks in one workspace",
              "Give every task a clear owner",
              "Track progress without complicated reports",
              "Work comfortably on desktop, tablet and mobile",
            ].map((item) => (
              <div key={item} className="flex gap-3">
                <CheckCircle2
                  size={20}
                  className="mt-0.5 shrink-0 text-emerald-500"
                />

                <span className="text-sm leading-6 text-slate-600">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
