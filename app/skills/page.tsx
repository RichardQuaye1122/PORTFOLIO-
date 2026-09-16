import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CategoryCards from "@/components/CategoryCards";
import SkillGroups from "@/components/SkillGroups";

export const metadata: Metadata = {
  title: "Skills — Richard Quaye",
  description:
    "The languages, frameworks, and infrastructure Richard Quaye works with day to day.",
};

export default function SkillsPage() {
  return (
    <div className="pt-4">
      <SectionHeading top="SKILLS &" bottom="TOOLS" size="page" />
      <CategoryCards className="mt-12" />
      <SkillGroups className="mt-5" />
    </div>
  );
}
