import Link from "next/link";
import { Settings, Users } from "lucide-react";
import { links } from "./navigation";

type SidebarLinksProps = {
  pathname: string;
  onNavigate?: () => void;
};

export default function SidebarLinks({
  pathname,
  onNavigate,
}: SidebarLinksProps) {
  return (
    <div className="flex h-[calc(100%-4rem)] flex-col p-4">
      <div className="mb-7">
        <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Workspace
        </p>

        {links.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href ||
            (href !== "/dashboard" && pathname.startsWith(href));

          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium ${
                active
                  ? "bg-indigo-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </div>

      <div>
        <p className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
          Team
        </p>

        <button className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
          <Users size={18} />
          Members
        </button>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50">
          <Settings size={18} />
          Settings
        </button>
      </div>
    </div>
  );
}
