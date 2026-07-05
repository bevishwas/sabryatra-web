# Sabryatra Web

Modern Next.js portfolio for [Sabryatra](https://www.sabryatra.com/) — cinematic travel storytelling, Himalayan journeys, and travel photography.

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + custom design system
- **Sanity CMS** — content editing at `/studio`
- **Vercel** — deployment target
- **Formspree** — contact form backup
- **WhatsApp** — primary inquiry channel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site works out of the box with **seed content** (migrated from the Wix site). Connect Sanity to enable CMS editing.

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | For CMS | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | For CMS | Default: `production` |
| `SANITY_API_WRITE_TOKEN` | For seeding | Editor token — run `npm run seed:sanity` once |
| `SANITY_REVALIDATE_SECRET` | For webhooks | Secret for on-demand revalidation |
| `NEXT_PUBLIC_FORMSPREE_FORM_ID` | Optional | Formspree form ID for contact emails |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 |
| `NEXT_PUBLIC_SITE_URL` | Optional | Default: `https://www.sabryatra.com` |

## Sanity Setup
2. Add env vars to `.env.local`
3. **Add CORS origins** (required for `/studio` — see below)
4. Open `/studio` to edit content
5. Configure a webhook → `POST /api/revalidate?secret=YOUR_SECRET`

### Fix `CorsOriginError` at `/studio`

Because Studio is embedded in Next.js (not the default Sanity port `3333`), you must allow your site URL in Sanity:

1. Go to [sanity.io/manage](https://www.sanity.io/manage) → your project → **Settings → API → CORS Origins**
2. Click **Add CORS origin**
3. Add these origins with **Allow credentials: ON** (Studio needs login):

| Origin | When |
|--------|------|
| `http://localhost:3000` | Local dev (`npm run dev`) |
| `https://www.sabryatra.com` | Production |
| `https://your-project.vercel.app` | Vercel preview (optional) |

Or via CLI (after `npx sanity login`):

```bash
npx sanity cors add http://localhost:3000 --credentials
npx sanity cors add https://www.sabryatra.com --credentials
```

See [Sanity CORS docs](https://www.sanity.io/docs/content-lake/cors).

### Seed all content into Sanity (one-time)

You do **not** need to create every document by hand. Run the seed script:

1. Go to [sanity.io/manage](https://www.sanity.io/manage) → your project → **API → Tokens → Add API token**
2. Name it `Sabryatra seed`, permissions **Editor**
3. Copy the token into `.env`:
   ```env
   SANITY_API_WRITE_TOKEN=sk...
   ```
4. Run:
   ```bash
   npm run seed:sanity
   ```

This uploads all 5 journeys, 2 stories, gallery images, site settings, and about page (with Unsplash placeholders). Testimonials are not seeded — add them in `/studio`. Safe to re-run — it replaces the same documents.

After seeding, open `/studio` to review. Replace placeholder photos with real ones before launch.

## Deploy to Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Add environment variables
4. Point `sabryatra.com` DNS to Vercel

## SEO Checklist (Launch Day)

- [ ] Submit sitemap to [Google Search Console](https://search.google.com/search-console)
- [ ] Configure GA4 with `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [ ] Verify 301 redirects from old Wix URLs (`/garhwal`, `/bio`, etc.)
- [ ] Run PageSpeed Insights — target 90+ mobile

## Content Checklist for Vishal

Before DNS cutover, provide:

- [ ] **Maa Nanda Devi** — confirm/edit journey copy in Sanity
- [ ] **Testimonials** — add in `/studio` with photos + quotes (old site carousel had images only)
- [ ] **High-res photos** — 1 hero + 8–12 gallery images per journey (1920px+ wide)
- [ ] **Founder portrait** — professional photo for About page
- [ ] **Journey logistics** — duration, season, group size (optional fields in Sanity)
- [ ] **Social URLs** — Instagram, YouTube, Pinterest in Site Settings
- [ ] **Formspree** — create form at formspree.io → add form ID to env
- [ ] **Stories** — publish 1+ article per week for SEO (Phase 2 cadence)

## Project Structure

```
src/
├── app/           # Pages (home, journeys, stories, gallery, about, contact, studio)
├── components/    # UI, layout, feature components
├── lib/           # Data layer, seed content, SEO helpers
└── sanity/        # Sanity schemas and queries
```

## Old Wix URL Redirects

| Old | New |
|-----|-----|
| `/garhwal` | `/journeys/garhwal` |
| `/zanskar` | `/journeys/zanskar` |
| `/kumaon` | `/journeys/kumaon` |
| `/shivalik` | `/journeys/shivalik` |
| `/maa-nanda-devi` | `/journeys/maa-nanda-devi` |
| `/bio` | `/about` |
