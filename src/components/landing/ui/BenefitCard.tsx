type BenefitCardProps = { number: string; title: string; text: string };

export default function BenefitCard({ number, title, text }: BenefitCardProps) {

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <span className="text-xs font-bold text-indigo-500">{number}</span>

      <h3 className="mt-4 font-bold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">{text}</p>
    </div>
  );
}
