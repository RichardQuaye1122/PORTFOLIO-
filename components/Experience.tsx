import { ArrowUpRight } from "lucide-react";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="mt-24">
      <h2 className="font-display leading-[0.9] tracking-tight">
        <span className="block text-[10vw] text-white sm:text-[4.5vw]">
          8 YEARS OF
        </span>
        <span className="text-outline block text-[10vw] sm:text-[4.5vw]">
          EXPERIENCE
        </span>
      </h2>

      <div className="mt-12 flex flex-col divide-y divide-white/10 border-t border-white/10">
        {experience.map((e) => (
          <div key={e.company} className="flex flex-col gap-3 py-8">
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-display text-xl text-white sm:text-2xl">
                {e.company}
              </h3>
              <ArrowUpRight size={20} className="shrink-0 text-muted" />
            </div>
            <p className="max-w-xl text-sm text-muted sm:text-base">
              {e.description}
            </p>
            <p className="text-xs uppercase tracking-wide text-white/40">
              {e.period}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
