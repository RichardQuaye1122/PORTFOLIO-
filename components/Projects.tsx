import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="mt-24">
      <h2 className="font-display leading-[0.9] tracking-tight">
        <span className="block text-[10vw] text-white sm:text-[4.5vw]">
          RECENT
        </span>
        <span className="text-outline block text-[10vw] sm:text-[4.5vw]">
          PROJECTS
        </span>
      </h2>

      <div className="mt-12 flex flex-col divide-y divide-white/10 border-t border-white/10">
        {projects.map((p) => (
          <a
            key={p.name}
            href="#"
            className="group flex items-center gap-6 py-6 transition hover:opacity-80"
          >
            <div
              className={`h-16 w-16 shrink-0 rounded-xl bg-gradient-to-br ${p.gradient}`}
            />
            <div className="flex-1">
              <h3 className="font-display text-xl text-white sm:text-2xl">
                {p.name}
              </h3>
              <p className="text-sm text-muted">{p.type}</p>
            </div>
            <ArrowUpRight
              size={22}
              className="shrink-0 text-muted transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
