"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { fadeUp, stagger, viewport, easeOut } from "@/lib/motion";

export default function SkillGroups({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="grid gap-5 sm:grid-cols-2"
      >
        {skillGroups.map((g) => (
          <motion.div
            key={g.title}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOut }}
            whileHover={{ y: -3 }}
            className="rounded-2xl border border-white/10 p-6 transition hover:border-white/20"
          >
            <h2 className="font-display text-sm uppercase tracking-wide text-accent">
              {g.title}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
