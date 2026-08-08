import { hero } from "@/lib/data";

export default function Hero() {
  return (
    <section id="top" className="pt-4">
      <h1 className="font-display leading-[0.9] tracking-tight">
        <span className="block text-[13vw] text-white sm:text-[7vw] lg:text-[5.5vw]">
          {hero.titleTop}
        </span>
        <span className="text-outline block text-[13vw] sm:text-[7vw] lg:text-[5.5vw]">
          {hero.titleBottom}
        </span>
      </h1>

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
