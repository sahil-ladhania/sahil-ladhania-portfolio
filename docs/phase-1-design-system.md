# Phase 1: Design System

**Status:** Approved  
**Domain:** sahilladhania.com  
**Last updated:** 2026-05-30

---

## Source answers

| Question | Answer |
|----------|--------|
| Color / accent | `#084a3a` on light; light shade of `#084a3a` on dark |
| Light / dark | Light default, toggleable |
| Font | Geist (Sans + Mono) |
| Visual personality | A — very minimal |
| Surfaces | Frosted glass + minimalism |
| References | None specific — minimalism is the guide |
| Motion | A — subtle fade-ins on scroll only |

---

## 1. Design principles

| Principle | Rule |
|-----------|------|
| Clarity over decoration | Typography and spacing do the work; no gradients, noise, or glow |
| Light-first | Default theme is light; dark is opt-in via toggle (not `prefers-color-scheme` alone) |
| Accent = signal | `#084a3a` marks links, CTAs, active nav, focus rings — nothing else |
| Glass = structure | Frosted panels group content; borders stay hairline-thin |
| Motion = proof of polish | Fade-in on scroll only; no hover theatrics beyond color/opacity |

**Structural model:** Brittany Chiang (sticky nav, section hierarchy, scannable).  
**Visual feel:** Minimal Geist + teal accent + glass.

---

## 2. Color palette

### 2.1 Brand accent scale (derived from `#084a3a`)

| Token | Hex | Use |
|-------|-----|-----|
| `accent-950` | `#021612` | Dark mode page bg tint |
| `accent-900` | `#084a3a` | **Light mode** links, CTAs, focus |
| `accent-800` | `#063d30` | Light mode hover |
| `accent-700` | `#0a5c48` | Light mode pressed |
| `accent-500` | `#10a882` | Charts, diagrams (future) |
| `accent-400` | `#2a9d7a` | Dark mode secondary accent |
| `accent-300` | `#6ed4b8` | **Dark mode** links, CTAs, focus |
| `accent-200` | `#9edfc8` | Dark mode hover |
| `accent-100` | `#cceee3` | Light mode badge/bg tint |
| `accent-50` | `#e6f7f2` | Light mode subtle highlight |

### 2.2 Light mode (default)

| Token | Hex / value |
|-------|-------------|
| `background` | `#f8faf9` |
| `background-subtle` | `#f1f5f4` |
| `foreground` | `#0f1f1a` |
| `foreground-muted` | `#4a635c` |
| `foreground-subtle` | `#7a948c` |
| `border` | `rgba(8, 74, 58, 0.10)` |
| `border-strong` | `rgba(8, 74, 58, 0.18)` |
| `glass-bg` | `rgba(255, 255, 255, 0.72)` |
| `glass-border` | `rgba(255, 255, 255, 0.90)` |
| `glass-shadow` | `0 1px 2px rgba(8, 74, 58, 0.04)` |

### 2.3 Dark mode

| Token | Hex / value |
|-------|-------------|
| `background` | `#0a1012` |
| `background-subtle` | `#111a1d` |
| `foreground` | `#e8f0ed` |
| `foreground-muted` | `#94aba3` |
| `foreground-subtle` | `#6b857c` |
| `border` | `rgba(110, 212, 184, 0.10)` |
| `border-strong` | `rgba(110, 212, 184, 0.18)` |
| `glass-bg` | `rgba(17, 26, 29, 0.65)` |
| `glass-border` | `rgba(110, 212, 184, 0.08)` |
| `glass-shadow` | `none` |

### 2.4 Semantic colors

| Token | Light | Dark |
|-------|-------|------|
| `success` | `#0a5c48` | `#6ed4b8` |
| `error` | `#b91c1c` | `#f87171` |
| `warning` | `#b45309` | `#fbbf24` |

### 2.5 Theme-aware accent mapping

| Mode | `--accent` | `--accent-hover` | `--accent-muted` |
|------|------------|------------------|------------------|
| Light | `accent-900` (`#084a3a`) | `accent-800` (`#063d30`) | `accent-50` (`#e6f7f2`) |
| Dark | `accent-300` (`#6ed4b8`) | `accent-200` (`#9edfc8`) | `rgba(110, 212, 184, 0.12)` |

---

## 3. Typography

**Fonts:** Geist Sans (UI + body), Geist Mono (code, tags, metadata).

### 3.1 Type scale

| Token | Size | Line height | Weight | Use |
|-------|------|-------------|--------|-----|
| `text-xs` | 0.75rem (12px) | 1rem | 400 | Captions, timestamps |
| `text-sm` | 0.875rem (14px) | 1.375rem | 400 | Labels, nav, meta |
| `text-base` | 1rem (16px) | 1.625rem | 400 | Body |
| `text-lg` | 1.125rem (18px) | 1.75rem | 400 | Lead paragraphs |
| `text-xl` | 1.25rem (20px) | 1.75rem | 600 | Section subheads |
| `text-2xl` | 1.5rem (24px) | 2rem | 600 | Section titles |
| `text-3xl` | 1.875rem (30px) | 2.25rem | 600 | Page titles |
| `text-4xl` | 2.25rem (36px) | 2.5rem | 700 | Hero name |
| `text-5xl` | 3rem (48px) | 1.1 | 700 | Hero (lg+ only) |

### 3.2 Rules

- **Body:** `font-sans text-base text-foreground`
- **Muted body:** `text-foreground-muted`
- **Mono (tech tags, dates):** `font-mono text-sm text-foreground-subtle`
- **Headings:** no decorative fonts; weight + size only
- **Max line length:** `max-w-prose` (~65ch) for paragraphs
- **Letter-spacing:** default Geist; `tracking-tight` on `text-4xl`+ only

---

## 4. Spacing & layout

**Base unit:** 4px (Tailwind default).

| Token | Value | Use |
|-------|-------|-----|
| `section-y` | `py-20 md:py-28 lg:py-32` | Vertical section rhythm |
| `section-gap` | `space-y-16 md:space-y-20` | Between blocks inside a section |
| `container-x` | `px-6 md:px-8 lg:px-12` | Horizontal padding |
| `content-max` | `max-w-6xl` | Page container |
| `prose-max` | `max-w-2xl` | Long-form text |
| `nav-height` | `h-16` | Sticky header |
| `sidebar-width` | `w-64 lg:w-72` | Sticky side nav (Brittany-style, Phase 2) |

**Grid:** Single column mobile; `lg:grid lg:grid-cols-[240px_1fr] lg:gap-16` for nav + content on desktop.

---

## 5. Component tokens

| Token | Value | Notes |
|-------|-------|-------|
| `radius-sm` | `6px` | Badges, inputs |
| `radius-md` | `10px` | Buttons |
| `radius-lg` | `14px` | Cards, glass panels |
| `radius-full` | `9999px` | Pills, toggle |
| `border-width` | `1px` | Always hairline |
| `glass-blur` | `24px` (`backdrop-blur-xl`) | Frosted surfaces |
| `shadow-sm` | light only: `0 1px 2px rgba(8,74,58,0.04)` | Cards on light bg |
| `shadow-none` | dark mode default | Flat + glass |
| `focus-ring` | `2px solid accent` + `2px offset` | Accessibility |
| `transition` | `150ms ease` | Color, opacity, border only |

**No glow tokens.** Glass + border carry depth.

### Glass surface recipe

```
bg-glass-bg backdrop-blur-xl border border-glass-border rounded-lg
```

Optional on light: `shadow-sm`. Dark: no shadow.

---

## 6. Animation principles

**Level:** A — minimal.

| Allowed | Not allowed |
|---------|-------------|
| Fade-in on scroll (opacity 0→1, y: 8→0) | Page transitions |
| `prefers-reduced-motion`: disable all | Magnetic cursor, parallax |
| 200–400ms duration, ease-out | Stagger beyond 50ms between siblings |
| Theme toggle: instant color swap (no flash animation) | Hover scale/lift on cards |

### Framer Motion patterns

```typescript
// lib/motion.ts

export const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const viewportOnce = { once: true, margin: "-10% 0px" };

export const reducedMotion = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};
```

**Dependency:** `framer-motion` (installed during Phase 1 implementation).

---

## 7. Theme system

- **Default:** `light` (class on `<html>`, not media query)
- **Toggle:** Persists to `localStorage` key `theme`
- **SSR:** Inline script in `<head>` to set class before paint (avoid flash)
- **`prefers-color-scheme`:** Ignored after first visit; default is always **light** on first load

---

## 8. Component inventory

Design-system primitives only — no page sections in Phase 1.

| Component | Purpose | Variants |
|-----------|---------|----------|
| `ThemeProvider` | Theme context + localStorage | — |
| `ThemeToggle` | Light/dark switch | `icon` (nav) |
| `Container` | Max-width wrapper | `default`, `narrow` |
| `Section` | Semantic section + optional fade-in | `default` |
| `GlassCard` | Frosted content panel | `default`, `flat` (no blur, border only) |
| `Button` | Actions | `primary`, `secondary`, `ghost`, `link` |
| `Link` | Internal/external links | `default`, `nav`, `external` |
| `Badge` | Tech tags, status | `default`, `accent`, `muted` |
| `SectionHeading` | Numbered section title (Brittany pattern) | `default` |
| `Divider` | Horizontal rule | `default`, `subtle` |
| `Input` | Form fields (future contact) | `default`, `error` |
| `Textarea` | Form fields | `default`, `error` |
| `IconButton` | Icon-only actions | `ghost`, `solid` |
| `Skeleton` | Loading placeholder | `text`, `rect` |
| `VisuallyHidden` | A11y helper | — |

### File structure (Phase 1 implementation)

```
components/
  ui/
    Button.tsx
    Link.tsx
    Badge.tsx
    GlassCard.tsx
    Container.tsx
    Section.tsx
    SectionHeading.tsx
    Divider.tsx
    Input.tsx
    Textarea.tsx
    IconButton.tsx
    Skeleton.tsx
    VisuallyHidden.tsx
  theme/
    ThemeProvider.tsx
    ThemeToggle.tsx
lib/
  motion.ts
  cn.ts
```

---

## 9. `globals.css`

Project uses **Tailwind CSS v4** (`@theme inline`). All theme tokens live here — this is the canonical config.

```css
@import "tailwindcss";

/* ── Light (default) ── */
:root {
  /* Brand */
  --accent-950: #021612;
  --accent-900: #084a3a;
  --accent-800: #063d30;
  --accent-700: #0a5c48;
  --accent-500: #10a882;
  --accent-400: #2a9d7a;
  --accent-300: #6ed4b8;
  --accent-200: #9edfc8;
  --accent-100: #cceee3;
  --accent-50: #e6f7f2;

  /* Surfaces */
  --background: #f8faf9;
  --background-subtle: #f1f5f4;
  --foreground: #0f1f1a;
  --foreground-muted: #4a635c;
  --foreground-subtle: #7a948c;

  /* Accent (theme-aware) */
  --accent: var(--accent-900);
  --accent-hover: var(--accent-800);
  --accent-muted: var(--accent-50);

  /* Borders & glass */
  --border: rgba(8, 74, 58, 0.10);
  --border-strong: rgba(8, 74, 58, 0.18);
  --glass-bg: rgba(255, 255, 255, 0.72);
  --glass-border: rgba(255, 255, 255, 0.90);
  --glass-shadow: 0 1px 2px rgba(8, 74, 58, 0.04);

  /* Semantic */
  --success: #0a5c48;
  --error: #b91c1c;
  --warning: #b45309;

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
}

/* ── Dark ── */
.dark {
  --background: #0a1012;
  --background-subtle: #111a1d;
  --foreground: #e8f0ed;
  --foreground-muted: #94aba3;
  --foreground-subtle: #6b857c;

  --accent: var(--accent-300);
  --accent-hover: var(--accent-200);
  --accent-muted: rgba(110, 212, 184, 0.12);

  --border: rgba(110, 212, 184, 0.10);
  --border-strong: rgba(110, 212, 184, 0.18);
  --glass-bg: rgba(17, 26, 29, 0.65);
  --glass-border: rgba(110, 212, 184, 0.08);
  --glass-shadow: none;

  --success: #6ed4b8;
  --error: #f87171;
  --warning: #fbbf24;
}

@theme inline {
  /* Colors */
  --color-background: var(--background);
  --color-background-subtle: var(--background-subtle);
  --color-foreground: var(--foreground);
  --color-foreground-muted: var(--foreground-muted);
  --color-foreground-subtle: var(--foreground-subtle);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-accent-muted: var(--accent-muted);
  --color-border: var(--border);
  --color-border-strong: var(--border-strong);
  --color-glass-bg: var(--glass-bg);
  --color-glass-border: var(--glass-border);
  --color-success: var(--success);
  --color-error: var(--error);
  --color-warning: var(--warning);

  /* Accent scale (static) */
  --color-accent-900: var(--accent-900);
  --color-accent-300: var(--accent-300);
  --color-accent-100: var(--accent-100);
  --color-accent-50: var(--accent-50);

  /* Fonts */
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);

  /* Radius */
  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
}

@layer base {
  body {
    @apply bg-background text-foreground font-sans antialiased;
  }

  ::selection {
    background-color: var(--accent-muted);
    color: var(--foreground);
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. `tailwind.config.ts`

**Not required for Tailwind v4.** Theme tokens live in `globals.css` via `@theme inline`. Optional file for tooling hints only:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
};

export default config;
```

Do not duplicate color/font/radius tokens in JS config.

---

## 11. Phase 1 implementation scope

When implementation begins, scope is **only**:

1. Update `globals.css` with full token system (§9)
2. Add `ThemeProvider` + `ThemeToggle` + SSR flash prevention
3. Add `lib/cn.ts` and `lib/motion.ts`
4. Build all UI primitives from §8
5. Add a `/design-system` dev preview route (internal, removable before launch)
6. Install: `framer-motion`, `clsx`, `tailwind-merge`
7. Set `<html class="light">` as default in layout

**Out of scope for Phase 1:** Page sections, copy, chatbot, analytics, nav content.

---

## 12. Approval

- [x] Accent scale (`#6ed4b8` as dark-mode interactive accent)
- [x] Light bg `#f8faf9` / dark bg `#0a1012`
- [x] Tailwind v4 CSS-first config (no duplicate `tailwind.config.ts` tokens)
- [x] Component inventory list
- [x] `/design-system` preview route for dev

**Approved by Sahil Ladhania — 2026-05-30**
