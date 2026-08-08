import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ProfileCard from "@/components/ProfileCard";
import FloatingBadges from "@/components/FloatingBadges";

export const metadata: Metadata = {
  title: "Richard Cole — Software Engineer",
  description:
    "Portfolio of Richard Cole, a software engineer specializing in full-stack development and product engineering.",
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

              <main className="pb-24">{children}</main>
            </div>
          </div>

          <FloatingBadges />
        </div>
      </body>
    </html>
  );
}
