import Link from "next/link";
import { Highlight } from "./_components/Highlight";
import { getMediaByPath } from "@/lib/data";

export const revalidate = 300;

export default async function HomePage() {
  const masthead = await getMediaByPath("covers/portada-nubes-wide.png");
  const mastheadBg = masthead
    ? `linear-gradient(rgba(251,247,243,0.28), rgba(251,247,243,0.28)), url('${masthead.public_url}')`
    : "linear-gradient(rgba(251,247,243,0.28), rgba(251,247,243,0.28))";

  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "0 40px 90px" }}>
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
            fontSize: 104,
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            margin: 0,
            color: "#2C303A",
            width: 447,
            height: 222,
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
        <nav
          style={{
            position: "fixed",
            top: 60,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            display: "inline-flex",
            gap: 4,
            background: "#FFFFFF",
            border: "1px solid #E4DED6",
            borderRadius: 999,
            padding: 6,
            boxShadow: "0 10px 34px rgba(44,48,58,0.12)",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          <Link
            href="/textos"
            className="avn-nav-link"
            style={{
              padding: "9px 18px",
              borderRadius: 999,
              color: "#565E70",
              textDecoration: "none",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Textos
          </Link>
          <Link
            href="/laboratorio"
            className="avn-nav-link"
            style={{
              padding: "9px 18px",
              borderRadius: 999,
              color: "#565E70",
              textDecoration: "none",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Laboratorio
          </Link>
          <Link
            href="/cartas"
            className="avn-nav-cta"
            style={{
              padding: "9px 18px",
              borderRadius: 999,
              background: "#CC313D",
              color: "#FBF7F3",
              textDecoration: "none",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Cartas
          </Link>
        </nav>
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
                fontSize: 62,
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
