import { Container, Section } from "@/components/layout/page-shell";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { RichText } from "@/components/shared/rich-text";
import { SanityImageComponent } from "@/components/shared/sanity-image";
import { Button } from "@/components/ui/button";
import { getStoryBySlug, getStorySlugs } from "@/lib/data";
import { storyJsonLd, JsonLd } from "@/lib/json-ld";
import { mergeSeo } from "@/lib/metadata";
import { formatReadingTime } from "@/lib/reading-time";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getStorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) return {};
  return mergeSeo(
    { title: story.title, description: story.excerpt },
    story.seo,
    `/stories/${slug}`,
    story.coverImage.url,
  );
}

export default async function StoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);
  if (!story) notFound();

  return (
    <>
      <JsonLd data={storyJsonLd(story)} />

      <section className="relative flex min-h-[58vh] items-end overflow-hidden">
        <SanityImageComponent image={story.coverImage} fill priority sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.75)_0%,rgba(0,0,0,0.15)_100%)]" />
        <Container className="relative z-10 pb-14 pt-28 md:pb-16 md:pt-36">
          <Breadcrumbs
            variant="onDark"
            items={[
              { label: "Home", href: "/" },
              { label: "Stories", href: "/stories" },
              { label: story.title },
            ]}
          />
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/65">
            {story.category.replace("-", " ")} ·{" "}
            {new Date(story.publishedAt).toLocaleDateString("en-IN", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {formatReadingTime(story.body)}
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em] text-white">
            {story.title}
          </h1>
        </Container>
      </section>

      <Section className="pt-12 md:pt-16">
        <Container>
          <div className="mx-auto max-w-3xl prose-sabryatra">
            <RichText value={story.body} />
          </div>

          {story.embeddedReelUrl && (
            <div className="mx-auto mt-12 max-w-3xl">
              <a
                href={story.embeddedReelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border border-border bg-surface px-6 py-5 text-sm font-medium uppercase tracking-[0.14em] text-foreground transition-colors hover:border-foreground/25"
              >
                Watch the cinematic reel →
              </a>
            </div>
          )}

          {story.relatedJourneySlug && (
            <div className="mx-auto mt-12 max-w-3xl text-center">
              <p className="text-sm text-muted">Inspired by this story?</p>
              <Button asChild className="mt-4">
                <Link href={`/journeys/${story.relatedJourneySlug}`}>
                  Explore the {story.relatedJourneySlug.replace(/-/g, " ")} journey
                </Link>
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
