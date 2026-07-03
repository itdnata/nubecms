import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/data";
import { Highlight } from "../../_components/Highlight";
import type { PostBlock } from "@/lib/types";

export const dynamic = "force-dynamic";

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
function monthYear(d: string | null): string {
  if (!d) return "";
  const [y, m] = d.split("-");
  return `${MESES[Number(m) - 1]} ${y}`;
}

function TitleWithHighlight({ title, hl }: { title: string; hl: string | null }) {
  if (!hl || !title.includes(hl)) return <>{title}</>;
  const i = title.indexOf(hl);
  return (
    <>
      {title.slice(0, i)}
      <Highlight top={16} bottom={90} padX="0.08em">
        {hl}
      </Highlight>
      {title.slice(i + hl.length)}
    </>
  );
}

function Block({ block }: { block: PostBlock }) {
  if (block.type === "p") {
    return (
      <p
        className={block.drop ? "avn-drop avn-just" : "avn-just"}
        style={{ margin: "0 0 24px" }}
      >
        {block.text}
      </p>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote
        style={{
          margin: "52px 0",
          padding: "0 0 0 34px",
          borderLeft: "3px solid #D6ED17",
          position: "relative",
        }}
      >
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 34,
            lineHeight: 1.28,
            letterSpacing: "-0.01em",
            color: "#2C303A",
            margin: 0,
            position: "relative",
          }}
        >
          <br />
          {block.text}
        </p>
        {block.cite && (
          <cite
            style={{
              display: "block",
              marginTop: 18,
              fontFamily: "'IBM Plex Mono', monospace",
              fontStyle: "normal",
              fontSize: 11,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#8A93A6",
            }}
          >
            {block.cite}
          </cite>
        )}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 8,
            top: -5,
            fontFamily: "Georgia, serif",
            fontSize: 92,
            lineHeight: 1,
            color: "#D6ED17",
            pointerEvents: "none",
          }}
        >
          &ldquo;
        </span>
      </blockquote>
    );
  }
  if (block.type === "h2") {
    return (
      <h2
        style={{
          fontFamily: "Georgia, serif",
          fontWeight: 700,
          fontSize: 32,
          lineHeight: 1.08,
          letterSpacing: "-0.02em",
          margin: "44px 0 18px",
          color: "#2C303A",
        }}
      >
        {block.text}
      </h2>
    );
  }
  if (block.type === "end") {
    return (
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12.5,
          letterSpacing: "0.06em",
          color: "#B7B0A2",
          margin: "36px 0 10px",
        }}
      >
        — fin —
      </div>
    );
  }
  return null;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article>
      {/* HERO */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: "94vh",
          background:
            "repeating-linear-gradient(135deg, #E7E0F0, #E7E0F0 20px, #DCE2F0 20px, #DCE2F0 40px)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(251,247,243,0.94) 0%, rgba(251,247,243,0.45) 34%, rgba(251,247,243,0.05) 60%, rgba(251,247,243,0.35) 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "22px 44px",
            fontFamily: "'IBM Plex Mono', monospace",
          }}
        >
          <Link
            href="/"
            className="avn-back"
            style={{
              fontSize: 12,
              letterSpacing: "0.08em",
              color: "#565E70",
              textDecoration: "none",
            }}
          >
            ← volver al índice
          </Link>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#8A93A6",
            }}
          >
            {post.seq} / {monthYear(post.published_at)}
          </span>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6B7280",
              opacity: 0.5,
              border: "1px solid rgba(86,94,112,0.35)",
              padding: "8px 14px",
            }}
          >
            imagen — fotografía de portada · arrastra la tuya
          </span>
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 44px 60px",
            maxWidth: 1040,
          }}
        >
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#CC313D",
              marginBottom: 22,
            }}
          >
            {post.kicker}
          </div>
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              fontSize: 92,
              lineHeight: 0.92,
              letterSpacing: "-0.035em",
              margin: 0,
              color: "#2C303A",
            }}
          >
            <TitleWithHighlight title={post.title} hl={post.title_highlight} />
          </h1>
          {post.subtitle && (
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
                fontSize: 24,
                lineHeight: 1.4,
                color: "#4A5262",
                margin: "26px 0 0",
                maxWidth: 620,
              }}
            >
              {post.subtitle}
            </p>
          )}
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 44px 22px",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            letterSpacing: "0.04em",
            color: "#9AA0AD",
          }}
        >
          {post.cover_caption}
        </div>
      </div>

      {/* BODY + ASIDE */}
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "56px 40px 0",
          display: "grid",
          gridTemplateColumns: "300px 1fr",
          gap: 60,
          alignItems: "start",
        }}
      >
        <div
          style={{
            order: 2,
            fontFamily: "Georgia, serif",
            fontSize: 20,
            lineHeight: 1.72,
            color: "#2C2E33",
            position: "relative",
          }}
        >
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        <aside
          style={{
            order: 1,
            position: "sticky",
            top: 78,
            borderTop: "2px solid #2C303A",
            paddingTop: 20,
            fontFamily: "'IBM Plex Mono', monospace",
            textAlign: "left",
          }}
        >
          <div
            style={{
              fontSize: 10.5,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8A93A6",
              marginBottom: 10,
            }}
          >
            Autora
          </div>
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 21,
              color: "#2C303A",
              marginBottom: 8,
            }}
          >
            {post.author_name}
          </div>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 15,
              lineHeight: 1.55,
              color: "#565E70",
              margin: 0,
            }}
          >
            {post.author_bio}
          </p>

          <div style={{ height: 1, background: "#E4DED6", margin: "22px 0" }} />

          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 11,
              fontSize: 12.5,
              justifyContent: "flex-start",
            }}
          >
            <span style={{ color: "#8A93A6", minWidth: 78 }}>Publicado</span>
            <span style={{ color: "#2C303A" }}>{post.published_at}</span>
          </div>
          <div
            style={{
              display: "flex",
              gap: 12,
              fontSize: 12.5,
              justifyContent: "flex-start",
            }}
          >
            <span style={{ color: "#8A93A6", minWidth: 78 }}>Lectura</span>
            <span style={{ color: "#2C303A" }}>{post.reading_time}</span>
          </div>

          <div style={{ height: 1, background: "#E4DED6", margin: "22px 0" }} />

          <div
            style={{
              fontSize: 10.5,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#8A93A6",
              marginBottom: 12,
            }}
          >
            Etiquetas
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              justifyContent: "flex-start",
            }}
          >
            {post.tags.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 12,
                  color: "#CC313D",
                  border: "1px solid #E7B8BC",
                  padding: "4px 10px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </aside>
      </div>

      <footer
        style={{
          maxWidth: 1120,
          margin: "48px auto 0",
          padding: "24px 40px 70px",
          borderTop: "1px solid #E4DED6",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12.5,
            letterSpacing: "0.06em",
            color: "#CC313D",
            textDecoration: "none",
            borderBottom: "1px solid #CC313D",
            paddingBottom: 3,
          }}
        >
          ← volver al índice
        </Link>
      </footer>
    </article>
  );
}
