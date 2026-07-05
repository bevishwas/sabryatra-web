"use client";

import { buildWhatsAppUrl, buildJourneyInquiryMessage } from "@/lib/whatsapp";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab({ journeyTitle }: { journeyTitle?: string }) {
  const url = buildWhatsAppUrl(buildJourneyInquiryMessage(journeyTitle));

  // Desktop only — mobile uses drawer + tab bar contact
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-30 hidden h-12 w-12 items-center justify-center rounded-full bg-[#1a9f53] text-white shadow-[0_8px_30px_rgba(26,159,83,0.35)] transition-transform hover:scale-105 md:flex"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
