import Link from "next/link";
import { Container, PageTop } from "@/components/layout/page-shell";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageTop>
      <Container className="max-w-lg text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">404</p>
        <h1 className="mt-4 font-serif text-5xl tracking-[-0.03em]">Off the trail</h1>
        <p className="mt-4 text-muted">This path doesn&apos;t exist — but many others do.</p>
        <Button asChild className="mt-8">
          <Link href="/">Return home</Link>
        </Button>
      </Container>
    </PageTop>
  );
}
