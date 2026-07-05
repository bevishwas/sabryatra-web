"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SanityImageComponent } from "@/components/shared/sanity-image";
import type { Journey } from "@/lib/types";
import { buildJourneyInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const moods = [
  { id: "stillness", label: "Stillness & gentle hills", emoji: "🌿" },
  { id: "devotion", label: "Spiritual depth & sacred trails", emoji: "🙏" },
  { id: "wilderness", label: "Remote vastness & silence", emoji: "🏔️" },
  { id: "freshness", label: "Forest paths & soft entry", emoji: "🌲" },
] as const;

type MoodId = (typeof moods)[number]["id"];

const moodThemeKeywords: Record<MoodId, string[]> = {
  stillness: ["stillness", "presence", "eternity", "gentle"],
  devotion: ["devotion", "holiness", "grace", "sacred", "spiritual", "humility"],
  wilderness: ["wilderness", "vastness", "belonging", "remote", "silence"],
  freshness: ["freshness", "tenderness", "harmony", "forest"],
};

function journeyMatchesMood(journey: Journey, mood: MoodId): boolean {
  if (journey.moods?.includes(mood)) return true;

  const keywords = moodThemeKeywords[mood];
  const haystack = [
    journey.slug,
    journey.title,
    journey.subtitle,
    ...journey.themes,
  ]
    .join(" ")
    .toLowerCase();
  return keywords.some((kw) => haystack.includes(kw));
}

export function JourneyFinder({ journeys }: { journeys: Journey[] }) {
  const [selected, setSelected] = useState<MoodId | null>(null);

  const matches = useMemo(() => {
    if (!selected) return [];
    return journeys.filter((j) => journeyMatchesMood(j, selected)).slice(0, 2);
  }, [selected, journeys]);

  return (
    <section id="find-your-journey" className="scroll-mt-20 border-y border-border bg-background py-12 md:scroll-mt-24 md:py-24">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 md:px-8 lg:px-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">Interactive</p>
        <h2 className="mt-3 font-serif text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] tracking-[-0.02em]">
          Find your journey
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          What calls you right now? Choose a mood — we&apos;ll suggest paths that match your inner landscape.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:mt-10 md:gap-3 lg:grid-cols-4">
          {moods.map((mood) => (
            <button
              key={mood.id}
              type="button"
              onClick={() => setSelected(mood.id)}
              className={`border p-5 text-left transition-all md:p-6 ${
                selected === mood.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-surface hover:border-foreground/30"
              }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <p className="mt-3 text-sm font-medium leading-snug">{mood.label}</p>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selected && matches.length > 0 && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-10"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">Your paths</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {matches.map((j) => (
                  <Link
                    key={j._id}
                    href={`/journeys/${j.slug}`}
                    className="group grid overflow-hidden border border-border bg-surface md:grid-cols-5"
                  >
                    <div className="relative aspect-[16/10] md:col-span-2 md:aspect-auto md:min-h-[160px]">
                      <SanityImageComponent image={j.cardImage} fill sizes="200px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col justify-center p-5 md:col-span-3 md:p-6">
                      <p className="text-[10px] uppercase tracking-[0.16em] text-muted">{j.themes.join(" · ")}</p>
                      <h3 className="mt-2 font-serif text-2xl tracking-[-0.02em]">{j.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted">{j.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button asChild>
                  <Link href="/contact">Plan this journey</Link>
                </Button>
                <Button asChild variant="whatsapp">
                  <a href={buildWhatsAppUrl(buildJourneyInquiryMessage(matches[0]?.title))} target="_blank" rel="noopener noreferrer">
                    Ask Vishal on WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
