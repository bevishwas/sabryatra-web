import { Container, Section } from "@/components/layout/page-shell";

const defaultPillars = [
  "Small groups",
  "Slow travel",
  "Designed for you",
  "Wellness oriented",
];

export function PhilosophySection({ pillars }: { pillars?: string[] }) {
  const items = pillars?.length ? pillars.slice(0, 4) : defaultPillars;

  return (
    <Section className="bg-surface">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">Our philosophy</p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,5vw,3.25rem)] leading-[1.08] tracking-[-0.02em]">
              The journey itself is the destination
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Sabryatra is a way of moving through the Himalaya — unhurried, attentive, with room for silence.
              Small groups. Days with unscheduled hours. Photography and reflection woven into every path.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
            {items.map((pillar, i) => (
              <div key={pillar}>
                <span className="font-serif text-2xl text-foreground/15 md:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-sm font-medium leading-snug text-foreground">{pillar}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
