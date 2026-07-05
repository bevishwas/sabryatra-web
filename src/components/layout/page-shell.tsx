import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1180px] px-4 sm:px-6 md:px-8 lg:px-10", className)}>
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-12 md:py-20 lg:py-28", className)}>
      {children}
    </section>
  );
}

export function PageTop({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("pt-20 pb-12 md:pt-24 md:pb-16 max-md:pb-20", className)}>
      {children}
    </div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-8 md:mb-12 lg:mb-16",
        align === "center" && "mx-auto max-w-2xl text-center",
        action && align === "left" && "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("min-w-0", align === "center" && "mx-auto")}>
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted">{eyebrow}</p>
        <h2 className="mt-2 font-serif text-[clamp(1.75rem,5vw,3.25rem)] leading-[1.12] tracking-[-0.02em] text-foreground md:mt-3">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted md:mt-4 md:text-lg">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
