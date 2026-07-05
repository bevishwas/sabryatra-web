import { Container, Section } from "@/components/layout/page-shell";
import { FooterTabPad } from "@/components/layout/footer-tab-pad";
import Link from "next/link";
import { getSiteSettings } from "@/lib/data";

export async function Footer() {
  const settings = await getSiteSettings();
  const social = settings.socialLinks;

  return (
    <footer className="border-t border-border bg-foreground text-white/75">
      <Section className="py-14 md:py-16">
        <Container>
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-5">
              <p className="font-serif text-3xl tracking-[-0.02em] text-white">Sabryatra</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">{settings.tagline}</p>
            </div>

            <div className="md:col-span-3">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">Explore</p>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                {[
                  { href: "/journeys", label: "Journeys" },
                  { href: "/stories", label: "Stories" },
                  { href: "/gallery", label: "Gallery" },
                  { href: "/about", label: "About" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:col-span-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">Connect</p>
              <div className="mt-4 space-y-3 text-sm leading-relaxed">
                <p className="text-white/70">{settings.address}</p>
                <a href={`mailto:${settings.contactEmail}`} className="block text-white/70 hover:text-white">
                  {settings.contactEmail}
                </a>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="block text-white/70 hover:text-white">
                  {settings.phone}
                </a>
                <div className="flex flex-wrap gap-4 pt-2">
                  {social.instagram && (
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                      Instagram
                    </a>
                  )}
                  {social.youtube && (
                    <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                      YouTube
                    </a>
                  )}
                  {social.pinterest && (
                    <a href={social.pinterest} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
                      Pinterest
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-[11px] uppercase tracking-[0.14em] text-white/40 sm:flex-row">
          <span>© {new Date().getFullYear()} Sabryatra</span>
          <span>Journeys that take you within</span>
        </Container>
      </div>
      <FooterTabPad />
    </footer>
  );
}
