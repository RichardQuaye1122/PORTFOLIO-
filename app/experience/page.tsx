import type { Metadata } from "next";
import Experience from "@/components/Experience";
import Education from "@/components/Education";

export const metadata: Metadata = {
  title: "Experience — Richard Quaye",
  description:
    "Roles, results, and the stacks behind two years of shipping software.",
};

export default function ExperiencePage() {
  return (
    <>
      <Experience className="pt-4" variant="page" />
      <Education className="mt-20" />
    </>
  );
}
