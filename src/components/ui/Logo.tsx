import { CheckSquare } from "lucide-react";
import Link from "next/link";

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/">
      <div
        className={`flex items-center gap-2 font-bold ${dark ? "text-white" : "text-slate-900"}`}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
          <CheckSquare size={20} />
        </div>
        <span className="text-lg">TaskFlow</span>
      </div>
    </Link>
  );
}
