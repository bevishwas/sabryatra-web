# Content QA Checklist for Vishal

Use this checklist before pointing `sabryatra.com` DNS to Vercel.

## Required before launch

- [ ] **Sanity CMS connected** — env vars set, `/studio` loads, CORS added for localhost + production
- [ ] **Re-seed or edit in Studio** — run `npm run seed:sanity` once, then replace placeholders in `/studio`
- [ ] **Replace placeholder photos** — hero, card, and gallery images for every journey; descriptive filenames + alt text
- [ ] **Maa Nanda Devi copy** — synced from live site; review logistics fields in Sanity
- [ ] **Testimonials** — old site “Whispers from Past Journeys” was a **photo carousel only** (no written quotes). In `/studio` → Testimonial: add name, quote, photo, mark **Featured**. Reference photos from live site:
  - Hiker resting on stone wall
  - Hiker in blue jacket on snowy trail (`IMG_2788.jpg`)
  - Cyclist meditating on mountain road
  - Traveler resting with dog in rhododendron hills
- [ ] **Founder portrait** — upload to About in Sanity
- [ ] **Social links** — Instagram, YouTube, Pinterest in Site Settings
- [ ] **Instagram highlights** — Site Settings → Instagram Highlights (post URLs + captions)
- [ ] **Featured hero journey** — Site Settings → Featured Hero Journey (which journey drives homepage hero)
- [ ] **Optional hero video** — Site Settings → Homepage Hero Video URL (MP4) for cinematic background
- [ ] **Formspree** — create form at formspree.io → add `NEXT_PUBLIC_FORMSPREE_FORM_ID` to Vercel env
- [ ] **WhatsApp test** — FAB, contact form, and mobile journey bars open correctly

## Deploy (Vercel)

- [ ] Push repo to GitHub
- [ ] Import in Vercel, add all env vars from `.env.example`
- [ ] Add Sanity CORS: `https://www.sabryatra.com` (credentials ON)
- [ ] Sanity webhook → `POST https://www.sabryatra.com/api/revalidate?secret=YOUR_SECRET`
- [ ] Point DNS to Vercel
- [ ] Verify old URL redirects: `/garhwal`, `/zanskar`, `/bio`, etc.

## Optional but recommended

- [ ] **Journey maps** — add Google Maps embed URL per journey in Sanity
- [ ] **Journey moods** — set Moods on each journey for the Find Your Journey matcher
- [ ] **Google Search Console** — submit `https://www.sabryatra.com/sitemap.xml`
- [ ] **Google Analytics** — add `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [ ] **Publish stories weekly** — `/studio` → Story

## Instagram photos on homepage

Two options (best → simplest):

### Option A — Auto-sync latest posts (recommended)

Uses Meta Instagram Graph API. Photos appear in a clean grid, refreshed hourly.

1. Convert @sabryatra to an **Instagram Business** or **Creator** account
2. Link it to a **Facebook Page**
3. Create a Meta app at [developers.facebook.com](https://developers.facebook.com)
4. Add **Instagram Graph API** product
5. Generate a long-lived token with `instagram_basic`, `pages_show_list`, `pages_read_engagement`
6. Get your Instagram User ID (Graph API Explorer → `me/accounts` → linked IG account)
7. Add to `.env` / Vercel:
   ```env
   INSTAGRAM_ACCESS_TOKEN=...
   INSTAGRAM_USER_ID=...
   ```

### Option B — Embed specific posts (no API)

In Sanity → **Site Settings → Instagram Highlights**, paste full post URLs:

```
https://www.instagram.com/p/XXXXXXXXX/
https://www.instagram.com/reel/XXXXXXXXX/
```

Profile URLs (`instagram.com/sabryatra`) do **not** embed — use individual post links.

---

- Journey logistics (duration, difficulty, inclusions, best for)
- Gallery filter by journey on `/gallery`
- Reading time on stories
- Breadcrumbs on journey + story detail pages
- FAQ structured data on journey pages
- Instagram strip on homepage (from Site Settings)
- Hero video support (Site Settings or per-journey)
- Dynamic journey count in stats and copy
