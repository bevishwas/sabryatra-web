import { Container } from "@/components/layout/page-shell";

export function CinematicQuoteBreak({ quote, attribution }: { quote: string; attribution?: string }) {
  return (
    <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-foreground px-5 py-20 text-center sm:px-8">
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #2c3e36 0%, transparent 50%)" }} />
      <Container className="relative z-10 max-w-3xl">
        <blockquote className="font-serif text-[clamp(1.5rem,4vw,2.75rem)] leading-[1.25] tracking-[-0.02em] text-white/90">
          &ldquo;{quote}&rdquo;
        </blockquote>
        {attribution && (
          <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-white/45">{attribution}</p>
        )}
      </Container>
    </section>
  );
}
