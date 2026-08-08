import type { Metadata } from "next";
import CategoryCards from "@/components/CategoryCards";

export const metadata: Metadata = {
  title: "Skills — Richard Cole",
};

export default function SkillsPage() {
  return (
    <div className="pt-4">
      <h1 className="font-display leading-[0.9] tracking-tight">
        <span className="block text-[13vw] text-white sm:text-[7vw] lg:text-[5.5vw]">
          SKILLS &
        </span>
        <span className="text-outline block text-[13vw] sm:text-[7vw] lg:text-[5.5vw]">
          TOOLS
        </span>
      </h1>
      <CategoryCards />
    </div>
  );
}
