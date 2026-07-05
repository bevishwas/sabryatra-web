"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { SanityImageComponent } from "@/components/shared/sanity-image";
import { Button } from "@/components/ui/button";
import type { SanityImage } from "@/lib/types";

export function CinematicHero({
  image,
  headlines,
  intro,
  videoUrl,
}: {
  image: SanityImage;
  headlines: string[];
  intro: string;
  videoUrl?: string;
}) {
  return (
    <section className="relative flex min-h-[100svh] min-h-[100dvh] items-end overflow-hidden">
      {videoUrl ? (
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={image.url}
            className="h-full w-full object-cover"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      ) : (
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <SanityImageComponent image={image} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.35)_45%,rgba(0,0,0,0.45)_100%)]" />

      <div className="relative z-10 w-full px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-20 sm:px-6 md:px-8 md:pb-24 md:pt-32 lg:px-10 lg:pt-36">
        <div className="mx-auto max-w-[1180px]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/65 md:text-[11px] md:tracking-[0.32em]"
          >
            सब्रयात्रा · Slow Himalayan Journeys
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="mt-4 max-w-4xl font-serif text-[clamp(2rem,9vw,5.75rem)] leading-[0.98] tracking-[-0.03em] text-white md:mt-6"
          >
            {headlines[0]}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 max-w-lg text-sm leading-relaxed text-white/75 md:mt-6 md:text-lg"
          >
            {intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-8 flex w-full flex-col gap-2.5 sm:max-w-md md:mt-10 md:flex-row md:gap-3"
          >
            <Button asChild size="lg" variant="light" className="w-full md:w-auto">
              <Link href="#find-your-journey">Find your journey</Link>
            </Button>
            <Button asChild size="lg" variant="light-outline" className="w-full md:w-auto">
              <Link href="/journeys">Explore all paths</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/50 md:bottom-8 md:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.25em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
