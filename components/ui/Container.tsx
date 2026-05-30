import { cn } from "@/lib/cn";

interface ContainerProps {
  narrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Container({
  narrow = false,
  className,
  children,
}: ContainerProps): React.ReactElement {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-8 lg:px-12",
        narrow ? "max-w-2xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
