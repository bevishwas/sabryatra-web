import { PhotoGallery } from "@/components/gallery/photo-gallery";
import { SampleDayTimeline } from "@/components/journeys/sample-day-timeline";
import { JourneyDetailsPanel } from "@/components/journeys/journey-details-panel";
import { defaultSampleDays } from "@/lib/journey-sample-days";
import { Container, Section, SectionHeader } from "@/components/layout/page-shell";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { RichText } from "@/components/shared/rich-text";
import { SanityImageComponent } from "@/components/shared/sanity-image";
import { ThemeBadges } from "@/components/journeys/theme-badges";
import { Button } from "@/components/ui/button";
import {
  getJourneyBySlug,
  getJourneySlugs,
  getStoriesForJourney,
} from "@/lib/data";
import { journeyFaqJsonLd, JsonLd } from "@/lib/json-ld";
import { mergeSeo } from "@/lib/metadata";
import { buildJourneyInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getJourneySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);
  if (!journey) return {};
  return mergeSeo(
    { title: `${journey.title} Journey | Sabryatra`, description: journey.excerpt },
    journey.seo,
    `/journeys/${slug}`,
    journey.heroImage.url,
  );
}

export default async function JourneyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const journey = await getJourneyBySlug(slug);
  if (!journey) notFound();

  const relatedStories = await getStoriesForJourney(slug);
  const sampleDay = journey.sampleDay ?? defaultSampleDays[slug] ?? [];

  return (
    <>
      <JsonLd data={journeyFaqJsonLd(journey)} />

      <section className="relative flex min-h-[72vh] items-end overflow-hidden">
        {journey.heroVideoUrl ? (
          <video autoPlay muted loop playsInline poster={journey.heroImage.url} className="absolute inset-0 h-full w-full object-cover">
            <source src={journey.heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <SanityImageComponent image={journey.heroImage} fill priority sizes="100vw" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.15)_100%)]" />
        <Container className="relative z-10 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-24 md:pb-16 md:pt-36">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Journeys", href: "/journeys" },
              { label: journey.title },
            ]}
          />
          <ThemeBadges slug={slug} themes={journey.themes} />
          <h1 className="mt-5 max-w-3xl font-serif text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-white">
            {journey.title}
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/75 md:text-lg">{journey.subtitle}</p>
        </Container>
      </section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <aside className="order-first lg:order-0 lg:col-span-4">
              <div className="space-y-5 lg:sticky lg:top-28">
                <SampleDayTimeline moments={sampleDay} />
                <JourneyDetailsPanel journey={journey} />
                <Button asChild variant="whatsapp" className="w-full">
                  <a
                    href={buildWhatsAppUrl(buildJourneyInquiryMessage(journey.title))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Inquire about this journey
                  </a>
                </Button>
              </div>
            </aside>
            <div className="prose-sabryatra lg:col-span-8">
              <RichText value={journey.body} />
            </div>
          </div>
        </Container>
      </Section>

      {journey.gallery.length > 0 && (
        <Section className="border-t border-border bg-surface">
          <Container>
            <SectionHeader eyebrow="Gallery" title="On the trail" />
            <PhotoGallery images={journey.gallery} />
          </Container>
        </Section>
      )}

      {relatedStories.length > 0 && (
        <Section className="border-t border-border">
          <Container>
            <SectionHeader eyebrow="Related" title="Stories from the region" />
            <div className="grid gap-4 md:grid-cols-2">
              {relatedStories.map((s) => (
                <Link
                  key={s._id}
                  href={`/stories/${s.slug}`}
                  className="border border-border bg-surface p-6 transition-colors hover:border-foreground/20 md:p-8"
                >
                  <h3 className="font-serif text-2xl tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{s.excerpt}</p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <div className="h-[calc(4.5rem+env(safe-area-inset-bottom))] md:hidden" aria-hidden />

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
        <Button asChild variant="whatsapp" className="w-full">
          <a href={buildWhatsAppUrl(buildJourneyInquiryMessage(journey.title))} target="_blank" rel="noopener noreferrer">
            Inquire about {journey.title}
          </a>
        </Button>
      </div>
    </>
  );
}
