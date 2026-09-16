import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import FloatingBadges from "@/components/FloatingBadges";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://portfolio-virid-two-88.vercel.app")
  ),
  title: {
    default: "Richard Quaye — Software Engineer",
    template: "%s — Richard Quaye",
  },
  description:
    "Portfolio of Richard Quaye, a software engineer specializing in full-stack development, AI engineering, and product systems.",
  keywords: [
    "Richard Quaye",
    "Software Engineer",
    "Full-Stack Developer",
    "AI Engineer",
    "Next.js",
    "React",
    "TypeScript",
    "System Design",
    "Portfolio",
  ],
  authors: [{ name: "Richard Quaye", url: "https://github.com/RichardQuaye1122" }],
  creator: "Richard Quaye",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-virid-two-88.vercel.app",
    siteName: "Richard Quaye — Portfolio",
    title: "Richard Quaye — Software Engineer",
    description:
      "Full-stack and AI engineer building fast, reliable products and scalable systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Richard Quaye — Software Engineer",
    description:
      "Full-stack and AI engineer building fast, reliable products and scalable systems.",
    creator: "@RichardQuaye",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <div className="min-h-screen bg-background">
          <div className="mx-auto max-w-6xl px-6">
            <Navbar />

            <div className="grid gap-12 lg:grid-cols-[280px_1fr] lg:gap-16">
              <aside className="lg:sticky lg:top-32 lg:h-fit">
                <ProfileCard />
              </aside>

              <main className="pb-24">
                <PageTransition>{children}</PageTransition>
              </main>
            </div>
          </div>

          <FloatingBadges />
        </div>
      </body>
    </html>
  );
}
