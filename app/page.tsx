import Hero from "@/components/Hero";
import CategoryCards from "@/components/CategoryCards";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryCards className="mt-16" />
      <Services className="mt-24" />
      <Projects className="mt-24" />
      <Experience className="mt-24" />
      <Testimonials className="mt-24" />
      <Footer className="mt-24" />
    </>
  );
}
