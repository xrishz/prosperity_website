---
name: "Prosperity International Travel Services"
description: "A lively 3D Travel Atlas with sky blue, sunshine yellow, evergreen and real photographs."
colors:
  background: "#f3faf8"
  foreground: "#182b26"
  surface-elevated: "#fffefa"
  surface-subtle: "#dbefe9"
  muted-foreground: "#52635c"
  border: "#d6d7ce"
  border-strong: "#7a887e"
  primary: "#0b3734"
  primary-foreground: "#fffefa"
  primary-hover: "#245a4d"
  danger: "#a02a2a"
  focus-ring: "#0b3734"
  focus-contrast: "#fffefa"
  input-background: "#fffefa"
  disabled-background: "#e4e6dd"
  disabled-foreground: "#52635c"
  atlas-sky: "#8edcf4"
  atlas-sky-ink: "#0b3734"
  atlas-yellow: "#ffd34f"
  atlas-yellow-ink: "#0b3734"
  atlas-coral: "#f18466"
  atlas-mint: "#ccebdd"
  atlas-sea: "#087b8c"
  atlas-deep-green: "#164b43"
  atlas-shadow: "#0b373426"
  atlas-picker-hover: "#f6fcff4d"
  brand-green: "#0b3734"
  brand-gold: "#d4af68"
  media-foreground: "#fffefa"
  media-button-background: "#fffefa"
  media-button-foreground: "#0b3734"
  media-button-hover: "#e8d3a3"
  media-control-background: "#03181570"
  media-border: "#fffefab3"
  dark-background: "#102b28"
  dark-foreground: "#f3f5ee"
  dark-surface-elevated: "#1d3f39"
  dark-surface-subtle: "#183a35"
  dark-muted-foreground: "#becfc6"
  dark-border: "#38534a"
  dark-border-strong: "#799789"
  dark-primary: "#d5e6cf"
  dark-primary-foreground: "#0b3734"
  dark-primary-hover: "#e5eddf"
  dark-danger: "#ffaba8"
  dark-focus-ring: "#d5e6cf"
  dark-focus-contrast: "#0b3734"
  dark-input-background: "#183a35"
  dark-disabled-background: "#28473e"
  dark-disabled-foreground: "#becfc6"
  dark-atlas-sky: "#164b5c"
  dark-atlas-sky-ink: "#e8faff"
  dark-atlas-mint: "#234e43"
  dark-atlas-picker-hover: "#e8faff1a"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.3rem, 7.4cqw, 3.3rem)"
    fontWeight: 750
    lineHeight: 1.13
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2rem, 3.7vw, 3.65rem)"
    fontWeight: 750
    lineHeight: 1.16
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 700
  button-label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 750
    lineHeight: 1.4
  photo-caption:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1.2rem"
    fontWeight: 800
rounded:
  field: "5px"
  picker: "10px"
  control: "12px"
  photo-small: "20px"
  destination-photo: "22px"
  photo: "24px"
  photo-main: "26px"
  portrait: "28px"
  feature: "30px"
  circle: "50%"
spacing:
  tight: "8px"
  compact: "12px"
  control: "14px"
  item: "16px"
  mobile: "20px"
  content: "26px"
  group: "32px"
  columns: "64px"
  section: "100px"
  section-mobile: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.button-label}"
    rounded: "{rounded.control}"
    padding: "14px 23px"
    height: "50px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    typography: "{typography.button-label}"
    rounded: "{rounded.control}"
    padding: "14px 23px"
    height: "50px"
  button-hero:
    backgroundColor: "{colors.brand-green}"
    textColor: "{colors.media-foreground}"
    typography: "{typography.button-label}"
    rounded: "{rounded.control}"
    padding: "14px 23px"
    height: "50px"
  button-hero-hover:
    backgroundColor: "{colors.atlas-deep-green}"
  appearance-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.circle}"
    size: "48px"
  navigation:
    textColor: "{colors.foreground}"
    height: "44px"
  input:
    backgroundColor: "{colors.input-background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.field}"
    padding: "0.85rem 1rem"
    height: "50px"
  country-picker:
    backgroundColor: "transparent"
    textColor: "{colors.atlas-sky-ink}"
    rounded: "{rounded.picker}"
    padding: "8px 13px"
    height: "44px"
  country-picker-selected:
    backgroundColor: "{colors.atlas-yellow}"
    textColor: "{colors.atlas-yellow-ink}"
  gallery-filter:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.control}"
    padding: "10px 18px"
    height: "44px"
  gallery-filter-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
  gallery-photo:
    backgroundColor: "{colors.surface-subtle}"
    rounded: "{rounded.photo}"
  photo-main:
    backgroundColor: "{colors.media-foreground}"
    textColor: "{colors.brand-green}"
    rounded: "{rounded.photo-main}"
---

# Design System: Prosperity International Travel Services

## Overview

**Creative North Star: "3D Travel Atlas"**

A lively 3D Travel Atlas pairs sky-blue and sunshine-yellow regions with evergreen controls, rounded photographs and softly lit cartoon transport. Real landscapes and real people provide the visual substance; aircraft, coaches, clouds and route marks create an inviting travel atmosphere. Low-contrast cross marks and soft section gradients connect the regions without competing with their copy.

Manrope carries a confident, friendly voice through heavy headings, compact controls and clear body text. Photo windows overlap, lean and lift where the composition calls for it. Practical navigation and inquiry fields keep simpler geometry. The transparent original oval identity remains visible within the colorful world.

**Key Characteristics:**

- Sky-blue, sunshine-yellow and evergreen regions with paired readable ink.
- Heavy Manrope headings and clear compact controls.
- Real photographs in generously rounded windows, with restrained tilt and soft depth.
- Cartoon dimensional transport, cross marks and soft section gradients.
- Finite transitions, direct carousel controls and a shared motion preference.

## Colors

The palette moves between bright travel regions and quiet semantic surfaces; the frontmatter records the implemented light and dark primitives.

### Primary

Evergreen anchors brand identity and light-mode actions. Dark-mode ordinary actions use the pale evergreen primary role with deep green ink. The hero action remains fixed brand green on either appearance.

### Secondary

Atlas Sky carries the arrival scene and sky regions, paired with Atlas Sky Ink. Its dark appearance becomes a deep blue-green field with pale sky ink. Atlas Mint supplies softer photo and team regions and deepens in dark mode.

### Tertiary

Atlas Yellow is the sunshine field, selected country treatment and numbered step marker; its evergreen ink stays fixed. Coral warms the service gradient. Sea remains a supporting travel accent. Brand Gold remains an identity accent rather than the main section color.

### Neutral

The ordinary light canvas is pale mint, with warm-white elevated surfaces and muted green-gray text. Dark surfaces use deep evergreen layers and pale text. Border, focus, disabled and danger roles follow the appearance. Photograph caption ink, image buttons and image overlays retain dedicated media roles.

**The Role Continuity Rule.** Use semantic appearance roles for ordinary controls and text. Keep sky and yellow regions on their paired ink roles, and preserve fixed brand and photograph contrast roles across light and dark appearances.

**The Image Evidence Rule.** Use photographs for places and people; keep cartoon aircraft, coaches, clouds and route marks decorative. Preserve the visual distinction between destination inspiration and genuine traveler or team photography.

## Typography

**Display and Body Font:** Manrope, with sans-serif fallback.

Heavy, closely spaced headings give the cartoon world confidence while body copy retains an open rhythm. The hierarchy in the frontmatter is normative; individual large section headings use the established responsive clamps in source.

- **Display:** Container-aware hero heading, with each confirmed line kept as an unbroken span. Two-line composition belongs to the home surface contract.
- **Headline:** Heavy section titles with tight tracking and balanced wrapping.
- **Title:** Bold compact subsection names and service titles.
- **Body:** Ordinary text with generous line height; prose stays within its established reading measure (up to 72ch).
- **Label:** Bold compact picker and filter labels; navigation stays smaller than body text.
- **Photo caption:** Heavier country labels, paired with smaller explanatory copy and source credit.

**The One Family Rule.** Use Manrope throughout. Establish hierarchy with size, weight and spacing; keep display headings confident and controls compact.

## Layout

The shared container caps at 1280px with 52px side gutters. At the 1100px breakpoint gutters become 32px; at 800px they become 20px, and at 350px they become 16px. Section spacing reduces from the desktop to the mobile token in the frontmatter. An 80px sticky header becomes 72px on mobile; mobile navigation and the inquiry action use their established separate layers.

Large compositions pair story and photographs in two columns, then stack on mobile. The gallery uses a 12-column grid with a mix of equal halves and 7/5 spans, collapsing to one photo per row. Country and filter controls wrap. The bus-led destination rail exposes dragging, arrows and keyboard operation; the coach moves above the rail on mobile rather than consuming its photo width.

**The Shared Edge Rule.** Align ordinary content to the shared container. Let photo rails extend intentionally while preserving normal vertical scrolling and visible controls.

## Elevation & Depth

Depth comes from dimensional cartoon transport, rounded photographic windows, measured tilt and soft directional shadows. The large photo window uses the main-photo shadow; its smaller companion uses the companion-photo shadow recorded in the sidecar. Flat semantic surfaces keep navigation, long copy and inquiry controls legible. Low-contrast cross marks sit behind content; section gradients mix the established region colors.

**The Tactile Depth Rule.** Use soft directional shadows for overlapping photograph windows and dimensional travel artwork. Keep ordinary copy, lists and inquiry fields grounded on their section surface.

## Shapes

Controls have rounded rectangular silhouettes, with a slightly tighter country-picker radius than the main action or photo filter. Inquiry fields retain their modest field radius. Gallery and destination photos are more rounded; hero photo windows add warm-white rims. Team portraits use taller upper corners and smaller lower corners, while the step markers and icon controls stay circular. Keep each component's established radius rather than applying one global radius to every surface.

## Components

### Buttons and navigation

Primary actions use semantic primary/foreground roles, a bold label, a 50px minimum height and a small upward hover shift. The hero action uses fixed brand-green/media roles. Secondary actions are outlined and fill with the subtle surface on hover. Disabled actions keep explicit disabled colors. Links retain a visible underline; current desktop navigation gains a heavier label and a two-pixel rule. Mobile navigation uses larger stacked labels.

### Appearance control

A circular sun/moon control reflects the resolved appearance and switches to the opposite explicit choice. Its transparent border gives way to the subtle hover surface. System appearance remains the initial preference until the visitor chooses one.

### Country picker and photo filters

Country buttons sit on the sky region, use current-color borders and become sunshine yellow when selected. Gallery filters use ordinary semantic roles and become primary when selected. Both expose their pressed state and keep a 44px minimum height. The gallery reports its result count and preserves readable image credits.

### Photograph windows

Gallery photos use rounded cover crops with captions below, while destination carousel photos use a dedicated lower image overlay, white photograph edges and media captions. The centered carousel card projects forward; side cards angle away and recede through CSS perspective. Hero photographs overlap with white rims, opposite tilts and soft shadows. Keep actual media in production; sidecar previews use labeled, asset-free placeholders to show component geometry.

### Inquiry fields

External labels sit above plainly bounded fields. Focus uses the shared three-pixel ring and contrast separation; invalid fields use danger roles with an accompanying text error. Inputs retain native editing behavior and appearance-aware autofill colors.

### Travel motion

Arrival is a finite two-second aircraft pass. With motion enabled, a country change runs a 1.5-second departure and return before the photographs appear; static selection is immediate. Departure begins and arrival finishes at the same resting pose; offscreen repositioning is concealed. Rapid selection preserves the running flight and reveals the latest destination. Ambient clouds and the service coach remain subordinate to the content. The destination carousel contains no bus or road. Its perspective responds to manual dragging on phones and desktop, while OS reduced motion flattens its cards. The carousel pauses during hover, focus, dragging, local pause, hidden pages and offscreen placement, with manual controls retained. The decorative desktop pointer uses a 44px airplane with a connected cyan, white and gold tail that grows from 20px during slow movement to 320px at high speed. Trail length follows traveled distance per millisecond, filtered over 60ms separately from heading, so a fast reversal keeps its long tail. Its heading eases into and out of turns without overshoot; the tail follows the displayed airplane angle and fades within 450ms after movement stops. It appears only for an eligible fine desktop mouse, and normal editing cursors remain available.

**The Motion Permission Rule.** Treat arrival and selection transitions as finite events. Pause ambient motion when requested, when reduced motion applies, or when the scene cannot be seen; keep all destinations and inquiry actions usable without animation.

## Do's and Don'ts

### Do:

- **Do** use the paired sky or yellow ink token on expressive section backgrounds.
- **Do** keep the original logo transparent and preserve fixed brand and photograph contrast roles.
- **Do** use real destination, traveler and team photographs with deliberate cover crops and readable captions.
- **Do** carry rounded photo windows and heavier Manrope typography into new Atlas surfaces.
- **Do** keep visible focus, minimum touch height, manual carousel controls and a static motion alternative.

### Don't:

- **Don't** restore the superseded restrained ivory editorial world in new Atlas surfaces.
- **Don't** put decorative transport, clouds or cross marks over essential copy or controls.
- **Don't** recolor fixed media captions or brand assets through page appearance overrides.
- **Don't** turn every text block into a floating card or use photograph-window shadows on inquiry fields.
- **Don't** rely on dragging, color alone or animation to communicate the available action or selected state.
