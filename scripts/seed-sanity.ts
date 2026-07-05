/**
 * Uploads all local seed content into Sanity CMS.
 *
 * Usage:
 *   1. Create an API token at sanity.io/manage → API → Tokens (Editor permissions)
 *   2. Add SANITY_API_WRITE_TOKEN=... to .env
 *   3. npm run seed:sanity
 */

import { createClient, type SanityClient } from "next-sanity";
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import {
  seedAbout,
  seedGallery,
  seedJourneys,
  seedSiteSettings,
  seedStories,
  seedTestimonials,
} from "../src/lib/seed";
import { journeyLogistics } from "../src/lib/journey-logistics";
import type { SanityImage } from "../src/lib/types";

function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const path = resolve(process.cwd(), file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_API_READ_TOKEN;

if (!projectId) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID in .env");
  process.exit(1);
}

if (!token) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN in .env\n" +
      "Create one at sanity.io/manage → your project → API → Tokens (Editor role)",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const imageCache = new Map<string, string>();

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format";

async function uploadImage(url: string, filename: string): Promise<string> {
  const cached = imageCache.get(url);
  if (cached) return cached;

  let res = await fetch(url);
  if (!res.ok && url !== FALLBACK_IMAGE) {
    console.warn(`   ⚠ Image 404, using fallback: ${url}`);
    res = await fetch(FALLBACK_IMAGE);
  }
  if (!res.ok) throw new Error(`Failed to fetch image: ${url} (${res.status})`);

  const buffer = Buffer.from(await res.arrayBuffer());
  const asset = await client.assets.upload("image", buffer, { filename });
  imageCache.set(url, asset._id);
  return asset._id;
}

async function toImageWithAlt(
  image: SanityImage,
  filename: string,
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string }; alt: string; caption?: string }> {
  const assetId = await uploadImage(image.url, `${filename}.jpg`);
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt: image.alt,
    ...(image.caption ? { caption: image.caption } : {}),
  };
}

async function upsert(doc: { _id: string; _type: string; [key: string]: unknown }) {
  await client.createOrReplace(doc);
}

async function seedSiteSettingsDoc() {
  console.log("→ Site Settings");
  await upsert({
    _id: "siteSettings",
    _type: "siteSettings",
    siteTitle: seedSiteSettings.siteTitle,
    tagline: seedSiteSettings.tagline,
    introText: seedSiteSettings.introText,
    contactEmail: seedSiteSettings.contactEmail,
    phone: seedSiteSettings.phone,
    whatsappNumber: seedSiteSettings.whatsappNumber,
    address: seedSiteSettings.address,
    socialLinks: seedSiteSettings.socialLinks,
    heroHeadlines: seedSiteSettings.heroHeadlines,
    pillars: seedSiteSettings.pillars,
    seo: seedSiteSettings.seo,
    instagramHighlights: seedSiteSettings.instagramHighlights,
    featuredHeroJourney: {
      _type: "reference",
      _ref: `journey-${seedSiteSettings.featuredHeroJourneySlug ?? "maa-nanda-devi"}`,
    },
  });
}

async function seedAboutDoc() {
  console.log("→ About");
  const portrait = seedAbout.portrait
    ? await toImageWithAlt(seedAbout.portrait, "vishal-portrait")
    : undefined;

  await upsert({
    _id: "about",
    _type: "about",
    founderName: seedAbout.founderName,
    pullQuote: seedAbout.pullQuote,
    bio: seedAbout.bio,
    ...(portrait ? { portrait } : {}),
  });
}

async function seedJourneyDocs() {
  console.log("→ Journeys (5)");
  for (const j of seedJourneys) {
    console.log(`   · ${j.title}`);
    const heroImage = await toImageWithAlt(j.heroImage, `${j.slug}-hero`);
    const cardImage = await toImageWithAlt(j.cardImage, `${j.slug}-card`);
    const gallery = await Promise.all(
      j.gallery.map((img, i) => toImageWithAlt(img, `${j.slug}-gallery-${i + 1}`)),
    );

    const logistics = journeyLogistics[j.slug] ?? {};

    await upsert({
      _id: j._id,
      _type: "journey",
      title: j.title,
      slug: { _type: "slug", current: j.slug },
      subtitle: j.subtitle,
      themes: j.themes,
      excerpt: j.excerpt,
      body: j.body,
      heroImage,
      cardImage,
      gallery,
      order: j.order,
      duration: j.duration ?? logistics.duration,
      bestSeason: j.bestSeason ?? logistics.bestSeason,
      groupSize: j.groupSize ?? logistics.groupSize,
      pace: j.pace ?? logistics.pace,
      difficulty: j.difficulty ?? logistics.difficulty,
      bestFor: j.bestFor ?? logistics.bestFor,
      inclusions: j.inclusions ?? logistics.inclusions,
      startingPoint: j.startingPoint ?? logistics.startingPoint,
      moods: j.moods ?? logistics.moods,
      ...(j.relatedKeywords ? { relatedKeywords: j.relatedKeywords } : {}),
      ...(j.seo ? { seo: j.seo } : {}),
    });
  }
}

async function seedStoryDocs() {
  console.log("→ Stories (2)");
  for (const s of seedStories) {
    console.log(`   · ${s.title}`);
    const coverImage = await toImageWithAlt(s.coverImage, `${s.slug}-cover`);

    await upsert({
      _id: s._id,
      _type: "story",
      title: s.title,
      slug: { _type: "slug", current: s.slug },
      excerpt: s.excerpt,
      body: s.body,
      coverImage,
      publishedAt: s.publishedAt,
      category: s.category,
      ...(s.relatedJourneySlug
        ? {
            relatedJourney: {
              _type: "reference",
              _ref: `journey-${s.relatedJourneySlug}`,
            },
          }
        : {}),
      ...(s.embeddedReelUrl ? { embeddedReelUrl: s.embeddedReelUrl } : {}),
      ...(s.seo ? { seo: s.seo } : {}),
    });
  }
}

async function seedTestimonialDocs() {
  console.log(`→ Testimonials (${seedTestimonials.length})`);
  if (seedTestimonials.length === 0) {
    console.log("   · skipped — add quotes + photos in /studio (old site had image carousel only)");
    return;
  }
  for (const t of seedTestimonials) {
    console.log(`   · ${t.name}`);
    await upsert({
      _id: t._id,
      _type: "testimonial",
      name: t.name,
      quote: t.quote,
      featured: t.featured,
      ...(t.journeySlug
        ? {
            journey: {
              _type: "reference",
              _ref: `journey-${t.journeySlug}`,
            },
          }
        : {}),
    });
  }
}

async function seedGalleryDocs() {
  console.log("→ Gallery (6)");
  for (const g of seedGallery) {
    console.log(`   · ${g.title}`);
    const image = await toImageWithAlt(g.image, g.filename);

    await upsert({
      _id: g._id,
      _type: "galleryImage",
      title: g.title,
      filename: g.filename,
      image,
      featured: g.featured,
      ...(g.journeySlug
        ? {
            journey: {
              _type: "reference",
              _ref: `journey-${g.journeySlug}`,
            },
          }
        : {}),
    });
  }
}

async function main() {
  console.log(`\nSeeding Sanity project "${projectId}" (${dataset})…\n`);

  await seedSiteSettingsDoc();
  await seedAboutDoc();
  await seedJourneyDocs();
  await seedStoryDocs();
  await seedTestimonialDocs();
  await seedGalleryDocs();

  console.log(`\n✓ Done! Uploaded ${imageCache.size} unique images.`);
  console.log("  Open http://localhost:3000/studio to review and publish.");
  console.log("  Replace Unsplash placeholders with real photos when ready.\n");
}

main().catch((err: unknown) => {
  const message =
    err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";

  if (message.includes("permission") || message.includes("Insufficient")) {
    console.error(
      "\n✗ Token lacks write permission.\n" +
        "  Create a new token at sanity.io/manage → API → Tokens\n" +
        "  Permissions: Editor (or Admin)\n" +
        "  Add to .env as SANITY_API_WRITE_TOKEN=...\n",
    );
  } else {
    console.error("\n✗ Seed failed:", message);
  }
  process.exit(1);
});
