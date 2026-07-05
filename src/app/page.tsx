import { CinematicHero } from "@/components/home/cinematic-hero";
import { CinematicQuoteBreak } from "@/components/home/cinematic-quote-break";
import { JourneyFinder } from "@/components/home/journey-finder";
import { JourneyScrollRail } from "@/components/home/journey-scroll-rail";
import { MarqueePillars } from "@/components/home/marquee-pillars";
import { PhilosophySection } from "@/components/home/philosophy-section";
import { StatsStrip } from "@/components/home/stats-strip";
import { TestimonialCarousel } from "@/components/home/testimonial-carousel";
import { GalleryGrid } from "@/components/gallery/photo-gallery";
import { InstagramStrip } from "@/components/home/instagram-strip";
import { Container, Section, SectionHeader } from "@/components/layout/page-shell";
import { SanityImageComponent } from "@/components/shared/sanity-image";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import {
  getAbout,
  getFeaturedGallery,
  getFeaturedTestimonials,
  getJourneys,
  getLatestStories,
  getSiteSettings,
} from "@/lib/data";
import { formatReadingTime } from "@/lib/reading-time";
import { buildWhatsAppUrl, buildJourneyInquiryMessage } from "@/lib/whatsapp";
import Link from "next/link";

export default async function HomePage() {
  const [settings, journeys, gallery, stories, testimonials, about] = await Promise.all([
    getSiteSettings(),
    getJourneys(),
    getFeaturedGallery(),
    getLatestStories(1),
    getFeaturedTestimonials(),
    getAbout(),
  ]);

  const heroJourney =
    (settings.featuredHeroJourneySlug
      ? journeys.find((j) => j.slug === settings.featuredHeroJourneySlug)
      : undefined) ?? journeys[0];
  const featuredStory = stories[0];

  return (
    <>
      {heroJourney && (
        <CinematicHero
          image={heroJourney.heroImage}
          headlines={settings.heroHeadlines}
          intro={settings.introText}
          videoUrl={settings.heroVideoUrl ?? heroJourney.heroVideoUrl}
        />
      )}

      <MarqueePillars pillars={settings.pillars} />

      <Reveal>
        <PhilosophySection pillars={settings.pillars} />
      </Reveal>

      <Reveal>
        <JourneyFinder journeys={journeys} />
      </Reveal>

      <Reveal>
        <Section className="pb-0 pt-16 md:pt-20">
          <JourneyScrollRail journeys={journeys} />
        </Section>
      </Reveal>

      <CinematicQuoteBreak
        quote={settings.heroHeadlines[2] ?? "Because how you move through the world shapes the world within you."}
        attribution="Sabryatra"
      />

      <StatsStrip journeyCount={journeys.length} galleryCount={gallery.length} />

      {gallery.length > 0 && (
        <Reveal>
          <Section className="bg-surface">
            <Container>
              <SectionHeader
                eyebrow="Seen on the trail"
                title="Travel photography"
                description="Vishal's lens — patience, light, and the art of waiting."
                action={
                  <Button asChild variant="outline">
                    <Link href="/gallery">Full gallery</Link>
                  </Button>
                }
              />
              <GalleryGrid
                images={gallery.map((g) => ({ _id: g._id, image: g.image, title: g.title }))}
                limit={3}
              />
            </Container>
          </Section>
        </Reveal>
      )}

      {featuredStory && (
        <Reveal>
          <Section>
            <Container>
              <SectionHeader
                eyebrow="Field notes"
                title="Latest from the trail"
                description="Reflections and travel stories from the Himalaya."
                action={
                  <Button asChild variant="outline">
                    <Link href="/stories">All stories</Link>
                  </Button>
                }
              />
              <Link
                href={`/stories/${featuredStory.slug}`}
                className="group grid overflow-hidden border border-border bg-surface md:grid-cols-2"
              >
                <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[320px]">
                  <SanityImageComponent
                    image={featuredStory.coverImage}
                    fill
                    sizes="50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center p-6 md:p-10">
                  <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                    {featuredStory.category.replace("-", " ")} · {formatReadingTime(featuredStory.body)}
                  </p>
                  <h3 className="mt-3 font-serif text-2xl tracking-[-0.02em] md:text-4xl">{featuredStory.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">{featuredStory.excerpt}</p>
                  <span className="mt-6 text-[11px] font-medium uppercase tracking-[0.16em] text-foreground">
                    Read story →
                  </span>
                </div>
              </Link>
            </Container>
          </Section>
        </Reveal>
      )}

      <Reveal>
        <Section className="bg-foreground text-white">
          <Container>
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              {about.portrait?.url && (
                <div className="relative aspect-[4/5] overflow-hidden lg:col-span-5">
                  <SanityImageComponent image={about.portrait} fill sizes="42vw" />
                </div>
              )}
              <div className="lg:col-span-7">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/45">Your guide</p>
                <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em]">
                  Meet {about.founderName}
                </h2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/72">{about.pullQuote}</p>
                <Button asChild variant="light" className="mt-8">
                  <Link href="/about">The full story</Link>
                </Button>
              </div>
            </div>
          </Container>
        </Section>
      </Reveal>

      {testimonials.length > 0 && (
        <Reveal>
          <Section>
            <Container>
              <SectionHeader eyebrow="Whispers from past journeys" title="Travelers speak" />
              <TestimonialCarousel testimonials={testimonials} />
            </Container>
          </Section>
        </Reveal>
      )}

      <InstagramStrip
        profileUrl={settings.socialLinks.instagram}
        highlights={settings.instagramHighlights}
      />

      <Section className="border-t border-border bg-surface">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="Begin"
            title="If a journey is calling you"
            description="If something here resonates with you, we will be happy to talk."
          />
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/contact">Get in touch</Link>
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              <a href={buildWhatsAppUrl(buildJourneyInquiryMessage())} target="_blank" rel="noopener noreferrer">
                WhatsApp Vishal
              </a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
