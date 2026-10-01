import { CheckCircle2 } from "lucide-react";
import MiniStat from "./ui/MiniStat";

export default function HeroDashboardPreview() {
  return (
          <div id="demo" className="relative">
            <div className="absolute -inset-12 rounded-full bg-indigo-300/30 blur-3xl" />

            <div className="relative rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl sm:p-5">
              <div className="overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
                {/* Fake topbar */}
                <div className="flex h-12 items-center justify-between border-b border-slate-200 bg-white px-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-400" />
                    <div className="h-2 w-2 rounded-full bg-yellow-400" />
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                  </div>

                  <div className="h-6 w-32 rounded-md bg-slate-100" />
                </div>

                <div className="grid min-h-[430px] grid-cols-[90px_1fr] sm:grid-cols-[120px_1fr]">
                  {/* Fake sidebar */}
                  <div className="border-r border-slate-200 bg-white p-3">
                    <div className="h-7 rounded-lg bg-indigo-100" />

                    <div className="mt-6 space-y-3">
                      <div className="h-3 rounded bg-indigo-100" />
                      <div className="h-3 rounded bg-slate-100" />
                      <div className="h-3 rounded bg-slate-100" />
                      <div className="h-3 rounded bg-slate-100" />
                    </div>
                  </div>

                  {/* Fake dashboard */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-3 w-20 rounded bg-slate-200" />
                        <div className="mt-2 h-5 w-32 rounded bg-slate-800" />
                      </div>

                      <div className="h-8 w-20 rounded-lg bg-indigo-600" />
                    </div>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <MiniStat value="12" label="Projects" />
                      <MiniStat value="28" label="Progress" />
                      <MiniStat value="94" label="Done" />
                    </div>

                    <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="h-3 w-28 rounded bg-slate-800" />
                          <div className="mt-2 h-2 w-36 rounded bg-slate-100" />
                        </div>

                        <span className="text-xs font-bold text-indigo-600">
                          72%
                        </span>
                      </div>

                      <div className="mt-4 h-2 rounded-full bg-slate-100">
                        <div className="h-2 w-[72%] rounded-full bg-indigo-600" />
                      </div>
                    </div>

                    <div className="mt-3 space-y-2">
                      {[
                        "Create homepage wireframe",
                        "Implement responsive navbar",
                        "Review pricing section",
                      ].map((task, index) => (
                        <div
                          key={task}
                          className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3"
                        >
                          <CheckCircle2
                            size={17}
                            className={
                              index === 0
                                ? "text-emerald-500"
                                : "text-slate-300"
                            }
                          />

                          <span className="truncate text-xs font-medium">
                            {task}
                          </span>

                          <span className="ml-auto text-[10px] text-slate-400">
                            {index + 1}d
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}
