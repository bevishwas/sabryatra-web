import { Container, Section, SectionHeader } from "@/components/layout/page-shell";
import { SanityImageComponent } from "@/components/shared/sanity-image";
import { getStories } from "@/lib/data";
import { formatReadingTime } from "@/lib/reading-time";
import { mergeSeo } from "@/lib/metadata";
import Link from "next/link";

export async function generateMetadata() {
  return mergeSeo({
    title: "Travel Stories & Field Notes | Sabryatra",
    description:
      "Read cinematic travel stories, mountain reflections, and photography notes from Sabryatra's Himalayan journeys.",
  }, undefined, "/stories");
}

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <Section className="pt-24 md:pt-28">
      <Container>
        <SectionHeader
          eyebrow="Field Notes"
          title="Stories"
          description="Cinematic travel stories, emotional reflections, and photography from the trail."
        />
        <div className="grid gap-5 md:grid-cols-2">
          {stories.map((story) => (
            <Link
              key={story._id}
              href={`/stories/${story.slug}`}
              className="group grid overflow-hidden border border-border bg-surface md:grid-cols-2"
            >
              <div className="relative aspect-[16/11] overflow-hidden md:aspect-auto md:min-h-[220px]">
                <SanityImageComponent
                  image={story.coverImage}
                  fill
                  sizes="50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
                  {story.category.replace("-", " ")} ·{" "}
                  {new Date(story.publishedAt).toLocaleDateString("en-IN", { year: "numeric", month: "long" })} ·{" "}
                  {formatReadingTime(story.body)}
                </p>
                <h2 className="mt-3 font-serif text-2xl leading-tight tracking-[-0.02em] md:text-3xl">
                  {story.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{story.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
