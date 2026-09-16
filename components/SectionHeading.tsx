"use client";

import { motion } from "framer-motion";
import { viewport, easeOut } from "@/lib/motion";

// A section rendered as a whole page gets the large scale and the <h1>;
// stacked on the home page it gets the smaller scale and an <h2>.
export type SectionVariant = "page" | "section";

// The two-line heading used across every section: a solid top line and an
// outlined bottom line.
//
// `size` controls both scale and heading level, so a component used as a whole
// page renders an <h1> while the same component stacked on the home page
// renders an <h2>. Every route needs exactly one <h1>.
export default function SectionHeading({
  top,
  bottom,
  size = "section",
}: {
  top: string;
  bottom: string;
  size?: SectionVariant;
}) {
  const scale =
    size === "page"
      ? "text-[13vw] sm:text-[7vw] lg:text-[5.5vw]"
      : "text-[10vw] sm:text-[4.5vw]";
  const Tag = size === "page" ? "h1" : "h2";

  const MotionTag = motion[Tag];

  return (
    <MotionTag className="font-display leading-[0.9] tracking-tight">
      <motion.span
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: easeOut }}
        className={`block text-white ${scale}`}
      >
        {top}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, delay: 0.08, ease: easeOut }}
        className={`text-outline block ${scale}`}
      >
        {bottom}
      </motion.span>
    </MotionTag>
  );
}
