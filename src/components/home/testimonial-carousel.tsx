"use client";

import { useState } from "react";
import type { Testimonial } from "@/lib/types";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];
  if (!current) return null;

  const prev = () => setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <div className="relative border border-border bg-surface p-5 md:p-12">
      <Quote className="h-8 w-8 text-accent/40" />
      <blockquote className="mt-6 font-serif text-[clamp(1.35rem,3vw,2rem)] leading-relaxed tracking-[-0.01em] text-foreground">
        &ldquo;{current.quote}&rdquo;
      </blockquote>
      <footer className="mt-8 flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{current.name}</p>
        {testimonials.length > 1 && (
          <div className="flex gap-2">
            <button type="button" onClick={prev} className="flex h-9 w-9 items-center justify-center border border-border" aria-label="Previous">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={next} className="flex h-9 w-9 items-center justify-center border border-border" aria-label="Next">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </footer>
    </div>
  );
}
