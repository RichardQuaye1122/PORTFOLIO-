"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  FolderOpen,
  Briefcase,
  Wrench,
  PenSquare,
} from "lucide-react";

const links = [
  { icon: Home, href: "/", label: "Home" },
  { icon: User, href: "/about", label: "About" },
  { icon: FolderOpen, href: "/projects", label: "Projects" },
  { icon: Briefcase, href: "/experience", label: "Experience" },
  { icon: Wrench, href: "/skills", label: "Skills" },
  { icon: PenSquare, href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-6 z-50 mx-auto mb-16 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[#141414]/90 px-3 py-3 backdrop-blur">
      {links.map(({ icon: Icon, href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={label}
            href={href}
            aria-label={label}
            className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
              active
                ? "bg-accent text-white"
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={17} strokeWidth={1.75} aria-hidden />
          </Link>
        );
      })}
    </nav>
  );
}
