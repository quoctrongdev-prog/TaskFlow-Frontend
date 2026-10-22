type TestimonialCardProps = { text: string; name: string; role: string };

export default function TestimonialCard({ text, name, role }: TestimonialCardProps) {

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex gap-1 text-amber-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index}>★</span>
        ))}
      </div>

      <p className="mt-5 text-sm leading-7 text-slate-600">“{text}”</p>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">
          {name
            .split(" ")
            .map((word) => word[0])
            .join("")}
        </div>

        <div>
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-slate-400">{role}</p>
        </div>
      </div>
    </div>
  );
}
