import type { Metadata } from "next";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "About — Richard Quaye",
  description:
    "Background, focus areas, and the kind of engineering work Richard Quaye takes on.",
};

export default function AboutPage() {
  return (
    <>
      <About className="pt-4" />
      <Services className="mt-24" />
      <Testimonials className="mt-24" />
    </>
  );
}
