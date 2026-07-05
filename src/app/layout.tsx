import type { Viewport } from "next";
import { Footer } from "@/components/layout/footer";
import { GoogleAnalytics } from "@/components/layout/google-analytics";
import { Header } from "@/components/layout/header";
import { Main } from "@/components/layout/main";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { WhatsAppFab } from "@/components/layout/whatsapp-fab";
import { mergeSeo } from "@/lib/metadata";
import { getAbout, getSiteSettings } from "@/lib/data";
import { travelAgencyJsonLd, JsonLd } from "@/lib/json-ld";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return mergeSeo(
    {
      title: settings.seo.title ?? "Sabryatra | Cinematic Travel Stories, Photography & Soulful Journeys",
      description: settings.seo.description ?? settings.introText,
    },
    settings.seo,
  );
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [settings, about] = await Promise.all([getSiteSettings(), getAbout()]);

  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable} h-full overflow-x-hidden`}>
      <body className="flex min-h-full flex-col overflow-x-hidden antialiased">
        <GoogleAnalytics />
        <JsonLd data={travelAgencyJsonLd(settings, about)} />
        <Header />
        <Main>{children}</Main>
        <Footer />
        <MobileTabBar />
        <WhatsAppFab />
      </body>
    </html>
  );
}
