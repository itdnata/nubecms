import Link from "next/link";
import { Highlight } from "./_components/Highlight";
import { getMediaByPath } from "@/lib/data";

export const revalidate = 120;

export default async function HomePage() {
  const masthead = await getMediaByPath("covers/portada-nubes-wide.png");
  const mastheadBg = masthead
    ? `linear-gradient(rgba(251,247,243,0.28), rgba(251,247,243,0.28)), url('${masthead.public_url}')`
    : "linear-gradient(rgba(251,247,243,0.28), rgba(251,247,243,0.28))";

  return (
    <main className="avn-container" style={{ maxWidth: 1120, margin: "0 auto", padding: "0 40px 90px" }}>
      {/* MASTHEAD */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px 20px 50px",
          background: mastheadBg,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#8A93A6",
            marginBottom: 30,
          }}
        >
          Un cuaderno personal · Nº 01 — Julio 2026
        </div>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(52px, 12vw, 104px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            margin: 0,
            color: "#2C303A",
            maxWidth: 447,
            textAlign: "center",
          }}
        >
          A vuelo de <Highlight>nube</Highlight>
        </h1>
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 20,
            lineHeight: 1.6,
            color: "#3E4557",
            margin: "34px 0 0",
            maxWidth: 560,
          }}
        >
          Ensayos, reseñas y curiosidades para leer sin prisa. Un lugar para
          pensar en voz alta, guardar hallazgos y mirar de vez en cuando hacia
          arriba.
        </p>
      </section>

      {/* SECCIÓN ESPECIAL: CARTAS */}
      <Link
        href="/cartas"
        style={{ display: "block", textDecoration: "none", color: "inherit" }}
      >
        <section
          style={{
            marginTop: 0,
            background: "#2C303A",
            width: "100vw",
            marginLeft: "calc(50% - 50vw)",
            cursor: "pointer",
          }}
        >
          <div
            className="avn-container"
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "62px 40px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 30,
              }}
            >
              <span style={{ color: "#CC313D" }}>Sección especial</span>
              <span style={{ color: "#7C8598" }}>
                Un juego de ficción · cartas con distintos heterónimos
              </span>
            </div>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(38px, 7vw, 62px)",
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                margin: 0,
                color: "#FBF7F3",
                maxWidth: 940,
              }}
            >
              Cartas a la sociedad de terolingüistas
            </h2>
            <div
              className="avn-stack"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 40,
                alignItems: "end",
                marginTop: 30,
              }}
            >
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 20,
                  lineHeight: 1.55,
                  color: "#C7CBD4",
                  margin: 0,
                  maxWidth: 660,
                }}
              >
                Alguien encontró una serie de cartas dirigidas a una sociedad que
                dice leer los idiomas de los animales. Cada una está firmada con
                un heterónimo distinto: un juego de ficción donde nadie sabe
                cuántas manos escriben.
              </p>
              <span
                className="avn-lime-btn"
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  color: "#23231F",
                  background: "#D6ED17",
                  textDecoration: "none",
                  border: "1px solid #D6ED17",
                  padding: "12px 20px",
                  whiteSpace: "nowrap",
                }}
              >
                Entrar a las cartas →
              </span>
            </div>
          </div>
        </section>
      </Link>

      {/* FOOTER */}
      <footer
        style={{
          marginTop: 40,
          paddingTop: 26,
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
        <span style={{ color: "#2C303A" }}>A vuelo de nube</span>
        <span>Escrito con calma · © 2026</span>
      </footer>
    </main>
  );
}
