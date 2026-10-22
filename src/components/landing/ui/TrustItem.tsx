import type { ReactNode } from "react";

type TrustItemProps = { icon: ReactNode; text: string };

export default function TrustItem({ icon, text }: TrustItemProps) {

  return (
    <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500">
      <span className="text-brand-600">{icon}</span>
      {text}
    </div>
  );
}
