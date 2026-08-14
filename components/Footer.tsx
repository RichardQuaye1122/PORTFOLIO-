import ContactForm from "@/components/ContactForm";
import { type SectionVariant } from "@/components/SectionHeading";

export default function Footer({
  className = "",
  withForm = false,
  variant = "section",
}: {
  className?: string;
  withForm?: boolean;
  variant?: SectionVariant;
}) {
  // On /contact this card is the page, so its heading is the <h1>.
  const Heading = variant === "page" ? "h1" : "h2";

  return (
    <footer id="contact" className={className}>
      <div className="rounded-3xl bg-white p-10 text-center text-[#0a0a0a] sm:p-16">
        <Heading className="font-display text-3xl leading-tight sm:text-5xl">
          LET&apos;S BUILD SOMETHING GREAT
        </Heading>
        <p className="mx-auto mt-4 max-w-md text-black/60">
          Have a project in mind? I&apos;m currently available for freelance
          work and full-time opportunities.
        </p>

        {withForm ? (
          <ContactForm />
        ) : (
          <a
            href="mailto:hello@richardcole.dev"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 font-medium text-white transition hover:opacity-90"
          >
            hello@richardcole.dev
          </a>
        )}
      </div>
      <p className="mt-10 text-center text-xs text-white/30">
        © {new Date().getFullYear()} Richard Cole. All rights reserved.
      </p>
    </footer>
  );
}
