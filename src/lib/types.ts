import type { PortableTextBlock } from "@portabletext/types";

export interface SeoFields {
  title?: string;
  description?: string;
  focusKeyword?: string;
}

export interface SanityImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface SampleDayMoment {
  time: string;
  title: string;
  description: string;
}

export interface Journey {
  _id: string;
  title: string;
  slug: string;
  subtitle: string;
  themes: string[];
  excerpt: string;
  body: PortableTextBlock[];
  heroImage: SanityImage;
  cardImage: SanityImage;
  gallery: SanityImage[];
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
  sampleDay?: SampleDayMoment[];
  mood?: string[];
  moods?: string[];
  seo?: SeoFields;
  relatedKeywords?: string[];
}

export interface Story {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: PortableTextBlock[];
  coverImage: SanityImage;
  publishedAt: string;
  category: StoryCategory;
  relatedJourneySlug?: string;
  embeddedReelUrl?: string;
  seo?: SeoFields;
}

export type StoryCategory =
  | "destination-guide"
  | "travel-story"
  | "photography"
  | "itinerary"
  | "reflection"
  | "cinematic-reel";

export interface Testimonial {
  _id: string;
  name: string;
  quote: string;
  journeySlug?: string;
  featured: boolean;
}

export interface GalleryImage {
  _id: string;
  title: string;
  altText: string;
  caption?: string;
  filename: string;
  image: SanityImage;
  journeySlug?: string;
  featured: boolean;
}

export interface About {
  founderName: string;
  pullQuote: string;
  bio: PortableTextBlock[];
  portrait?: SanityImage;
}

export interface InstagramHighlight {
  url: string;
  caption?: string;
}

export interface SiteSettings {
  siteTitle: string;
  tagline: string;
  introText: string;
  contactEmail: string;
  phone: string;
  whatsappNumber: string;
  address: string;
  socialLinks: {
    instagram?: string;
    youtube?: string;
    pinterest?: string;
    googleBusiness?: string;
    medium?: string;
    linkedin?: string;
  };
  seo: SeoFields;
  heroHeadlines: string[];
  pillars: string[];
  heroVideoUrl?: string;
  featuredHeroJourneySlug?: string;
  instagramHighlights?: InstagramHighlight[];
}

export interface Homepage {
  heroHeadlines: string[];
  pillars: string[];
  introText: string;
}
