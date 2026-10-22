import Link from "next/link";
import { LogOut } from "lucide-react";
import SidebarLinks from "./SidebarLinks";
import Logo from "../ui/Logo";

type SidebarProps = {
  pathname: string;
};

export default function Sidebar({ pathname }: SidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-16 items-center border-b border-slate-100 px-6">
        <Logo />
      </div>

      <SidebarLinks pathname={pathname} />

      <div className="absolute bottom-5 left-4 right-4">
        <Link
          href="/login"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 hover:bg-slate-50"
        >
          <LogOut size={18} />
          Sign out
        </Link>
      </div>
    </aside>
  );
}
