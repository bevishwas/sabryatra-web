import { Container, Section } from "@/components/layout/page-shell";
import { RichText } from "@/components/shared/rich-text";
import { SanityImageComponent } from "@/components/shared/sanity-image";
import { Button } from "@/components/ui/button";
import { getAbout } from "@/lib/data";
import { mergeSeo } from "@/lib/metadata";
import Link from "next/link";

export async function generateMetadata() {
  return mergeSeo({
    title: "About Sabryatra | Story, Reviews & Slow Travel with Vishal",
    description:
      "Meet Vishal, founder of Sabryatra — guiding small groups into Himalayan landscapes through photography, stillness, and unhurried travel.",
  }, undefined, "/about");
}

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <Section className="pt-28 md:pt-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          {about.portrait?.url && (
            <div className="relative aspect-[4/5] overflow-hidden bg-foreground lg:col-span-5">
              <SanityImageComponent image={about.portrait} fill sizes="(max-width:1024px) 100vw, 42vw" priority />
            </div>
          )}
          <div className="lg:col-span-7">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">About us</p>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em]">
              The Journey So Far
            </h1>
            <blockquote className="mt-8 border-l-2 border-foreground/15 pl-6 font-serif text-2xl leading-relaxed tracking-[-0.01em] text-foreground/85 md:text-3xl">
              {about.pullQuote}
            </blockquote>
            <div className="prose-sabryatra mt-8 max-w-2xl">
              <RichText value={about.bio} />
            </div>
            <Button asChild variant="outline" className="mt-10">
              <Link href="/gallery">See the photography</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
