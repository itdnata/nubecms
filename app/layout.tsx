import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "A vuelo de nube",
  description:
    "Ensayos, reseñas y curiosidades para leer sin prisa. Un cuaderno personal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ChromeBar />
        {children}
      </body>
    </html>
  );
}

/* Barra superior "editor" — presente en todas las pantallas (del mockup) */
function ChromeBar() {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "12px 22px",
        background: "#F2EDE7",
        borderBottom: "1px solid #E4DED6",
        fontFamily: "'IBM Plex Mono', monospace",
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#CC313D" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#D8C48A" }} />
        <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#7B9ACC" }} />
      </div>
      <span style={{ fontSize: 12.5, color: "#6B7280", letterSpacing: "0.02em" }}>
        a vuelo de nube
      </span>
      <span
        style={{
          display: "inline-block",
          width: 7,
          height: 15,
          background: "#565E70",
          animation: "avn-blink 1.1s steps(1) infinite",
        }}
      />
      <span
        style={{
          marginLeft: "auto",
          fontSize: 11,
          color: "#A6A093",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Español · Nº 01
      </span>
    </div>
  );
}
