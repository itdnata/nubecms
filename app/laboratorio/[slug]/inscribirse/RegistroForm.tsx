"use client";

import Link from "next/link";
import { useActionState } from "react";
import { submitRegistro, type RegistroState } from "@/app/actions";

const labelStyle: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 11,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#8A93A6",
};

export function RegistroForm({ curso }: { curso: string }) {
  const [state, formAction] = useActionState<RegistroState, FormData>(
    submitRegistro,
    { status: "idle" }
  );

  if (state.status === "ok") {
    return (
      <section className="avn-container" style={{ maxWidth: 860, margin: "0 auto", padding: "0 40px 70px" }}>
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
            Inscripción recibida ✓
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
            Gracias, {state.nombre}.
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
            Te escribiré a{" "}
            <strong style={{ color: "#FBF7F3" }}>{state.correo}</strong> con los
            detalles de «{state.curso}». Mientras tanto, hay mucho para leer.
          </p>
          <Link
            href="/laboratorio"
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
            ← volver al laboratorio
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="avn-container" style={{ maxWidth: 860, margin: "0 auto", padding: "0 40px 70px" }}>
      <form
        action={formAction}
        style={{
          border: "1px solid #E4DED6",
          background: "#FDFBF8",
          boxShadow: "0 12px 40px rgba(44,48,58,0.06)",
          padding: "38px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 26,
        }}
      >
        <input type="hidden" name="curso" value={curso} />
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          <label htmlFor="reg-nombre" style={labelStyle}>
            Nombre *
          </label>
          <input
            id="reg-nombre"
            name="nombre"
            type="text"
            required
            placeholder="¿Cómo te llamas?"
            className="avn-input"
          />
        </div>
        <div
          className="avn-stack"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <label htmlFor="reg-correo" style={labelStyle}>
              Correo *
            </label>
            <input
              id="reg-correo"
              name="correo"
              type="email"
              required
              placeholder="tu@correo.com"
              className="avn-input"
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            <label htmlFor="reg-tel" style={labelStyle}>
              Teléfono
            </label>
            <input
              id="reg-tel"
              name="telefono"
              type="tel"
              placeholder="+57 ..."
              className="avn-input"
            />
          </div>
        </div>
        <div
          className="avn-stack-flex"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
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
            * obligatorio · tus datos no salen de aquí
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
            Enviar inscripción →
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
      </form>
    </section>
  );
}
