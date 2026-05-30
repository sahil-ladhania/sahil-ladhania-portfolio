import { Container } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/GlassCard";
import type { SiteProof } from "@/types/content.types";

interface ProofStripProps {
  proof: SiteProof;
}

export function ProofStrip({ proof }: ProofStripProps): React.ReactElement {
  return (
    <section id="proof" className="py-12">
      <Container>
        <GlassCard className="space-y-6">
          <blockquote className="max-w-2xl text-foreground-muted">
            &ldquo;{proof.testimonial.quote}&rdquo;
          </blockquote>
          <p className="text-sm text-foreground">
            <span className="font-medium">{proof.testimonial.author}</span>
            <span className="text-foreground-muted"> — {proof.testimonial.role}</span>
          </p>
          <div className="flex flex-wrap gap-4 font-mono text-xs text-foreground-subtle">
            {proof.clients.map((client) => (
              <span key={client}>{client}</span>
            ))}
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}
