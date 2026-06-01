import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { Link } from "@/components/ui/Link";
import { TooltipParagraphs, TooltipText } from "@/components/shared/TooltipText";
import type { AboutContent, SiteContact, TooltipRegistry } from "@/types/content.types";

interface AboutSectionProps {
  about: AboutContent;
  contact: SiteContact;
  tooltips: TooltipRegistry;
}

export function AboutSection({
  about,
  contact,
  tooltips,
}: AboutSectionProps): React.ReactElement {
  return (
    <Section id="about">
      <Container>
        <SectionHeading number="04." title="About" />
        <div className="grid gap-12 md:grid-cols-2">
          <div className="max-w-prose space-y-4 text-foreground-muted">
            <TooltipParagraphs content={about.body} tooltips={tooltips} />
            <div className="flex gap-4 pt-2">
              <Link href={contact.github} variant="external">
                GitHub
              </Link>
              <Link href={contact.linkedin} variant="external">
                LinkedIn
              </Link>
            </div>
          </div>
          <GlassCard className="h-fit space-y-6">
            <ul className="space-y-3 text-sm text-foreground-muted">
              {about.highlights.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-accent">▹</span>
                  <span>
                    <TooltipText text={item} tooltips={tooltips} />
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {about.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </GlassCard>
        </div>
      </Container>
    </Section>
  );
}
