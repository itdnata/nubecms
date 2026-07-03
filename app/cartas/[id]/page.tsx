import Link from "next/link";
import { notFound } from "next/navigation";
import { getLetter } from "@/lib/data";
import { TopBack } from "../../_components/ui";
import type { LetterLine } from "@/lib/types";

export const revalidate = 300;

function fileNameFor(title: string, fileName: string | null): string {
  if (fileName) return fileName;
  const accents: Record<string, string> = {
    á: "a", é: "e", í: "i", ó: "o", ú: "u", ü: "u", ñ: "n",
  };
  const slug = title
    .toLowerCase()
    .replace(/[áéíóúüñ]/g, (m) => accents[m] || m)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${slug || "carta"}.txt`;
}

export default async function CartaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const carta = await getLetter(id);
  if (!carta) notFound();

  const lines: LetterLine[] =
    carta.body && carta.body.length > 0
      ? carta.body
      : [{ n: 1, b: "", t: carta.excerpt }];
  const cursorNum = lines[lines.length - 1].n + 1;
  const file = fileNameFor(carta.title, carta.file_name);

  return (
    <div>
      <TopBack href="/cartas" maxWidth={860}>
        ← volver a las cartas
      </TopBack>

      <div style={{ maxWidth: 860, margin: "30px auto 0", padding: "0 40px 70px" }}>
        <div
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
            <span style={{ color: "#565E70" }}>{file}</span>
            <span
              style={{
                marginLeft: "auto",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontSize: 10.5,
                color: "#A6A093",
              }}
            >
              Texto plano · sin guardar
            </span>
          </div>

          <div
            style={{
              padding: "24px 22px 30px",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 15,
              lineHeight: 1.9,
              color: "#2C303A",
            }}
          >
            {lines.map((ln) => (
              <div
                key={ln.n}
                style={{ display: "grid", gridTemplateColumns: "52px 1fr" }}
              >
                <span
                  style={{
                    textAlign: "right",
                    paddingRight: 20,
                    color: "#C4BDAE",
                    userSelect: "none",
                  }}
                >
                  {ln.n}
                </span>
                <span style={{ whiteSpace: "pre-wrap" }}>
                  {ln.b && (
                    <strong style={{ fontWeight: 700, color: "#1F232B" }}>
                      {ln.b}
                    </strong>
                  )}
                  {ln.t}
                  {ln.href && (
                    <>
                      <a
                        href={ln.href}
                        target="_blank"
                        rel="noopener"
                        style={{
                          color: "#CC313D",
                          fontStyle: "italic",
                          textDecoration: "none",
                          borderBottom: "1px solid #CC313D",
                        }}
                      >
                        {ln.link}
                      </a>
                      {ln.post}
                    </>
                  )}
                </span>
              </div>
            ))}
            <div style={{ display: "grid", gridTemplateColumns: "52px 1fr" }}>
              <span
                style={{
                  textAlign: "right",
                  paddingRight: 20,
                  color: "#C4BDAE",
                  userSelect: "none",
                }}
              >
                {cursorNum}
              </span>
              <span>
                <span
                  style={{
                    display: "inline-block",
                    width: 9,
                    height: 17,
                    background: "#565E70",
                    transform: "translateY(3px)",
                    animation: "avn-blink 1.1s steps(1) infinite",
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "6px 40px 70px",
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
          href="/cartas"
          style={{
            color: "#CC313D",
            textDecoration: "none",
            borderBottom: "1px solid #CC313D",
            paddingBottom: 2,
          }}
        >
          ← volver a las cartas
        </Link>
        <span>Firmado con heterónimo</span>
      </footer>
    </div>
  );
}
