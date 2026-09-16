"use client";

import { motion } from "framer-motion";
import { Layers, LayoutGrid, Sparkles, ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data";
import { fadeUp, stagger, viewport, easeOut } from "@/lib/motion";

const icons = {
  layers: Layers,
  grid: LayoutGrid,
  sparkles: Sparkles,
};

const styles = {
  orange: "bg-accent text-black",
  lime: "bg-accent-lime text-black",
};

export default function CategoryCards({
  className = "",
}: {
  className?: string;
}) {
  return (
    <motion.section
      id="skills"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={stagger}
      className={`grid gap-5 sm:grid-cols-2 ${className}`}
    >
      {categories.map((c) => {
        const Icon = icons[c.icon];
        return (
          <motion.div
            key={c.title}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOut }}
            whileHover={{ y: -4 }}
            className={`relative flex min-h-[160px] flex-col justify-between overflow-hidden rounded-2xl p-6 ${styles[c.color]}`}
          >
            <Icon size={26} strokeWidth={1.75} aria-hidden />
            <div className="flex items-end justify-between gap-4">
              <p className="font-display text-lg uppercase leading-tight sm:text-xl">
                {c.title}
              </p>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/70">
                <ArrowUpRight size={16} aria-hidden />
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.section>
  );
}
