"use client";

import { SanityImage } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SanityImageComponentProps {
  image: SanityImage;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

export function SanityImageComponent({
  image,
  className,
  fill,
  priority,
  sizes = "100vw",
}: SanityImageComponentProps) {
  if (!image?.url) return null;

  if (fill) {
    return (
      <Image
        src={image.url}
        alt={image.alt}
        fill
        className={cn("object-cover", className)}
        priority={priority}
        sizes={sizes}
      />
    );
  }

  return (
    <Image
      src={image.url}
      alt={image.alt}
      width={1920}
      height={1280}
      className={cn("h-auto w-full object-cover", className)}
      priority={priority}
      sizes={sizes}
    />
  );
}
