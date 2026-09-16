import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Richard Quaye",
};

export default function ContactPage() {
  return <Footer className="pt-4" withForm variant="page" />;
}
