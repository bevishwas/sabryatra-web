import type { About, Journey, SiteSettings, Story } from "@/lib/types";
import { SITE_URL } from "@/lib/metadata";

export function travelAgencyJsonLd(settings: SiteSettings, about: About) {
  const sameAs = Object.values(settings.socialLinks).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TravelAgency",
        name: settings.siteTitle,
        description: settings.seo.description,
        url: SITE_URL,
        email: settings.contactEmail,
        telephone: settings.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.address,
          addressLocality: "Jaipur",
          postalCode: "302039",
          addressCountry: "IN",
        },
        sameAs,
      },
      {
        "@type": "Person",
        name: about.founderName,
        jobTitle: "Travel Photographer & Journey Guide",
        description: about.pullQuote,
        worksFor: { "@type": "TravelAgency", name: settings.siteTitle },
      },
    ],
  };
}

export function journeyJsonLd(journey: Journey) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: journey.title,
    description: journey.excerpt,
    url: `${SITE_URL}/journeys/${journey.slug}`,
    image: journey.heroImage.url,
    touristType: "Slow travel, wellness-oriented small group",
  };
}

export function journeyFaqJsonLd(journey: Journey) {
  const faqs: Array<{ q: string; a: string }> = [];

  if (journey.duration) faqs.push({ q: `How long is the ${journey.title} journey?`, a: journey.duration });
  if (journey.bestSeason) faqs.push({ q: `What is the best season for ${journey.title}?`, a: journey.bestSeason });
  if (journey.groupSize) faqs.push({ q: "What is the group size?", a: journey.groupSize });
  if (journey.difficulty) faqs.push({ q: "What is the difficulty level?", a: journey.difficulty });

  if (faqs.length === 0) return journeyJsonLd(journey);

  return {
    "@context": "https://schema.org",
    "@graph": [
      journeyJsonLd(journey),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ],
  };
}

export function storyJsonLd(story: Story) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    description: story.excerpt,
    datePublished: story.publishedAt,
    url: `${SITE_URL}/stories/${story.slug}`,
    image: story.coverImage.url,
    author: { "@type": "Person", name: "Vishal" },
    publisher: { "@type": "Organization", name: "Sabryatra" },
  };
}

export function galleryJsonLd(images: Array<{ title: string; image: { url: string; alt: string } }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Sabryatra Himalaya Travel Photography",
    description: "Curated travel photography from Sabryatra's Himalayan journeys",
    url: `${SITE_URL}/gallery`,
    image: images.map((i) => ({ "@type": "ImageObject", name: i.title, contentUrl: i.image.url, description: i.image.alt })),
  };
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
