import { JourneyCard } from "@/components/journeys/journey-card";
import { Container, Section, SectionHeader } from "@/components/layout/page-shell";
import { mergeSeo } from "@/lib/metadata";
import { getJourneys } from "@/lib/data";

export async function generateMetadata() {
  return mergeSeo({
    title: "Himalayan Journeys | Slow Travel Experiences | Sabryatra",
    description:
      "Explore Sabryatra's soulful Himalayan journeys — small-group slow travel designed around stillness, presence, and unhurried pace.",
  }, undefined, "/journeys");
}

export default async function JourneysPage() {
  const journeys = await getJourneys();
  const [featured, ...rest] = journeys;
  const countLabel =
    journeys.length === 0
      ? "Paths through the Himalaya"
      : journeys.length === 1
        ? "One path through the Himalaya"
        : `${journeys.length} paths through the Himalaya`;

  return (
    <>
      <Section className="border-b border-border bg-surface pt-28 md:pt-32">
        <Container>
          <SectionHeader
            eyebrow="Explore"
            title="Journeys"
            description={`${countLabel} — each inviting exploration, quiet reflection, and presence.`}
          />
        </Container>
      </Section>
      <Section className="pt-0">
        <Container>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {featured && <JourneyCard journey={featured} featured />}
            {rest.map((j) => (
              <JourneyCard key={j._id} journey={j} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
