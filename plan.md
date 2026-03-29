# plan.md

## Objectives
- Deliver a single-page, ultra-minimal landing page with only: (1) centered company name, (2) fixed top-right toggle.
- Implement two fully distinct global skins:
  - **Skin A (Default):** “The Beyonet Picture Company” — cinematic dark palette, film grain overlay, mouse-follow spotlight, dramatic serif font.
  - **Skin B:** “The Beyonet Media Company” — clean modern palette, particle-network canvas background, geometric sans-serif font.
- Universal interactions: magnetic toggle hover, smooth skin crossfade transitions, subtle 3D tilt/parallax on centered text.
- Frontend-only React app using Framer Motion + Canvas + CSS (no backend).

## Implementation Steps

### Phase 1: Core POC (isolation) — interactive foundations
Goal: prove the 3 hardest interactions work smoothly before full styling.

**User stories**
1. As a user, I can click a toggle to switch the entire page skin instantly without reloading.
2. As a user, I feel the toggle “pull” toward my cursor when I hover near it.
3. As a user, the centered title subtly tilts in 3D as I move my mouse.
4. As a user, in Picture skin I see a spotlight follow my cursor over a dark background.
5. As a user, in Media skin I see a particle network that subtly responds to my cursor.

**Steps**
- Websearch/quick reference check (internal) for best-practice patterns:
  - requestAnimationFrame loops + canvas resizing + DPR handling
  - pointer tracking without layout thrash
  - Framer Motion crossfade between “skins”
- Build a POC route/component (single page) with:
  - global `skin` state (A/B)
  - pointer tracking hook (x/y, normalized)
  - **Canvas A**: spotlight radial gradient mask following pointer
  - **Canvas B**: particle node positions + link drawing within distance threshold
  - Basic toggle button with magnetic offset calculation
  - Basic 3D tilt transform on centered text
- POC validation checklist:
  - No jitter at 60fps on typical screens
  - Canvas scales correctly on resize + high DPI
  - Toggle magnet effect doesn’t break click target
  - Crossfade between canvases doesn’t flash/tear
- Fix until stable before proceeding.

### Phase 2: V1 App Development — full minimal landing page
Goal: integrate POC pieces into polished, minimal UI with two complete skins.

**User stories**
1. As a user, I immediately see a premium, minimal landing page with a single centered name.
2. As a user, switching skins changes typography, palette, and background effects cohesively.
3. As a user, transitions feel smooth (no abrupt color jumps or flicker).
4. As a user, the central title animates in a way that matches the selected skin’s vibe.
5. As a user, I can interact with the page (move mouse) and feel subtle depth without distractions.

**Steps**
- App structure
  - `App` renders `LandingPage` only (no routing needed)
  - Components: `ToggleMagnetic`, `Title3DTilt`, `BackgroundPictureCanvas`, `BackgroundMediaCanvas`
  - Hooks: `usePointer`, `useMagnetic`, `useCanvasDprResize`
- Visual system
  - Skin tokens: bg, fg, font family, title sizing, glow/blur params
  - Google Fonts:
    - Skin A: cinematic serif/display
    - Skin B: geometric sans
- Skin A implementation
  - Dark base gradient + subtle vignette
  - Film grain overlay (CSS pseudo-element, animated noise via SVG/data-URI or repeating-radial pattern)
  - Spotlight: canvas radial gradient + blend mode (screen/soft-light) + eased follow
  - Title: blur-to-focus / slow fade-in + subtle glow
- Skin B implementation
  - Clean base (white/near-white or slate) with strict contrast
  - Particle network canvas: low-opacity nodes/edges; mouse repulsion or attractor
  - Title: crisp slide-in / assemble animation
- Smooth transitions
  - Framer Motion: crossfade wrappers for backgrounds + title style changes
  - Ensure canvases mount once if possible; animate opacity to avoid re-init flashes
- Strict minimalism enforcement
  - Only toggle + title; no extra copy, nav, footer
  - Keyboard accessibility for toggle (Enter/Space) without adding extra UI
- Conclude Phase 2 with 1 round of end-to-end testing (manual):
  - toggle, hover magnet, pointer interactions, resize, mobile fallback behavior.

### Phase 3: Refinement + performance hardening
Goal: make V1 feel “agency-grade” and robust.

**User stories**
1. As a user, animations remain smooth even after resizing or extended idle time.
2. As a user, the page works on trackpads and touch devices without broken visuals.
3. As a user, I don’t see text jitter or subpixel artifacts during tilt.
4. As a user, the toggle remains usable and readable across skins.
5. As a user, background effects feel premium but never overpower legibility.

**Steps**
- Performance
  - Throttle pointer updates with rAF; avoid React state per-move where possible (refs)
  - Pause/low-power mode when tab hidden (Page Visibility API)
  - Cap particle count based on viewport area
- Responsiveness
  - Mobile: disable tilt/spotlight or reduce intensity; ensure centered title fits
  - Respect `prefers-reduced-motion`: reduce grain animation, disable heavy effects
- Visual polish
  - Better easing curves for spotlight follow
  - Particle link alpha falloff + subtle parallax
  - Improve film grain realism (multi-layer noise)
- Conclude Phase 3 with 1 round of end-to-end testing:
  - Chrome/Safari/Firefox sanity check, DPR scaling, reduced-motion.

### Phase 4: Optional enhancements (only if requested)

**User stories**
1. As a user, I can share a link that opens directly in my preferred skin.
2. As a user, my last selected skin persists when I revisit.
3. As a user, I can toggle via keyboard shortcut.
4. As a user, the page loads instantly and effects warm up seamlessly.
5. As a user, the page remains minimal while feeling bespoke.

**Steps**
- Persist skin in `localStorage` and/or URL query (`?skin=media`)
- Add subtle sound-less haptics-like micro-interactions (pure visual)
- Lighthouse pass (basic): layout stability, no excessive main-thread work

## Next Actions
1. Implement Phase 1 POC components (canvas spotlight + particle network + magnetic toggle + 3D tilt) in the existing React template.
2. Validate smoothness, resize/DPR correctness, and crossfade stability.
3. Integrate into Phase 2 V1 with skin tokens, fonts, and Framer Motion transitions.
4. Run an end-to-end test pass and fix issues before polish.

## Success Criteria
- Single page contains only the centered company name and the top-right toggle.
- Toggle fully switches between two distinct skins (fonts, palette, background behavior).
- Magnetic toggle + 3D title tilt feel responsive and premium.
- Skin A shows film grain + mouse-follow spotlight; Skin B shows interactive particle network.
- Smooth crossfade transitions with no flicker; stable at 60fps on typical hardware.
- Works across resize/high-DPI; degrades gracefully on mobile and reduced-motion settings.
