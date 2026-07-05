"use client";

import Link from "next/link";
import { useRef } from "react";
import { SanityImageComponent } from "@/components/shared/sanity-image";
import { Button } from "@/components/ui/button";
import type { Journey } from "@/lib/types";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { getJourneyTheme } from "@/lib/journey-themes";

function JourneyCard({
  journey,
  index,
  compact = false,
}: {
  journey: Journey;
  index: number;
  compact?: boolean;
}) {
  const theme = getJourneyTheme(journey.slug);

  return (
    <Link
      href={`/journeys/${journey.slug}`}
      className={
        compact
          ? "group flex items-center gap-4 border border-border bg-surface p-3 transition-colors hover:border-foreground/25"
          : "group relative w-[82vw] max-w-[320px] shrink-0 snap-center overflow-hidden bg-foreground sm:w-[72vw] md:w-[380px]"
      }
      style={compact ? undefined : { minHeight: 360 }}
    >
      {compact ? (
        <>
          <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-foreground">
            <SanityImageComponent image={journey.cardImage} fill sizes="64px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
              {journey.themes[0] ?? "Journey"}
            </p>
            <h3 className="mt-0.5 font-serif text-lg tracking-[-0.02em]">{journey.title}</h3>
            <p className="mt-1 line-clamp-1 text-xs text-muted">{journey.excerpt}</p>
          </div>
          <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </>
      ) : (
        <>
          <SanityImageComponent
            image={journey.cardImage}
            fill
            sizes="320px"
            className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute left-0 top-0 p-4 md:p-5">
            <span className="font-serif text-4xl text-white/20 md:text-5xl">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <span
              className="inline-block px-2 py-1 text-[9px] font-medium uppercase tracking-[0.16em]"
              style={{ backgroundColor: theme.muted, color: theme.accent }}
            >
              {journey.themes[0] ?? "Journey"}
            </span>
            <h3 className="mt-2 font-serif text-2xl text-white md:mt-3 md:text-3xl">{journey.title}</h3>
            <p className="mt-1.5 line-clamp-2 text-xs text-white/70 md:mt-2 md:text-sm">{journey.excerpt}</p>
          </div>
        </>
      )}
    </Link>
  );
}

export function JourneyScrollRail({ journeys }: { journeys: Journey[] }) {
  const rail = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    rail.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  if (journeys.length === 0) return null;

  const countLabel = `${journeys.length} ${journeys.length === 1 ? "journey" : "journeys"}`;

  return (
    <div className="relative overflow-hidden">
      <Container className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-6">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">Explore</p>
          <h2 className="mt-2 font-serif text-2xl tracking-[-0.02em] md:text-3xl lg:text-4xl">
            The Himalayan atlas
          </h2>
          <p className="mt-2 text-sm text-muted">
            {countLabel} — each path is designed around stillness, presence, and unhurried pace.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="outline" size="sm" className="md:hidden">
            <Link href="/journeys">View all</Link>
          </Button>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center border border-border bg-surface"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center border border-border bg-surface"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <Button asChild variant="outline" size="sm">
              <Link href="/journeys">View all</Link>
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile + tablet: show every journey without horizontal scroll */}
      <div className="grid grid-cols-1 gap-2.5 px-4 sm:grid-cols-2 sm:px-6 md:hidden">
        {journeys.map((j, i) => (
          <JourneyCard key={j._id} journey={j} index={i} compact />
        ))}
      </div>

      {/* Desktop: cinematic horizontal rail */}
      <div
        ref={rail}
        className="hidden gap-4 overflow-x-auto px-8 pb-2 scroll-smooth md:flex lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {journeys.map((j, i) => (
          <JourneyCard key={j._id} journey={j} index={i} />
        ))}
        <div className="w-8 shrink-0" aria-hidden />
      </div>
    </div>
  );
}

function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-4 sm:px-6 md:px-8 lg:px-10 ${className ?? ""}`}>
      {children}
    </div>
  );
}
