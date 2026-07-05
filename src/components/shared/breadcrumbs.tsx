import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs({
  items,
  variant = "default",
}: {
  items: Array<{ label: string; href?: string }>;
  variant?: "default" | "onDark";
}) {
  const onDark = variant === "onDark";

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "mb-6 text-[11px] font-medium uppercase tracking-[0.14em]",
        onDark ? "text-white/55" : "text-muted",
      )}
    >
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3 w-3 shrink-0 opacity-40" />}
            {item.href ? (
              <Link
                href={item.href}
                className={cn("transition-colors", onDark ? "hover:text-white" : "hover:text-foreground")}
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn(onDark ? "text-white/90" : "text-foreground")}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
