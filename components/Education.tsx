"use client";

import { motion } from "framer-motion";
import { GraduationCap, BadgeCheck } from "lucide-react";
import { education, certifications } from "@/lib/data";
import { fadeUp, stagger, viewport, easeOut } from "@/lib/motion";

export default function Education({ className = "" }: { className?: string }) {
  return (
    <motion.section
      id="education"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
      className={className}
    >
      <div className="grid gap-10 sm:grid-cols-2">
        <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: easeOut }}>
          <h2 className="flex items-center gap-2 font-display text-sm uppercase tracking-wide text-accent">
            <GraduationCap size={18} aria-hidden />
            Education
          </h2>
          <ul className="mt-5 flex flex-col divide-y divide-white/10 border-t border-white/10">
            {education.map((e) => (
              <li key={e.school} className="py-5">
                <p className="font-display text-base text-white">
                  {e.credential}
                </p>
                <p className="mt-1 text-sm text-muted">{e.school}</p>
                <p className="mt-2 text-xs uppercase tracking-wide text-white/40">
                  {e.period}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: easeOut }}>
          <h2 className="flex items-center gap-2 font-display text-sm uppercase tracking-wide text-accent-lime">
            <BadgeCheck size={18} aria-hidden />
            Certifications
          </h2>
          <ul className="mt-5 flex flex-col divide-y divide-white/10 border-t border-white/10">
            {certifications.map((c) => (
              <li
                key={c.name}
                className="flex items-start justify-between gap-4 py-5"
              >
                <p className="text-sm text-white/80">{c.name}</p>
                <span className="shrink-0 text-xs uppercase tracking-wide text-white/40">
                  {c.year}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
}
