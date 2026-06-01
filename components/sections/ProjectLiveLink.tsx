import { glassSecondaryButton } from "@/lib/glass-styles";
import type { Project } from "@/types/content.types";

interface ProjectLiveLinkProps {
  project: Project;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export function getProjectLiveUrl(project: Project): string | undefined {
  const liveLink = project.links?.find((link) =>
    link.label.toLowerCase().includes("live"),
  );

  return liveLink?.href ?? project.links?.[0]?.href;
}

export function ProjectLiveLink({
  project,
  onClick,
}: ProjectLiveLinkProps): React.ReactElement | null {
  const href = getProjectLiveUrl(project);

  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={glassSecondaryButton}
      onClick={onClick}
    >
      Visit live app
      <span aria-hidden="true">↗</span>
    </a>
  );
}
