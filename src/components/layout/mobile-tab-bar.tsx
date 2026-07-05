"use client";

import { cn } from "@/lib/utils";
import { Compass, Home, ImageIcon, Mail, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home", Icon: Home, match: (p: string) => p === "/" },
  { href: "/journeys", label: "Trips", Icon: Compass, match: (p: string) => p.startsWith("/journeys") },
  { href: "/stories", label: "Stories", Icon: BookOpen, match: (p: string) => p.startsWith("/stories") },
  { href: "/gallery", label: "Photos", Icon: ImageIcon, match: (p: string) => p.startsWith("/gallery") },
  { href: "/contact", label: "Contact", Icon: Mail, match: (p: string) => p.startsWith("/contact") },
];

/** Bottom navigation — phones only (< md / 768px). Hidden on tablet and desktop. */
export function MobileTabBar() {
  const pathname = usePathname();

  // Journey detail uses its own sticky WhatsApp bar
  if (pathname.match(/^\/journeys\/[^/]+$/)) return null;

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 hidden max-md:block border-t border-border bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/90"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex h-[3.25rem] items-stretch">
        {tabs.map(({ href, label, Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex min-h-[44px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 px-0.5 py-1 active:opacity-70",
                active ? "text-foreground" : "text-muted",
              )}
            >
              <Icon className="h-[1.35rem] w-[1.35rem] shrink-0" strokeWidth={active ? 2.25 : 1.75} />
              <span className={cn("max-w-full truncate text-[10px] leading-none", active ? "font-semibold" : "font-medium")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
