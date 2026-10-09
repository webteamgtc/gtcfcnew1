# GTCFC website design concepts

Two independent visual directions for GTC Financial Consultancy LLC, with Midnight Gold as the default homepage at `/`.

- `/midnight/`: Midnight Gold — navy, champagne, editorial serif typography, split hero and architectural imagery.
- `/horizon/`: Clear Horizon — white, brand blue #293B93, clean sans-serif typography, open hero, rounded panels and blue glass imagery.
- Each direction includes `/about/`, `/regulation/`, `/services/`, `/support/` and `/elements/`.

## Layout
The top design-selection bar is removed. Both themes use a shared 1,200px content width with responsive gutters. Homepage artwork and Three.js motion extend to the right viewport edge; on mobile they stack beneath the text.

## Stack
Next.js App Router, JavaScript / JSX only (no TypeScript application code), React, Tailwind CSS v4, Three.js and Framer Motion. Static export for private design review.

## Run locally
Use Node.js 24 and npm. Unzip this folder, open a terminal inside it, and run:

```sh
npm ci
npm run dev
```

Open http://localhost:4173/ for Midnight Gold, or http://localhost:4173/horizon/ for Clear Horizon.

To create a production static export:

```sh
npm run build
```

The generated `out/` directory contains the deployable static website. Serve it from a web server at the domain root. The source archive includes both themes, images, animation code and the latest layout/content updates.

## Files
- `app/[theme]/[[...slug]]/page.jsx`: prerendered routes and page metadata.
- `components/Experience.jsx`: page content, navigation, information panels and enquiry preview.
- `components/Atmosphere.jsx`: lazy-loaded Three.js ambient geometry, pointer response, resize/disposal, reduced-motion support.
- `app/globals.css`: responsive design systems and Tailwind import.
- `public/`: original generated architecture assets and favicon.

## Review status
This is a design review, not a representation of CMA approval or a final regulatory submission. The exact licence category, authorised activities, licence number, company background, office, group relationship, contact details, fees, client eligibility and complaints process need confirmation before launch. Service descriptions are illustrative and explicitly labelled. Account buttons display an availability notice; they do not open accounts. The enquiry preview is local-only, performs input validation and sends/stores no message. No analytics or trading connections are configured.

## Validation
Production static build and internal exported-page/asset-link checks passed. The supervised browser preview here does not support this Next.js development command, so visual browser verification was unavailable.
