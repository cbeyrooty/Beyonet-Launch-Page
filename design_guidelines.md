{
  "design_system_name": "Beyonet Dual-Skin Ultra-Minimal Landing (Single Page)",
  "brand_attributes": {
    "universal": [
      "ultra-minimal",
      "premium / expensive-feeling",
      "typography-led",
      "interactive background as identity",
      "60fps-first",
      "no copy, no nav, no footer"
    ],
    "skin_a_picture_company": [
      "cinematic",
      "moody",
      "dramatic",
      "analog texture (film grain)",
      "spotlight / stage lighting"
    ],
    "skin_b_media_company": [
      "professional",
      "sleek",
      "geometric",
      "precise",
      "systems-thinking (grid/network)"
    ]
  },
  "layout_strategy": {
    "page_structure": "Single viewport section only. Only two elements in DOM hierarchy: (1) centered company name, (2) fixed top-right toggle. Everything else is background layers (canvas/overlays) and motion wrappers.",
    "grid_and_spacing": {
      "container": "Use full-bleed viewport. Center content with CSS grid: `min-h-dvh grid place-items-center`.",
      "safe_area": "Respect iOS safe areas: padding via `pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)]` for the toggle wrapper.",
      "spacing_rule": "2–3x more whitespace than typical. No additional UI blocks. The negative space is the design."
    },
    "responsive_behavior": {
      "mobile": "Disable mouse-only effects (spotlight tight follow, magnetic pull, heavy tilt). Replace with gentle ambient motion (slow spotlight drift / slow particle drift). Keep toggle reachable (44px min hit target).",
      "tablet_desktop": "Enable full interactions: spotlight follows cursor, magnetic toggle, 3D tilt on title, particle network reacts to pointer."
    }
  },
  "typography": {
    "font_pairing": {
      "skin_a_heading_font": {
        "google_font": "Cormorant Garamond",
        "fallback": "ui-serif, Georgia, serif",
        "why": "High-contrast cinematic serif; feels like prestige film titles without being cliché.",
        "usage": "Only the centered company name."
      },
      "skin_b_heading_font": {
        "google_font": "Space Grotesk",
        "fallback": "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
        "why": "Geometric, modern, agency-grade; pairs well with grid/network visuals.",
        "usage": "Only the centered company name."
      },
      "ui_font": {
        "google_font": "Inter",
        "fallback": "ui-sans-serif, system-ui",
        "usage": "Toggle label + any aria-only helper text (if needed)."
      }
    },
    "type_scale_tailwind": {
      "h1": "text-4xl sm:text-5xl lg:text-6xl",
      "h1_tracking": {
        "skin_a": "tracking-[-0.02em]",
        "skin_b": "tracking-[-0.04em]"
      },
      "h1_leading": "leading-[0.95]",
      "case": {
        "skin_a": "Title Case",
        "skin_b": "Title Case or ALL CAPS (optional). If ALL CAPS, add `tracking-[0.18em]` and reduce size by one step."
      }
    },
    "rendering": {
      "skin_a": "Use subtle blur-to-focus on entrance (opacity + filter blur).",
      "skin_b": "Use structured slide/assemble (y translate + opacity + letter-spacing tighten)."
    }
  },
  "color_system": {
    "notes": "Two completely different token sets. Implement by toggling `data-skin=\"picture\"|\"media\"` on `html` or `body` and swapping CSS variables. Avoid gradients except tiny decorative overlays (<20% viewport).",
    "tokens_css_variables": {
      "universal": {
        "--radius": "14px",
        "--shadow-soft": "0 10px 30px rgba(0,0,0,0.18)",
        "--shadow-hard": "0 18px 60px rgba(0,0,0,0.35)",
        "--focus-ring": "0 0 0 3px rgba(255,255,255,0.22)",
        "--ease-premium": "cubic-bezier(0.2, 0.8, 0.2, 1)",
        "--ease-snap": "cubic-bezier(0.2, 0.9, 0.2, 1)",
        "--dur-1": "160ms",
        "--dur-2": "320ms",
        "--dur-3": "700ms"
      },
      "skin_a_picture_company": {
        "--bg": "#070708",
        "--bg-2": "#0B0C0E",
        "--fg": "#F2F2F0",
        "--fg-muted": "rgba(242,242,240,0.72)",
        "--stroke": "rgba(255,255,255,0.10)",
        "--stroke-2": "rgba(255,255,255,0.16)",
        "--spot": "rgba(255,255,255,0.14)",
        "--glow": "rgba(255,255,255,0.10)",
        "--toggle-bg": "rgba(255,255,255,0.06)",
        "--toggle-fg": "#F2F2F0",
        "--toggle-border": "rgba(255,255,255,0.14)"
      },
      "skin_b_media_company": {
        "--bg": "#FAFAF8",
        "--bg-2": "#FFFFFF",
        "--fg": "#0B0C0E",
        "--fg-muted": "rgba(11,12,14,0.62)",
        "--stroke": "rgba(11,12,14,0.10)",
        "--stroke-2": "rgba(11,12,14,0.16)",
        "--grid": "rgba(11,12,14,0.06)",
        "--particle": "rgba(11,12,14,0.55)",
        "--toggle-bg": "rgba(11,12,14,0.04)",
        "--toggle-fg": "#0B0C0E",
        "--toggle-border": "rgba(11,12,14,0.14)"
      }
    },
    "tailwind_usage_examples": {
      "root_wrapper": "min-h-dvh w-full overflow-hidden",
      "skin_a_bg": "bg-[color:var(--bg)] text-[color:var(--fg)]",
      "skin_b_bg": "bg-[color:var(--bg)] text-[color:var(--fg)]",
      "hairline_border": "border border-[color:var(--stroke)]",
      "toggle_surface": "bg-[color:var(--toggle-bg)] text-[color:var(--toggle-fg)] border-[color:var(--toggle-border)]"
    }
  },
  "components": {
    "component_path": {
      "toggle": "/app/frontend/src/components/ui/button.jsx (base) + /app/frontend/src/components/ui/switch.jsx (optional if you want a true switch semantics)",
      "tooltip_optional": "/app/frontend/src/components/ui/tooltip.jsx",
      "sonner": "/app/frontend/src/components/ui/sonner.jsx (only if you add a11y toast for keyboard hint; otherwise omit to keep minimal)"
    },
    "toggle_button_spec": {
      "position": "Fixed top-right. Use `fixed top-4 right-4 sm:top-6 sm:right-6` plus safe-area padding.",
      "size": "Minimum 44px height. Recommended: `h-11 px-4`.",
      "shape": "Professional / Corporate: medium radius 10–12px (premium).",
      "label": "Two-state label: 'Picture' / 'Media' or full names abbreviated. Keep it minimal.",
      "states": {
        "default": "Hairline border + subtle translucent fill.",
        "hover": "Increase border opacity + slight lift `translate-y-[-1px]`.",
        "active": "Press scale 0.98.",
        "focus": "Visible ring using `outline-none` + `ring-2 ring-offset-0 ring-[color:var(--stroke-2)]` (or custom shadow var)."
      },
      "data_testid": "skin-toggle-button"
    },
    "center_title_spec": {
      "element": "h1",
      "alignment": "Centered horizontally and vertically, but do NOT center the entire app container text globally. Only this element is centered.",
      "classes_skin_a": "font-[var(--font-display-a)] text-4xl sm:text-5xl lg:text-6xl tracking-[-0.02em] leading-[0.95]",
      "classes_skin_b": "font-[var(--font-display-b)] text-4xl sm:text-5xl lg:text-6xl tracking-[-0.04em] leading-[0.95]",
      "data_testid": "company-name-heading"
    }
  },
  "motion_and_microinteractions": {
    "library": "Framer Motion 12.x",
    "principles": [
      "Expensive motion = fewer elements, longer easing, no bounce.",
      "Prefer opacity + blur + subtle translate; avoid large movement.",
      "Never use `transition: all` in CSS."
    ],
    "global_skin_transition": {
      "approach": "Crossfade background layers + animate CSS variables (or animate wrapper opacity) while swapping tokens. Use `AnimatePresence` for background canvases.",
      "duration": "~700ms",
      "easing": "var(--ease-premium)"
    },
    "title_entrance": {
      "skin_a": "opacity 0→1, filter blur(10px)→blur(0), slight glow pulse (text-shadow) at 20% then settle.",
      "skin_b": "y 10→0, opacity 0→1, letterSpacing 0.06em→-0.04em (subtle), then settle."
    },
    "3d_tilt_title": {
      "behavior": "On pointer move, rotateX/rotateY based on cursor position relative to center. Clamp to ±6deg. Add translateZ illusion via text-shadow and subtle scale.",
      "reduced_motion": "If `prefers-reduced-motion`, disable tilt and use static.",
      "data_testid": "tilt-title-wrapper"
    },
    "magnetic_toggle": {
      "behavior": "On hover, button translates toward cursor within a max radius (10–14px). On leave, spring back.",
      "implementation_hint": "Use pointer position relative to button rect; set motion values x/y; animate with spring (stiffness 300, damping 22).",
      "reduced_motion": "Disable magnetic movement; keep hover border change only."
    }
  },
  "backgrounds": {
    "layering_order": [
      "Canvas (interactive)",
      "Overlay texture (grain/noise) OR grid overlay",
      "Spotlight radial mask (Skin A only)",
      "Content (title + toggle)"
    ],
    "skin_a_film_grain_and_spotlight": {
      "film_grain": {
        "method": "CSS noise overlay using repeating-radial-gradient + mix-blend-mode OR a tiny base64 noise png tiled. Keep opacity 0.06–0.10.",
        "classes": "pointer-events-none fixed inset-0 opacity-[0.08] mix-blend-overlay",
        "performance": "Prefer CSS overlay (no canvas) to keep main canvas free for spotlight."
      },
      "spotlight": {
        "method": "Canvas or CSS radial-gradient mask following cursor. Recommended: CSS `background: radial-gradient(circle at x y, rgba(255,255,255,0.14), transparent 55%)` on a fixed overlay div; update CSS vars `--mx --my` on pointermove.",
        "size": "Desktop radius ~320–420px; mobile radius ~520px with slow drift.",
        "degradation": "On touch devices, spotlight slowly orbits center (no pointer tracking)."
      }
    },
    "skin_b_particle_network": {
      "canvas": {
        "method": "Single canvas with particles + line connections. Use requestAnimationFrame; cap particle count by viewport area.",
        "counts": {
          "mobile": "60–90",
          "desktop": "120–180"
        },
        "interaction": "Pointer repulsion within 140px; lines connect within 120px; subtle trail fade using alpha fill.",
        "colors": "Particles use `--particle`; grid overlay uses `--grid`."
      },
      "grid_overlay": {
        "method": "CSS linear-gradients for a subtle grid. Opacity 0.25 max.",
        "classes": "pointer-events-none fixed inset-0 [background-size:56px_56px] opacity-[0.25]"
      }
    }
  },
  "accessibility": {
    "keyboard": {
      "toggle": "Toggle must be reachable via Tab and activatable via Enter/Space. Add `aria-pressed` or use Switch with `aria-checked`.",
      "focus_visibility": "Always visible focus ring on toggle."
    },
    "reduced_motion": "Respect `prefers-reduced-motion`: disable tilt, magnetic, reduce canvas FPS or pause interactions; keep static background with gentle opacity.",
    "contrast": "Skin A: off-white on near-black. Skin B: near-black on off-white. Ensure AA contrast for toggle label.",
    "screen_reader": "Add visually-hidden label for toggle describing current skin: e.g., 'Switch to Beyonet Media Company'."
  },
  "implementation_scaffolds_js": {
    "recommended_files": [
      "/app/frontend/src/App.js (single page)",
      "/app/frontend/src/index.css (tokens + skin selectors)",
      "/app/frontend/src/components/BackgroundPictureCanvas.js",
      "/app/frontend/src/components/BackgroundMediaCanvas.js",
      "/app/frontend/src/components/MagneticToggleButton.js",
      "/app/frontend/src/components/TiltTitle.js"
    ],
    "skin_toggle_state": {
      "state": "const [skin, setSkin] = useState('picture')",
      "dom_hook": "useEffect(() => document.documentElement.dataset.skin = skin, [skin])"
    },
    "css_skin_selectors": {
      "pattern": ":root { /* defaults */ }\nhtml[data-skin='picture'] { /* set vars */ }\nhtml[data-skin='media'] { /* set vars */ }",
      "note": "Do not rely on shadcn `.dark` class; use your own `data-skin` to fully swap identity."
    },
    "data_testid_requirements": [
      "skin-toggle-button",
      "company-name-heading",
      "tilt-title-wrapper",
      "background-canvas-picture",
      "background-canvas-media"
    ]
  },
  "images": {
    "image_urls": [
      {
        "category": "none",
        "description": "No images allowed by spec. Backgrounds are procedural (canvas/CSS).",
        "urls": []
      }
    ]
  },
  "additional_libraries": {
    "required": [
      {
        "name": "framer-motion",
        "purpose": "Skin crossfade, title entrance, magnetic toggle spring, tilt smoothing",
        "install": "npm i framer-motion"
      }
    ],
    "optional": [
      {
        "name": "simplex-noise",
        "purpose": "Organic drift for spotlight / particles (more premium than random jitter)",
        "install": "npm i simplex-noise"
      }
    ]
  },
  "instructions_to_main_agent": [
    "Remove CRA starter styles in App.css that center everything; do not set `.App { text-align:center }`. Only center the title wrapper.",
    "Implement `data-skin` token swap on `html` and keep shadcn tokens separate; do not use purple gradients anywhere.",
    "Build two background components: Picture (grain + spotlight overlay) and Media (particle network + grid overlay). Mount/unmount with AnimatePresence for clean transitions.",
    "Ensure 60fps: cap particle count, avoid expensive blur filters on large layers, and pause animations when tab is hidden (Page Visibility API).",
    "All interactive elements must include `data-testid` attributes (toggle, title wrapper if interactive, canvases).",
    "Mobile: disable magnetic + tilt; keep toggle accessible and backgrounds lighter."
  ],
  "general_ui_ux_design_guidelines": "<General UI UX Design Guidelines>  \n    - You must **not** apply universal transition. Eg: `transition: all`. This results in breaking transforms. Always add transitions for specific interactive elements like button, input excluding transforms\n    - You must **not** center align the app container, ie do not add `.App { text-align: center; }` in the css file. This disrupts the human natural reading flow of text\n   - NEVER: use AI assistant Emoji characters like`🤖🧠💭💡🔮🎯📚🎭🎬🎪🎉🎊🎁🎀🎂🍰🎈🎨🎰💰💵💳🏦💎🪙💸🤑📊📈📉💹🔢🏆🥇 etc for icons. Always use **FontAwesome cdn** or **lucid-react** library already installed in the package.json\n\n **GRADIENT RESTRICTION RULE**\nNEVER use dark/saturated gradient combos (e.g., purple/pink) on any UI element.  Prohibited gradients: blue-500 to purple 600, purple 500 to pink-500, green-500 to blue-500, red to pink etc\nNEVER use dark gradients for logo, testimonial, footer etc\nNEVER let gradients cover more than 20% of the viewport.\nNEVER apply gradients to text-heavy content or reading areas.\nNEVER use gradients on small UI elements (<100px width).\nNEVER stack multiple gradient layers in the same viewport.\n\n**ENFORCEMENT RULE:**\n    • Id gradient area exceeds 20% of viewport OR affects readability, **THEN** use solid colors\n\n**How and where to use:**\n   • Section backgrounds (not content backgrounds)\n   • Hero section header content. Eg: dark to light to dark color\n   • Decorative overlays and accent elements only\n   • Hero section with 2-3 mild color\n   • Gradients creation can be done for any angle say horizontal, vertical or diagonal\n\n- For AI chat, voice application, **do not use purple color. Use color like light green, ocean blue, peach orange etc**\n\n</Font Guidelines>\n\n- Every interaction needs micro-animations - hover states, transitions, parallax effects, and entrance animations. Static = dead. \n   \n- Use 2-3x more spacing than feels comfortable. Cramped designs look cheap.\n\n- Subtle grain textures, noise overlays, custom cursors, selection states, and loading animations: separates good from extraordinary.\n   \n- Before generating UI, infer the visual style from the problem statement (palette, contrast, mood, motion) and immediately instantiate it by setting global design tokens (primary, secondary/accent, background, foreground, ring, state colors), rather than relying on any library defaults. Don't make the background dark as a default step, always understand problem first and define colors accordingly\n    Eg: - if it implies playful/energetic, choose a colorful scheme\n           - if it implies monochrome/minimal, choose a black–white/neutral scheme\n\n**Component Reuse:**\n\t- Prioritize using pre-existing components from src/components/ui when applicable\n\t- Create new components that match the style and conventions of existing components when needed\n\t- Examine existing components to understand the project's component patterns before creating new ones\n\n**IMPORTANT**: Do not use HTML based component like dropdown, calendar, toast etc. You **MUST** always use `/app/frontend/src/components/ui/ ` only as a primary components as these are modern and stylish component\n\n**Best Practices:**\n\t- Use Shadcn/UI as the primary component library for consistency and accessibility\n\t- Import path: ./components/[component-name]\n\n**Export Conventions:**\n\t- Components MUST use named exports (export const ComponentName = ...)\n\t- Pages MUST use default exports (export default function PageName() {...})\n\n**Toasts:**\n  - Use `sonner` for toasts\"\n  - Sonner component are located in `/app/src/components/ui/sonner.tsx`\n\nUse 2–4 color gradients, subtle textures/noise overlays, or CSS-based noise to avoid flat visuals.\n</General UI UX Design Guidelines>"
}
