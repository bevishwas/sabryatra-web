import { Camera, Compass, Leaf, Users } from "lucide-react";
import { Container } from "@/components/layout/page-shell";

export function StatsStrip({
  journeyCount,
  galleryCount,
}: {
  journeyCount: number;
  galleryCount?: number;
}) {
  const pathLabel = journeyCount === 1 ? "Himalayan path" : "Himalayan paths";
  const frameValue = galleryCount && galleryCount > 0 ? `${galleryCount}+` : "100+";

  const stats = [
    { Icon: Users, value: "4–8", label: "Travelers per group" },
    { Icon: Compass, value: String(journeyCount), label: pathLabel },
    { Icon: Camera, value: frameValue, label: "Frames from the trail" },
    { Icon: Leaf, value: "Slow", label: "By design, always" },
  ];

  return (
    <div className="border-y border-border bg-accent text-white">
      <Container className="py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map(({ Icon, value, label }) => (
            <div key={label} className="text-center">
              <Icon className="mx-auto h-5 w-5 text-white/50" strokeWidth={1.5} />
              <p className="mt-3 font-serif text-3xl tracking-[-0.02em] md:text-4xl">{value}</p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/60">{label}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
