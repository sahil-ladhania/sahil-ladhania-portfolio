"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/Badge";
import { ProjectLiveLink } from "@/components/sections/ProjectLiveLink";
import { SegmentedTabs } from "@/components/ui/SegmentedTabs";
import type { Project } from "@/types/content.types";

type ProjectTab = "story" | "thinking";

interface ProjectExpandedContentProps {
  project: Project;
}

function BuildStoryContent({ project }: { project: Project }): React.ReactElement {
  if (project.contentVariant === "curiosity") {
    return (
      <>
        <p className="text-foreground-muted">{project.about}</p>
        {project.highlights.length > 0 ? (
          <div>
            <h4 className="mb-2 font-mono text-xs uppercase text-accent">
              What&apos;s inside
            </h4>
            <ul className="list-inside list-disc space-y-1 text-foreground-muted">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <>
      <div>
        <h4 className="mb-2 font-mono text-xs uppercase text-accent">Problem</h4>
        <p className="text-foreground-muted">{project.problem}</p>
      </div>
      <div>
        <h4 className="mb-2 font-mono text-xs uppercase text-accent">Solution</h4>
        <p className="text-foreground-muted">{project.solution}</p>
      </div>
      {project.showResult ? (
        <div>
          <h4 className="mb-2 font-mono text-xs uppercase text-accent">Result</h4>
          <p className="text-foreground-muted">{project.result}</p>
        </div>
      ) : null}
    </>
  );
}

function ProductThinkingContent({ project }: { project: Project }): React.ReactElement {
  return (
    <>
      {project.productThinkingIntro ? (
        <p className="text-foreground-muted">{project.productThinkingIntro}</p>
      ) : null}
      {project.productThinkingSections.map((section) => (
        <div key={section.title}>
          <h4 className="mb-2 font-mono text-xs uppercase text-accent">
            {section.title}
          </h4>
          <p className="text-foreground-muted">{section.body}</p>
        </div>
      ))}
    </>
  );
}

export function ProjectExpandedContent({
  project,
}: ProjectExpandedContentProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<ProjectTab>("story");
  const showTabs = project.showProductThinking;

  useEffect(() => {
    setActiveTab("story");
  }, [project.slug]);

  const tabOptions: { id: ProjectTab; label: string }[] = [
    { id: "story", label: "Build Story" },
    { id: "thinking", label: "Product Thinking" },
  ];

  return (
    <div className="space-y-6">
      {showTabs ? (
        <SegmentedTabs
          options={tabOptions}
          value={activeTab}
          onChange={setActiveTab}
          ariaLabel={`${project.name} details`}
        />
      ) : null}

      <div
        role="tabpanel"
        aria-label={
          showTabs && activeTab === "thinking" ? "Product Thinking" : "Build Story"
        }
        className="space-y-6"
      >
        {showTabs && activeTab === "thinking" ? (
          <ProductThinkingContent project={project} />
        ) : (
          <BuildStoryContent project={project} />
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>
      <ProjectLiveLink project={project} />
    </div>
  );
}
