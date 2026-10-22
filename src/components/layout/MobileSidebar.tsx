import { X } from "lucide-react";
import SidebarLinks from "./SidebarLinks";
import Logo from "../ui/Logo";

type MobileSidebarProps = {
  pathname: string;
  onClose: () => void;
};

export default function MobileSidebar({
  pathname,
  onClose,
}: MobileSidebarProps) {
  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        className="absolute inset-0 bg-slate-950/40"
        onClick={onClose}
        aria-label="Close menu"
      />

      <aside className="relative h-full w-72 bg-white shadow-xl">
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Logo />

          <button onClick={onClose} aria-label="Close menu">
            <X />
          </button>
        </div>

        <SidebarLinks pathname={pathname} onNavigate={onClose} />
      </aside>
    </div>
  );
}
