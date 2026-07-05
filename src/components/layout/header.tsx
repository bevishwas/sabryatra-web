"use client";

import { Container } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/journeys", label: "Journeys" },
  { href: "/stories", label: "Stories" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (href: string) =>
    cn(
      "relative whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.14em] transition-colors",
      pathname.startsWith(href)
        ? solid
          ? "text-foreground"
          : "text-white"
        : solid
          ? "text-muted hover:text-foreground"
          : "text-white/75 hover:text-white",
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "border-b border-border/70 bg-background/90 shadow-sm backdrop-blur-xl"
          : "bg-gradient-to-b from-black/55 via-black/20 to-transparent",
      )}
    >
      <Container>
        <div className="flex h-14 items-center justify-between gap-3 md:h-16 lg:h-[4.5rem]">
          <Link href="/" className="min-w-0 shrink-0">
            <span
              className={cn(
                "block font-serif text-lg leading-none tracking-[-0.02em] md:text-xl lg:text-[1.65rem]",
                solid ? "text-foreground" : "text-white",
              )}
            >
              Sabryatra
            </span>
            <span
              className={cn(
                "mt-0.5 block text-[8px] uppercase tracking-[0.24em] md:text-[9px] lg:text-[10px]",
                solid ? "text-muted" : "text-white/70",
              )}
            >
              सब्रयात्रा
            </span>
          </Link>

          {/* Desktop + tablet nav — hidden on mobile (bottom tabs handle phones) */}
          <nav className="hidden items-center gap-4 md:flex lg:gap-7">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
                {pathname.startsWith(link.href) && (
                  <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-current opacity-80" />
                )}
              </Link>
            ))}
          </nav>

          <Button
            asChild
            size="sm"
            variant={solid ? "default" : "light"}
            className="hidden shrink-0 md:inline-flex"
          >
            <Link href="/contact">Plan journey</Link>
          </Button>
        </div>
      </Container>
    </header>
  );
}
