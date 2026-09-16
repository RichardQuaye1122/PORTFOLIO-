import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { profile, projects } from "@/lib/data";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  let headshotBase64 = "";
  try {
    const headshotPath = path.join(
      process.cwd(),
      "public",
      "richard-quaye-headshot.jpg"
    );
    const headshotBuffer = await fs.readFile(headshotPath);
    headshotBase64 = `data:image/jpeg;base64,${headshotBuffer.toString("base64")}`;
  } catch {
    headshotBase64 = "";
  }

  const projectName = project ? project.name : "Featured Project";
  const projectType = project ? project.type : "Case Study";
  const projectRole = project ? project.role : "Engineering";
  const projectDesc = project
    ? project.description
    : "Engineered by Richard Quaye";
  const projectStack = project ? project.stack : ["Next.js", "TypeScript"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          color: "#f5f5f5",
          padding: "48px 56px",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          position: "relative",
          backgroundImage:
            "radial-gradient(circle at 85% 20%, rgba(255, 90, 31, 0.22), transparent 45%), radial-gradient(circle at 15% 85%, rgba(212, 255, 63, 0.12), transparent 45%)",
        }}
      >
        {/* Top Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Creator info */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                padding: "2px",
                background: "linear-gradient(135deg, #ff5a1f, #d4ff3f)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {headshotBase64 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={headshotBase64}
                  alt={profile.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    backgroundColor: "#ff5a1f",
                    color: "#fff",
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  RQ
                </div>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "17px",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.01em",
                }}
              >
                {profile.name}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#8a8a8a",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                {projectRole}
              </span>
            </div>
          </div>

          {/* Project Type Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255, 90, 31, 0.15)",
              border: "1px solid rgba(255, 90, 31, 0.4)",
              borderRadius: "9999px",
              padding: "6px 18px",
            }}
          >
            <span
              style={{
                fontSize: "13px",
                fontWeight: 700,
                color: "#ff5a1f",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {projectType}
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            backgroundColor: "rgba(22, 22, 22, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "28px",
            padding: "40px 48px",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span
              style={{
                fontSize: "14px",
                fontWeight: 700,
                color: "#d4ff3f",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Project Case Study
            </span>
            <h1
              style={{
                fontSize: "56px",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                margin: 0,
                color: "#ffffff",
              }}
            >
              {projectName}
            </h1>
          </div>

          <p
            style={{
              fontSize: "18px",
              color: "#cccccc",
              lineHeight: 1.5,
              margin: 0,
              maxWidth: "960px",
            }}
          >
            {projectDesc}
          </p>

          {/* Tech Stack pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "8px",
              flexWrap: "wrap",
            }}
          >
            {projectStack.map((tech) => (
              <div
                key={tech}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  borderRadius: "10px",
                  padding: "6px 14px",
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#ffffff",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            fontSize: "14px",
            fontWeight: 600,
            color: "#8a8a8a",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ color: "#ff5a1f" }}>⚡</span>
            <span>Live Case Study & Architecture Overview</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span>portfolio-virid-two-88.vercel.app/projects/{slug}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
