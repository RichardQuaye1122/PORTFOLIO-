import { Layers, LayoutGrid, ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data";

const icons = {
  layers: Layers,
  grid: LayoutGrid,
};

const styles = {
  orange: "bg-accent text-black",
  lime: "bg-accent-lime text-black",
};

export default function CategoryCards({
  className = "",
}: {
  className?: string;
}) {
  return (
    <section id="skills" className={`grid gap-5 sm:grid-cols-2 ${className}`}>
      {categories.map((c) => {
        const Icon = icons[c.icon];
        return (
          <div
            key={c.title}
            className={`relative flex min-h-[160px] flex-col justify-between overflow-hidden rounded-2xl p-6 ${styles[c.color]}`}
          >
            <Icon size={26} strokeWidth={1.75} aria-hidden />
            <div className="flex items-end justify-between gap-4">
              <p className="font-display text-lg uppercase leading-tight sm:text-xl">
                {c.title}
              </p>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/70">
                <ArrowUpRight size={16} aria-hidden />
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
