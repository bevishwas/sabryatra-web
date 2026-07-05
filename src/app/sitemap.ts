import type { MetadataRoute } from "next";
import { getJourneySlugs, getStorySlugs } from "@/lib/data";
import { SITE_URL } from "@/lib/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [journeySlugs, storySlugs] = await Promise.all([getJourneySlugs(), getStorySlugs()]);

  const staticPages = ["", "/journeys", "/stories", "/gallery", "/about", "/contact"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
    priority: path === "" ? 1 : 0.8,
  }));

  const journeyPages = journeySlugs.map((slug) => ({
    url: `${SITE_URL}/journeys/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const storyPages = storySlugs.map((slug) => ({
    url: `${SITE_URL}/stories/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...journeyPages, ...storyPages];
}
