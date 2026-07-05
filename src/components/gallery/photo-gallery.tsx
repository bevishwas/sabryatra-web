"use client";

import { useCallback, useEffect, useState } from "react";
import { SanityImageComponent } from "@/components/shared/sanity-image";
import type { SanityImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function PhotoGallery({ images }: { images: SanityImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const prev = useCallback(() => {
    setActive((i) => (i === null ? null : i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);
  const next = useCallback(() => {
    setActive((i) => (i === null ? null : i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  useEffect(() => {
    if (active === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, prev, next]);

  if (images.length === 0) return null;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {images.map((image, i) => (
          <button
            key={`${image.url}-${i}`}
            type="button"
            className="relative aspect-[4/3] overflow-hidden bg-foreground"
            onClick={() => setActive(i)}
          >
            <SanityImageComponent image={image} fill sizes="(max-width:768px) 100vw, 33vw" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8"
          onClick={close}
          role="dialog"
          aria-modal
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-white md:right-8 md:top-8"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-white/70 hover:text-white md:left-6"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-white/70 hover:text-white md:right-6"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div className="relative max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <SanityImageComponent image={images[active]} className="max-h-[85vh]" />
            {(images[active].caption || images[active].alt) && (
              <p className="mt-4 text-center text-sm text-white/70">
                {images[active].caption ?? images[active].alt}
              </p>
            )}
            {images.length > 1 && (
              <p className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] text-white/40">
                {active + 1} / {images.length}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export function GalleryGrid({
  images,
  className,
  limit,
}: {
  images: Array<{ _id: string; image: SanityImage; title: string }>;
  className?: string;
  limit?: number;
}) {
  const visible = limit ? images.slice(0, limit) : images;

  return (
    <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4", className)}>
      {visible.map((item, index) => (
        <figure
          key={item._id}
          className={cn(
            "group overflow-hidden bg-foreground",
            index === 0 && visible.length > 1 && "sm:col-span-2 sm:row-span-2",
          )}
        >
          <div
            className={cn(
              "relative overflow-hidden",
              index === 0 && visible.length > 1
                ? "aspect-[16/10] sm:aspect-auto sm:min-h-[420px]"
                : "aspect-[4/3]",
            )}
          >
            <SanityImageComponent
              image={item.image}
              fill
              sizes={index === 0 ? "66vw" : "33vw"}
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
          <figcaption className="border border-t-0 border-border bg-surface px-4 py-3 text-sm text-muted">
            {item.title}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
