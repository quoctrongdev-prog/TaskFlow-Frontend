"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Header from "./Header";
import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar pathname={pathname} />

      {mobileOpen && (
        <MobileSidebar
          pathname={pathname}
          onClose={() => setMobileOpen(false)}
        />
      )}

      <div className="lg:pl-64">
        <Header onMenuOpen={() => setMobileOpen(true)} />

        <main className="p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
