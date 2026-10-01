import { ShieldCheck, Target, Users, Zap } from "lucide-react";
import TrustItem from "./ui/TrustItem";

export default function TrustSection() {
  return (
    <section className="border-y border-slate-100 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
          Everything your team needs to stay organized
        </p>

        <div className="mt-7 grid grid-cols-2 gap-5 text-center sm:grid-cols-4">
          <TrustItem icon={<Target size={20} />} text="Clear goals" />
          <TrustItem icon={<Zap size={20} />} text="Fast workflow" />
          <TrustItem icon={<Users size={20} />} text="Team focused" />
          <TrustItem icon={<ShieldCheck size={20} />} text="Secure access" />
        </div>
      </div>
    </section>
  );
}
