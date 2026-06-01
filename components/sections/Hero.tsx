import { Container } from "@/components/ui/Container";
import { TooltipText } from "@/components/shared/TooltipText";
import { HeroTerminal } from "@/components/sections/HeroTerminal";
import { ProductMarquee } from "@/components/sections/ProductMarquee";
import {
  glassPrimaryButton,
  glassSecondaryButton,
} from "@/lib/glass-styles";
import type {
  HeroTerminalContent,
  Project,
  SiteHero,
  SiteContact,
  TooltipRegistry,
} from "@/types/content.types";

interface HeroProps {
  hero: SiteHero;
  contact: SiteContact;
  terminal: HeroTerminalContent;
  tooltips: TooltipRegistry;
  projects: Project[];
}

export function Hero({
  hero,
  contact,
  terminal,
  tooltips,
  projects,
}: HeroProps): React.ReactElement {
  return (
    <section id="hero" className="scroll-mt-20 py-20 md:py-28 lg:py-32">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-prose">
            <p className="mb-4 font-mono text-sm">
              {hero.greeting.split(/(Sahil)/i).map((part, index) =>
                part.toLowerCase() === "sahil" ? (
                  <span key={index} className="text-white">
                    {part}
                  </span>
                ) : (
                  <span key={index} className="text-foreground-muted">
                    {part}
                  </span>
                ),
              )}
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
              {hero.oneLiner}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-foreground-muted">
              <TooltipText text={hero.subtext} tooltips={tooltips} />
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href="#products" className={glassPrimaryButton}>
                See products
              </a>
              <a
                href={contact.calUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={glassSecondaryButton}
              >
                Book a call
              </a>
            </div>
          </div>

          <HeroTerminal content={terminal} />
        </div>
      </Container>
      <ProductMarquee projects={projects} className="mt-20 md:mt-28" />
    </section>
  );
}
