import { CheckCircle2 } from "lucide-react";

type ProfileMessagesProps = {
  successMessage: string;
  errorMessage: string;
};

export default function ProfileMessages({
  successMessage,
  errorMessage,
}: ProfileMessagesProps) {
  return (
    <>
      {successMessage && (
        <div
          role="status"
          className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          {errorMessage}
        </div>
      )}
    </>
  );
}
