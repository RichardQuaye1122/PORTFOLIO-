"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { about } from "@/lib/data";
import { fadeUp, stagger, viewport, easeOut } from "@/lib/motion";

export default function About({ className = "" }: { className?: string }) {
  return (
    <section id="about" className={className}>
      <SectionHeading top={about.titleTop} bottom={about.titleBottom} size="page" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="mt-8 max-w-2xl space-y-4"
      >
        {about.paragraphs.map((p) => (
          <motion.p
            key={p.slice(0, 24)}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOut }}
            className="leading-relaxed text-muted"
          >
            {p}
          </motion.p>
        ))}
      </motion.div>

      <motion.dl
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4"
      >
        {about.facts.map((f) => (
          <motion.div
            key={f.label}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOut }}
            className="bg-background p-5"
          >
            <dt className="text-xs uppercase tracking-wide text-muted">
              {f.label}
            </dt>
            <dd className="mt-1 font-display text-sm uppercase text-white">
              {f.value}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
