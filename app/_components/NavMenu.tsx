import Link from "next/link";

// Menú de navegación global. Píldora flotante fija arriba-derecha en escritorio;
// en móvil se convierte en barra flotante inferior (ver reglas en globals.css).
// Server Component: los enlaces se muestran siempre, sin estado ni JS.
const LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/textos", label: "Textos" },
  { href: "/laboratorio", label: "Laboratorio" },
];

export function NavMenu() {
  return (
    <nav className="avn-menu" aria-label="Navegación principal">
      {LINKS.map((l) => (
        <Link key={l.href} href={l.href} className="avn-menu-link avn-nav-link">
          {l.label}
        </Link>
      ))}
      <Link href="/cartas" className="avn-menu-link avn-menu-cta avn-nav-cta">
        Cartas
      </Link>
    </nav>
  );
}
