"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function InstagramPostEmbed({ url }: { url: string }) {
  useEffect(() => {
    window.instgrm?.Embeds.process();
  }, [url]);

  return (
    <div className="overflow-hidden border border-border bg-background [&_.instagram-media]:!m-0 [&_.instagram-media]:!max-w-full [&_.instagram-media]:!min-w-0 [&_.instagram-media]:!w-full">
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={url.split("?")[0]}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          margin: 0,
          maxWidth: "100%",
          minWidth: 0,
          width: "100%",
        }}
      />
    </div>
  );
}

export function InstagramEmbedGrid({ urls }: { urls: string[] }) {
  useEffect(() => {
    if (document.querySelector('script[src*="instagram.com/embed.js"]')) {
      window.instgrm?.Embeds.process();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => window.instgrm?.Embeds.process();
    document.body.appendChild(script);
  }, [urls]);

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {urls.map((url) => (
        <InstagramPostEmbed key={url} url={url} />
      ))}
    </div>
  );
}
