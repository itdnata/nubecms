import Link from "next/link";

// Enlace "← volver ..." en la parte superior de las pantallas internas.
export function TopBack({
  href,
  children,
  maxWidth = 1120,
}: {
  href: string;
  children: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <div className="avn-container" style={{ maxWidth, margin: "0 auto", padding: "20px 40px 0" }}>
      <Link
        href={href}
        className="avn-back"
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.08em",
          color: "#565E70",
          textDecoration: "none",
        }}
      >
        {children}
      </Link>
    </div>
  );
}

// Etiqueta de sección con línea inferior (mono, uppercase).
export function SectionLabel({
  children,
  color = "#8A93A6",
  borderColor = "#2C303A",
  borderWidth = 2,
  marginBottom = 4,
  letterSpacing = "0.24em",
}: {
  children: React.ReactNode;
  color?: string;
  borderColor?: string;
  borderWidth?: number;
  marginBottom?: number;
  letterSpacing?: string;
}) {
  return (
    <div
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 11,
        letterSpacing,
        textTransform: "uppercase",
        color,
        paddingBottom: 8,
        borderBottom: `${borderWidth}px solid ${borderColor}`,
        marginBottom,
      }}
    >
      {children}
    </div>
  );
}

// Placeholder de imagen con patrón diagonal (del mockup).
export function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div
      style={{
        position: "relative",
        minHeight: 210,
        background:
          "repeating-linear-gradient(135deg, #E7E0F0, #E7E0F0 16px, #DCE2F0 16px, #DCE2F0 32px)",
        display: "flex",
        alignItems: "flex-end",
        padding: 14,
      }}
    >
      <span
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#6B7280",
          background: "#FBF7F3",
          padding: "5px 9px",
        }}
      >
        {label}
      </span>
    </div>
  );
}
