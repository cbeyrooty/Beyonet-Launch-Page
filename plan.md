# plan.md

## Objectives
- Deliver a single-page, ultra-minimal landing page with only: (1) centered company name, (2) fixed top-right toggle.
- Implement two fully distinct global skins:
  - **Skin A (Default):** “The Beyonet Picture Company” — cinematic dark palette, film grain overlay, spotlight, dramatic serif font.
  - **Skin B:** “The Beyonet Media Company” — clean modern palette, particle-network canvas background, geometric sans-serif font.
- Universal interactions: magnetic toggle hover, smooth skin crossfade transitions, subtle 3D tilt/parallax on centered text.
- Frontend-only React app using Framer Motion + Canvas + CSS (no backend).
- Ensure production-grade quality:
  - Remove any platform branding/mentions.
  - Strong performance and battery-aware behavior.
  - Excellent touch + mobile responsiveness.
  - Accessibility-first (ARIA, keyboard, reduced motion).

## Current Status (Progress Update)
- **Phase 1 COMPLETE** (POC interactions validated and integrated).
- **Phase 2 COMPLETE** (polished V1 app delivered).
- **Phase 3 COMPLETE** (performance hardening + touch optimization + mobile optimization).

### Implemented and verified
- Skin A (Picture):
  - Dark cinematic base + vignette
  - Animated film grain overlay (adaptive for touch)
  - Spotlight effect (mouse-follow on hover devices; ambient drift on touch)
  - **Cormorant Garamond** title font
  - Blur-to-focus entrance animation (reduced motion safe)
- Skin B (Media):
  - Clean light base
  - Canvas particle network with subtle connections
  - Adaptive particle count (**~55 max on mobile**, **~150 on desktop**) and mobile-tuned link distance
  - Grid overlay tuned (reduced opacity on mobile)
  - **Space Grotesk** title font
  - Structured slide-in entrance animation (reduced motion safe)
- Universal:
  - Magnetic toggle button with spring physics (disabled on touch)
  - Title 3D tilt/parallax reacting to pointer (disabled on touch and reduced motion)
  - Smooth crossfade transitions between skins (~700ms premium easing)
  - CSS custom property token system (`html[data-skin]`) for palette swapping
  - Email added under both titles: **hello@bayon.et** (small, matching the skin’s font)
- Branding cleanup:
  - Removed “Made with Emergent” badge and removed Emergent script + mentions.
- Performance hardening:
  - Page Visibility handling: animation loops pause when tab is hidden
  - DPR capped at **2x** to reduce GPU load
  - Media canvas does no drawing work when inactive; clears and returns
- Touch + mobile:
  - Device capability detection via `useDeviceCapabilities`
  - Touch-first toggle UX (min 44px target, tap highlight removed, `touch-action: manipulation`)
  - Ambient spotlight drift on touch for Skin A
  - Mouse repulsion disabled on touch for particles
  - Comprehensive responsive styling across five breakpoints + landscape
  - iOS safe areas supported with `env(safe-area-inset-*)`

### Testing (completed)
- Automated frontend testing: **100% pass (17/17)** across:
  - Desktop
  - Mobile (390×844)
  - Tiny screen (320×568)
  - Landscape mobile (844×390)
- Confirmed: no forbidden text (“Coming Soon”, “Under Construction”), no Emergent mentions, no badge.

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

### Phase 3: Refinement + performance hardening (COMPLETED)
Goal: increase “agency-grade” feel, robustness, and mobile/touch excellence.

**User stories (delivered)**
1. As a user, I don’t see platform badges/branding; the page feels fully bespoke.
2. As a user, animations remain smooth and battery-aware (especially on mobile).
3. As a user, the experience is strong on touch devices even without a cursor.
4. As a user, reduced-motion preferences are respected without breaking the design.
5. As a user, the page remains minimal and readable across all mobile sizes and orientations.

**What was implemented**
- Branding cleanup
  - Removed “Made with Emergent” badge and removed Emergent script/mentions.
- Spotlight refinement
  - Made spotlight beam more defined/harder with sharper falloff (4-stop radial gradient).
  - Added mobile-specific softer spotlight variant.
- Email addition
  - Added **hello@bayon.et** under both titles; small and matching each skin’s font.
- Performance
  - Page Visibility API: animation work pauses when tab is hidden.
  - DPR capped at **2x** via `useDeviceCapabilities`.
  - Adaptive particles: lower count on mobile; shorter link distance on mobile.
- Touch optimization
  - `useDeviceCapabilities` detects: hover, touch, reduced motion, visibility, DPR cap, mobile.
  - Ambient spotlight drift on touch (organic orbit) for Skin A.
  - Mouse-only behaviors disabled on touch: magnetic toggle, tilt, particle repulsion.
  - Improved tap UX: min 44px touch target, `-webkit-tap-highlight-color: transparent`, `touch-action: manipulation`.
- Mobile optimization
  - Responsive styling across 5 breakpoints: 1024px, 640px, 380px, landscape, hover:none.
  - Proper text wrapping on mobile (`white-space: normal`).
  - Smaller email and toggle sizing per breakpoint.
  - iOS safe area padding.
  - Reduced grid overlay and simplified grain animation on touch.

**Testing (completed)**
- Automated frontend testing: **100% pass (17/17)**.

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
1. **No required next steps** — Phases 1–3 are complete and shipped.
2. If requested, proceed with Phase 4 (persisted skin + shareable URL + keyboard shortcut).
3. If requested, do a Lighthouse/perf pass on a throttled profile and tune particle count thresholds further.

## Success Criteria
- Single page contains only the centered company name and the top-right toggle (+ email under title).
- Toggle fully switches between two distinct skins (fonts, palette, background behavior).
- Magnetic toggle + 3D title tilt feel responsive and premium on hover devices; gracefully disabled on touch.
- Skin A shows film grain + spotlight (mouse-follow or ambient drift); Skin B shows particle network.
- Smooth crossfade transitions with no flicker.
- Works across resize/high-DPI; responsive on mobile (including tiny + landscape); accessible with keyboard + ARIA; respects reduced motion.
