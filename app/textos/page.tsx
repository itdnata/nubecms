import Link from "next/link";
import { getPosts, getReviews, getNotes } from "@/lib/data";
import { TopBack, SectionLabel, ImagePlaceholder } from "../_components/ui";

export const revalidate = 120;

export default async function TextosPage() {
  const [posts, reviews, notes] = await Promise.all([
    getPosts(),
    getReviews(),
    getNotes(),
  ]);

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
          Ensayos · reseñas · notas
        </div>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontWeight: 700,
            fontSize: "clamp(46px, 11vw, 96px)",
            lineHeight: 0.9,
            letterSpacing: "-0.04em",
            margin: 0,
            color: "#2C303A",
          }}
        >
          Textos
        </h1>
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 22,
            lineHeight: 1.55,
            color: "#565E70",
            margin: "30px 0 0",
            maxWidth: 640,
          }}
        >
          Todo lo que se lee sin prisa: ensayos largos, reseñas de lo que me
          marcó y notas breves de curiosidad.
        </p>
      </header>

      {/* ENSAYOS */}
      <section className="avn-container" style={{ maxWidth: 1120, margin: "0 auto", padding: "12px 40px 0" }}>
        <SectionLabel>Ensayos</SectionLabel>
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/textos/${post.slug}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <article
              className="avn-stack"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 44,
                alignItems: "stretch",
                padding: "34px 0",
                borderBottom: "1px solid #E4DED6",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: 16,
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }}
                >
                  <span style={{ color: "#7B9ACC" }}>
                    <span style={{ color: "#B7B0A2" }}>{post.seq}</span>
                    &nbsp;&nbsp;{post.kicker}
                  </span>
                  <span style={{ color: "#A6A093", letterSpacing: "0.1em" }}>
                    {post.reading_time}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "Georgia, serif",
                    fontWeight: 700,
                    fontSize: 34,
                    lineHeight: 1.03,
                    letterSpacing: "-0.02em",
                    margin: "0 0 14px",
                    color: "#2C303A",
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: 17,
                    lineHeight: 1.55,
                    color: "#565E70",
                    margin: 0,
                  }}
                >
                  {post.dek}
                </p>
              </div>
              {post.cover ? (
                <div
                  role="img"
                  aria-label={post.cover.alt ?? post.title}
                  style={{
                    position: "relative",
                    minHeight: 210,
                    backgroundImage: `url('${post.cover.public_url}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ) : (
                <ImagePlaceholder label={`imagen — ${post.seq}`} />
              )}
            </article>
          </Link>
        ))}
      </section>

      {/* RESEÑAS */}
      <section className="avn-container" style={{ maxWidth: 1120, margin: "0 auto", padding: "60px 40px 0" }}>
        <SectionLabel>Reseñas</SectionLabel>
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
          {reviews.map((r) => (
            <article
              key={r.id}
              style={{ background: "#FBF7F3", padding: "30px 26px" }}
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
                {r.tag}
              </div>
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontWeight: 700,
                  fontSize: 24,
                  lineHeight: 1.15,
                  margin: "0 0 12px",
                  color: "#2C303A",
                }}
              >
                {r.title}
              </h3>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 16,
                  lineHeight: 1.55,
                  color: "#565E70",
                  margin: 0,
                }}
              >
                {r.note}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* NOTAS */}
      <section
        style={{
          background: "#2C303A",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginTop: 60,
        }}
      >
        <div className="avn-container" style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 40px" }}>
          <SectionLabel
            color="#8A93A6"
            borderColor="#444B58"
            borderWidth={1}
            marginBottom={10}
          >
            Notas &amp; curiosidades
          </SectionLabel>
          {notes.map((n) => (
            <div
              key={n.id}
              style={{
                display: "grid",
                gridTemplateColumns: "88px 1fr",
                gap: 28,
                padding: "20px 0",
                borderBottom: "1px solid #3B424F",
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 30,
                  color: "#7B9ACC",
                  letterSpacing: "-0.02em",
                }}
              >
                {n.num}
              </span>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 20,
                  lineHeight: 1.5,
                  margin: 0,
                  color: "#ECE7E0",
                }}
              >
                {n.text}
              </p>
            </div>
          ))}
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
