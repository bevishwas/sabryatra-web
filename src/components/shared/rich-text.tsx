"use client";

import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-6 text-base leading-[1.85] text-foreground/80 md:text-[1.05rem]">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 font-serif text-3xl tracking-[-0.02em] text-foreground">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-serif text-2xl tracking-[-0.02em] text-foreground">{children}</h3>
    ),
  },
};

export function RichText({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
