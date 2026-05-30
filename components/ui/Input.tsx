import { cn } from "@/lib/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function Input({
  error = false,
  className,
  ...props
}: InputProps): React.ReactElement {
  return (
    <input
      className={cn(
        "w-full rounded-sm border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent",
        error && "border-error",
        className,
      )}
      {...props}
    />
  );
}
