import type { PortableTextBlock } from "@portabletext/types";

function blockText(block: PortableTextBlock): string {
  if (block._type !== "block" || !("children" in block)) return "";
  return (block.children as Array<{ text?: string }>).map((c) => c.text ?? "").join("");
}

export function readingTimeMinutes(body: PortableTextBlock[], wpm = 200): number {
  const words = body.map(blockText).join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wpm));
}

export function formatReadingTime(body: PortableTextBlock[]): string {
  const mins = readingTimeMinutes(body);
  return `${mins} min read`;
}
