import { GalleryWithFilter } from "@/components/gallery/gallery-with-filter";
import { Container, Section, SectionHeader } from "@/components/layout/page-shell";
import { getGalleryImages, getJourneys } from "@/lib/data";
import { galleryJsonLd, JsonLd } from "@/lib/json-ld";
import { mergeSeo } from "@/lib/metadata";

export async function generateMetadata() {
  return mergeSeo({
    title: "Himalaya Travel Photography | Sabryatra Gallery",
    description:
      "Explore Sabryatra's Himalaya travel photography — cinematic mountain landscapes, patience, light, and presence.",
  }, undefined, "/gallery");
}

export default async function GalleryPage() {
  const [images, journeys] = await Promise.all([getGalleryImages(), getJourneys()]);

  return (
    <>
      <JsonLd data={galleryJsonLd(images.map((i) => ({ title: i.title, image: i.image })))} />
      <Section className="pt-28 md:pt-32">
        <Container>
          <SectionHeader
            eyebrow="Portfolio"
            title="Travel Photography"
            description="Cinematic glimpses from the trail — filter by journey or browse the full collection."
          />
          <GalleryWithFilter images={images} journeys={journeys} />
        </Container>
      </Section>
    </>
  );
}
