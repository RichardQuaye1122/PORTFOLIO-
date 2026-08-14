import { skillGroups } from "@/lib/data";

export default function SkillGroups({ className = "" }: { className?: string }) {
  return (
    <section className={className}>
      <div className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((g) => (
          <div
            key={g.title}
            className="rounded-2xl border border-white/10 p-6 transition hover:border-white/20"
          >
            <h2 className="font-display text-sm uppercase tracking-wide text-accent">
              {g.title}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
