import SectionHeading from "@/components/SectionHeading";
import { about } from "@/lib/data";

export default function About({ className = "" }: { className?: string }) {
  return (
    <section id="about" className={className}>
      <SectionHeading top={about.titleTop} bottom={about.titleBottom} size="page" />

      <div className="mt-8 max-w-2xl space-y-4">
        {about.paragraphs.map((p) => (
          <p key={p.slice(0, 24)} className="leading-relaxed text-muted">
            {p}
          </p>
        ))}
      </div>

      <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">
        {about.facts.map((f) => (
          <div key={f.label} className="bg-background p-5">
            <dt className="text-xs uppercase tracking-wide text-muted">
              {f.label}
            </dt>
            <dd className="mt-1 font-display text-sm uppercase text-white">
              {f.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
