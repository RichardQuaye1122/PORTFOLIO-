"use client";

import { motion } from "framer-motion";
import SectionHeading, {
  type SectionVariant,
} from "@/components/SectionHeading";
import { experience } from "@/lib/data";
import { fadeUp, stagger, viewport, easeOut } from "@/lib/motion";

export default function Experience({
  className = "",
  variant = "section",
}: {
  className?: string;
  variant?: SectionVariant;
}) {
  // The section heading is an <h1> on the standalone page and an <h2> on the
  // home page, so item headings step down one from whichever it is.
  const ItemHeading = variant === "page" ? "h2" : "h3";

  return (
    <section id="experience" className={className}>
      <SectionHeading top="2 YEARS OF" bottom="EXPERIENCE" size={variant} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="mt-12 flex flex-col divide-y divide-white/10 border-t border-white/10"
      >
        {experience.map((e) => (
          <motion.div
            key={e.company}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOut }}
            className="flex flex-col gap-3 py-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
              <div>
                <ItemHeading className="font-display text-xl text-white sm:text-2xl">
                  {e.company}
                </ItemHeading>
                <p className="text-sm text-accent">{e.title}</p>
              </div>
              <p className="text-xs uppercase tracking-wide text-white/40">
                {e.period}
              </p>
            </div>

            <p className="max-w-xl text-sm text-muted sm:text-base">
              {e.description}
            </p>

            <ul className="mt-1 max-w-xl space-y-1.5">
              {e.highlights.map((h) => (
                <li
                  key={h}
                  className="relative pl-4 text-sm text-white/70 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-accent"
                >
                  {h}
                </li>
              ))}
            </ul>

            <ul className="mt-2 flex flex-wrap gap-2">
              {e.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/60"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
