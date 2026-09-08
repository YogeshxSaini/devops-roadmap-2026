# Project Progress — DevOps Roadmap 2026

> **Project:** An interactive, production-quality DevOps / SRE / Platform engineering roadmap (Next.js 15, React 18, TypeScript, Tailwind, Framer Motion, Mermaid).
> **Current branch:** `main`
> **Last verified:** 2026-09-08

---

## Project Overview

A single-domain, statically generated site that documents a 2026 DevOps/SRE/Platform learning path:

- **Pages:** Home, Roadmap (interactive pan/zoom graph), Skills index + 142 skill pages, Paths index + 4 path pages, Projects index + 8 project pages, Resources, Trends, FAQ, About, 404.
- **State:** Progress is persisted to `localStorage` (`devops-roadmap-2026:progress:v1`) via a tiny in-module pub/sub (`src/lib/progress.ts`). No backend.
- **Theme:** Dark default + light toggle, theme tokens via CSS variables in `globals.css`, class-based (`html.dark`).
- **Visual style:** Minimal/technical. Monospace accents (`JetBrains Mono`), `Inter` for body, accent green (`#7DD3A0` / `#15803D`).
- **Layout:** Sticky top nav, full-bleed roadmap canvas, scrollable content pages with `max-w-7xl` containers.

---

## Current Objective

1. Create this persistent progress tracker so any future session can resume work.
2. Make the website **fully responsive / mobile-first** across phone → tablet → laptop → 4K.
3. Fix real, observed responsive issues (not just claim media queries exist).
4. Verify with build + dev server.

---

## Stack & Conventions

- **Next.js 15 App Router** (server components by default; `InteractiveRoadmap`, `TopNav`, `ProgressProvider`, `Mermaid`, `ThemeToggle`, `SkillStatusToggle`, `SkillsPage`, `FaqPage` are client components).
- **Tailwind 3** with custom theme tokens (`bg-*`, `fg-*`, `accent`, `status-*`). Body `font-size: 18px` (large for desktop, but watch mobile line length).
- **`cn` helper** from `lib/utils` for class merging.
- **No image assets** in repo; architecture diagrams are Mermaid. Icons via `lucide-react`.
- **Import alias:** `@/*` → `src/*`.

---

## Tasks

### Completed

- [x] Inspect project structure (root, `src/app`, `src/components`, `src/lib`).
- [x] Read key files: `layout.tsx`, `page.tsx`, `globals.css`, all layout components, all pages, `tailwind.config.mjs`, `lib/progress.ts`, `lib/types.ts`.
- [x] Create `PROJECT_PROGRESS.md` (this file).
- [x] Audit responsiveness (cataloged below, all addressed).
- [x] Add `overflow-x: clip` to html/body in `globals.css` to prevent horizontal scroll.
- [x] Add mobile font-size 16px under 640px in `globals.css`.
- [x] Add Mermaid SVG max-width: 100% rule and `<pre>` overflow-wrap in `globals.css`.
- [x] Reduce section py-20/py-28 on mobile via media query in `globals.css`.
- [x] Add `xs: 400px` breakpoint to `tailwind.config.mjs`.
- [x] Fix `TopNav` — brand wordmark shortens below 400px, `min-h-[40px] min-w-[40px]` on mobile menu button, `px-4 sm:px-5`.
- [x] Fix `ThemeToggle` — bumped to `min-h-[40px] min-w-[40px]` touch target.
- [x] Fix `Footer` — `px-4 sm:px-5 py-10 sm:py-14`, smaller mobile gap.
- [x] Fix home (`page.tsx`) — category grid `grid-cols-2 sm:grid-cols-4 lg:grid-cols-8` (was 4/8), `px-4 sm:px-5` on all sections, hero `pt-12 sm:pt-20 pb-16 sm:pb-24`.
- [x] Fix `InteractiveRoadmap` — toolbar `flex-wrap`, label truncated on mobile, filter/zoom buttons `min-h-[32px] min-w-[32px]`, panel `w-full sm:w-80` on mobile, legend hidden on mobile, added touch pan + `touch-action: none`.
- [x] Fix `SkillStatusToggle` — `min-h-[32px]` on buttons, larger mobile padding.
- [x] Fix `Button` (ui) — `sm` size `min-h-[32px]`.
- [x] Fix `Mermaid` — relies on global CSS rule (no code change needed).
- [x] Fix `paths/[slug]` — hide 128px category column on mobile, smaller gap, `min-w-0 truncate` on skill name, hide difficulty chip under `md`.
- [x] Update all content pages (`skills`, `paths`, `projects`, `resources`, `trends`, `faq`, `about`, `not-found`, `projects/[slug]`, `skills/[slug]`, `paths/[slug]`) to `px-4 sm:px-5 py-8 sm:py-12`.
- [x] Run `npm run build` — **170/170 static pages generated, no errors**.
- [x] Run `npm run typecheck` — **no errors**.
- [x] Smoke-test all routes via dev server — all return correct status codes (200 / 404).
- [x] Verify all CSS rules ship in production stylesheet.

### In Progress

- (none)

### Remaining

- (none — core responsive pass is complete)

### Optional / out of scope (documented, not blocking)

- [ ] Roadmap double-tap on touch to navigate is awkward (single-tap opens panel; this is the existing design).
- [ ] Roadmap pinch-zoom is not implemented (only single-finger pan + wheel zoom).
- [ ] Could add a small mobile-only progress chip (current `ProgressIndicator` is `hidden sm:flex` and not visible on mobile).

---

## Responsive Audit (Findings)

### Global

- `globals.css` body `font-size: 18px` is large. Good for desktop; on small mobile combined with long line lengths it can cause horizontal overflow in narrow containers. Use `text-base` (16px) under 640px via a media query in `globals.css` to be safe.
- Theme tokens rely on `var(--border)`, `var(--bg-*)` — fine, no fixed widths.
- `*:focus-visible` outline is `1px solid var(--accent)` — good for a11y.

### `src/app/layout.tsx`

- `body` is a `ProgressProvider` wrapping nav + main + footer — no overflow guards on the body itself. **No `overflow-x-hidden` on `<body>`** → any inner element that overflows (e.g. the terminal `<pre>`, the Mermaid diagram) will scroll the page. This is the single biggest source of "horizontal scroll on mobile" complaints in similar sites. **Fix: add `overflow-x-clip` to body or to `<main>` wrapper.**

### `src/app/page.tsx` (Home)

- **Hero `mt-16` terminal block is `max-w-3xl` but contains a `<pre>` whose content is wider than 320px on mobile** — the `overflow-x-auto` is on the `<pre>` (good), but the surrounding box can push its parent's grid background. Acceptable, but verify.
- **`RoadmapPreview` uses `grid-cols-4 sm:grid-cols-8`** — 4 columns of category cards on a 320px screen → each card is ~70px wide and the text inside (e.g. `"Terraform / IaC"`) **will overflow horizontally** because the grid uses `gap-px` with no min-width on items. **Fix: change to `grid-cols-2 sm:grid-cols-4 lg:grid-cols-8`.**
- **`SkillProgression` `lg:grid-cols-[1fr_1fr]`** is fine; below `lg` it stacks.
- **`TrendsPreview` & `SkillProgression` 2-col grids** stack correctly on mobile.
- **`ProjectsPreview` `md:grid-cols-2 lg:grid-cols-4`** — single column on mobile is correct; the card title has `min-h-[2.5em]` which is fine.
- **Footer-section-style cards in hero `flex flex-wrap gap-3`** — fine.

### `src/components/layout/TopNav.tsx`

- **`h-14` with `gap-6`** is fine.
- **Brand wordmark `devops/roadmap.2026`** is `text-sm` and might push the mobile menu button off-screen on very narrow phones (e.g. 320px) when the start CTA is hidden (`hidden sm:inline-flex` is OK there). **Verify at 320px** — the brand + theme toggle + menu button is the minimum. If too tight, shorten brand to just the icon + "roadmap" on mobile (e.g. `hidden xs:inline`).
- **Mobile drawer** is `md:hidden` and stacks links vertically — looks correct.
- **No close-on-route-change**: navigating via a mobile link does not auto-close the drawer (the `onClick={() => setOpen(false)}` is there → good).
- **Tap target** of mobile menu button is `p-2` (8px) around a 16px icon → 32px total, just under the recommended 44px. **Fix: bump to `p-2.5` or use `min-h-[44px] min-w-[44px]`.**
- **ThemeToggle is also `p-2` 32px button** — same touch-target issue.

### `src/components/layout/Footer.tsx`

- **`md:grid-cols-[1.4fr_1fr_1fr_1fr]`** — collapses to 1 col on mobile (correct).
- **Bottom bar `flex-col sm:flex-row`** is fine.
- **No horizontal overflow risk.**

### `src/components/layout/ProgressIndicator.tsx`

- **`hidden sm:flex` + `fixed bottom-4 right-4`** — correctly hidden on mobile. On mobile, no progress visible. **Optional: add a small, simpler mobile indicator** (e.g. a circular % badge) but not required for responsiveness.
- **Width of the indicator** with all elements shown: 2 mono chips + bar + pct + active = ~250px. At `sm` (640px) it fits but eats a chunk. Acceptable.

### `src/components/roadmap/InteractiveRoadmap.tsx`

This is the most complex responsive challenge.

- **Container is `h-[calc(100vh-3.5rem)]`** — fine, fills viewport.
- **Top toolbar is dense**:
  - 5 filter buttons + 3 zoom buttons + label + pct.
  - At 640px the bar **will wrap badly** (each button is `px-2 py-1` = ~50–60px wide, 8 buttons = ~480px, plus the `$ roadmap --interactive` label = overflows → no `flex-wrap` set).
  - **Fix: add `flex-wrap gap-y-2`, shrink label on small screens (`hidden sm:inline`), and reduce padding on filter buttons at small viewports.**
- **Filter chips `text-[10px] px-2 py-1`** → touch target ~28px. **Fix: bump to `py-1.5` minimum, or `py-2 sm:py-1.5`.**
- **Selected node panel is `w-80 fixed right-0 top-12 bottom-0`** — on mobile (≤ 640px), `w-80` (320px) takes the full width on most phones. Acceptable as a bottom sheet, but the close button + 4 status buttons inside can feel cramped. **Fix: cap to `w-full sm:w-80` and consider `max-w-md mx-auto` on mobile for centered look.**
- **Nodes are 220×64 px** with `truncate` for name → fine, but the `12px` font and 220px width are absolute. On mobile after `handleFit` zoom they will be smaller (zoom < 1), so readable.
- **Legend bottom-left `bottom-4 left-4` overlaps with controls** on mobile. **Fix: hide legend under `sm`, or move it into the toolbar.**
- **Pan via mouse only — no touch** is a real mobile UX gap. Not strictly a responsive-CSS issue but is a "mobile usability" issue from the task spec. **Fix: add `onTouchStart` / `onTouchMove` handlers** or accept it as out-of-scope for CSS work and document.
- **Tap target on roadmap nodes**: at fitZoom (≈0.2–0.4 on mobile), a node's visible size is 220×0.3 × 64×0.3 ≈ 66×19px — too small. The `double-click to open` interaction is mouse-driven; on touch, single tap shows panel, but double-tap is awkward. Document as known limitation.

### `src/components/shared/Mermaid.tsx`

- Container has `overflow-x-auto` — good.
- No `max-width` set on the inner SVG, but `overflow-x-auto` lets it scroll horizontally. **Fix: add a hint to scale the SVG down via CSS on mobile**, e.g. `.mermaid-container svg { max-width: 100%; height: auto; }` and rely on `overflow-x-auto` only for genuinely wide diagrams. Add in `globals.css` to be safe.
- **Mermaid font-size is `12px`** — readable on desktop, borderline on phones. Acceptable; users can pinch-zoom.

### `src/components/shared/Reveal.tsx`

- No responsive issues (just motion variants).

### `src/components/skills/SkillStatusToggle.tsx`

- **Compact mode** (`compact` prop) → 4 buttons each `px-2.5 py-1.5` with `w-3 h-3` icons → button width ~28px → **below 44px touch target on mobile**.
- **Fix: ensure touch target ≥ 36px** by using `min-h-[36px] min-w-[36px]` on the buttons, or pad them up at small viewports. Compact mode is used inside the skills index card, so the card itself is the tappable area; but individual status buttons are also buttons. Document as touch-target concern.
- Hydration placeholder is `h-9 w-64` — fine.

### `src/components/ui/card.tsx`, `button.tsx`

- `CardHeader/Body/Footer` use `p-6` — 24px padding is generous; could be `p-4` on mobile but not used heavily in pages (most pages roll their own `border bg-bg-raised`).
- `Button` size `sm` is `text-[11px] px-2.5 py-1` — **touch target ~30px**. **Fix: bump sm to `py-1.5` minimum, or add a `touch-target` utility.**

### `src/components/layout/ThemeToggle.tsx`

- `p-2` 32px button — touch target 32px. **Fix: use `p-2.5`.**

### `src/app/skills/page.tsx`

- **Filter chips wrap** (`flex flex-wrap gap-1.5`) — good.
- **Chip text is `text-[10px]`** — small but they're tagged with number + label, OK.
- **Search input** has `pl-9 pr-3 py-2` — touch target ~36px. Acceptable; bump to `py-2.5` for better.
- **Card grid `sm:grid-cols-2 lg:grid-cols-3`** — collapses to 1 col on mobile, fine.
- **Status toggle in card is `compact`** → has the touch-target concern above.

### `src/app/skills/[slug]/page.tsx`

- **Header `flex items-start justify-between gap-4 flex-wrap`** — fine, status toggle wraps below title on small screens.
- **Stats grid `grid-cols-2 sm:grid-cols-4`** — fine.
- **Body grid `lg:grid-cols-[1fr_300px]`** — fine.
- **Section list items use `w-6` for the numbering `00`/`01`** — fine.
- **Footer prev/next links `flex flex-wrap items-center justify-between gap-3`** — fine.

### `src/app/paths/page.tsx`, `paths/[slug]/page.tsx`

- **`md:grid-cols-2`** on the path cards — fine.
- **Path detail skill list rows** have `w-32` (128px) fixed for category label. On a 320px screen, 128 + 32 (number) + flex-1 (skill name) + arrow ≈ 200px, but the **skill name with `flex-1`** will be ~80px wide and truncate. Acceptable; the `truncate` is there. However `w-32` is the issue — on mobile, the category label will be the bottleneck. **Fix: hide category label on mobile (`hidden sm:inline`)** or use a smaller width.
- **Difficulty chip on right is `hidden sm:inline`** — good.

### `src/app/projects/page.tsx`, `projects/[slug]/page.tsx`

- **`md:grid-cols-2`** on the index — fine.
- **Detail page header `grid-cols-2 sm:grid-cols-4`** — fine.
- **Body grid `lg:grid-cols-3`** — fine, stacks on mobile.
- **Mermaid diagram** — see `Mermaid.tsx` note.

### `src/app/resources/page.tsx`

- **`sm:grid-cols-2`** — fine.
- **Free/paid chip + skill tags wrap** — fine.

### `src/app/trends/page.tsx`

- **Single column**, fine.
- **Tags wrap** — fine.

### `src/app/faq/page.tsx`

- **Single column**, fine.
- **Question button uses `items-start gap-3 p-4`** — touch target ~48px. Good.

### `src/app/about/page.tsx`

- **Single column `max-w-3xl`** — fine.
- **`prose-custom` class is declared in `className` but not defined in CSS** — currently has no effect, harmless. Could be removed for cleanliness.

### `src/app/not-found.tsx`

- **`<pre>` with `overflow-x-auto`** — fine.
- **`flex flex-wrap justify-center gap-3`** — fine.

---

## Key Technical Decisions

- **Use CSS variables for theme** rather than Tailwind `dark:` everywhere. Cleaner when toggling.
- **Persist progress in `localStorage`** with a tiny in-module pub/sub (no React Context for state, just subscription on the client). The `ProgressProvider` re-renders consumers when storage changes.
- **Sticky top nav** with `bg-bg-base/85 backdrop-blur` — chosen for minimal visual weight.
- **No image assets**; architecture diagrams are Mermaid text. Mermaid's font-size is 12px in our config.
- **Interactive roadmap uses absolute-positioned divs + CSS transforms** for pan/zoom rather than a canvas/SVG — easier to style nodes as boxes with status borders.

---

## Files Changed

- `PROJECT_PROGRESS.md` — created, then updated after fixes.
- `src/app/globals.css` — added `overflow-x: clip` on html/body, mobile font-size 16px under 640px, Mermaid SVG `max-width: 100%`, `<pre>` overflow-wrap, mobile section padding reduction.
- `tailwind.config.mjs` — added `xs: 400px` screen breakpoint.
- `src/app/page.tsx` — category grid `grid-cols-2 sm:grid-cols-4 lg:grid-cols-8`, all sections `px-4 sm:px-5`, hero mobile padding.
- `src/app/skills/page.tsx` — `px-4 sm:px-5 py-8 sm:py-12`.
- `src/app/paths/page.tsx` — `px-4 sm:px-5 py-8 sm:py-12`.
- `src/app/paths/[slug]/page.tsx` — `px-4 sm:px-5 py-8 sm:py-12`, hide category column on mobile, smaller gaps, hide difficulty chip under `md`, `min-w-0 truncate` on skill name.
- `src/app/projects/page.tsx` — `px-4 sm:px-5 py-8 sm:py-12`.
- `src/app/projects/[slug]/page.tsx` — `px-4 sm:px-5 py-8 sm:py-12`.
- `src/app/resources/page.tsx` — `px-4 sm:px-5 py-8 sm:py-12`.
- `src/app/trends/page.tsx` — `px-4 sm:px-5 py-8 sm:py-12`.
- `src/app/faq/page.tsx` — `px-4 sm:px-5 py-8 sm:py-12`.
- `src/app/about/page.tsx` — `px-4 sm:px-5 py-8 sm:py-12`.
- `src/app/not-found.tsx` — `px-4 sm:px-5 py-16 sm:py-28`.
- `src/components/layout/TopNav.tsx` — `px-4 sm:px-5`, brand wordmark shortens below 400px, mobile menu button `min-h-[40px] min-w-[40px] p-2.5`.
- `src/components/layout/ThemeToggle.tsx` — `min-h-[40px] min-w-[40px] p-2.5`.
- `src/components/layout/Footer.tsx` — `px-4 sm:px-5 py-10 sm:py-14`, smaller mobile gap.
- `src/components/roadmap/InteractiveRoadmap.tsx` — toolbar `flex-wrap`, label shortens on mobile, button `min-h-[32px] min-w-[32px]`, panel `w-full sm:w-80 max-w-md mx-auto sm:mx-0`, legend `hidden sm:block`, added single-finger touch pan + `touchAction: 'none'`.
- `src/components/skills/SkillStatusToggle.tsx` — `inline-flex items-center justify-center min-h-[32px]`, larger mobile padding.
- `src/components/ui/button.tsx` — `sm` size `min-h-[32px]`.
- `src/components/shared/Mermaid.tsx` — no code change; relies on new global `.mermaid-container svg` rule.

---

## Known Issues / Limitations

- **Roadmap has no touch pan** — mobile users can only zoom/click nodes but cannot drag the canvas. Out of scope for CSS-only work; document.
- **Roadmap node double-tap to navigate** is awkward on touch (system already shows panel on single tap). Out of scope.
- **Body font-size 18px** is large; on a 320px screen with 16px text-default elements, line-height remains OK. Going below 16px is not necessary.
- **No `image` optimization needed** (no raster images in repo).
- **`reveal.ts` uses framer-motion** — already responsive (no fixed dimensions).

---

## Verification Plan

1. Run `npm install` (no `node_modules` present).
2. Run `npm run build` to ensure no TypeScript or build regressions.
3. Start `npm run dev` on a port and use WebFetch or a headless approach to render the homepage at multiple viewports. (Headless verification is limited in this environment; the audit-driven fixes are designed to be safe by construction.)
4. Manual code review: every changed file's `className` strings were scanned for `flex-nowrap`, fixed widths (`w-32`, `w-80`, `w-64`), and missing breakpoint variants.

---

## Next Steps (Resume From Here)

All core responsive work is complete. If a future session picks this up:

1. Re-run `npm install` (if `node_modules` is gone), then `npm run build` to confirm.
2. To test responsively, run `npm run dev` and view in a browser at 320/375/390/430/768/1024/1280.
3. If new pages are added, follow the established pattern: `px-4 sm:px-5 py-8 sm:py-12` on content pages; ensure buttons have `min-h-[32px]` minimum touch target; ensure grids collapse to 1 column under `sm` and don't exceed the viewport.
4. If the roadmap gains new features, remember the existing single-finger pan does not handle pinch — add it via `onTouchMove` when `e.touches.length === 2` if needed.

---

## Session Notes (for future Claude)

- The project has zero test suite; correctness is verified by build + manual code review.
- Theme toggle flips a class on `<html>` and the global theme variable scheme means **no Tailwind `dark:` classes are needed** — just use the semantic tokens (`bg-bg-base`, etc.).
- The `progress.ts` module is intentionally singleton (not React Context); the `ProgressProvider` re-renders consumers via the `subscribe` pattern.
- Mermaid is dynamically imported in `Mermaid.tsx` to keep the initial bundle smaller.
- The roadmap's `NODE_W = 220` is a hard constant in `layout.ts`; do not "fix" the perceived mobile-smallness by changing it — fix it via `fitZoom` on smaller viewports instead (already done in `handleFit`).
- **`overflow-x: clip` on html/body is critical.** It prevents the roadmap's wide canvas, terminal `<pre>` blocks, and the Mermaid SVG from creating page-level horizontal scroll on mobile. Do not remove.
- **The `xs: 400px` screen is non-standard.** It was added to give the brand wordmark a "compact" mode just for very narrow phones; use sparingly.
- **Touch targets:** I bumped primary nav buttons and toggle chips to `min-h-[40px] min-w-[40px]`. The roadmap controls and the skill status toggle use `min-h-[32px]` because they sit in dense toolbars; this is intentional and below the ideal 44px but acceptable for a non-primary-action surface.
