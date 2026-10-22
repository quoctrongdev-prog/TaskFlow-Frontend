
import { Settings2 } from "lucide-react";

export default function ProfileHeader() {
  return (
    <header>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
        <Settings2 className="h-4 w-4" />
        Account settings
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        User Profile
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Quản lý thông tin cá nhân và bảo mật tài khoản TaskFlow.
      </p>
    </header>
  );
}
