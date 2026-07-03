import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourse } from "@/lib/data";
import { TopBack } from "../../_components/ui";

export const revalidate = 120;

export default async function CursoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const curso = await getCourse(slug);
  if (!curso) notFound();

  return (
    <div>
      <TopBack href="/laboratorio">← volver al laboratorio</TopBack>

      <header style={{ maxWidth: 1120, margin: "0 auto", padding: "44px 40px 40px" }}>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#CC313D",
            marginBottom: 24,
          }}
        >
          {curso.tag}
        </div>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: 72,
            lineHeight: 0.94,
            letterSpacing: "-0.035em",
            margin: 0,
            color: "#2C303A",
            maxWidth: 900,
          }}
        >
          {curso.title}
        </h1>
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            lineHeight: 1.5,
            color: "#565E70",
            margin: "26px 0 0",
            maxWidth: 680,
          }}
        >
          {curso.lead}
        </p>
      </header>

      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 40px 20px",
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 60,
          alignItems: "start",
        }}
      >
        {/* BODY */}
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 19,
            lineHeight: 1.7,
            color: "#2C2E33",
          }}
        >
          {curso.body.map((p, i) => (
            <p key={i} style={{ margin: "0 0 22px" }}>
              {p.t}
            </p>
          ))}

          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              fontSize: 28,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              margin: "40px 0 20px",
              color: "#2C303A",
            }}
          >
            Qué haremos
          </h2>
          <div style={{ borderTop: "1px solid #E4DED6" }}>
            {curso.temario.map((s, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr",
                  gap: 20,
                  padding: "16px 0",
                  borderBottom: "1px solid #E4DED6",
                  alignItems: "baseline",
                }}
              >
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 12,
                    letterSpacing: "0.06em",
                    color: "#7B9ACC",
                  }}
                >
                  {s.n}
                </span>
                <span
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 18,
                    lineHeight: 1.5,
                    color: "#2C2E33",
                  }}
                >
                  {s.t}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ASIDE FICHA */}
        <aside
          style={{
            position: "sticky",
            top: 78,
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          <div style={{ background: "#2C303A", padding: "26px 24px" }}>
            <div
              style={{
                fontSize: 10.5,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#D6ED17",
                marginBottom: 18,
              }}
            >
              La ficha
            </div>
            {curso.ficha.map((f, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 14,
                  padding: "9px 0",
                  borderBottom: "1px solid #3B424F",
                  fontSize: 12,
                }}
              >
                <span
                  style={{
                    color: "#8A93A6",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {f.k}
                </span>
                <span style={{ color: "#FBF7F3", textAlign: "right" }}>{f.v}</span>
              </div>
            ))}
            <Link
              href={`/laboratorio/${curso.slug}/inscribirse`}
              className="avn-lime-btn"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: 22,
                fontSize: 12.5,
                letterSpacing: "0.06em",
                color: "#23231F",
                background: "#D6ED17",
                textDecoration: "none",
                padding: "13px 18px",
              }}
            >
              Apuntarme →
            </Link>
          </div>
        </aside>
      </div>

      <footer
        style={{
          maxWidth: 1120,
          margin: "48px auto 0",
          padding: "30px 40px 70px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#A6A093",
          borderTop: "2px solid #2C303A",
        }}
      >
        <Link
          href="/laboratorio"
          style={{
            color: "#CC313D",
            textDecoration: "none",
            borderBottom: "1px solid #CC313D",
            paddingBottom: 2,
          }}
        >
          ← volver al laboratorio
        </Link>
        <span>Escrito con calma · © 2026</span>
      </footer>
    </div>
  );
}
