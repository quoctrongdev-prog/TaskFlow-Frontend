import { CheckSquare } from "lucide-react";
import Link from "next/link";

export default function AuthBrand() {
  return (
    <div className="hidden w-1/2 bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
      {/* Logo */}
      <Link href="/">
        <div className="flex items-center gap-2 text-xl font-bold">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600">
            <CheckSquare size={20} />
          </div>
          TaskFlow
        </div>
      </Link>

      {/* Content */}
      <div className="max-w-lg">
        <p className="text-sm font-semibold text-indigo-300">
          PROJECT MANAGEMENT
        </p>

        <h1 className="mt-4 text-5xl font-bold leading-tight">
          Turn busy work into clear progress.
        </h1>

        <p className="mt-6 leading-7 text-slate-400">
          Manage projects, tasks and your team from a single workspace.
        </p>
      </div>

      {/* Footer */}
      <p className="text-sm text-slate-500">© 2026 TaskFlow</p>
    </div>
  );
}
