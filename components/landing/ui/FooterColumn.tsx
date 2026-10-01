type FooterColumnProps = { title: string; links: string[] };

export default function FooterColumn({ title, links }: FooterColumnProps) {

  return (
    <div>
      <h3 className="text-sm font-semibold text-white">{title}</h3>

      <div className="mt-5 space-y-3">
        {links.map((link) => (
          <a
            key={link}
            href="#"
            className="block text-sm text-slate-500 transition hover:text-white"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
}
