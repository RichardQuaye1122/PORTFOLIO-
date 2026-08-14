import SectionHeading from "@/components/SectionHeading";
import { hero } from "@/lib/data";

export default function Hero() {
  return (
    <section id="top" className="pt-4">
      <SectionHeading top={hero.titleTop} bottom={hero.titleBottom} size="page" />

      <p className="mt-6 max-w-md text-base text-muted sm:text-lg">
        {hero.description}
      </p>

      <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 sm:max-w-xl">
        {hero.stats.map((s) => (
          <div key={s.label}>
            <div className="font-display text-3xl text-white sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 whitespace-pre-line text-xs uppercase tracking-wide text-muted sm:text-sm">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
