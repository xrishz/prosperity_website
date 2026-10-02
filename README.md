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

## Appearance and inquiry behavior

The compact appearance button shows a sun in light mode and a moon in dark mode. Select it to switch to the other appearance. On a first visit, the website follows the device setting; an explicit light or dark choice is saved in browser local storage under `prosperity-appearance`. Semantic palette definitions live in `src/app/theme.css`; the same components serve both themes.

The trip planner keeps its optional draft in the current tab's session storage. It validates the traveler count, allows an editable message and opens WhatsApp with that draft. Messenger and Viber provide copy-and-open paths. Nothing is sent automatically, and the site has no reservation, payment, passport upload or inquiry database. The privacy page explains browser storage and external contact services.

## Content and media

Agency facts come from the supplied questionnaire and official company profile. Destination photography is licensed stock; actual traveler, office, logo and team media come from the company profile. See `ASSET-SOURCES.json` for source attribution and derivative details, and `CONTENT-TODO.md` for remaining client confirmations. Private source documents and customer conversation screenshots are excluded from this repository.

The site contains Home, Destinations, Japan, Korea, Türkiye, Greece, Dubai, Services, About, Contact, Plan your trip, Privacy notice and Website use pages, plus a custom not-found page, sitemap and robots file.

## Deployment

Import this repository into the requested Vercel team, select Next.js and use the repository root as the project root. No secret environment variables are required.

Set `NEXT_PUBLIC_SITE_URL` to the final public production origin when a custom domain is confirmed. Otherwise the site uses `VERCEL_PROJECT_PRODUCTION_URL` on Vercel. Local builds fall back to `http://localhost:3000`. Verify canonical links, social metadata, the sitemap and robots URL after the deployment is ready.

The client still needs to confirm business days and WhatsApp/Viber account activation. Do not add prices, accreditation claims or reservation-success messages without verified client material.
