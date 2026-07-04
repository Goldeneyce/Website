# AI Handoff: Everest World Lifts Website

Last updated: 4 July 2026

This document is the operating brief for any AI agent continuing work on this project. Keep it current whenever you make meaningful changes to content, code, deployment, integrations, or unresolved work.

## Project Summary

Everest World Lifts is a Nigerian elevator, escalator, moving walkway, installation, maintenance, modernization, and consulting company. The website is a production marketing site for the company, with Netlify Forms for lead capture and a Sanity-powered blog managed through a separate Studio.

Primary public URLs:

- Website: https://www.everestworldlifts.com
- Blog: https://www.everestworldlifts.com/blog/
- Sanity Studio: https://studio.everestworldlifts.com
- Facebook compliance data deletion page: https://www.everestworldlifts.com/data-deletion/

Important company details currently used in the site live data:

- Company name: Everest World Lifts
- Address: 8 Bello Gaya Street, Lifecamp, Abuja, Nigeria
- Support email: support@everestworldlifts.com
- General email: info@everestworldlifts.com
- Phone: +234 701 202 0201
- Emergency phone: +234 815 556 6609
- Delivery area: Nationwide
- Business hours: Monday-Friday, excluding public holidays, 9:00 AM-1:00 PM and 2:00 PM-5:30 PM; Saturday 10:00 AM-12:30 PM

## Current Live State

The public website and the Studio have both been deployed to Netlify.

- Public Netlify site name: `everestworldlifts`
- Public custom domain: `www.everestworldlifts.com`
- Public build command: `npm run build`
- Public publish directory: `_site`
- Studio Netlify site name: `everestblog`
- Studio custom domain: `studio.everestworldlifts.com`
- Studio base directory: `sanity`
- Studio build command: `npm run build`
- Studio publish directory: `dist`

Sanity blog setup:

- Sanity project ID: `80wtnld7`
- Dataset: `production`
- API version used by the public site: `2025-06-01`
- Studio title: `Everest World Lifts Blog`
- A Sanity webhook named `Publish Everest Website` exists and triggers the public Netlify build hook when blog content changes.
- Do not print, commit, or expose Netlify tokens, Sanity auth tokens, or build-hook URLs.

Facebook compliance:

- `src/data-deletion.njk` provides public data deletion instructions.
- It is linked from the footer policy navigation, the Policies page, and the Privacy Policy.

## Tech Stack

Root website:

- Static site generator: Eleventy 3
- Source directory: `src/`
- Build output: `_site/`
- Local image processing: `sharp`, through `scripts/optimize-images.mjs`
- Site validation: `scripts/validate-site.mjs`
- Hosting/forms: Netlify

Blog CMS:

- Studio directory: `sanity/`
- CMS: Sanity v4
- Schema entry: `sanity/schemaTypes/index.js`
- Blog post schema: `sanity/schemaTypes/postType.js`
- Studio desk structure: `sanity/structure.js`
- Starter post import script: `sanity/scripts/write-seed.mjs`
- Starter import output: `sanity/seed/starter-posts.ndjson`

## Key Commands

Run from the repository root unless noted.

```powershell
npm install
npm run dev
npm run build
npm run check
npm run studio:dev
npm run studio:build
```

Sanity-specific commands:

```powershell
cd sanity
npm install
npm run dev
npm run build
npm run seed
npm run cors:add
```

`npm run check` builds the public site, optimizes local images, and validates internal links and metadata. During local or sandboxed builds, this warning can be expected if network access is unavailable:

```text
Unable to load Sanity posts: fetch failed. Building with starter blog posts.
```

That fallback is intentional. Production Netlify builds should fetch published posts from Sanity when environment/network access is available.

## Repository Map

Important root files:

- `.eleventy.js`: Eleventy configuration, filters, collections, and Portable Text rendering for Sanity blog bodies.
- `netlify.toml`: Public website Netlify build, environment, headers, and caching.
- `package.json`: Public site scripts and dependencies.
- `README.md`: User-facing setup notes.
- `AI_HANDOFF.md`: This document. Update it as work continues.

Important source files:

- `src/_data/site.js`: Global company information, social links, header navigation, footer company links, and policy links.
- `src/_data/projects.js`: Project/location data for the Projects page.
- `src/_data/posts.js`: Fetches Sanity blog posts and falls back to local starter posts.
- `src/_data/starterPosts.js`: Local starter blog articles.
- `src/_includes/layouts/base.njk`: Main HTML shell, metadata, header/footer includes, and structured data.
- `src/_includes/components/header.njk`: Site header/navigation.
- `src/_includes/components/footer.njk`: Footer links, social links, policy links, and contact info.
- `src/assets/css/style.css`: Main styling for the public site.
- `src/assets/js/site.js`: Frontend behavior.

Current pages:

- `src/index.njk`: Home
- `src/about.njk`: About Us
- `src/products.njk`: Products
- `src/services.njk`: Services
- `src/projects.njk`: Projects
- `src/blog.njk`: Blog listing
- `src/blog-post.njk`: Blog post template
- `src/careers.njk`: Careers form/page
- `src/contact.njk`: Contact form/page
- `src/faq.njk`: FAQs
- `src/policies.njk`: Policies hub
- `src/privacy.njk`: Privacy Policy
- `src/terms.njk`: Terms & Conditions
- `src/data-deletion.njk`: Facebook-compliance data deletion instructions
- `src/thank-you.njk`: Form submission success page
- `src/404.njk`: Not found page
- `src/sitemap.njk`: Sitemap
- `src/robots.txt`: Robots rules

## Forms

The contact and careers flows use Netlify Forms. Preserve Netlify form attributes and hidden form-name inputs when editing these pages. Form submissions should redirect to `/thank-you/`.

The site should not introduce a custom backend for normal form handling unless the user explicitly asks for one.

## Blog and Studio Behavior

The public site is static. Blog content is pulled from Sanity during build time, not client-side at runtime.

When Sanity is reachable:

- `src/_data/posts.js` fetches published `post` documents from project `80wtnld7`, dataset `production`.
- Blog entries render through `src/blog.njk` and `src/blog-post.njk`.

When Sanity is not reachable:

- The build falls back to `src/_data/starterPosts.js`.
- This keeps local builds and restricted environments functional.

The Studio at `studio.everestworldlifts.com` is for writing, updating, publishing, deleting, and organizing blog posts. Access is controlled by Sanity authentication and project permissions.

## Assets and Images

Use local assets wherever possible. Avoid relying on remote image/CDN URLs in generated pages. The validation script flags `images.unsplash.com` and `cdnjs.cloudflare.com` references.

Local image-related locations:

- Root `assets/`: project/local image source assets and company media.
- `src/assets/`: CSS, JavaScript, and site-served assets.
- Generated/optimized images are handled during `npm run images`.

When replacing or adding imagery:

- Put durable site imagery in the appropriate local assets folder.
- Use descriptive filenames.
- Prefer `.webp` for optimized website imagery where the current pattern supports it.
- Add meaningful alt text in templates or data files.

## Deployment Notes

Public site deployment:

- Netlify reads `netlify.toml`.
- Required public build env is already represented in `netlify.toml`:
  - `SANITY_PROJECT_ID=80wtnld7`
  - `SANITY_DATASET=production`
  - `SANITY_API_VERSION=2025-06-01`
- Production deploy command previously used successfully:

```powershell
npx --yes netlify-cli deploy --prod --dir _site --site 48b6b675-fffd-43c2-bdd2-bb00abfb14ec --no-build --message "..."
```

Studio deployment:

- Netlify reads `sanity/netlify.toml`.
- Required Studio env is already represented there:
  - `SANITY_STUDIO_PROJECT_ID=80wtnld7`
  - `SANITY_STUDIO_DATASET=production`
- Production deploy command previously used successfully:

```powershell
npx --yes netlify-cli deploy --prod --dir sanity/dist --site 45cd1ab8-4387-427a-91f6-34ccfb4dc202 --no-build --message "..."
```

Only deploy when the user asks for live changes or the task clearly requires it. Never expose private deploy tokens or hook URLs in chat, commits, or documents.

## Quality Bar

Before handing work back, normally run:

```powershell
npm run check
```

If the Studio changed, also run:

```powershell
npm run studio:build
```

For CSS/layout-heavy work, do a visual check if a browser tool is available. If not available, use build validation plus targeted live/local HTTP checks and state that visual browser QA was unavailable.

## Current Known Gaps and Pending Business Inputs

- Verified completed-project case studies and client testimonials were still awaiting a document from the user.
- Project images were sourced as best-effort location imagery earlier; future agents should replace them with verified company-owned project photos when supplied.
- Keep product/service claims conservative unless backed by the company profile or user-provided documents.
- If legal wording becomes high-stakes, recommend review by a qualified professional rather than treating the website copy as legal advice.

## Working Rules for Future AI Agents

- Read this document first, then inspect the relevant files before editing.
- Preserve user changes. Do not reset, checkout, or overwrite unrelated work.
- Use focused edits that match the existing Eleventy/Nunjucks/CSS patterns.
- Use `src/_data/site.js` for reusable company/contact/navigation data instead of hard-coding repeated values.
- Keep public pages accessible, mobile-friendly, and fast.
- Avoid adding new dependencies unless they clearly reduce complexity or are explicitly requested.
- Keep secrets out of files and responses.
- If a task changes the project state, update this handoff before finishing.

## Handoff Update Checklist

When work continues, update this file with:

- The current date in `Last updated`.
- Any new or changed URLs.
- Any new pages, templates, data files, scripts, dependencies, or environment variables.
- Deployment changes, webhook changes, or CMS/schema changes.
- Verification commands run and anything that could not be verified.
- Newly discovered blockers or user decisions still needed.

Recent important milestones:

- Blog and Sanity Studio were added and deployed.
- `studio.everestworldlifts.com` is functional.
- Sanity-to-Netlify automatic publishing was connected.
- A Facebook-compliance data deletion instructions page was added and deployed.
