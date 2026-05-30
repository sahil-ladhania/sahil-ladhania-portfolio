"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/sections/ProjectCard";
import type { Project } from "@/types/content.types";

interface ProjectListProps {
  projects: Project[];
}

export function ProjectList({ projects }: ProjectListProps): React.ReactElement {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          isExpanded={expandedSlug === project.slug}
          onToggle={() =>
            setExpandedSlug((prev) =>
              prev === project.slug ? null : project.slug,
            )
          }
        />
      ))}
    </div>
  );
}
