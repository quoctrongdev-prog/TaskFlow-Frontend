type AuthFieldProps = {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  autoComplete?: string;
  onChange: (value: string) => void;
};

export default function AuthField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: AuthFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        autoComplete="email"
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
      />
    </div>
  );
}
