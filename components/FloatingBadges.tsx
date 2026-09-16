"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { profile } from "@/lib/data";

export default function FloatingBadges() {
  return (
    <>
      {profile.resumeUrl && (
        <motion.a
          href={profile.resumeUrl}
          download
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="fixed bottom-6 left-6 z-40 hidden items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium text-black shadow-lg transition hover:opacity-90 sm:flex"
        >
          <Download size={16} aria-hidden />
          Resume
        </motion.a>
      )}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-accent-lime px-4 py-3 text-sm font-medium text-black shadow-lg sm:flex"
      >
        <motion.span
          className="h-2 w-2 rounded-full bg-black"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        Available for work
      </motion.div>
    </>
  );
}
