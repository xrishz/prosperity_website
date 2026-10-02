# Prosperity International Travel Services

A responsive travel website built with Next.js App Router, React, TypeScript, Motion and Embla. It presents the agency's verified business information, services, five destination guides, traveler stories and a practical inquiry planner.

## Run locally

Use Node.js 22 or newer with npm.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`. For a production build:

```sh
npm run build
npm run start
```

Quality checks are `npm run lint` and `npm run typecheck`.

## Travel Atlas experience

The homepage uses a cartoon travel world: sky, sunshine and mint gradients, subtle cross marks, overlapping destination postcards, a three-dimensional plane and coaches, a filterable ten-photo destination gallery, actual traveler photographs and Prosperity's five sourced core values beside the real team.

Open or refresh plays a finite two-second airplane arrival. Desktop destination choices play a 1.2-second airplane pass before their photographs appear. The destination rail loops automatically and supports mouse/touch dragging, arrows and keyboard navigation. Its leading coach, moving road and service coach suspension reinforce the journey. Pause carousel controls that rail; Pause animations governs ambient page movement through the optional `prosperity-motion` browser preference. Hover, focus, hidden tabs and offscreen placement stop the appropriate movement. Small screens and OS reduced-motion preferences keep ambient scenes still and country changes immediate.

Three is loaded near visible scenes and progressively enhances authored SVG vehicles. The illustrations are decorative; they do not claim an agency-owned fleet or supplier routes. All primary inquiry actions lead to the same trip planner, with country context when selected.

On desktop with a fine mouse pointer and motion enabled, an authored 44px airplane replaces the cursor. Its cyan, white and gold speed ribbon joins the airplane's displayed tail and grows from 20px during slow movement to 320px during a fast sweep. Travelled pointer speed is filtered over 60ms, separately from heading, so fast reversals retain a long trail. It shrinks and fades within 450ms after movement stops. Direction changes ease in and out over 220ms (up to 321ms for a reversal); filtered movement prevents small mouse movements from shaking the plane. Its nose remains the pointer hotspot. Editable fields retain the normal cursor. Mobile, reduced motion, global pause, hidden tabs and pointer exit remove the cursor artwork; its animation does not run while idle.

## Appearance and inquiry behavior

The compact appearance button shows a sun in light mode and a moon in dark mode. Select it to switch to the other appearance. On a first visit, the website follows the device setting; an explicit light or dark choice is saved in browser local storage under `prosperity-appearance`. Semantic palette definitions live in `src/app/theme.css`; the same components serve both themes.

The trip planner keeps its optional draft in the current tab's session storage. It validates the traveler count, allows an editable message and opens WhatsApp with that draft. Messenger and Viber provide copy-and-open paths. Nothing is sent automatically, and the site has no reservation, payment, passport upload or inquiry database. The privacy page explains browser storage and external contact services.

## Content and media

Agency facts come from the supplied questionnaire and official company profile. Destination photography is licensed stock; actual traveler, office, logo and team media come from the company profile. See `ASSET-SOURCES.json` for source attribution and derivative details, and `CONTENT-TODO.md` for remaining client confirmations. Private source documents and customer conversation screenshots are excluded from this repository.

The site contains Home, Destinations, Japan, Korea, Türkiye, Greece, Dubai, Services, About, Contact, Plan your trip, Privacy notice and Website use pages, plus a custom not-found page, sitemap and robots file.

## Deployment

Published at [prosperity-website.vercel.app](https://prosperity-website.vercel.app), connected to [xrishz/prosperity_website](https://github.com/xrishz/prosperity_website) in [the Prosperity Vercel project](https://vercel.com/xrishzs-projects/prosperity-website). The production branch is `codex/prosperity-website`; Vercel uses Next.js with the repository root as its project root. No secret environment variables are required. See `AUDIT.md` for release verification and its practical limits.

Set `NEXT_PUBLIC_SITE_URL` to the final public production origin when a custom domain is confirmed. Otherwise the site uses `VERCEL_PROJECT_PRODUCTION_URL` on Vercel. Local builds fall back to `http://localhost:3000`. Verify canonical links, social metadata, the sitemap and robots URL after the deployment is ready.

The client still needs to confirm business days and WhatsApp/Viber account activation. Do not add prices, accreditation claims or reservation-success messages without verified client material.
