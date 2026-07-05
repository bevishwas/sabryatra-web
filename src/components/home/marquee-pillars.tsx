"use client";

const fallback = [
  "Small Group",
  "Slow Travel",
  "Designed For You",
  "Wellness Oriented",
  "Cinematic Storytelling",
  "Himalayan Journeys",
  "Photography",
  "Silence & Stillness",
];

export function MarqueePillars({ pillars }: { pillars?: string[] }) {
  const items = pillars?.length ? pillars : fallback;
  const row = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border bg-foreground py-4 text-white">
      <div className="flex animate-marquee whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mx-6 flex items-center gap-6 text-[11px] font-medium uppercase tracking-[0.22em] text-white/80"
          >
            {item}
            <span className="text-white/30">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
