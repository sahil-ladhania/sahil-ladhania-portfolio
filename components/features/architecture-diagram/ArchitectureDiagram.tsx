interface ArchitectureDiagramProps {
  slug: string;
  name: string;
}

export function ArchitectureDiagram({
  name,
}: ArchitectureDiagramProps): React.ReactElement {
  return (
    <div className="rounded-lg border border-dashed border-border bg-background-subtle p-8 text-center">
      <p className="font-mono text-xs uppercase text-foreground-subtle">
        Architecture — {name}
      </p>
      <p className="mt-2 text-sm text-foreground-muted">Diagram coming soon</p>
    </div>
  );
}
