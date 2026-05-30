import { Container } from "@/components/ui/Container";
import { DownloadCvButton } from "@/components/shared/DownloadCvButton";
import { TooltipText } from "@/components/shared/TooltipText";
import { HeroTerminal } from "@/components/sections/HeroTerminal";
import { cn } from "@/lib/cn";
import type {
  HeroTerminalContent,
  SiteHero,
  SiteContact,
  TooltipRegistry,
} from "@/types/content.types";

interface HeroProps {
  hero: SiteHero;
  contact: SiteContact;
  terminal: HeroTerminalContent;
  tooltips: TooltipRegistry;
}

const primaryBtn =
  "inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover dark:text-accent-950";
const secondaryBtn =
  "inline-flex items-center justify-center rounded-md border border-border bg-glass-bg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong";

export function Hero({
  hero,
  contact,
  terminal,
  tooltips,
}: HeroProps): React.ReactElement {
  return (
    <section id="hero" className="scroll-mt-20 py-20 md:py-28 lg:py-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-prose">
            <p className="mb-4 font-mono text-sm text-accent">{hero.greeting}</p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              Sahil Ladhania
            </h1>
            <p className="mt-4 text-xl text-foreground">{hero.oneLiner}</p>
            <p className="mt-4 text-lg text-foreground-muted">
              <TooltipText text={hero.subtext} tooltips={tooltips} />
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#products" className={cn(primaryBtn)}>
                See products
              </a>
              <a
                href={contact.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(secondaryBtn)}
              >
                Book a call
              </a>
              <DownloadCvButton variant="ghost" />
            </div>
          </div>

          <HeroTerminal content={terminal} />
        </div>
      </Container>
    </section>
  );
}
