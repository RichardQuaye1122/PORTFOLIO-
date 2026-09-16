"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { projects } from "@/lib/data";
import { fadeUp, stagger, easeOut } from "@/lib/motion";

export default function ProjectDetail({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="pt-4"
    >
      <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: easeOut }}>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-white"
        >
          <ArrowLeft size={16} aria-hidden />
          All projects
        </Link>
      </motion.div>

      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.6, ease: easeOut }}
        className={`mt-8 h-40 w-full rounded-2xl bg-gradient-to-br sm:h-56 ${project.gradient}`}
      />

      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.5, ease: easeOut }}
        className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <h1 className="font-display text-3xl text-white sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-2 text-muted">{project.type}</p>
        </div>
        <div className="shrink-0 sm:text-right">
          <span className="block text-xs uppercase tracking-wide text-white/40">
            {project.year}
          </span>
          <span className="block text-sm text-muted">{project.role}</span>
        </div>
      </motion.div>

      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.5, ease: easeOut }}
        className="mt-8 max-w-2xl text-base leading-relaxed text-muted"
      >
        {project.description}
      </motion.p>

      <motion.ul
        variants={stagger}
        className="mt-6 flex flex-wrap gap-2"
      >
        {project.stack.map((tech) => (
          <motion.li
            key={tech}
            variants={fadeUp}
            transition={{ duration: 0.4, ease: easeOut }}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60"
          >
            {tech}
          </motion.li>
        ))}
      </motion.ul>

      {project.href && (
        <motion.a
          variants={fadeUp}
          transition={{ duration: 0.5, ease: easeOut }}
          href={project.href}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-white transition hover:opacity-90"
        >
          View live
          <ArrowUpRight size={18} aria-hidden />
        </motion.a>
      )}
    </motion.div>
  );
}
