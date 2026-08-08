export default function Footer() {
  return (
    <footer id="contact" className="mt-24 mb-32">
      <div className="rounded-3xl bg-white p-10 text-center text-[#0a0a0a] sm:p-16">
        <h2 className="font-display text-3xl leading-tight sm:text-5xl">
          LET&apos;S BUILD SOMETHING GREAT
        </h2>
        <p className="mx-auto mt-4 max-w-md text-black/60">
          Have a project in mind? I&apos;m currently available for freelance
          work and full-time opportunities.
        </p>
        <a
          href="mailto:hello@richardcole.dev"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 font-medium text-white transition hover:opacity-90"
        >
          hello@richardcole.dev
        </a>
      </div>
      <p className="mt-10 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Richard Cole. All rights reserved.
      </p>
    </footer>
  );
}
