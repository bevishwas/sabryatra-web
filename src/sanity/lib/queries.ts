import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";
import type { PortableTextBlock } from "@portabletext/types";
import type {
  About,
  GalleryImage,
  Journey,
  SanityImage,
  SiteSettings,
  Story,
  StoryCategory,
  Testimonial,
} from "@/lib/types";
import { placeholderImage } from "@/lib/placeholder-image";
import { client } from "./client";

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) return null;
  return builder.image(source);
}

function mapImage(
  field: { asset?: { _ref?: string }; alt?: string; caption?: string } | null | undefined,
  fallbackAlt: string,
): SanityImage | null {
  if (!field?.asset?._ref || !builder) return null;
  return {
    url: builder.image(field).width(1920).auto("format").url(),
    alt: field.alt ?? fallbackAlt,
    caption: field.caption,
  };
}

function mapImageOrPlaceholder(
  field: { asset?: { _ref?: string }; alt?: string; caption?: string } | null | undefined,
  fallbackAlt: string,
): SanityImage {
  return mapImage(field, fallbackAlt) ?? placeholderImage(fallbackAlt);
}

export async function getSiteSettingsFromSanity(): Promise<SiteSettings | null> {
  if (!client) return null;
  const raw = await client.fetch<{
    siteTitle: string;
    tagline: string;
    introText: string;
    contactEmail: string;
    phone: string;
    whatsappNumber: string;
    address: string;
    socialLinks: SiteSettings["socialLinks"];
    heroHeadlines: string[];
    pillars: string[];
    heroVideoUrl?: string;
    instagramHighlights?: SiteSettings["instagramHighlights"];
    featuredHeroJourney?: { slug: { current: string } };
    seo: SiteSettings["seo"];
  }>(`*[_type == "siteSettings"][0]{
    siteTitle, tagline, introText, contactEmail, phone, whatsappNumber, address,
    socialLinks, heroHeadlines, pillars, heroVideoUrl, instagramHighlights, seo,
    featuredHeroJourney->{ slug }
  }`);

  if (!raw) return null;

  return {
    siteTitle: raw.siteTitle,
    tagline: raw.tagline,
    introText: raw.introText,
    contactEmail: raw.contactEmail,
    phone: raw.phone,
    whatsappNumber: raw.whatsappNumber,
    address: raw.address,
    socialLinks: raw.socialLinks ?? {},
    heroHeadlines: raw.heroHeadlines ?? [],
    pillars: raw.pillars ?? [],
    seo: raw.seo ?? {},
    ...(raw.heroVideoUrl ? { heroVideoUrl: raw.heroVideoUrl } : {}),
    ...(raw.featuredHeroJourney?.slug?.current
      ? { featuredHeroJourneySlug: raw.featuredHeroJourney.slug.current }
      : {}),
    ...(raw.instagramHighlights?.length ? { instagramHighlights: raw.instagramHighlights } : {}),
  };
}

export async function getAboutFromSanity(): Promise<About | null> {
  if (!client) return null;
  const raw = await client.fetch<{
    founderName: string;
    pullQuote: string;
    bio: PortableTextBlock[];
    portrait?: Parameters<typeof mapImage>[0];
  }>(`*[_type == "about"][0]{
    founderName, pullQuote, bio, portrait
  }`);

  if (!raw) return null;

  const portrait = mapImage(raw.portrait, `${raw.founderName ?? "Founder"} portrait`);

  return {
    founderName: raw.founderName,
    pullQuote: raw.pullQuote,
    bio: raw.bio,
    ...(portrait ? { portrait } : {}),
  };
}

export async function getJourneysFromSanity(): Promise<Journey[]> {
  if (!client) return [];
  const raw = await client.fetch<
    Array<{
      _id: string;
      title: string;
      slug: { current: string };
      subtitle: string;
      themes: string[];
      excerpt: string;
      body: PortableTextBlock[];
      heroImage: Parameters<typeof mapImage>[0];
      cardImage: Parameters<typeof mapImage>[0];
      gallery: Parameters<typeof mapImage>[0][];
      order: number;
      duration?: string;
      bestSeason?: string;
      groupSize?: string;
      pace?: string;
      difficulty?: string;
      bestFor?: string[];
      inclusions?: string[];
      startingPoint?: string;
      mapEmbedUrl?: string;
      heroVideoUrl?: string;
      moods?: string[];
      seo?: Journey["seo"];
      relatedKeywords?: string[];
    }>
  >(`*[_type == "journey"] | order(order asc) {
    _id, title, slug, subtitle, themes, excerpt, body, order,
    duration, bestSeason, groupSize, pace, difficulty, bestFor, inclusions,
    startingPoint, mapEmbedUrl, heroVideoUrl, moods, seo, relatedKeywords,
    heroImage, cardImage, gallery
  }`);

  return raw.flatMap<Journey>((j) => {
    const slug = j.slug?.current;
    if (!slug) return [];

    const hero = mapImageOrPlaceholder(j.heroImage, `${j.title} hero`);
    const card = mapImageOrPlaceholder(j.cardImage, `${j.title} card`);

    return [
      {
        _id: j._id,
        title: j.title,
        slug,
        subtitle: j.subtitle,
        themes: j.themes ?? [],
        excerpt: j.excerpt,
        body: j.body,
        heroImage: hero,
        cardImage: card,
        gallery: (j.gallery ?? [])
          .map((g, i) => mapImage(g, `${j.title} gallery ${i + 1}`))
          .filter((g): g is SanityImage => g !== null),
        order: j.order ?? 999,
        duration: j.duration,
        bestSeason: j.bestSeason,
        groupSize: j.groupSize,
        pace: j.pace,
        difficulty: j.difficulty,
        bestFor: j.bestFor,
        inclusions: j.inclusions,
        startingPoint: j.startingPoint,
        mapEmbedUrl: j.mapEmbedUrl,
        heroVideoUrl: j.heroVideoUrl,
        moods: j.moods,
        seo: j.seo,
        relatedKeywords: j.relatedKeywords,
      },
    ];
  });
}

export async function getStoriesFromSanity(): Promise<Story[]> {
  if (!client) return [];
  const raw = await client.fetch<
    Array<{
      _id: string;
      title: string;
      slug: { current: string };
      excerpt: string;
      body: PortableTextBlock[];
      coverImage: Parameters<typeof mapImage>[0];
      publishedAt: string;
      category: StoryCategory;
      relatedJourney?: { slug: { current: string } };
      embeddedReelUrl?: string;
      seo?: Story["seo"];
    }>
  >(`*[_type == "story"] | order(publishedAt desc) {
    _id, title, slug, excerpt, body, publishedAt, category, embeddedReelUrl, seo,
    coverImage,
    relatedJourney->{ slug }
  }`);

  return raw.reduce<Story[]>((acc, s) => {
    const cover = mapImage(s.coverImage, s.title);
    if (!cover) return acc;
    acc.push({
      _id: s._id,
      title: s.title,
      slug: s.slug.current,
      excerpt: s.excerpt,
      body: s.body,
      coverImage: cover,
      publishedAt: s.publishedAt,
      category: s.category,
      relatedJourneySlug: s.relatedJourney?.slug?.current,
      embeddedReelUrl: s.embeddedReelUrl,
      seo: s.seo,
    });
    return acc;
  }, []);
}

export async function getTestimonialsFromSanity(): Promise<Testimonial[]> {
  if (!client) return [];
  return client.fetch(`*[_type == "testimonial" && featured == true] {
    _id, name, quote, featured,
    "journeySlug": journey->slug.current
  }`);
}

export async function getGalleryFromSanity(): Promise<GalleryImage[]> {
  if (!client) return [];
  const raw = await client.fetch<
    Array<{
      _id: string;
      title: string;
      filename: string;
      image: Parameters<typeof mapImage>[0];
      featured: boolean;
      journey?: { slug: { current: string } };
    }>
  >(`*[_type == "galleryImage"] | order(_createdAt desc) {
    _id, title, filename, featured, image,
    journey->{ slug }
  }`);

  return raw.reduce<GalleryImage[]>((acc, g) => {
    const image = mapImage(g.image, g.title);
    if (!image) return acc;
    acc.push({
      _id: g._id,
      title: g.title,
      altText: image.alt,
      caption: image.caption,
      filename: g.filename,
      image,
      journeySlug: g.journey?.slug?.current,
      featured: g.featured ?? false,
    });
    return acc;
  }, []);
}
