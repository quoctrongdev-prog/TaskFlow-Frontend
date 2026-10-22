import type { ReactNode } from "react";

type SocialIconProps = { icon: ReactNode };

export default function SocialIcon({ icon }: SocialIconProps) {

  return (
    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition hover:bg-slate-900 hover:text-white">
      {icon}
    </button>
  );
}
