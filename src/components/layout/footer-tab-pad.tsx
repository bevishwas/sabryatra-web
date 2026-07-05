"use client";

import { usePathname } from "next/navigation";

/** Prevents footer content from sitting under the mobile tab bar. */
export function FooterTabPad() {
  const pathname = usePathname();
  if (pathname.match(/^\/journeys\/[^/]+$/)) return null;

  return <div className="h-[calc(3.25rem+env(safe-area-inset-bottom))] md:hidden" aria-hidden />;
}
