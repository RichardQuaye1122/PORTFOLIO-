import type { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projects — Richard Cole",
  description:
    "Selected work — dashboards, storefronts, infrastructure tooling, and mobile apps.",
};

export default function ProjectsPage() {
  return <Projects className="pt-4" variant="page" />;
}
