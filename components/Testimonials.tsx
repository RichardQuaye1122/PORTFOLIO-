"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { testimonials } from "@/lib/data";
import { fadeUp, stagger, viewport, easeOut } from "@/lib/motion";

export default function Testimonials({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section id="testimonials" className={className}>
      <SectionHeading top="KIND" bottom="WORDS" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="mt-12 grid gap-5 sm:grid-cols-2"
      >
        {testimonials.map((t) => (
          <motion.figure
            key={t.name}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOut }}
            className="flex flex-col rounded-2xl border border-white/10 p-7"
          >
            <Quote size={22} aria-hidden className="text-accent" />
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-white/80 sm:text-base">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-4">
              <span className="block font-display text-sm uppercase text-white">
                {t.name}
              </span>
              <span className="block text-xs text-muted">{t.role}</span>
            </figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}
