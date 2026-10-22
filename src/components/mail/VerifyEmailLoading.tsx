import { Loader2 } from "lucide-react";

export default function VerifyEmailLoading() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
        <Loader2 size={28} className="animate-spin text-indigo-600" />
      </div>

      <h1 className="mt-5 text-2xl font-bold text-slate-900">
        Verifying your email
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        Please wait while we verify your email address.
      </p>
    </div>
  );
}
