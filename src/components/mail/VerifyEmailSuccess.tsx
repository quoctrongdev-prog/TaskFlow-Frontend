import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

type VerifyEmailSuccessProps = {
  message: string;
  redirectUrl: string | null;
};

export default function VerifyEmailSuccess({
  message,
  redirectUrl,
}: VerifyEmailSuccessProps) {
  const loginUrl = redirectUrl
    ? `/login?redirect=${encodeURIComponent(redirectUrl)}`
    : "/login";
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
        <CheckCircle2 size={34} className="text-emerald-500" />
      </div>

      <h1 className="mt-5 text-2xl font-bold text-slate-900">
        Email verified!
      </h1>

      <p className="mt-2 text-sm leading-6 text-slate-500">{message}</p>

      <Link
        href={loginUrl}
        className="btn-primary mt-7 inline-flex w-full justify-center py-3"
      >
        Go to Login
      </Link>
    </div>
  );
}
