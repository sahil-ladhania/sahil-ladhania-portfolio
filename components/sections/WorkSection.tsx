import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { ProjectList } from "@/components/sections/ProjectList";
import type { Project } from "@/types/content.types";

interface WorkSectionProps {
  projects: Project[];
}

export function WorkSection({ projects }: WorkSectionProps): React.ReactElement {
  return (
    <Section id="work">
      <Container>
        <SectionHeading number="02." title="Work" />
        <p className="mb-8 max-w-prose text-foreground-muted">
          Selected projects. Each one started as a real problem — not a portfolio piece.
        </p>
        <ProjectList projects={projects} />
      </Container>
    </Section>
  );
}
