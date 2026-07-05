import Link from "next/link";
import { SanityImageComponent } from "@/components/shared/sanity-image";
import { cn } from "@/lib/utils";
import type { Journey } from "@/lib/types";
import { ArrowUpRight } from "lucide-react";

export function JourneyCard({ journey, featured = false }: { journey: Journey; featured?: boolean }) {
  return (
    <Link
      href={`/journeys/${journey.slug}`}
      className={cn(
        "group relative block overflow-hidden bg-foreground",
        featured ? "min-h-[440px] lg:col-span-2 lg:row-span-2 lg:min-h-[640px]" : "min-h-[360px] md:min-h-[420px]",
      )}
    >
      <SanityImageComponent
        image={journey.cardImage}
        fill
        sizes={featured ? "(max-width:1024px) 100vw, 66vw" : "(max-width:1024px) 100vw, 33vw"}
        className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/65">
              {journey.themes.join(" · ")}
            </p>
            <h3
              className={cn(
                "mt-2 font-serif leading-[1.05] tracking-[-0.02em] text-white",
                featured ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl",
              )}
            >
              {journey.title}
            </h3>
            <p className={cn("mt-3 max-w-md text-sm leading-relaxed text-white/75", featured ? "md:text-base" : "line-clamp-2")}>
              {journey.excerpt}
            </p>
          </div>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-foreground">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
