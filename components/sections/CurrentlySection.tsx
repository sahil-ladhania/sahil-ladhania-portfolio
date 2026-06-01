import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { ProductLogo } from "@/components/shared/ProductLogo";
import { TooltipText } from "@/components/shared/TooltipText";
import type {
  CurrentlyBuilding,
  CurrentlyBuildingStatus,
  TooltipRegistry,
} from "@/types/content.types";

const STATUS_LABELS: Record<CurrentlyBuildingStatus, string> = {
  "building-now": "Building now",
  "in-progress": "In progress",
};

interface CurrentlySectionProps {
  items: CurrentlyBuilding[];
  tooltips: TooltipRegistry;
}

export function CurrentlySection({
  items,
  tooltips,
}: CurrentlySectionProps): React.ReactElement {
  return (
    <Section id="now">
      <Container>
        <SectionHeading number="03." title="In progress" />
        <div className="space-y-6">
          {items.map((item) => (
            <GlassCard key={item.name} className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                {item.logo ? (
                  <ProductLogo src={item.logo} alt={item.name} size="sm" />
                ) : null}
                <h3 className="text-xl font-semibold text-foreground">{item.name}</h3>
                <Badge variant="accent">{STATUS_LABELS[item.status]}</Badge>
              </div>
              <p className="max-w-prose text-foreground-muted">
                <TooltipText text={item.description} tooltips={tooltips} />
              </p>
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
