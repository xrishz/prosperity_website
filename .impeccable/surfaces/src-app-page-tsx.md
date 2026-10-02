---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/hero.tsx","src/components/destination-gallery.tsx","src/components/transport-scene.tsx"]
---

# Website surface — 3D Travel Atlas

Mode: Persuade, with an Experience-led destination gallery. Existing discovery, contacts, inquiry validation and business facts remain intact. The user approved 3D Travel Atlas: vibrant sky blue, sunshine yellow and evergreen, real photo galleries, dimensional airplane and bus, destination scene changes, static mobile/reduced-motion behavior. Code-led continuation of this surface's recorded session contract; no approved visual comp.

## Direction contract

THESIS: Start imagining a real destination while a dimensional aircraft invites the journey; the agency makes the practical next step clear.

OWN-WORLD: Sky-blue and sun-yellow regions, evergreen ink and actions, rounded photo windows, a softly lit white/cyan aircraft and yellow coach. Manrope gains confident heavy display weight; original oval logo and sun/moon control persist.

STORY: Select a country, watch the destination photo scene change, browse a richer gallery, understand travel services, see genuine travelers and contact the Cabuyao team.

FIRST VIEWPORT: Large dark evergreen headline and inquiry action at left over a saturated sky-blue field. At right, overlapping real destination photographs and a large dimensional aircraft. Five labeled destination buttons change the photographs and inquiry context. A visible pause control governs ambient motion.

FORM: Grounded candidate4, Travel Atlas, seed f104aadd. User selected it over miniature travel, passport journey and conventional photo-first alternatives. Roll acknowledged before implementation. Plane and coach are decorative journey imagery, not agency fleet or routes.

SIGNATURE: Country selection changes a layered photo scene and bounded aircraft attitude; the coach accompanies tour discovery. Photo filters keep exploration direct. One shared motion preference pauses ambient scene/cloud/route movement, offscreen rendering sleeps, phone ambient motion and reduced-motion defaults remain static; manual perspective carousel dragging stays available on phones.

## Confirmed refinements

The user further pinned a cartoon travel approach with clear conversion to a trip inquiry. The headline is exactly two lines: Somewhere new. / Something unforgettable. Open or refresh runs a finite two-second airplane swoosh. On desktop with motion enabled, choosing a country runs a 1.5-second airplane departure and return before revealing its photos; paused, mobile and reduced-motion selection is immediate. The original logo keeps its alpha transparency without a white backing box.

The destination carousel glides automatically, stays draggable by mouse and touch, and has manual arrows, keyboard controls and a local pause. The destination carousel uses centered 3D photograph cards, angled receding side cards and clear destination links; its former coach, tow line and road are removed. The service coach has gentle suspension bounce, rotating wheels and looping road stripes. Hover, focus, pause, hidden pages and offscreen placement stop ambient movement. Soft section gradients and low-contrast cross marks carry the travel world behind readable content. More photo compositions and the exact five core values from company-profile slide 3, accompanied by real team portraits from slide 19, support trust. Plan your trip remains the primary conversion action.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

The final user refinement adds a decorative airplane cursor with a clearly visible speed trail. The implementation uses a 44px vector plane and a curved cyan/white/gold ribbon following a desktop mouse, with a bounded 450ms settle. The user's screenshot required correcting the detached ribbon and shaky heading: the ribbon joins the displayed tail after rotation, and filtered direction changes ease in and out over 220ms (up to 321ms for a reversal), with a small-movement gate and no overshoot. The latest user refinement replaces the long minimum with speed-based length: a short 20px ribbon grows smoothly to 320px during a fast sweep. Scalar travelled speed is filtered over 60ms separately from heading, preserving length through fast reversals. The airplane nose remains the pointer hotspot. Editable fields, mobile/coarse pointers, reduced motion and paused animations retain normal input behavior.


## 3 October 2026 refinements

The user requested continuous destination flight endpoints, clearer Voutoumi Beach and Santorini text, more recognizable tourist spots, and removal of the destination-carousel bus in favor of 3D cards. The flight departs from and returns to the same pose, with repositioning concealed while transparent; rapid choices preserve the flight and reveal the latest selection. The Greece caption reads Voutoumi Beach · Santorini with normal tracking and clear contrast. The gallery expands to four credited destination photographs per country. Service coach animation remains; the destination carousel uses perspective and depth with the existing drag, pause, arrows, keyboard and inquiry links. OS reduced motion uses flat cards.
