import { cn } from "@/lib/cn";

/** Outer glass tray — navbar shell, tab bar (one subtle edge) */
export const glassSurfaceBordered =
  "border border-white/20 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-3xl backdrop-saturate-150 ring-1 ring-inset ring-white/10";

export const glassSurfaceBorderedHover =
  "hover:border-white/25 hover:bg-white/12";

/** Inner glass — buttons, pills, icons (no border) */
export const glassSurfaceSoft =
  "bg-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.22)] backdrop-blur-3xl backdrop-saturate-150";

export const glassSurfaceSoftHover = "hover:bg-white/15";

/** @deprecated Use glassSurfaceBordered or glassSurfaceSoft */
export const glassSurface = glassSurfaceBordered;

/** @deprecated Use glassSurfaceBorderedHover or glassSurfaceSoftHover */
export const glassSurfaceHover = glassSurfaceBorderedHover;

export const glassPrimaryButton = cn(
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors",
  glassSurfaceSoft,
  glassSurfaceSoftHover,
);

export const glassSecondaryButton = cn(
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-white/80 transition-colors",
  "bg-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.2)] backdrop-blur-3xl backdrop-saturate-150",
  "hover:bg-white/10 hover:text-white",
);

export const glassTabList = cn(
  "inline-flex rounded-lg p-1",
  glassSurfaceBordered,
);

export const glassTabActivePill =
  "absolute inset-0 rounded-md bg-white/15 backdrop-blur-md";

export const glassTabButtonActive = "text-white";

export const glassTabButtonInactive =
  "text-white/70 hover:text-white";

export const glassDockShell = cn(
  "mx-auto flex min-h-[3.25rem] max-w-[calc(100vw-2rem)] items-end gap-2 overflow-visible rounded-2xl px-4 py-2.5 sm:gap-2.5 sm:px-5",
  glassSurfaceBordered,
);

export const glassDockMobileShell = cn(
  "flex items-center justify-center rounded-full",
  glassSurfaceBordered,
);

export const glassDockIconHit = cn(
  "relative z-10 flex aspect-square items-center justify-center overflow-visible rounded-full",
  "bg-white/5 text-white/80 backdrop-blur-md transition-colors",
  "hover:bg-white/15 hover:text-white [&_svg]:stroke-current",
);

export const glassDockTooltip = cn(
  "pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-50 w-max max-w-[10rem]",
  "rounded-md bg-white/10 px-2.5 py-1 text-center text-xs font-medium text-white shadow-md backdrop-blur-xl",
);
