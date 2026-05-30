import ReactMarkdown from "react-markdown";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
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
        <SectionHeading number="04." title="Studio" />
        <GlassCard className="max-w-3xl space-y-6">
          <div>
            <h3 className="text-2xl font-semibold text-foreground">Zyntohouse</h3>
            <p className="mt-2 text-lg text-foreground-muted">{content.tagline}</p>
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
          <Link href="#contact">
            <Button variant="secondary">Get in touch</Button>
          </Link>
        </GlassCard>
      </Container>
    </Section>
  );
}
