import type { CSSProperties } from "react";

// Resaltado verde-lima con box-decoration-break (del mockup).
export function Highlight({
  children,
  top = 15,
  bottom = 90,
  padX = "0.24em",
}: {
  children: React.ReactNode;
  top?: number;
  bottom?: number;
  padX?: string;
}) {
  const style: CSSProperties = {
    background: `linear-gradient(to bottom, transparent ${top}%, #D6ED17 ${top}%, #D6ED17 ${bottom}%, transparent ${bottom}%)`,
    WebkitBoxDecorationBreak: "clone",
    boxDecorationBreak: "clone",
    padding: `0 ${padX}`,
  };
  return <span style={style}>{children}</span>;
}
