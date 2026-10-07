import Link from "next/link";
import { XCircle } from "lucide-react";
import ResendVerificationForm from "./ResendVerificationForm";

type VerifyEmailErrorProps = {
  message: string;
};

export default function VerifyEmailError({
  message,
}: VerifyEmailErrorProps) {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-rose-50">
          <XCircle
            size={34}
            className="text-rose-500"
          />
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Verification failed
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          {message}
        </p>
      </div>

      <ResendVerificationForm />

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="text-sm font-semibold text-brand-600 hover:underline"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}