import Link from "next/link";
import { getLetters } from "@/lib/data";
import { TopBack } from "../_components/ui";
import { Highlight } from "../_components/Highlight";

export const revalidate = 120;

const COMO = [
  { n: "01 · Especular", t: "Parte de una pregunta imposible y síguela hasta donde te lleve." },
  { n: "02 · Escribir", t: "Una carta, un relato, una nota de campo. La forma la decides tú." },
  { n: "03 · Compartir", t: "Otras manos continúan lo que empezaste. La fanficción es el punto." },
];

export default async function CartasPage() {
  const cartas = await getLetters();

  return (
    <div>
      <TopBack href="/">← volver al índice</TopBack>

      {/* HEADER */}
      <header className="avn-container" style={{ maxWidth: 1120, margin: "0 auto", padding: "44px 40px 40px" }}>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#CC313D",
            marginBottom: 26,
          }}
        >
          Sección especial · un juego de ficción
        </div>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(40px, 9.5vw, 84px)",
            lineHeight: 0.92,
            letterSpacing: "-0.035em",
            margin: 0,
            color: "#2C303A",
            maxWidth: 1000,
          }}
        >
          Cartas a la sociedad de{" "}
          <Highlight top={18} bottom={92} padX="0.12em">
            terolingüistas
          </Highlight>
        </h1>
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            lineHeight: 1.55,
            color: "#565E70",
            margin: "30px 0 0",
            maxWidth: 680,
          }}
        >
          Se encontraron, sin fecha ni destinatario, una serie de cartas dirigidas
          a una sociedad que dice leer los idiomas de los animales —el canto, la
          huella, el musgo—. Cada una está firmada con un{" "}
          <strong style={{ fontWeight: 700, color: "#2C303A" }}>heterónimo</strong>{" "}
          distinto, y nadie sabe cuántas manos las escribieron. Es un juego de
          ficción: puedes leerlas, seguirles el hilo o añadir la tuya con un nombre
          inventado.
        </p>
      </header>

      {/* CÓMO FUNCIONA */}
      <section className="avn-container" style={{ maxWidth: 1120, margin: "0 auto", padding: "12px 40px 0" }}>
        <div
          className="avn-stack"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 2,
            background: "#E4DED6",
            borderTop: "1px solid #E4DED6",
            borderBottom: "1px solid #E4DED6",
          }}
        >
          {COMO.map((c) => (
            <div key={c.n} style={{ padding: "26px 24px", backgroundColor: "#2C303A" }}>
              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#D7EC16",
                  marginBottom: 10,
                }}
              >
                {c.n}
              </div>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: "#FCF7F3",
                  margin: 0,
                }}
              >
                {c.t}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CARTAS LIST */}
      <section className="avn-container" style={{ maxWidth: 1120, margin: "0 auto", padding: "56px 40px 0" }}>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#8A93A6",
            paddingBottom: 8,
            borderBottom: "2px solid #2C303A",
            marginBottom: 4,
          }}
        >
          Cartas recibidas
        </div>
        {cartas.map((c) => (
          <article
            key={c.id}
            className="avn-stack"
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr 130px",
              gap: 32,
              alignItems: "start",
              padding: "34px 0",
              borderBottom: "1px solid #E4DED6",
            }}
          >
            <div
              style={{
                paddingTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 8,
              }}
            >
              {c.is_new && (
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#23231F",
                    background: "#D6ED17",
                    padding: "3px 8px",
                  }}
                >
                  Nueva
                </span>
              )}
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#7B9ACC",
                }}
              >
                {c.heteronym}
              </span>
            </div>
            <div>
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                  fontSize: 32,
                  lineHeight: 1.04,
                  letterSpacing: "-0.02em",
                  margin: "0 0 14px",
                  color: "#2C303A",
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                  fontSize: 18,
                  lineHeight: 1.55,
                  color: "#565E70",
                  margin: 0,
                  maxWidth: 560,
                }}
              >
                {c.excerpt}
              </p>
            </div>
            <div style={{ textAlign: "right", paddingTop: 10 }}>
              <Link
                href={`/cartas/${c.id}`}
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 12,
                  letterSpacing: "0.06em",
                  color: "#CC313D",
                  textDecoration: "none",
                  borderBottom: "1px solid #CC313D",
                  paddingBottom: 2,
                }}
              >
                Leer →
              </Link>
            </div>
          </article>
        ))}
      </section>

      {/* PARTICIPAR */}
      <section
        style={{
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginTop: 72,
          backgroundColor: "#2C303A",
        }}
      >
        <div
          className="avn-container avn-stack"
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "58px 40px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 40,
            alignItems: "end",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#B9C6DF",
                marginBottom: 22,
              }}
            >
              Tu turno
            </div>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontWeight: 700,
                fontSize: "clamp(32px, 6vw, 46px)",
                lineHeight: 1.0,
                letterSpacing: "-0.025em",
                margin: 0,
                color: "#FBF7F3",
                maxWidth: 680,
              }}
            >
              ¿Encontraste una carta?
            </h2>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 19,
                lineHeight: 1.55,
                color: "#C7CBD4",
                margin: "22px 0 0",
                maxWidth: 600,
              }}
            >
              La sumamos al archivo sin decir quién eres.
            </p>
          </div>
          <Link
            href="/cartas/enviar"
            className="avn-lime-btn"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 13,
              letterSpacing: "0.06em",
              color: "#23231F",
              background: "#D6ED17",
              textDecoration: "none",
              padding: "14px 22px",
              whiteSpace: "nowrap",
            }}
          >
            Enviar la tuya →
          </Link>
        </div>
      </section>

      <footer
        className="avn-container"
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "30px 40px 70px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#A6A093",
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
