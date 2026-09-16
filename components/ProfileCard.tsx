"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Dribbble } from "lucide-react";
import { profile } from "@/lib/data";
import { easeOut } from "@/lib/motion";

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Dribbble: Dribbble,
};

export default function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: easeOut }}
      className="w-full max-w-[280px] rounded-[2rem] bg-white p-5 text-center text-[#0a0a0a] shadow-2xl"
    >
      <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-orange-800">
        <Image
          src="/richard-quaye-headshot.jpg"
          alt={profile.name}
          fill
          sizes="280px"
          className="object-cover grayscale transition duration-700 hover:grayscale-0"
          priority
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
      </div>

      <h2 className="font-display text-xl leading-none">{profile.name}</h2>

      <p className="mx-auto mt-3 max-w-[210px] text-sm leading-snug text-black/60">
        {profile.tagline}
      </p>

      <div className="mt-5 flex items-center justify-center gap-3">
        {profile.socials.map((s) => {
          const Icon = iconMap[s.label as keyof typeof iconMap];
          if (!Icon) return null;
          return (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-accent text-accent transition hover:bg-accent hover:text-white"
            >
              <Icon size={16} strokeWidth={1.75} aria-hidden />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
}
