import { BarChart3, Check, Clock3, FolderKanban, ShieldCheck, Users } from "lucide-react";
import FeatureCard from "./ui/FeatureCard";

export default function FeaturesSection() {
  return (
      <section id="features" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-brand-600">
            Everything in one place
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage work
          </h2>

          <p className="mt-5 leading-7 text-slate-600">
            TaskFlow keeps projects, tasks and your team connected in one
            focused workspace.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Check size={23} />}
            title="Task management"
            text="Create, assign, prioritize and track every task from one clean interface."
          />

          <FeatureCard
            icon={<FolderKanban size={23} />}
            title="Project management"
            text="Organize your work into projects and keep progress visible to everyone."
          />

          <FeatureCard
            icon={<BarChart3 size={23} />}
            title="Project visibility"
            text="See project progress, completed tasks and upcoming deadlines at a glance."
          />

          <FeatureCard
            icon={<Users size={23} />}
            title="Team collaboration"
            text="Invite teammates and make ownership clear across your workspace."
          />

          <FeatureCard
            icon={<Clock3 size={23} />}
            title="Deadlines"
            text="Keep important due dates visible so your team knows what needs attention."
          />

          <FeatureCard
            icon={<ShieldCheck size={23} />}
            title="Permission control"
            text="Give workspace members appropriate roles and control access to projects."
          />
        </div>
      </section>
  );
}
