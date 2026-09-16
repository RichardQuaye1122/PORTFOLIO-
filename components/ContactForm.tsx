"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send } from "lucide-react";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string };

const inputClass =
  "w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-black/35 focus:border-accent";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ state: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          state: "error",
          message: json.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      form.reset();
      setStatus({ state: "sent" });
    } catch {
      setStatus({
        state: "error",
        message: "Network error. Please check your connection and try again.",
      });
    }
  }

  const sending = status.state === "sending";

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-8 max-w-md text-left">
      {/* Honeypot — hidden from people, tempting to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="sr-only">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={100}
            placeholder="Your name"
            autoComplete="name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            placeholder="you@example.com"
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>

      <label htmlFor="message" className="sr-only">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        required
        rows={5}
        maxLength={5000}
        placeholder="What are you building?"
        className={`${inputClass} mt-3 resize-y`}
      />

      <motion.button
        type="submit"
        disabled={sending}
        whileHover={{ scale: sending ? 1 : 1.02 }}
        whileTap={{ scale: sending ? 1 : 0.98 }}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-8 py-3 font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={16} aria-hidden />
        {sending ? "Sending…" : "Send message"}
      </motion.button>

      <p aria-live="polite" className="mt-3 min-h-5 text-center text-sm">
        <AnimatePresence mode="wait">
          {status.state === "sent" && (
            <motion.span
              key="sent"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-green-700"
            >
              Thanks — your message is on its way.
            </motion.span>
          )}
          {status.state === "error" && (
            <motion.span
              key="error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="text-red-600"
            >
              {status.message}
            </motion.span>
          )}
        </AnimatePresence>
      </p>
    </form>
  );
}
