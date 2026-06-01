"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/components/ui/Link";
import { ProjectExpandedContent } from "@/components/sections/ProjectExpandedContent";
import { ProductLogo } from "@/components/shared/ProductLogo";
import type { Project } from "@/types/content.types";

function ProjectCardHeader({ project }: { project: Project }): React.ReactElement {
  return (
    <div className="flex items-start gap-4">
      {project.logo ? (
        <ProductLogo src={project.logo} alt={project.name} />
      ) : null}
      <div className="min-w-0 flex-1 space-y-2">
        <h3 className="text-xl font-semibold text-foreground">{project.name}</h3>
        <p className="font-mono text-sm text-foreground-subtle">{project.role}</p>
        <p className="text-foreground-muted">{project.outcomeLine}</p>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
}

export function ProjectCard({
  project,
  isExpanded,
  onToggle,
}: ProjectCardProps): React.ReactElement {
  if (!project.expandInWork) {
    return (
      <GlassCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1 space-y-4">
            <ProjectCardHeader project={project} />
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
          </div>
          <Link href="#now" variant="default">
            Building now →
          </Link>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left"
        aria-expanded={isExpanded}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="[&_h3]:hover:text-accent">
              <ProjectCardHeader project={project} />
            </div>
            {!isExpanded && (
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {project.contentVariant === "curiosity" ? (
                  <Badge variant="accent">Curiosity project</Badge>
                ) : null}
                {!project.showResult && project.contentVariant !== "curiosity" ? (
                  <Badge variant="accent">Building now</Badge>
                ) : null}
                {project.techStack.slice(0, 6).map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            )}
          </div>
          <span className="text-accent" aria-hidden="true">
            {isExpanded ? "−" : "+"}
          </span>
        </div>
      </button>

      {isExpanded ? (
        <div className="mt-6 border-t border-border pt-6">
          <ProjectExpandedContent project={project} />
        </div>
      ) : null}
    </GlassCard>
  );
}
