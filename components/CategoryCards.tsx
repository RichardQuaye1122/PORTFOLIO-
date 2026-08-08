import { Layers, LayoutGrid, ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data";

const icons = [Layers, LayoutGrid];
const styles = [
  "bg-accent text-black",
  "bg-accent-lime text-black",
];

export default function CategoryCards() {
  return (
    <section id="skills" className="mt-16 grid gap-5 sm:grid-cols-2">
      {categories.map((c, i) => {
        const Icon = icons[i];
        return (
          <div
            key={c.title}
            className={`relative flex min-h-[160px] flex-col justify-between overflow-hidden rounded-2xl p-6 ${styles[i]}`}
          >
            <Icon size={26} strokeWidth={1.75} />
            <div className="flex items-end justify-between gap-4">
              <p className="font-display text-lg uppercase leading-tight sm:text-xl">
                {c.title}
              </p>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/70">
                <ArrowUpRight size={16} />
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
