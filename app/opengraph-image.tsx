import { ImageResponse } from "next/og";
import fs from "node:fs/promises";
import path from "node:path";
import { profile, hero } from "@/lib/data";

export const alt = `${profile.name} — ${profile.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Load Richard's headshot from public folder as Base64 Data URL
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
    // Fallback if file reading fails
    headshotBase64 = "";
  }

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
            "radial-gradient(circle at 10% 20%, rgba(255, 90, 31, 0.18), transparent 40%), radial-gradient(circle at 90% 80%, rgba(212, 255, 63, 0.12), transparent 45%)",
        }}
      >
        {/* Top Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Brand mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                backgroundColor: "#ff5a1f",
                color: "#ffffff",
                fontSize: "20px",
                fontWeight: 800,
                boxShadow: "0 0 20px rgba(255, 90, 31, 0.4)",
              }}
            >
              RQ
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                }}
              >
                {profile.name.toUpperCase()}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#8a8a8a",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Portfolio & Engineering
              </span>
            </div>
          </div>

          {/* Status pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "9999px",
              padding: "8px 18px",
            }}
          >
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#d4ff3f",
                boxShadow: "0 0 10px #d4ff3f",
              }}
            />
            <span
              style={{
                fontSize: "14px",
                fontWeight: 600,
                color: "#f5f5f5",
                letterSpacing: "0.02em",
              }}
            >
              Available for Opportunities
            </span>
          </div>
        </div>

        {/* Main Content Card */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            backgroundColor: "rgba(22, 22, 22, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "28px",
            padding: "36px 44px",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.6)",
          }}
        >
          {/* Avatar frame with picture */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "relative",
                width: "180px",
                height: "180px",
                borderRadius: "24px",
                padding: "4px",
                background: "linear-gradient(135deg, #ff5a1f, #d4ff3f)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 12px 32px rgba(255, 90, 31, 0.35)",
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
                    borderRadius: "20px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "20px",
                    backgroundColor: "#1a1a1a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "48px",
                    fontWeight: 800,
                    color: "#ff5a1f",
                  }}
                >
                  RQ
                </div>
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "rgba(255, 90, 31, 0.15)",
                border: "1px solid rgba(255, 90, 31, 0.4)",
                borderRadius: "9999px",
                padding: "4px 14px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#ff5a1f",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Full-Stack & AI
              </span>
            </div>
          </div>

          {/* Right Text Block */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
              }}
            >
              <h1
                style={{
                  fontSize: "50px",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  margin: 0,
                  color: "#ffffff",
                }}
              >
                {profile.name}
              </h1>
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#ff5a1f",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Software Engineer • Full-Stack & AI Systems
              </p>
            </div>

            <p
              style={{
                fontSize: "16px",
                color: "#a3a3a3",
                lineHeight: 1.45,
                margin: 0,
                maxWidth: "600px",
              }}
            >
              {profile.tagline}
            </p>

            {/* Stats Row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "6px",
              }}
            >
              {hero.stats.map((stat, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "12px",
                    padding: "6px 14px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: 800,
                      color: i === 0 ? "#d4ff3f" : i === 1 ? "#ff5a1f" : "#ffffff",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#8a8a8a",
                    }}
                  >
                    {stat.label.replace("\n", " ")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar: Tech stack & URL */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* Tech Badges */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {[
              "Next.js",
              "React",
              "TypeScript",
              "AI & LLMs",
              "Node.js",
              "System Design",
            ].map((tech) => (
              <div
                key={tech}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "8px",
                  padding: "5px 12px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#cccccc",
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          {/* Socials / Handle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#8a8a8a",
            }}
          >
            <span>github.com/RichardQuaye1122</span>
            <span>•</span>
            <span style={{ color: "#d4ff3f" }}>Accra, Ghana</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
