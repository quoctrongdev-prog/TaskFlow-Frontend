type MiniStatProps = { value: string; label: string };

export default function MiniStat({ value, label }: MiniStatProps) {

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3">
      <p className="text-lg font-bold text-slate-800">{value}</p>
      <p className="mt-1 text-[10px] text-slate-400">{label}</p>
    </div>
  );
}
