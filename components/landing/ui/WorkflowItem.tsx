type WorkflowItemProps = { number: string; title: string; text: string };

export default function WorkflowItem({ number, title, text }: WorkflowItemProps) {

  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-700 text-xs font-bold text-indigo-300">
        {number}
      </div>

      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-500">{text}</p>
      </div>
    </div>
  );
}
