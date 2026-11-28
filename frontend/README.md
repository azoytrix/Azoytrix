# Azoytrix Frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The **navbar (header)**, **footer** and **homepage** are fully editable from the Strapi CMS in the `backend` project. If Strapi is unreachable, all of them fall back to built-in content, so the site never breaks.

## Getting Started

### 1. Environment variables

Copy `.env.example` to `.env.local` and adjust:

```bash
# Public URL of the Strapi backend
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Optional: only if the Strapi endpoints are protected by an API token.
# Leave empty for public read access.
# NEXT_PUBLIC_STRAPI_API_TOKEN=
```

> `NEXT_PUBLIC_*` variables are read when the dev server starts. **Restart `npm run dev` after changing `.env.local`.**

### 2. Start the backend first

The CMS lives in the `backend` folder (see its README). Start it so the navbar, footer and homepage can load:

```bash
cd ../backend
npm run dev
```

### 3. Run the frontend

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

`app/page.tsx` renders the homepage through `components/home/HomeSections.tsx`, so edit the sections in `components/home/` rather than the page file. The page auto-updates as you edit.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## CMS-driven Navbar, Footer and Homepage

### How it works

1. On page load, a client hook requests the content from Strapi.
2. Until the response arrives (or if it fails), the hardcoded fallback is shown.
3. When Strapi responds, a mapper converts the response into a typed config and the components re-render with CMS content.
4. Any empty or invalid CMS field falls back to its default value individually.

| | Navbar (header) | Footer | Homepage |
|---|---|---|---|
| Component | `components/layout/Navbar.tsx` | `components/layout/Footer.tsx` | `components/home/HomeSections.tsx` and the 11 section components |
| Hook | `hooks/useNavbar.ts` | `hooks/useFooter.ts` | `hooks/useHomepage.ts` |
| Config, fallback and mapper | `lib/navbar.ts` | `lib/footer.ts` | `lib/homepage.ts` |
| Strapi endpoint | `/api/navbar?populate=logo,navLinks` | `/api/footer?populate=logo,exploreLinks,bottomTags` | `/api/homepage` (backend populates every section) |
| Strapi content type | Single type `Navbar` | Single type `Footer` | Single type `Homepage` |

Shared helpers live in `lib/strapi.ts` (`fetchStrapi` with a 5 second timeout, and `strapiImageUrl` for upload URLs).

All three are rendered by **client components** (`"use client"`) that fetch in the browser. This matches `cacheComponents: true` in `next.config.ts` and avoids server-side caching setup. The result: the fallback content is shown for a moment, then the CMS content replaces it. Search engines see the fallback content.

### What can be edited in Strapi

**Navbar:** site name, logo and logo alt text, the list of navigation links (label, href, external, open in new tab), and the call-to-action button (label, link, on/off).

**Footer:**

- Brand: site name, logo, tagline, pillars text, and badge text.
- Big contact section: eyebrow, two heading lines, description, button label and link, and side code.
- Explore column: title and list of links.
- Contact card: title, description, email, and contact link.
- Bottom bar: copyright text, the tag words (Innovation / Intelligence / Engineering), and the "Back to top" label.

**Homepage:** all 11 sections, in page order.

| # | Section component | Strapi group | What editors can change |
|---|---|---|---|
| 1 | `Hero.tsx` | Hero | Badge, 3-part heading, description, two buttons, pillars line |
| 2 | `BrandStatement.tsx` | Brand Statement | Eyebrow, heading, description pieces, capability pills |
| 3 | `ServicesOverview.tsx` | Services | Heading, cards (icon, title, text), card label, bottom call-to-action |
| 4 | `Solutions.tsx` | Solutions | Heading, button, side note, cards |
| 5 | `WhyAzoytrix.tsx` | Why | Heading, cards, closing statement |
| 6 | `TechStack.tsx` | Tech | Heading, technology domains and their tools, labels, closing statement |
| 7 | `Process.tsx` | Process | Heading, steps, phase label, closing statement |
| 8 | `PortfolioHighlights.tsx` | Portfolio | Heading, project cards (with gradient), labels, call-to-action |
| 9 | `Stats.tsx` | Stats | Heading, numbers with suffixes and labels, footer line |
| 10 | `Principles.tsx` | Principles | Heading, principle cards, philosophy banner |
| 11 | `CtaStrip.tsx` | Cta | Heading, description, both buttons, email, captions |

### How the homepage is wired

- `HomeSections.tsx` calls `useHomepage()` once and passes each section its own slice of the config (`<Hero content={config.hero} />`, and so on). **The section order is defined there.**
- Every section component accepts an optional `content` prop and defaults to its part of `FALLBACK_HOMEPAGE`, so each one can also be used on its own.
- Icons are stored in Strapi by name and rendered with `components/ui/DynamicIcon.tsx`, which looks the name up in `lib/icons.ts`. Unknown names show the default code icon.
- Headings with a coloured tail use `components/ui/GradientTitle.tsx`.
- Portfolio card gradients come from the fixed `PORTFOLIO_GRADIENTS` list in `lib/homepage.ts`, because Tailwind needs full class names in the source.

### Behavior notes

- **Empty means default (homepage).** An empty text field in Strapi shows the original text. If every card in a list is deleted, the default cards come back. Cards without a title (or label, for stats) are ignored.
- **Lists of words** (capabilities and tools in a tech group) are typed one per line in Strapi. Commas also work.
- **Navbar CTA link:** on desktop, any link whose `href` equals the CTA `href` (default `/contact`) is hidden from the link list to avoid duplicates. It still appears in the mobile menu.
- **External links:** a link with `external` enabled opens in a new tab.
- **Logos:** uploaded images are served from Strapi (`/uploads/...`). Use PNG or JPG, because SVG uploads are blocked in the backend config. If no logo is uploaded, `/logo-mark.png` is used.
- **Copyright year:** computed in the browser. It shows `2026` on first render, then updates.
- **Footer placeholders:** untouched "Add an entry" links (`Link` pointing to `/`) are ignored by the footer. Fill them in or delete them in Strapi.
- **Not managed by the CMS:** the 3D hero scene and chat bot (`components/three/HeroScene.tsx`), the 3D building in the closing banner, and the other pages (`/about`, `/services`, `/solutions`, `/our-work`, `/contact`), which still read from `lib/data.ts`. Editing the homepage cards does not change those pages.

### Changing the fallback content

Edit `FALLBACK_NAVBAR` in `lib/navbar.ts`, `FALLBACK_FOOTER` in `lib/footer.ts` and `FALLBACK_HOMEPAGE` in `lib/homepage.ts`. This is what visitors see when Strapi is down. The Strapi defaults for the homepage live in `backend/src/seed/homepage.ts`, so update both if you want them to match.

### Extending the homepage

- **A new icon:** import it in `lib/icons.ts`, add it to the `ICONS` map, and add its name to the `icon` list in `backend/src/components/home/icon-card.json`.
- **A new gradient:** add the key and its Tailwind classes to `PORTFOLIO_GRADIENTS` in `lib/homepage.ts`, and the key to `backend/src/components/home/portfolio-card.json`.
- **A new section:** add its types, fallback and mapping in `lib/homepage.ts`, create the section component with a `content` prop, and render it in `HomeSections.tsx`. Then add the matching component and field on the backend (see the backend README).

### Troubleshooting

| Symptom | Likely cause and fix |
|---|---|
| CMS changes don't show up | Open `http://localhost:1337/api/navbar`, `/api/footer` and `/api/homepage`. Check the status code: `403` means the Public role lacks `find` permission, `404` means the entry or content type is missing. |
| Still nothing after the API works | Check `.env.local` exists and restart the dev server. Check the browser Network tab for the `navbar`, `footer` and `homepage` requests. The hooks also print a `[useHomepage]` or similar warning in the console when a request fails. |
| A homepage section keeps showing the old text | The Strapi field is empty (which means "use the default"), or the entry was not saved. Fill it in and Save. |
| A homepage card does not show | The card has no title. Fill it in. |
| A homepage icon looks wrong | The icon name is not in `lib/icons.ts`. Pick one from the Strapi dropdown or add the icon. |
| A link called "Link" appears in the navbar | An entry was added in Strapi but never edited. Change its label and href, or delete it. |
| Console error: "two children with the same key" | Two navbar links share the same `href`. Fix the data in Strapi. The footer and homepage already use unique keys. |
| `"use client" directive must be placed before other expressions` | The file has leftover code above `"use client"`. The directive must be the very first line, so remove everything above it. |
| Logo looks squashed | Add `className="object-contain"` to the logo `<Image>`. The footer already has it. |

## Recent Changes (frontend)

- **Dependencies**: Updated `lucide-react` from `^1.73.0` to `^1.83.0`.
- **HomeSections.tsx**: Added `ShowcaseGallery` component import and rendering.
- **MatrixRain.tsx**: Optimized GLYPH_LIST to use unique characters only via `new Set()`.
- **globals.css**: Added trailing newline at end of file.
- **New untracked files/directories**: `frontend/app/demos/`, `frontend/components/showcase/`, `frontend/lib/showcase.ts`, `frontend/public/models/geometry_texture_effect_spheres.glb`.
## Project Structure (CMS-related files)

```
frontend/
├── app/
│   └── page.tsx            # Renders <HomeSections />
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx      # Header, reads useNavbar()
│   │   └── Footer.tsx      # Footer, reads useFooter()
│   ├── home/
│   │   ├── HomeSections.tsx        # Loads the homepage once, sets section order
│   │   ├── Hero.tsx, BrandStatement.tsx, ServicesOverview.tsx, Solutions.tsx
│   │   ├── WhyAzoytrix.tsx, TechStack.tsx, Process.tsx, PortfolioHighlights.tsx
│   │   └── Stats.tsx, Principles.tsx, CtaStrip.tsx
│   └── ui/
│       ├── DynamicIcon.tsx # Renders an icon from its name
│       └── GradientTitle.tsx
├── hooks/
│   ├── useNavbar.ts        # Fetches /api/navbar
│   ├── useFooter.ts        # Fetches /api/footer
│   └── useHomepage.ts      # Fetches /api/homepage
├── lib/
│   ├── strapi.ts           # fetchStrapi + strapiImageUrl
│   ├── navbar.ts           # NavbarConfig, FALLBACK_NAVBAR, mapStrapiNavbar
│   ├── footer.ts           # FooterConfig, FALLBACK_FOOTER, mapStrapiFooter
│   ├── homepage.ts         # HomepageConfig, FALLBACK_HOMEPAGE, mapStrapiHomepage
│   └── icons.ts            # Icon names available in Strapi
└── .env.example
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Before deploying, set `NEXT_PUBLIC_STRAPI_URL` in your hosting environment to your deployed Strapi URL, and allow your frontend domain in the backend's CORS settings.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.