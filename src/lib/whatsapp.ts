const WHATSAPP_NUMBER = "919414856201";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildJourneyInquiryMessage(journeyTitle?: string): string {
  const journey = journeyTitle ? `Journey: ${journeyTitle}\n` : "";
  return `Hi Vishal, I'm interested in a Sabryatra journey.\n${journey}Dates: \nGroup size: `;
}

export function buildContactInquiryMessage(params: {
  name: string;
  email: string;
  journey?: string;
  message: string;
}): string {
  return [
    "Hi Vishal, I'm interested in a Sabryatra journey.",
    "",
    `Name: ${params.name}`,
    `Email: ${params.email}`,
    params.journey ? `Journey: ${params.journey}` : "",
    "",
    params.message,
  ]
    .filter(Boolean)
    .join("\n");
}
