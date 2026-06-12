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

## Sanity Blog and Editorial Studio

The site fetches published Sanity posts during each Netlify build. Add these environment variables in Netlify:

```text
SANITY_PROJECT_ID=80wtnld7
SANITY_DATASET=production
SANITY_API_VERSION=2025-06-01
```

The public site includes three starter articles as a build fallback. Once the `production` dataset contains published posts, Sanity becomes the source of truth and replaces the fallback content.

The `sanity/` directory contains the editorial Studio used to write, publish, update, and delete blog posts. The Studio includes cover images, categories, rich article content, SEO fields, and separate published/draft views.

```powershell
npm run studio:dev
```

### Import the Starter Articles

After logging into Sanity, safely import the three starter posts. The `--missing` import mode will not overwrite posts that already exist:

```powershell
cd sanity
npx sanity login
npm run seed
```

### Deploy `studio.everestworldlifts.com`

Create a second Netlify site from this repository dedicated to the Studio:

- Base directory: `sanity`
- Build command: `npm run build`
- Publish directory: `sanity/dist` when configured from the repository root, or `dist` when the base directory is applied before publishing
- Environment variables:
  - `SANITY_STUDIO_PROJECT_ID=80wtnld7`
  - `SANITY_STUDIO_DATASET=production`
- Custom domain: `studio.everestworldlifts.com`

The Studio's [Netlify configuration](sanity/netlify.toml) includes the required single-page application redirect.

After the domain is connected, authorize it in Sanity:

```powershell
cd sanity
npm run cors:add
```

Sanity requires users to sign in and have appropriate project permissions before they can manage content. Do not add authentication tokens to Studio environment variables.

### Automatic Website Publishing

Create a Netlify build hook for the public website, then add that URL as a Sanity webhook triggered when a `post` document is created, updated, published, unpublished, or deleted. This rebuilds the static website whenever editorial content changes.

## Content That Still Needs Business Confirmation

- Verified completed-project case studies and client testimonials

## Quality Checks

```powershell
npm run check
```

This optimizes local site images, builds the site, and validates local links and common metadata issues.
