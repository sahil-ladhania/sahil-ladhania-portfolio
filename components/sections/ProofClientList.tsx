"use client";

import { TooltipTerm } from "@/components/shared/TooltipText";
import { getProofClientTooltipId } from "@/lib/tooltips";
import type { TooltipRegistry } from "@/types/content.types";

interface ProofClientListProps {
  clients: string[];
  tooltips: TooltipRegistry;
}

export function ProofClientList({
  clients,
  tooltips,
}: ProofClientListProps): React.ReactElement {
  return (
    <>
      {clients.map((client, index) => {
        const tooltipId = getProofClientTooltipId(client);
        const tooltip = tooltipId ? tooltips[tooltipId] : undefined;

        return (
          <span key={client}>
            {index > 0 && <span aria-hidden="true"> · </span>}
            {tooltip ? (
              <TooltipTerm tooltip={{ ...tooltip, label: client }} />
            ) : (
              <span>{client}</span>
            )}
          </span>
        );
      })}
    </>
  );
}
