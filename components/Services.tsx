import SectionHeading from "@/components/SectionHeading";
import { services } from "@/lib/data";

export default function Services({ className = "" }: { className?: string }) {
  return (
    <section id="services" className={className}>
      <SectionHeading top="WHAT I" bottom="DO" />

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="group bg-background p-7 transition hover:bg-white/[0.03]"
          >
            <span className="font-display text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-lg uppercase text-white sm:text-xl">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {s.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
