import { Download } from "lucide-react";
import { profile } from "@/lib/data";

export default function FloatingBadges() {
  return (
    <>
      {profile.resumeUrl && (
        <a
          href={profile.resumeUrl}
          download
          className="fixed bottom-6 left-6 z-40 hidden items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-medium text-black shadow-lg transition hover:opacity-90 sm:flex"
        >
          <Download size={16} aria-hidden />
          Resume
        </a>
      )}
      <div className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full bg-accent-lime px-4 py-3 text-sm font-medium text-black shadow-lg sm:flex">
        <span className="h-2 w-2 rounded-full bg-black" />
        Available for work
      </div>
    </>
  );
}
