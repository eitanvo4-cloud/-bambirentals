<!-- Recovered 2026-07-02 from the 2026-05-05 planning session transcript.
     The original lived in ~/.claude/plans/ and was purged — planning artifacts now live in-repo.
     Status at recovery: rebrand shipped (PR #2, June 2026). Router, Supabase, and everything else: not started. -->

# Costa Rica Rentals – Transformation Roadmap

## Context

Bambi Rentals is currently a simple single-page ATV rental site (3 hardcoded ATVs, no database, no routing, booking via FormSubmit + WhatsApp). The owner wants to transform it into **Costa Rica Rentals** — a marketplace where partners can list ATVs, Stays, and Cars, and customers can browse and inquire via WhatsApp.

**Key decisions:**
- Rebrand in-place (same Vercel project)
- Supabase for DB, auth, storage
- All 3 categories (ATVs, Stays, Cars) in Santa Teresa first
- Full partner dashboard with Google OAuth
- AI-powered URL import for partner onboarding
- React Router with clean URLs
- iCal sync for stays availability
- WhatsApp-first conversion (no payments)

---

## Milestones (each = 1 session)

### 1. React Router + Rebrand Shell
**Delivers:** Real URLs (`/`, `/santa-teresa/atvs`, `/listing/:id`) and updated branding. Existing ATV flow still works with hardcoded data.

**Work:**
- Install `react-router-dom`, replace ViewState with Routes
- Route structure: `/`, `/:location/:category`, `/listing/:id`, `/book/:id`, `/confirmation`
- Vercel SPA fallback in `vercel.json`
- Update branding: name, logo, colors, meta tags

**Complexity:** M | **Depends on:** —

---

### 2. Supabase Project + Database Schema
**Delivers:** Database foundation ready. No visible user change yet.

**Work:**
- Create Supabase project, add env vars
- Install `@supabase/supabase-js`, create `supabaseClient.ts`
- Tables: `locations`, `categories`, `partners`, `listings` (with JSONB specs, images array, status), `availability`
- RLS: public read for published listings, partner write for own

**Complexity:** M | **Depends on:** —

---

### 3. Migrate Customer Data to Supabase
**Delivers:** Listings served from database instead of hardcoded constants. Existing 3 ATVs seeded.

**Work:**
- Seed existing ATVs into `listings` table
- Rewrite `services/api.ts` to query Supabase
- Generalize `ATV` type → `Listing` interface
- Update components to use new type
- Remove `constants.ts` fleet data

**Complexity:** M | **Depends on:** 1, 2

---

### 4. Multi-Category Customer Browse
**Delivers:** Customers browse ATVs, Stays, and Cars at `/santa-teresa/atvs`, `/santa-teresa/stays`, `/santa-teresa/cars`. New homepage showcases all categories.

**Work:**
- `CategoryPage` component (parameterized by slug)
- New homepage with category hero cards
- Generalized `ListingCard` component (different layouts per category)
- Category-specific detail views (bedrooms/amenities for stays, make/model for cars)
- Seed placeholder stays + cars listings
- Updated nav with category links

**Complexity:** L | **Depends on:** 3

---

### 5. Supabase Auth + Partner Login
**Delivers:** Partners sign in with Google OAuth, see a dashboard shell.

**Work:**
- Configure Google OAuth in Supabase Auth
- `AuthContext` provider
- `/partner/login` page with Google sign-in
- `PartnerLayout` shell (sidebar, header, logout)
- Auto-create `partners` row on first sign-in
- Route guards (`RequireAuth` component)

**Complexity:** M | **Depends on:** 2

---

### 6. Partner Dashboard – Listing CRUD
**Delivers:** Partners create, edit, delete listings via forms. Published listings appear on customer side.

**Work:**
- `/partner/listings` — table of partner's listings with status
- `/partner/listings/new` and `/partner/listings/:id/edit` — dynamic forms per category
- Image upload to Supabase Storage (drag-and-drop, multi-image, reorder)
- Status workflow: draft → published → archived
- RLS enforces partner-only access

**Complexity:** L | **Depends on:** 3, 5

---

### 7. Partner Dashboard – AI URL Import
**Delivers:** Partner pastes a URL, AI extracts listing info, pre-fills the form.

**Work:**
- Supabase Edge Function: fetch URL → send to Claude API → return structured JSON
- UI: paste URL → loading → review pre-filled form → edit & publish
- Handle: blocked URLs, incomplete data, rate limiting
- Store source URL on listing

**Complexity:** L | **Depends on:** 6

---

### 8. WhatsApp Conversion Flow
**Delivers:** Smart WhatsApp links with pre-filled messages. Inquiry tracking for partners.

**Work:**
- WhatsApp link generator (encodes listing, dates, guest count)
- `inquiries` table (listing_id, customer_name, whatsapp, dates)
- Lightweight capture form before WhatsApp redirect
- Partner dashboard: "Inquiries" tab
- Optional: email notification to partner on new inquiry

**Complexity:** M | **Depends on:** 4, 6

---

### 9. iCal Sync for Stays
**Delivers:** Partners paste iCal URLs, blocked dates sync. Customers see availability calendar.

**Work:**
- Supabase Edge Function: fetch + parse .ics → upsert `availability` table
- Partner UI: add/remove iCal URLs per listing
- Customer-side: calendar availability widget on stay detail pages
- Scheduled re-sync every 6 hours (pg_cron or scheduled function)

**Complexity:** L | **Depends on:** 4, 6

---

### 10. SEO, Performance + Polish
**Delivers:** Production-ready site with meta tags, OG images, fast loading, responsive design.

**Work:**
- `react-helmet-async` for per-page meta/OG
- Image optimization (Supabase transforms or CDN)
- Loading skeletons, error boundaries, 404 page
- Responsive audit (mobile/tablet/desktop)
- Lighthouse pass, code splitting, lazy loading
- Sitemap generation

**Complexity:** M | **Depends on:** 4, 8

---

### 11. Location Expansion Groundwork
**Delivers:** URL structure supports multiple locations. Admin can add locations. Santa Teresa unaffected.

**Work:**
- Location-aware routing: `/:location/:category`
- Homepage location selector (map or destination cards)
- Location filter persists across navigation
- Queries scoped to selected location
- Seed one additional location as proof of concept

**Complexity:** S | **Depends on:** 4

---

### 12. Admin Panel + Partner Approval
**Delivers:** Site owners approve partners, moderate listings, see platform metrics.

**Work:**
- Admin role (custom claims or `admins` table)
- `/admin` routes: partner approval queue, listing moderation, stats
- Partner status: pending → approved → suspended
- Email on approval
- Metrics dashboard: listings, inquiries, by category/location

**Complexity:** M | **Depends on:** 5, 6

---

## Dependency Graph

```
1 (Router+Brand) ──┐
                   ├── 3 (Migrate Data) ── 4 (Multi-Category) ──┬── 8 (WhatsApp) ── 10 (Polish)
2 (Supabase) ─────┤                                            ├── 9 (iCal)
                   └── 5 (Auth) ── 6 (Partner CRUD) ───────────┤── 7 (AI Import)
                                                                └── 11 (Locations)
                                                                    12 (Admin) depends on 5+6
```

**Parallelization:** Milestones 1 & 2 run in parallel. After 6 lands, milestones 7, 8, 9 are independent.

---

## Verification (per milestone)

Each milestone session should:
1. Run `npm run build` — no TypeScript errors
2. Run dev server and test in browser (customer flows)
3. Test partner flows where applicable
4. Deploy to Vercel preview and verify
5. Commit with clear message describing the milestone

