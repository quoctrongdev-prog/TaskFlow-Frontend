import { CheckCircle2 } from "lucide-react";
import WorkflowItem from "./ui/WorkflowItem";

export default function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="overflow-hidden bg-slate-950 py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-semibold text-indigo-300">A simple workflow</p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              From idea to done.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-400">
              Break big goals into manageable projects and tasks. Assign
              ownership, set deadlines and keep your team moving forward.
            </p>

            <div className="mt-9 space-y-5">
              <WorkflowItem
                number="01"
                title="Create a workspace"
                text="Bring your team into one shared workspace."
              />

              <WorkflowItem
                number="02"
                title="Create tasks"
                text="Organize related work into clear projects."
              />

              <WorkflowItem
                number="03"
                title="Add and assign tasks"
                text="Give every task an owner and a deadline."
              />

              <WorkflowItem
                number="04"
                title="Track progress"
                text="Move tasks through your workflow until everything is done."
              />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 rounded-full bg-indigo-600/20 blur-3xl" />

            <div className="relative rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <p className="text-xs text-slate-500">Current project</p>
                  <p className="mt-1 font-bold">Website Redesign</p>
                </div>

                <span className="rounded-lg bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-300">
                  72% complete
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["Create homepage", "Done"],
                  ["Build navbar", "In progress"],
                  ["Pricing section", "Review"],
                  ["Mobile optimization", "To do"],
                ].map(([name, status], index) => (
                  <div
                    key={name}
                    className="rounded-xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          index === 0
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        <CheckCircle2 size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{name}</p>

                        <p className="mt-1 text-xs text-slate-500">
                          Assigned to Alex
                        </p>
                      </div>

                      <span className="text-xs text-slate-500">{status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
