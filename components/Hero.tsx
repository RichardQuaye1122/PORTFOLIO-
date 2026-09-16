"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { hero } from "@/lib/data";
import { fadeUp, stagger, viewport, easeOut } from "@/lib/motion";

export default function Hero() {
  return (
    <section id="top" className="pt-4">
      <SectionHeading top={hero.titleTop} bottom={hero.titleBottom} size="page" />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
        className="mt-6 max-w-md text-base text-muted sm:text-lg"
      >
        {hero.description}
      </motion.p>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 sm:max-w-xl"
      >
        {hero.stats.map((s) => (
          <motion.div key={s.label} variants={fadeUp} transition={{ duration: 0.5, ease: easeOut }}>
            <div className="font-display text-3xl text-white sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 whitespace-pre-line text-xs uppercase tracking-wide text-muted sm:text-sm">
              {s.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
