import Link from "next/link";
import { getCourses } from "@/lib/data";
import { TopBack, SectionLabel } from "../_components/ui";

export const revalidate = 120;

export default async function LaboratorioPage() {
  const courses = await getCourses();

  return (
    <div>
      <TopBack href="/">← volver al índice</TopBack>

      <header className="avn-container" style={{ maxWidth: 1120, margin: "0 auto", padding: "44px 40px 40px" }}>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#7B9ACC",
            marginBottom: 26,
          }}
        >
          Cursos · talleres · experimentos
        </div>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(42px, 10vw, 96px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            margin: 0,
            color: "#2C303A",
          }}
        >
          Laboratorio
        </h1>
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            lineHeight: 1.55,
            color: "#565E70",
            margin: "30px 0 0",
            maxWidth: 660,
          }}
        >
          Un lugar para ensayar en compañía: clubes de lectura, talleres de
          escritura y experimentos que todavía no sé si funcionan.
        </p>
      </header>

      <section className="avn-container" style={{ maxWidth: 1120, margin: "0 auto", padding: "12px 40px 0" }}>
        <SectionLabel>En curso</SectionLabel>
        <div
          className="avn-stack"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            background: "#E4DED6",
            borderBottom: "1px solid #E4DED6",
          }}
        >
          {courses.map((c) => (
            <article
              key={c.id}
              style={{
                background: "#FBF7F3",
                padding: "30px 26px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#CC313D",
                  marginBottom: 18,
                }}
              >
                {c.tag}
              </div>
              <Link
                href={`/laboratorio/${c.slug}`}
                className="avn-title-link"
                style={{ textDecoration: "none" }}
              >
                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    fontWeight: 700,
                    fontSize: 24,
                    lineHeight: 1.15,
                    margin: "0 0 12px",
                    color: "#2C303A",
                    cursor: "pointer",
                  }}
                >
                  {c.title}
                </h3>
              </Link>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "#565E70",
                  margin: "0 0 16px",
                }}
              >
                {c.note}
              </p>
              <Link
                href={`/laboratorio/${c.slug}`}
                className="avn-labcta"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#7B9ACC",
                  textDecoration: "none",
                  marginBottom: 20,
                }}
              >
                Ver detalles →
              </Link>
              <div
                style={{
                  marginTop: "auto",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.06em",
                }}
              >
                <span
                  style={{
                    color: "#8A93A6",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                  }}
                >
                  {c.schedule}
                </span>
                <Link
                  href={`/laboratorio/${c.slug}/inscribirse`}
                  className="avn-lime-btn"
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.08em",
                    color: "#23231F",
                    background: "#D6ED17",
                    textDecoration: "none",
                    padding: "8px 14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Apuntarme →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer
        className="avn-container"
        style={{
          maxWidth: 1120,
          margin: "60px auto 0",
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
          href="/"
          style={{
            color: "#CC313D",
            textDecoration: "none",
            borderBottom: "1px solid #CC313D",
            paddingBottom: 2,
          }}
        >
          ← volver al índice
        </Link>
        <span>Escrito con calma · © 2026</span>
      </footer>
    </div>
  );
}
