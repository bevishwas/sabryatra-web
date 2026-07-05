import Link from "next/link";
import { Container, Section } from "@/components/layout/page-shell";
import { InstagramEmbedGrid } from "@/components/home/instagram-embed-grid";
import { InstagramPhotoGrid } from "@/components/home/instagram-photo-grid";
import { getInstagramFeed, isInstagramPostUrl } from "@/lib/instagram";
import type { InstagramHighlight } from "@/lib/types";
import { ExternalLink } from "lucide-react";

export async function InstagramStrip({
  profileUrl,
  highlights,
}: {
  profileUrl?: string;
  highlights?: InstagramHighlight[];
}) {
  const feed = await getInstagramFeed(6);
  const postUrls = (highlights ?? [])
    .map((h) => h.url)
    .filter(isInstagramPostUrl)
    .slice(0, 6);

  if (!profileUrl && feed.length === 0 && postUrls.length === 0) return null;

  const showLinkCards = feed.length === 0 && postUrls.length === 0 && highlights?.length;

  return (
    <Section className="border-t border-border bg-surface py-12 md:py-16">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
              <ExternalLink className="h-4 w-4" />
              From the trail
            </p>
            <h2 className="mt-2 font-serif text-2xl tracking-[-0.02em] md:text-3xl">
              Moments on Instagram
            </h2>
            {feed.length > 0 && (
              <p className="mt-2 text-sm text-muted">Latest posts — updated hourly.</p>
            )}
            {feed.length === 0 && postUrls.length > 0 && (
              <p className="mt-2 text-sm text-muted">Tap a post to open on Instagram.</p>
            )}
          </div>
          {profileUrl && (
            <Link
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground underline-offset-4 hover:underline"
            >
              Follow @sabryatra →
            </Link>
          )}
        </div>

        {feed.length > 0 ? (
          <InstagramPhotoGrid items={feed} />
        ) : postUrls.length > 0 ? (
          <InstagramEmbedGrid urls={postUrls} />
        ) : showLinkCards ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {(highlights ?? []).slice(0, 6).map((item, i) => (
              <Link
                key={`${item.url}-${i}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-border bg-background p-5 transition-colors hover:border-foreground/25"
              >
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted">Instagram</p>
                <p className="mt-2 font-serif text-lg leading-snug tracking-[-0.01em] group-hover:text-accent">
                  {item.caption ?? "View on Instagram"}
                </p>
                <span className="mt-4 inline-block text-[10px] uppercase tracking-[0.14em] text-muted group-hover:text-foreground">
                  Open →
                </span>
              </Link>
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
