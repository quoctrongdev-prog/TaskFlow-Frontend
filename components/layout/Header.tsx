import { Bell, Menu } from "lucide-react";

type HeaderProps = {
  onMenuOpen: () => void;
};

export default function Header({ onMenuOpen }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur md:px-8">
      <button
        onClick={onMenuOpen}
        className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
        aria-label="Open menu"
      >
        <Menu />
      </button>

      <div className="hidden text-sm font-medium text-slate-500 sm:block">
        Acme Team / Workspace
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={19} />
        </button>

        <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-700">
            AM
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold">Alex Morgan</p>
            <p className="text-xs text-slate-500">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
