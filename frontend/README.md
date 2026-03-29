# Beyonet — Dual-Skin Landing Page

An ultra-minimalist, single-page landing page with two fully distinct visual identities, toggled by a single button.

**Live preview:** _[your-deployment-url]_

---

## Skins

| Skin A — Picture Company | Skin B — Media Company |
|:---|:---|
| Cinematic dark palette | Clean modern light palette |
| Film-grain overlay + spotlight following cursor | Particle-network canvas with mouse repulsion |
| Cormorant Garamond serif | Space Grotesk geometric sans-serif |
| Blur-to-focus entrance animation | Structured slide-in animation |

## Features

- **Magnetic toggle** — the button subtly pulls toward your cursor, with spring physics.
- **3D parallax tilt** — the centred title reacts to mouse position via `rotateX`/`rotateY`.
- **Smooth crossfade** — background colour, effects, and typography transition over 700 ms with premium easing.
- **Touch-aware** — on devices without hover, the spotlight drifts autonomously and heavy interactions are disabled to save battery.
- **Reduced-motion safe** — animations respect `prefers-reduced-motion`.
- **Responsive** — five CSS breakpoints covering 320 px → 4K, plus landscape and iOS safe-area handling.

## Tech Stack

| Layer | Tool |
|:---|:---|
| UI framework | React 19 (CRA + Craco) |
| Animation | Framer Motion 12 |
| Backgrounds | Canvas 2D (particles), CSS radial-gradient (spotlight), generated noise texture (grain) |
| Styling | Tailwind CSS 3 (base reset only) + vanilla CSS custom properties |
| Fonts | Google Fonts — Cormorant Garamond, Space Grotesk |

## Project Structure

```
src/
├── components/
│   ├── BackgroundMedia.js      # Particle-network canvas (Skin B)
│   ├── BackgroundPicture.js    # Film grain + spotlight (Skin A)
│   ├── MagneticToggle.js       # Spring-physics toggle button
│   └── TiltTitle.js            # 3D-tilting title with AnimatePresence
├── hooks/
│   └── useDeviceCapabilities.js  # Detects hover, touch, visibility, DPR, motion prefs
├── App.js          # Root — skin state, pointer tracking, component composition
├── App.css         # All component styles, responsive breakpoints, animations
├── index.css       # Tailwind base + skin CSS custom-property tokens
└── index.js        # React DOM entry point
```

## Getting Started

```bash
# Install dependencies
yarn install

# Start dev server (http://localhost:3000)
yarn start

# Production build
yarn build
```

## Skin Token System

The global palette is swapped by setting `data-skin="picture"` or `data-skin="media"` on the `<html>` element. All colours are driven by CSS custom properties defined in `index.css`:

```css
html[data-skin='picture'] {
  --bg: #070708;
  --fg: #F2F2F0;
  /* … */
}

html[data-skin='media'] {
  --bg: #FAFAF8;
  --fg: #0B0C0E;
  /* … */
}
```

Components read these tokens via `var(--bg)`, `var(--fg)`, etc., so adding a third skin is as simple as adding another `html[data-skin='…']` block.

## License

Private — all rights reserved.
