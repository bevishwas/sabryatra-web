import type { Metadata } from "next";
import type { SeoFields } from "./types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sabryatra.com";

export function buildMetadata({
  title,
  description,
  path = "",
  image,
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  const ogImage = image ?? `${SITE_URL}/og-default.jpg`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Sabryatra",
      locale: "en_IN",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function mergeSeo(
  defaults: { title: string; description: string },
  seo?: SeoFields,
  path = "",
  image?: string,
): Metadata {
  return buildMetadata({
    title: seo?.title ?? defaults.title,
    description: seo?.description ?? defaults.description,
    path,
    image,
  });
}

export { SITE_URL };
