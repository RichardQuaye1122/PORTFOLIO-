import { Github, Linkedin, Twitter, Dribbble } from "lucide-react";
import { profile } from "@/lib/data";

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Dribbble: Dribbble,
};

export default function ProfileCard() {
  return (
    <div className="w-full max-w-[280px] rounded-[2rem] bg-white p-5 text-center text-[#0a0a0a] shadow-2xl">
      <div className="relative mb-4 flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-orange-800">
        <span className="font-display text-6xl text-black/20">RC</span>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
      </div>

      <h2 className="font-display text-xl leading-none">{profile.name}</h2>

      <div className="mx-auto my-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
        <span className="text-sm">🔥</span>
      </div>

      <p className="mx-auto max-w-[210px] text-sm leading-snug text-black/60">
        {profile.tagline}
      </p>

      <div className="mt-5 flex items-center justify-center gap-3">
        {profile.socials.map((s) => {
          const Icon = iconMap[s.label as keyof typeof iconMap];
          return (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-accent text-accent transition hover:bg-accent hover:text-white"
            >
              <Icon size={16} strokeWidth={1.75} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
