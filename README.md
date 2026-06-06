# Everest World Lifts Website

Production-ready static marketing site built with Eleventy and deployed on Netlify.

## Local Development

```powershell
npm install
npm run dev
```

The production build is written to `_site/`.

## Netlify

Connect this repository to Netlify. The included `netlify.toml` configures:

- Build command: `npm run build`
- Publish directory: `_site`
- Netlify Forms detection for the contact form
- Security and asset-caching headers

After the first deploy, submit the contact form once and confirm the `contact` form appears under **Forms** in Netlify.

## Sanity Blog

The site fetches published Sanity posts during each Netlify build. Add these environment variables in Netlify:

```text
SANITY_PROJECT_ID=your-project-id
SANITY_DATASET=production
SANITY_API_VERSION=2025-06-01
```

The blog builds with a clean empty state when `SANITY_PROJECT_ID` is not configured.

The `sanity/` directory contains a ready-to-deploy Sanity Studio:

```powershell
cd sanity
npm install
$env:SANITY_STUDIO_PROJECT_ID="your-project-id"
$env:SANITY_STUDIO_DATASET="production"
npm run dev
```

Run `npm run deploy` from the `sanity/` directory to host the Studio on Sanity.

Publish a post in Sanity, then trigger a new Netlify deploy to publish it on the website.

For automatic publishing, create a Netlify build hook and add it as a Sanity webhook that runs when a `post` document is created, updated, or deleted.

## Content That Still Needs Business Confirmation

- Sanity project ID and dataset
- Real social profile links, if they should be shown
- Verified completed-project case studies and client testimonials
- Preferred production domain if it differs from `https://everestworldlifts.com`

## Quality Checks

```powershell
npm run check
```

This optimizes local site images, builds the site, and validates local links and common metadata issues.
