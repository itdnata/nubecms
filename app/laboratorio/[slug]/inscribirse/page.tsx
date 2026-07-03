import { notFound } from "next/navigation";
import { getCourse } from "@/lib/data";
import { TopBack } from "../../../_components/ui";
import { Highlight } from "../../../_components/Highlight";
import { RegistroForm } from "./RegistroForm";

export const revalidate = 300;

export default async function InscribirsePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const curso = await getCourse(slug);
  if (!curso) notFound();

  return (
    <div>
      <TopBack href="/laboratorio" maxWidth={860}>
        ← volver al laboratorio
      </TopBack>

      <header style={{ maxWidth: 860, margin: "0 auto", padding: "44px 40px 36px" }}>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#7B9ACC",
            marginBottom: 22,
          }}
        >
          Laboratorio · inscripción
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
          Apuntarme a{" "}
          <Highlight top={15} bottom={90} padX="0.12em">
            {curso.title}
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
          Déjame tus datos y te escribo con las fechas, el enlace y lo que haga
          falta llevar (casi siempre, solo ganas).
        </p>
      </header>

      <RegistroForm curso={curso.title} />
    </div>
  );
}
