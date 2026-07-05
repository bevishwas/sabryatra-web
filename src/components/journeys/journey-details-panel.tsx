import { Check } from "lucide-react";
import type { Journey } from "@/lib/types";

export function JourneyDetailsPanel({ journey }: { journey: Journey }) {
  const facts = [
    { label: "Duration", value: journey.duration },
    { label: "Best season", value: journey.bestSeason },
    { label: "Group size", value: journey.groupSize },
    { label: "Pace", value: journey.pace },
    { label: "Difficulty", value: journey.difficulty },
    { label: "Starting point", value: journey.startingPoint },
  ].filter((f) => f.value);

  return (
    <div className="space-y-5">
      {facts.length > 0 && (
        <div className="border border-border bg-surface p-6">
          <h2 className="font-serif text-2xl tracking-[-0.02em]">Journey details</h2>
          <dl className="mt-5 space-y-4">
            {facts.map((d) => (
              <div key={d.label}>
                <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">{d.label}</dt>
                <dd className="mt-1 text-foreground">{d.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {journey.bestFor && journey.bestFor.length > 0 && (
        <div className="border border-border bg-surface p-6">
          <h2 className="font-serif text-xl tracking-[-0.02em]">Best for</h2>
          <ul className="mt-4 space-y-2">
            {journey.bestFor.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {journey.inclusions && journey.inclusions.length > 0 && (
        <div className="border border-border bg-surface p-6">
          <h2 className="font-serif text-xl tracking-[-0.02em]">What&apos;s included</h2>
          <ul className="mt-4 space-y-2">
            {journey.inclusions.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {journey.mapEmbedUrl && (
        <div className="border border-border bg-surface p-2">
          <h2 className="px-4 pt-4 font-serif text-xl tracking-[-0.02em]">Region</h2>
          <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden bg-muted/20">
            <iframe
              src={journey.mapEmbedUrl}
              title={`Map for ${journey.title}`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </div>
  );
}
