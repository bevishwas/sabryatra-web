"use client";

import { useMemo, useState } from "react";
import { GalleryGrid } from "@/components/gallery/photo-gallery";
import type { GalleryImage, Journey } from "@/lib/types";
import { cn } from "@/lib/utils";

export function GalleryWithFilter({
  images,
  journeys,
}: {
  images: GalleryImage[];
  journeys: Journey[];
}) {
  const [active, setActive] = useState<string>("all");

  const filtered = useMemo(() => {
    if (active === "all") return images;
    return images.filter((img) => img.journeySlug === active);
  }, [active, images]);

  const journeyTitles = useMemo(() => {
    const map = new Map(journeys.map((j) => [j.slug, j.title]));
    return map;
  }, [journeys]);

  return (
    <div>
      <div className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1 scroll-smooth [scrollbar-width:none] max-md:snap-x max-md:snap-mandatory md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        <FilterChip active={active === "all"} onClick={() => setActive("all")} label="All" />
        {journeys.map((j) => (
          <FilterChip
            key={j.slug}
            active={active === j.slug}
            onClick={() => setActive(j.slug)}
            label={j.title}
          />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted">No photos for this journey yet.</p>
      ) : (
        <GalleryGrid
          images={filtered.map((i) => ({ _id: i._id, image: i.image, title: i.title }))}
        />
      )}

      {active !== "all" && (
        <p className="mt-6 text-[11px] uppercase tracking-[0.16em] text-muted">
          Showing {filtered.length} from {journeyTitles.get(active) ?? active}
        </p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "border px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors max-md:shrink-0 max-md:snap-start",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-surface text-muted hover:border-foreground/30 hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
