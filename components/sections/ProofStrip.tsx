import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import { ProofClientList } from "@/components/sections/ProofClientList";
import type { SiteProof, TooltipRegistry } from "@/types/content.types";

interface ProofStripProps {
  proof: SiteProof;
  tooltips: TooltipRegistry;
}

export function ProofStrip({ proof, tooltips }: ProofStripProps): React.ReactElement {
  return (
    <section id="proof" className="scroll-mt-20 py-12">
      <Container>
        <GlassCard className="space-y-6">
          <blockquote className="max-w-2xl text-foreground-muted">
            &ldquo;{proof.testimonial.quote}&rdquo;
          </blockquote>
          <p className="text-sm text-foreground">
            <span className="font-medium">{proof.testimonial.author}</span>
            <span className="text-foreground-muted"> — {proof.testimonial.role}</span>
          </p>
          <div className="font-mono text-xs text-foreground-subtle">
            <ProofClientList clients={proof.clients} tooltips={tooltips} />
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}
