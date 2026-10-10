# GameLaunch Bridge

[Open the live website](https://michaelpan24.github.io/gamelaunch-bridge/) · [Open Creator Discovery](https://michaelpan24.github.io/gamelaunch-bridge/discover.html)

## What works now (Creator Discovery beta)
- Responsive public gaming-creator research directory with **30 curated public creator/channel candidates**, including some third-party directory profiles.
- Live search across channel names, focus, descriptions and product-fit notes.
- Filters for content niche, content language, and dated public subscriber-size snapshots; sort by name or dated size.
- Detailed profile drawer with source links, direct channel URL and explicit missing-data statements.
- Favorite channels and build a shortlist (up to 8), saved in your **own browser's localStorage**.
- Export selected creators as a local CSV; create a campaign-research brief that opens your email client.

**Important:** none of the 30 creator profiles are represented as opt-in members, signed partners, available for sponsorship, or ready for a specific rate. Size estimates come from public third-party June–October 2026 dated third-party snapshots; views, audience geography, prices, availability and creator approval are **not verified**. The directory is research and discovery, not a functioning booking marketplace.

## Current architecture
- `index.html` — landing page, services and email inquiry drafts.
- `discover.html`, `discover.css`, `discover.js` — functioning static-first discovery and campaign shortlist UI.
- `creators-data.js` — editorially curated public-channel records, research sources and limited dated audience-size observations.
- `styles.css` — shared design system.
- `main.js` — email-client-only inquiry helper (not a hosted submission form).
- `privacy.html` — disclosure of mailbox processing and browser-only shortlist storage.
- `.nojekyll` — static GitHub Pages support.

The site is built and served from `main` via GitHub Pages, with no external JS libraries or tracking pixels.

## Current limitations and required next phase
1. Further validate creator channel identities, source dates, current activity and outreach suitability for the 30 research leads; a listing is not a signed opt-in.
2. Contact creators one-to-one to seek **express participation, regional audience statistics, rate cards, and availability**. Do not imply consent or endorsement prematurely.
3. Test mobile and desktop UI interactions; check local CSV output and mailto handling on real devices.
4. Test a real email inquiry from a browser to the approved mailbox. A mailto link only opens a draft; **no lead is submitted until a visitor sends it**.
5. Build a proper authenticated CRM + backend and creator-controlled profile onboarding only once consent, privacy and actual demand are validated.
6. Verify the contracting party, jurisdiction, privacy/retention handling, and paid campaign terms prior to commercial execution.

## Current public contact
`1102847670py@gmail.com` — user-approved project contact. Business correspondence may be sent to this address.

## Intellectual property
Independent marketing research; no affiliation with Rockstar Games, Take-Two or YouTube. Creator names and links are included as public research references, not as representations of agreement or participation. Requests to correct/remove listings can be directed to the public contact address.

## Commercial model (to validate)
- $499 creator research shortlist, conditional on agreed scope.
- $1,499 campaign coordination fee, creator fees and third-party costs separate.
- No promise of views, conversions, signed creators or revenue.

**Do not commit internal CRM exports, personal communication, confidential client data or unpublished creator media kits to this public repository.**
