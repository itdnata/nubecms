"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitCarta, type CartaState } from "@/app/actions";

const labelStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#8A93A6",
};

export function EnviarForm() {
  const [state, formAction] = useActionState<CartaState, FormData>(submitCarta, {
    status: "idle",
  });

  if (state.status === "ok") {
    return (
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "0 40px 70px" }}>
        <div style={{ background: "#2C303A", padding: "46px 44px" }}>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#D6ED17",
              marginBottom: 18,
            }}
          >
            Carta archivada ✓
          </div>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              fontSize: 40,
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              margin: 0,
              color: "#FBF7F3",
            }}
          >
            «{state.titulo}» ya es parte del archivo.
          </h2>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 19,
              lineHeight: 1.55,
              color: "#C7CBD4",
              margin: "20px 0 30px",
              maxWidth: 560,
            }}
          >
            Firmada por{" "}
            <strong style={{ color: "#FBF7F3" }}>{state.firma}</strong>. Nadie
            sabrá cuántas manos la escribieron.
          </p>
          <Link
            href="/cartas"
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12.5,
              letterSpacing: "0.06em",
              color: "#D6ED17",
              textDecoration: "none",
              borderBottom: "1px solid #D6ED17",
              paddingBottom: 3,
            }}
          >
            ← ver las cartas recibidas
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section style={{ maxWidth: 860, margin: "0 auto", padding: "0 40px 70px" }}>
      <form
        action={formAction}
        style={{
          border: "1px solid #E4DED6",
          background: "#FDFBF8",
          boxShadow: "0 12px 40px rgba(44,48,58,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "11px 16px",
            borderBottom: "1px solid #E4DED6",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12,
            color: "#8A93A6",
          }}
        >
          <span
            style={{ width: 9, height: 9, borderRadius: "50%", background: "#CC313D" }}
          />
          <span style={{ color: "#565E70" }}>carta-sin-titulo.txt</span>
          <span
            style={{
              marginLeft: "auto",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontSize: 10.5,
              color: "#A6A093",
            }}
          >
            Texto plano · borrador
          </span>
        </div>
        <div
          style={{
            padding: "32px 36px 36px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <label htmlFor="ca-firma" style={labelStyle}>
                Heterónimo (firma) *
              </label>
              <input
                id="ca-firma"
                name="firma"
                type="text"
                required
                placeholder="La cartógrafa muda, M., ..."
                className="avn-input"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <label htmlFor="ca-titulo" style={labelStyle}>
                Título de la carta *
              </label>
              <input
                id="ca-titulo"
                name="titulo"
                type="text"
                required
                placeholder="Sobre el idioma de..."
                className="avn-input"
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <label htmlFor="ca-texto" style={labelStyle}>
              La carta *
            </label>
            <textarea
              id="ca-texto"
              name="texto"
              required
              rows={10}
              placeholder="Estimada Sociedad: ..."
              className="avn-textarea"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "#A6A093",
              }}
            >
              * obligatorio · se publica solo tu heterónimo
            </span>
            <button
              type="submit"
              className="avn-lime-btn"
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
                letterSpacing: "0.06em",
                color: "#23231F",
                background: "#D6ED17",
                border: "1px solid #D6ED17",
                padding: "13px 24px",
                cursor: "pointer",
              }}
            >
              Enviar al archivo →
            </button>
          </div>
          {state.status === "error" && (
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 12,
                color: "#CC313D",
              }}
            >
              {state.message}
            </span>
          )}
        </div>
      </form>
    </section>
  );
}
