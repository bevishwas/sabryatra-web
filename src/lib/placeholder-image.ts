import type { SanityImage } from "./types";

const PLACEHOLDER_URL =
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format";

export function placeholderImage(alt: string): SanityImage {
  return { url: PLACEHOLDER_URL, alt };
}
