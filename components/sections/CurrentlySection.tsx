import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import type { CurrentlyBuilding } from "@/types/content.types";

interface CurrentlySectionProps {
  items: CurrentlyBuilding[];
}

export function CurrentlySection({
  items,
}: CurrentlySectionProps): React.ReactElement {
  return (
    <Section id="now">
      <Container>
        <SectionHeading number="03." title="Now" />
        <div className="space-y-6">
          {items.map((item) => (
            <GlassCard key={item.name} className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
                <Badge variant="accent">
                  {item.status === "in-progress" ? "In progress" : "Shipping"}
                </Badge>
              </div>
              <p className="max-w-prose text-foreground-muted">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.techStack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </Container>
    </Section>
  );
}
