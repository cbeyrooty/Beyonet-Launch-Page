# plan.md

## Objectives
- Deliver a single-page, ultra-minimal landing page with only: (1) centered company name, (2) fixed top-right toggle.
- Implement two fully distinct global skins:
  - **Skin A (Default):** “The Beyonet Picture Company” — cinematic dark palette, film grain overlay, mouse-follow spotlight, dramatic serif font.
  - **Skin B:** “The Beyonet Media Company” — clean modern palette, particle-network canvas background, geometric sans-serif font.
- Universal interactions: magnetic toggle hover, smooth skin crossfade transitions, subtle 3D tilt/parallax on centered text.
- Frontend-only React app using Framer Motion + Canvas + CSS (no backend).

## Current Status (Progress Update)
- **Phase 1 COMPLETE** (POC interactions validated and integrated).
- **Phase 2 COMPLETE** (polished V1 app delivered).
- Implemented and verified:
  - Skin A: dark cinematic base + vignette, animated film grain overlay, mouse-follow spotlight, **Cormorant Garamond** title font, blur-to-focus entrance animation.
  - Skin B: clean light base, interactive particle network canvas with mouse repulsion + subtle connections, subtle grid overlay, **Space Grotesk** title font, structured slide-in entrance animation.
  - Magnetic toggle button with spring physics; fixed top-right placement.
  - Subtle 3D tilt/parallax on the centered title reacting to pointer.
  - Smooth crossfade transitions between skins (~700ms premium easing).
  - Responsive behavior (mobile typography/layout adjustments).
  - Accessibility: `aria-pressed`, `aria-label`, keyboard activation, visible focus ring.
  - CSS custom property token system (`html[data-skin]`) for palette swapping.
  - Required `data-testid` attributes present.

## Implementation Steps

### Phase 1: Core POC (isolation) — interactive foundations (COMPLETED)
Goal: prove the hardest interactions work smoothly before full styling.

**User stories (delivered)**
1. As a user, I can click a toggle to switch the entire page skin instantly without reloading.
2. As a user, I feel the toggle “pull” toward my cursor when I hover near it.
3. As a user, the centered title subtly tilts in 3D as I move my mouse.
4. As a user, in Picture skin I see a spotlight follow my cursor over a dark background.
5. As a user, in Media skin I see a particle network that subtly responds to my cursor.

**What was built**
- Global `skin` state with `html[data-skin]` binding.
- Pointer tracking via MotionValues (avoids React re-render per move).
- Picture skin background layers:
  - CSS spotlight updated via CSS vars (smoothed with springs).
  - Film grain texture generated once and animated via CSS.
- Media skin background:
  - Canvas particle network with DPR resize handling, node links within threshold, mouse repulsion.
- Magnetic toggle offset calculation using rect-relative cursor position + spring return.
- Title 3D tilt using perspective + spring-smoothed rotateX/rotateY.

**POC validation outcome**
- Effects are stable and smooth, with clean crossfade and correct DPI scaling.

### Phase 2: V1 App Development — full minimal landing page (COMPLETED)
Goal: integrate POC pieces into a polished, minimal UI with two complete skins.

**User stories (delivered)**
1. As a user, I immediately see a premium, minimal landing page with a single centered name.
2. As a user, switching skins changes typography, palette, and background effects cohesively.
3. As a user, transitions feel smooth (no abrupt color jumps or flicker).
4. As a user, the central title animates in a way that matches the selected skin’s vibe.
5. As a user, I can interact with the page (move mouse) and feel subtle depth without distractions.

**Final architecture**
- Single-page React app (no backend, no routing needed for experience).
- Components:
  - `BackgroundPicture` (film grain + spotlight)
  - `BackgroundMedia` (particle canvas + grid overlay)
  - `TiltTitle` (AnimatePresence swap + 3D tilt)
  - `MagneticToggle` (spring magnet hover)
- Visual system:
  - CSS variables swapped via `html[data-skin='picture'|'media']`.
  - Fonts loaded via Google Fonts (Cormorant Garamond, Space Grotesk, Inter).
- Minimalism enforced: only title + toggle present; no extra copy.

**Testing (completed)**
- Automated frontend testing: **94% pass (16/17)**.
- One reported issue: DOM query timing artifact during `AnimatePresence` transition.
  - Confirmed not a functional defect; resolved by waiting for transition completion.

### Phase 3: Refinement + performance hardening (OPTIONAL / ON-DEMAND)
Goal: further increase “agency-grade” feel and robustness if requested.

**User stories (to implement if requested)**
1. As a user, animations remain smooth even after resizing or extended idle time.
2. As a user, the page works on trackpads and touch devices without broken visuals.
3. As a user, I don’t see text jitter or subpixel artifacts during tilt.
4. As a user, the toggle remains usable and readable across skins.
5. As a user, background effects feel premium but never overpower legibility.

**Refinement steps (backlog)**
- Performance
  - Pause/low-power mode when tab hidden (Page Visibility API).
  - Adaptive particle count by viewport area + optional FPS cap on low-end devices.
  - Ensure canvases do no work when their skin is inactive (beyond current clearing behavior).
- Responsiveness
  - Touch-first behavior improvements (e.g., ambient spotlight drift, reduced repulsion).
  - `prefers-reduced-motion` enhancements: disable tilt/magnet, reduce grain animation intensity.
- Visual polish
  - Further tune spotlight falloff and easing for even more “cinematic” feel.
  - Improve particle alpha falloff and connection aesthetics.
  - Optional multi-layer grain realism (without heavy filters).

### Phase 4: Optional enhancements (only if requested)
**User stories (optional)**
1. As a user, I can share a link that opens directly in my preferred skin.
2. As a user, my last selected skin persists when I revisit.
3. As a user, I can toggle via keyboard shortcut.
4. As a user, the page loads instantly and effects warm up seamlessly.
5. As a user, the page remains minimal while feeling bespoke.

**Steps (backlog)**
- Persist skin in `localStorage` and/or URL query (`?skin=media`).
- Add keyboard shortcut (e.g., `T`) with a11y-safe implementation.
- Lighthouse pass (basic): ensure minimal main-thread overhead, no layout shifts.

## Next Actions
1. **No required next steps** — Phase 1 & 2 are complete and shipped.
2. If requested, proceed with Phase 3 performance hardening (visibility pause, adaptive particles, reduced-motion tuning).
3. If requested, proceed with Phase 4 (persisted skin + shareable URL).

## Success Criteria
- Single page contains only the centered company name and the top-right toggle.
- Toggle fully switches between two distinct skins (fonts, palette, background behavior).
- Magnetic toggle + 3D title tilt feel responsive and premium.
- Skin A shows film grain + mouse-follow spotlight; Skin B shows interactive particle network.
- Smooth crossfade transitions with no flicker.
- Works across resize/high-DPI; responsive on mobile; accessible with keyboard + ARIA.