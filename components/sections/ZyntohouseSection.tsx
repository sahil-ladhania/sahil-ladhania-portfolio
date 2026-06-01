import ReactMarkdown from "react-markdown";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProductLogo } from "@/components/shared/ProductLogo";
import type { ZyntohouseContent } from "@/types/content.types";

interface ZyntohouseSectionProps {
  content: ZyntohouseContent;
  body: string;
}

const primaryBtn =
  "inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover dark:text-accent-950";
const secondaryBtn =
  "inline-flex items-center justify-center rounded-md border border-border bg-glass-bg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-border-strong";

export function ZyntohouseSection({
  content,
  body,
}: ZyntohouseSectionProps): React.ReactElement {
  return (
    <Section id="zyntohouse">
      <Container>
        <SectionHeading number="01." title="Experience" />
        <GlassCard className="max-w-3xl space-y-6">
          <div className="flex items-start gap-4">
            <ProductLogo src={content.logo} alt="Zyntohouse" size="md" />
            <div>
            <h3 className="text-2xl font-semibold text-foreground">Zyntohouse</h3>
            <p className="mt-2 text-lg text-foreground-muted">{content.tagline}</p>
            </div>
          </div>
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
            <p className="text-sm text-foreground-muted">
              {content.clientTypes.join(" ")}
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href={content.calUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={primaryBtn}
            >
              Get in touch
            </a>
            <a
              href={content.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryBtn}
            >
              Visit Zyntohouse
            </a>
          </div>
        </GlassCard>
      </Container>
    </Section>
  );
}
