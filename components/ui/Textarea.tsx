import { cn } from "@/lib/cn";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export function Textarea({
  error = false,
  className,
  ...props
}: TextareaProps): React.ReactElement {
  return (
    <textarea
      className={cn(
        "w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent min-h-[120px] resize-y",
        error && "border-error",
        className,
      )}
      {...props}
    />
  );
}
