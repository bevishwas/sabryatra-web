import { defineField, defineType } from "sanity";

export const seoFields = [
  defineField({ name: "title", title: "SEO Title", type: "string" }),
  defineField({ name: "description", title: "SEO Description", type: "text", rows: 3 }),
  defineField({ name: "focusKeyword", title: "Focus Keyword", type: "string" }),
];

/** Native Sanity image with alt + caption (avoids nested-object upload bugs). */
export function imageWithAltField(name: string, title: string) {
  return defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Alt Text (required for SEO)",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
      defineField({ name: "caption", title: "Caption", type: "string" }),
    ],
  });
}

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", title: "Site Title", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "introText", title: "Intro Text", type: "text", rows: 4 }),
    defineField({ name: "contactEmail", title: "Contact Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 2 }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "youtube", type: "url" }),
        defineField({ name: "pinterest", type: "url" }),
        defineField({ name: "googleBusiness", type: "url" }),
        defineField({ name: "medium", type: "url" }),
        defineField({ name: "linkedin", type: "url" }),
      ],
    }),
    defineField({ name: "heroHeadlines", title: "Hero Headlines", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "pillars", title: "Brand Pillars", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "heroVideoUrl",
      title: "Homepage Hero Video URL",
      type: "url",
      description: "Optional MP4 URL for cinematic hero background",
    }),
    defineField({
      name: "featuredHeroJourney",
      title: "Featured Hero Journey",
      type: "reference",
      to: [{ type: "journey" }],
    }),
    defineField({
      name: "instagramHighlights",
      title: "Instagram Highlights",
      type: "array",
      description: "Full post URLs (e.g. https://www.instagram.com/p/ABC123/) — photos embed on the homepage",
      of: [
        {
          type: "object",
          name: "instagramHighlight",
          fields: [
            defineField({ name: "url", title: "Post URL", type: "url" }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "seo", title: "SEO", type: "object", fields: seoFields }),
  ],
});

export const journey = defineType({
  name: "journey",
  title: "Journey",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({
      name: "themes",
      title: "Themes",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    imageWithAltField("heroImage", "Hero Image"),
    imageWithAltField("cardImage", "Card Image"),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        {
          type: "image",
          name: "galleryItem",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text (required for SEO)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: "caption", title: "Caption", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "bestSeason", title: "Best Season", type: "string" }),
    defineField({ name: "groupSize", title: "Group Size", type: "string" }),
    defineField({ name: "pace", title: "Pace", type: "string" }),
    defineField({
      name: "difficulty",
      title: "Difficulty",
      type: "string",
      options: { list: ["Gentle", "Moderate", "Challenging"] },
    }),
    defineField({ name: "bestFor", title: "Best For", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "inclusions", title: "What's Included", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "startingPoint", title: "Starting Point", type: "string" }),
    defineField({ name: "mapEmbedUrl", title: "Map Embed URL", type: "url" }),
    defineField({ name: "heroVideoUrl", title: "Hero Video URL", type: "url" }),
    defineField({
      name: "moods",
      title: "Moods",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Stillness", value: "stillness" },
          { title: "Devotion", value: "devotion" },
          { title: "Wilderness", value: "wilderness" },
          { title: "Freshness", value: "freshness" },
        ],
      },
    }),
    defineField({ name: "relatedKeywords", title: "Related Keywords", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "seo", title: "SEO", type: "object", fields: seoFields }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
});

export const story = defineType({
  name: "story",
  title: "Story",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    imageWithAltField("coverImage", "Cover Image"),
    defineField({ name: "publishedAt", title: "Published At", type: "date" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Destination Guide", value: "destination-guide" },
          { title: "Travel Story", value: "travel-story" },
          { title: "Photography", value: "photography" },
          { title: "Itinerary", value: "itinerary" },
          { title: "Reflection", value: "reflection" },
          { title: "Cinematic Reel", value: "cinematic-reel" },
        ],
      },
    }),
    defineField({ name: "relatedJourney", title: "Related Journey", type: "reference", to: [{ type: "journey" }] }),
    defineField({ name: "embeddedReelUrl", title: "Embedded Reel URL", type: "url" }),
    defineField({ name: "seo", title: "SEO", type: "object", fields: seoFields }),
  ],
});

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({ name: "founderName", title: "Founder Name", type: "string" }),
    defineField({ name: "pullQuote", title: "Pull Quote", type: "text", rows: 2 }),
    defineField({ name: "bio", title: "Bio", type: "array", of: [{ type: "block" }] }),
    imageWithAltField("portrait", "Portrait"),
  ],
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 4 }),
    imageWithAltField("photo", "Photo"),
    defineField({ name: "journey", title: "Journey", type: "reference", to: [{ type: "journey" }] }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
  ],
});

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "filename",
      title: "Filename (SEO)",
      type: "string",
      description: "e.g. zanskar-monastery-travel-photography (not IMG_8821)",
    }),
    imageWithAltField("image", "Image"),
    defineField({ name: "journey", title: "Journey", type: "reference", to: [{ type: "journey" }] }),
    defineField({ name: "featured", title: "Featured on Homepage", type: "boolean", initialValue: false }),
  ],
});

export const schemaTypes = [siteSettings, journey, story, about, testimonial, galleryImage];
