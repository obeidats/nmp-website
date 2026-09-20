# NM Projects — Company Website (beta)

Bilingual (English / Arabic, RTL-aware) marketing site for **Nasaq Modern Projects Company (NM Projects)**.
Built with [Astro](https://astro.build) + [Tailwind CSS 4](https://tailwindcss.com). Fully static — no server needed.

## Run it

```bash
npm install
npm run dev        # http://localhost:4321  (/ redirects to /ar/ — Arabic is the primary language)
npm run build      # type-check + static build into dist/
npm run preview    # serve the built site
```

## Where things live

| You want to change…                          | Edit                                   |
| -------------------------------------------- | -------------------------------------- |
| Any English wording                          | `src/i18n/en.ts`                       |
| Any Arabic wording                           | `src/i18n/ar.ts`                       |
| Phone, email, CR, PO Box, portfolio numbers  | `src/data/site.ts`                     |
| Colours, fonts, spacing tokens               | `src/styles/global.css` (`@theme`)     |
| Photos (paths, sizes) and gallery order      | `src/data/images.ts` + `public/images/`|
| Page layouts                                 | `src/pages/[lang]/*.astro`             |
| Header / footer / shared blocks              | `src/components/`, `src/layouts/`      |
| Logos and favicons                           | `public/brand/`, `public/*.png`        |
| Original logo files as supplied              | `brand-source/`                        |

`src/i18n/types.ts` defines the shape of all content. **`en.ts` and `ar.ts` must both satisfy it**, so a missing
translation fails the build instead of showing a blank. Pages are generated once per language from
`src/pages/[lang]/`, so a new page needs one file plus entries in both language files.

## Pages

Home · Services · **Projects** · About Us · Contact (nav order is `pages` in `src/i18n/index.ts`).

- **Projects** shows the portfolio numbers (filterable chart), then a tabbed explorer for the five disciplines
  (roads, water, networks, electrical, buildings) with scope, method, quality points and a photo gallery with a lightbox,
  then the four-stage project framework and the quality/safety commitments. The five disciplines share one order everywhere:
  `projectIds` in `src/data/site.ts` = `services.infrastructure.categories` = `projects.explorer.disciplines` = `home.capabilities.items`.
  Deep links such as `/ar/projects/#water` open that discipline.
- **About Us → Our Team** is a "coming soon" placeholder (`about.team`, section `id="team"`). Replace the shimmer cards in
  `src/pages/[lang]/about.astro` with real profiles when they arrive.

Motion lives in `src/scripts/motion.ts` (scroll reveals, counters, progress bar, header shrink, hero parallax) and the
`Motion` block of `src/styles/global.css`. Add `{...rv(index)}` (from `src/lib/reveal.ts`) to any element to make it animate in on scroll.
Everything respects `prefers-reduced-motion` and stays visible if JavaScript is off.

Arabic pages use **IBM Plex Sans Arabic for every character**; English pages use Inter/Montserrat (see `html[lang="ar"]` in `global.css`).

Icons are an inline set in `src/components/icons.ts` — add a key there and it becomes a valid `icon:` name in the content files.

## Contact form

The form works in two modes:

1. **No form service configured (current default):** submitting opens the visitor's email app with the message
   pre-filled to `info@nmproject-oman.com`.
2. **With a form service:** copy `.env.example` to `.env` and set `PUBLIC_FORM_ENDPOINT`
   (and `PUBLIC_FORM_ACCESS_KEY` for Web3Forms). The form then posts in the background and shows a success message.
   Set the same variables in your hosting provider's dashboard for production builds.

The WhatsApp button uses `+968 9728 0155` (`site.whatsapp` in `src/data/site.ts`).

## Deploying (domain is registered at Squarespace)

The Squarespace site builder cannot host this code, but the **domain can stay at Squarespace**:

1. Create a free project on **Cloudflare Pages** (or Netlify) connected to this repository. Build command `npm run build`, output `dist`.
2. In Squarespace → *Domains* → `nmproject-oman.com` → *DNS settings*, point the domain at the host (the host shows the exact records).
3. **Keep the existing MX / email records untouched** so `info@nmproject-oman.com` keeps working.

## Known beta limitations / to-do

- **Photography:** the large images are cropped from the company profile PDF (they look AI-generated) and the small gallery
  photos come from the sister company's website (450×271 px, so they are soft when enlarged). The gallery is labelled
  "photographs illustrate typical works". Replace with real NMP project, team and site photos when available.
- **Logo:** the supplied "SVGs" are 510×207 px PNGs wrapped in SVG, so they are not truly scalable. Replace `public/brand/logo-*.png`
  with a real vector/high-res version when available (the favicon set is cropped from the same file).
- **Arabic copy** is a first draft translation and needs a native review.
- **Portfolio wording:** the source slide says "funded and carried out by NMP"; the site says "carried out by NMP" until confirmed.
- **Not yet added:** team profiles, certifications, named projects/clients (owner chose no invented project data), social links, legal pages.
- Sector rows "Utilities & Infrastructure" and "Water & Utility Networks" overlap in the source data — kept as supplied.
