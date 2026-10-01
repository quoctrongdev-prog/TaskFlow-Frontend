type AuthFieldProps = {
  label: string;
  type?: string;
  placeholder: string;
};

export default function AuthField({
  label,
  type = "text",
  placeholder,
}: AuthFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}