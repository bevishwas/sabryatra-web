export function ThemeBadges({ themes }: { slug: string; themes: string[] }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/70">
      {themes.join(" · ")}
    </p>
  );
}
