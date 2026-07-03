import { TopBack } from "../../_components/ui";
import { Highlight } from "../../_components/Highlight";
import { EnviarForm } from "./EnviarForm";

export const revalidate = 120;

export default function EnviarPage() {
  return (
    <div>
      <TopBack href="/cartas" maxWidth={860}>
        ← volver a las cartas
      </TopBack>

      <header style={{ maxWidth: 860, margin: "0 auto", padding: "44px 40px 36px" }}>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#CC313D",
            marginBottom: 22,
          }}
        >
          Sección especial · tu turno
        </div>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: 62,
            lineHeight: 0.94,
            letterSpacing: "-0.035em",
            margin: 0,
            color: "#2C303A",
          }}
        >
          Enviar una{" "}
          <Highlight top={15} bottom={90} padX="0.12em">
            carta
          </Highlight>
        </h1>
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 19,
            lineHeight: 1.55,
            color: "#565E70",
            margin: "24px 0 0",
            maxWidth: 560,
          }}
        >
          Fírmala con el heterónimo que quieras. La sumamos al archivo sin decir
          quién eres.
        </p>
      </header>

      <EnviarForm />
    </div>
  );
}
