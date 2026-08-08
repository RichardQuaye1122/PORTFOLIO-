import type { Metadata } from "next";
import Experience from "@/components/Experience";

export const metadata: Metadata = {
  title: "Experience — Richard Cole",
};

export default function ExperiencePage() {
  return <Experience />;
}
