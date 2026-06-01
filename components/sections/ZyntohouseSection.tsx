import ReactMarkdown from "react-markdown";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ProductLogo } from "@/components/shared/ProductLogo";
import {
  glassPrimaryButton,
  glassSecondaryButton,
} from "@/lib/glass-styles";
import {
  formatExperienceEnd,
  formatExperienceMonth,
} from "@/lib/format-experience-date";
import type { ZyntohouseContent } from "@/types/content.types";

interface ZyntohouseSectionProps {
  content: ZyntohouseContent;
  body: string;
}

export function ZyntohouseSection({
  content,
  body,
}: ZyntohouseSectionProps): React.ReactElement {
  return (
    <Section id="zyntohouse">
      <Container>
        <SectionHeading number="01." title="Experience" />
        <GlassCard className="max-w-3xl space-y-6">
          <div className="flex items-center gap-3 font-mono text-sm">
            <span className="shrink-0 text-foreground">
              {formatExperienceMonth(content.startDate)}
            </span>
            <span
              className="relative h-px min-w-16 flex-1 bg-border"
              aria-hidden="true"
            >
              <span className="absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-accent ring-4 ring-accent/15" />
              <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full border border-accent/60 bg-background" />
            </span>
            <span className="shrink-0 text-foreground-muted">
              {formatExperienceEnd(content.endDate)}
            </span>
          </div>
          <div className="flex items-start gap-4">
            <ProductLogo src={content.logo} alt="Zyntohouse" size="md" />
            <div>
              <h3 className="text-2xl font-semibold text-foreground">Zyntohouse</h3>
              <p className="mt-1 font-mono text-sm text-foreground-subtle">
                {content.role}
              </p>
            </div>
          </div>
          <p className="text-lg text-foreground-muted">{content.tagline}</p>
          <div className="prose prose-neutral max-w-prose text-foreground-muted dark:prose-invert">
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
          <ul className="space-y-2 text-sm text-foreground-muted">
            {content.proofPoints.map((point) => (
              <li key={point} className="flex gap-2">
                <span className="text-accent">▹</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div>
            <p className="mb-2 font-mono text-xs uppercase text-foreground-subtle">
              What I take on
            </p>
            <ul className="space-y-1 text-sm text-foreground-muted">
              {content.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs uppercase text-foreground-subtle">
              Who it&apos;s for
            </p>
            <ul className="space-y-1 text-sm text-foreground-muted">
              {content.clientTypes.map((clientType) => (
                <li key={clientType}>{clientType}</li>
              ))}
            </ul>
          </div>
          {content.techStack.length > 0 ? (
            <div>
              <p className="mb-2 font-mono text-xs uppercase text-foreground-subtle">
                Tech stack
              </p>
              <div className="flex flex-wrap gap-2">
                {content.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          ) : null}
          <div className="flex flex-wrap gap-4">
            <a
              href={content.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={glassPrimaryButton}
            >
              Get in touch
            </a>
            <a
              href={content.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={glassSecondaryButton}
            >
              Visit Zyntohouse
            </a>
          </div>
        </GlassCard>
      </Container>
    </Section>
  );
}
