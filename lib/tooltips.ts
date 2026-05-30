export const PROOF_CLIENT_TOOLTIP_IDS: Record<string, string> = {
  "Horizon Stays": "horizon-stays",
  "Reachly Beta": "reachly-beta",
};

export function getProofClientTooltipId(clientName: string): string | undefined {
  return PROOF_CLIENT_TOOLTIP_IDS[clientName];
}
