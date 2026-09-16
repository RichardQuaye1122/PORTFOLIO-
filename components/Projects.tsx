"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading, {
  type SectionVariant,
} from "@/components/SectionHeading";
import { projects } from "@/lib/data";
import { fadeUp, stagger, viewport, easeOut } from "@/lib/motion";

export default function Projects({
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
    <section id="projects" className={className}>
      <SectionHeading top="RECENT" bottom="PROJECTS" size={variant} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger}
        className="mt-12 flex flex-col divide-y divide-white/10 border-t border-white/10"
      >
        {projects.map((p) => (
          <motion.div
            key={p.name}
            variants={fadeUp}
            transition={{ duration: 0.5, ease: easeOut }}
            className="group relative flex items-start gap-6 py-8"
          >
            <div
              className={`h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br ${p.gradient}`}
            />
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <ItemHeading className="font-display text-xl text-white sm:text-2xl">
                    <Link
                      href={`/projects/${p.slug}`}
                      className="static after:absolute after:inset-0 after:content-['']"
                    >
                      {p.name}
                    </Link>
                  </ItemHeading>
                  <p className="text-sm text-muted">{p.type}</p>
                </div>
                <div className="shrink-0 text-right">
                  <span className="block text-xs uppercase tracking-wide text-white/40">
                    {p.year}
                  </span>
                  <span className="block text-xs text-muted">{p.role}</span>
                </div>
              </div>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                {p.description}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/60"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="relative z-10 mt-5 flex items-center gap-3">
                <Link
                  href={`/projects/${p.slug}`}
                  className="inline-flex items-center gap-1 text-sm text-white/70 transition group-hover:text-white"
                >
                  View details
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/70 transition hover:border-accent hover:text-accent"
                  >
                    Live
                    <ArrowUpRight size={14} aria-hidden />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
