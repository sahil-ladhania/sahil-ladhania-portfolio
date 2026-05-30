"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Link } from "@/components/ui/Link";
import { cn } from "@/lib/cn";
import { ArchitectureDiagram } from "@/components/features/architecture-diagram/ArchitectureDiagram";
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
              <div className="mt-2 flex flex-wrap gap-2">
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

      {isExpanded && (
        <div className="mt-6 space-y-6 border-t border-border pt-6">
          <div>
            <h4 className="mb-2 font-mono text-xs uppercase text-accent">Problem</h4>
            <p className="text-foreground-muted">{project.problem}</p>
          </div>
          <div>
            <h4 className="mb-2 font-mono text-xs uppercase text-accent">Solution</h4>
            <p className="text-foreground-muted">{project.solution}</p>
          </div>
          <div>
            <h4 className="mb-2 font-mono text-xs uppercase text-accent">Result</h4>
            <p className="text-foreground-muted">{project.result}</p>
          </div>
          {project.hasArchitectureDiagram && (
            <ArchitectureDiagram slug={project.slug} name={project.name} />
          )}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
          {project.links && project.links.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {project.links.map((link) => (
                <Link key={link.href} href={link.href} variant="external">
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </GlassCard>
  );
}
