import Image from "next/image";
import Link from "next/link";
import type { InstagramMedia } from "@/lib/instagram";

export function InstagramPhotoGrid({ items }: { items: InstagramMedia[] }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.permalink}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative aspect-square overflow-hidden bg-foreground"
        >
          <Image
            src={item.mediaUrl}
            alt={item.caption?.slice(0, 120) ?? "Sabryatra on Instagram"}
            fill
            sizes="(max-width:640px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/25" />
          {item.mediaType === "VIDEO" && (
            <span className="absolute right-2 top-2 bg-black/60 px-2 py-0.5 text-[9px] uppercase tracking-wider text-white">
              Reel
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
