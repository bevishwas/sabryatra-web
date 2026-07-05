import type {
  About,
  GalleryImage,
  Journey,
  SiteSettings,
  Story,
  Testimonial,
} from "../types";
import { withJourneyLogistics } from "../journey-logistics";
import {
  seedAbout,
  seedGallery,
  seedJourneys,
  seedSiteSettings,
  seedStories,
  seedTestimonials,
} from "../seed";

export function isSanityConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
}

async function trySanity<T>(fetcher: () => Promise<T>, fallback: T): Promise<T> {
  if (!isSanityConfigured()) return fallback;
  try {
    const { client } = await import("@/sanity/lib/client");
    if (!client) return fallback;
    return await fetcher();
  } catch {
    return fallback;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return trySanity(async () => {
    const { getSiteSettingsFromSanity } = await import("@/sanity/lib/queries");
    const data = await getSiteSettingsFromSanity();
    return data ?? seedSiteSettings;
  }, seedSiteSettings);
}

export async function getAbout(): Promise<About> {
  return trySanity(async () => {
    const { getAboutFromSanity } = await import("@/sanity/lib/queries");
    const data = await getAboutFromSanity();
    return data ?? seedAbout;
  }, seedAbout);
}

export async function getJourneys(): Promise<Journey[]> {
  return trySanity(async () => {
    const { getJourneysFromSanity } = await import("@/sanity/lib/queries");
    const data = await getJourneysFromSanity();
    return data.length > 0
      ? data.sort((a, b) => a.order - b.order).map(withJourneyLogistics)
      : seedJourneys.map(withJourneyLogistics);
  }, seedJourneys.map(withJourneyLogistics));
}

export async function getJourneyBySlug(slug: string): Promise<Journey | null> {
  const journeys = await getJourneys();
  return journeys.find((j) => j.slug === slug) ?? null;
}

export async function getJourneySlugs(): Promise<string[]> {
  const journeys = await getJourneys();
  return journeys.map((j) => j.slug);
}

export async function getStories(): Promise<Story[]> {
  return trySanity(async () => {
    const { getStoriesFromSanity } = await import("@/sanity/lib/queries");
    const data = await getStoriesFromSanity();
    return data.length > 0 ? data : seedStories;
  }, seedStories);
}

export async function getStoryBySlug(slug: string): Promise<Story | null> {
  const stories = await getStories();
  return stories.find((s) => s.slug === slug) ?? null;
}

export async function getStorySlugs(): Promise<string[]> {
  const stories = await getStories();
  return stories.map((s) => s.slug);
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return trySanity(async () => {
    const { getTestimonialsFromSanity } = await import("@/sanity/lib/queries");
    const data: Testimonial[] = await getTestimonialsFromSanity();
    const featured = data.filter((t: Testimonial) => t.featured);
    return featured.length > 0 ? featured : seedTestimonials;
  }, seedTestimonials);
}

export async function getGalleryImages(journeySlug?: string): Promise<GalleryImage[]> {
  return trySanity(async () => {
    const { getGalleryFromSanity } = await import("@/sanity/lib/queries");
    const data = await getGalleryFromSanity();
    const images = data.length > 0 ? data : seedGallery;
    if (journeySlug) return images.filter((i) => i.journeySlug === journeySlug);
    return images;
  }, journeySlug ? seedGallery.filter((i) => i.journeySlug === journeySlug) : seedGallery);
}

export async function getFeaturedGallery(): Promise<GalleryImage[]> {
  const images = await getGalleryImages();
  return images.filter((i) => i.featured).slice(0, 6);
}

export async function getStoriesForJourney(slug: string): Promise<Story[]> {
  const stories = await getStories();
  return stories.filter((s) => s.relatedJourneySlug === slug);
}

export async function getLatestStories(limit = 3): Promise<Story[]> {
  const stories = await getStories();
  return [...stories]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}
