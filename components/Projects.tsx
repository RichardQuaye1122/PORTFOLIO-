import { ArrowUpRight } from "lucide-react";
import SectionHeading, {
  type SectionVariant,
} from "@/components/SectionHeading";
import { projects } from "@/lib/data";

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

      <div className="mt-12 flex flex-col divide-y divide-white/10 border-t border-white/10">
        {projects.map((p) => {
          const content = (
            <>
              <div
                className={`h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br ${p.gradient}`}
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <ItemHeading className="font-display text-xl text-white sm:text-2xl">
                      {p.name}
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
              </div>

              {p.href && (
                <ArrowUpRight
                  size={22}
                  aria-hidden
                  className="shrink-0 self-start text-muted transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
                />
              )}
            </>
          );

          return p.href ? (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-6 py-8 transition hover:opacity-80"
            >
              {content}
            </a>
          ) : (
            <div key={p.name} className="flex items-start gap-6 py-8">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
