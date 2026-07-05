import { InquiryForm } from "@/components/contact/inquiry-form";
import { Container, Section } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";
import { getJourneys, getSiteSettings } from "@/lib/data";
import { mergeSeo } from "@/lib/metadata";
import { buildJourneyInquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export async function generateMetadata() {
  return mergeSeo({
    title: "Contact Sabryatra | Plan Your Himalayan Journey",
    description:
      "Get in touch with Sabryatra to plan your soulful Himalayan journey. WhatsApp or inquiry form — we will be happy to talk.",
  }, undefined, "/contact");
}

export default async function ContactPage() {
  const [settings, journeys] = await Promise.all([getSiteSettings(), getJourneys()]);

  return (
    <Section className="pt-28 md:pt-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">Get in touch</p>
            <h1 className="mt-4 font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] tracking-[-0.03em]">
              If a journey is calling you
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
              If something here resonates with you, we will be happy to talk.
            </p>

            <div className="mt-10 space-y-3 text-sm leading-relaxed text-foreground/80">
              <p>{settings.address}</p>
              <a href={`mailto:${settings.contactEmail}`} className="block hover:text-foreground">
                {settings.contactEmail}
              </a>
              <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="block hover:text-foreground">
                {settings.phone}
              </a>
            </div>

            <Button asChild variant="whatsapp" size="lg" className="mt-8">
              <a href={buildWhatsAppUrl(buildJourneyInquiryMessage())} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>

          <div className="border border-border bg-surface p-6 md:p-8 lg:col-span-7">
            <h2 className="font-serif text-3xl tracking-[-0.02em]">Send an inquiry</h2>
            <p className="mt-2 text-sm text-muted">We typically respond within 24 hours.</p>
            <div className="mt-8">
              <InquiryForm journeys={journeys} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
