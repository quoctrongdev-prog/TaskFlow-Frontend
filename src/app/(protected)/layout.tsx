import ProtectRoute from "@/components/auth/ProtectRoute";
import AppShell from "@/components/layout/AppShell";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectRoute>
    <AppShell>{children}</AppShell>
  </ProtectRoute>;
}
