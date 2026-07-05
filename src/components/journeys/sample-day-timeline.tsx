import type { SampleDayMoment } from "@/lib/types";

export function SampleDayTimeline({ moments }: { moments: SampleDayMoment[] }) {
  if (!moments.length) return null;

  return (
    <div className="border border-border bg-surface p-6 md:p-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">A day on the trail</p>
      <h2 className="mt-2 font-serif text-2xl tracking-[-0.02em]">Sample rhythm</h2>
      <p className="mt-2 text-sm text-muted">Not an itinerary — a feeling for how time moves here.</p>
      <ol className="mt-8 space-y-0">
        {moments.map((m, i) => (
          <li key={m.title} className="relative flex gap-5 pb-8 last:pb-0">
            {i < moments.length - 1 && (
              <span className="absolute left-[3.25rem] top-8 h-full w-px bg-border" aria-hidden />
            )}
            <time className="w-12 shrink-0 pt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted">
              {m.time}
            </time>
            <div>
              <h3 className="font-medium text-foreground">{m.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{m.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
