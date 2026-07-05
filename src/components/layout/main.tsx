"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

/** Applies bottom padding on mobile only when the tab bar is visible. */
export function Main({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tabBarHidden = Boolean(pathname.match(/^\/journeys\/[^/]+$/));

  return (
    <main
      className={cn(
        "flex-1",
        !tabBarHidden && "max-md:pb-[calc(3.25rem+env(safe-area-inset-bottom))]",
      )}
    >
      {children}
    </main>
  );
}
