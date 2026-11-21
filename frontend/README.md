# Azoytrix Frontend

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

The **navbar (header)** and **footer** are fully editable from the Strapi CMS in the `backend` project. If Strapi is unreachable, both fall back to built-in content, so the site never breaks.

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

The CMS lives in the `backend` folder (see its README). Start it so the navbar and footer can load:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## CMS-driven Navbar and Footer

### How it works

1. On page load, a client hook requests the content from Strapi.
2. Until the response arrives (or if it fails), the hardcoded fallback is shown.
3. When Strapi responds, a mapper converts the response into a typed config and the component re-renders with CMS content.
4. Any empty or invalid CMS field falls back to its default value individually.

| | Navbar (header) | Footer |
|---|---|---|
| Component | `components/layout/Navbar.tsx` | `components/layout/Footer.tsx` |
| Hook | `hooks/useNavbar.ts` | `hooks/useFooter.ts` |
| Config, fallback and mapper | `lib/navbar.ts` | `lib/footer.ts` |
| Strapi endpoint | `/api/navbar?populate=logo,navLinks` | `/api/footer?populate=logo,exploreLinks,bottomTags` |
| Strapi content type | Single type `Navbar` | Single type `Footer` |

Shared helpers live in `lib/strapi.ts` (`fetchStrapi` with a 5 second timeout, and `strapiImageUrl` for upload URLs).

Both components are **client components** (`"use client"`) that fetch in the browser. This matches `cacheComponents: true` in `next.config.ts` and avoids server-side caching setup. The result: the fallback content is shown for a moment, then the CMS content replaces it.

### What can be edited in Strapi

**Navbar:** site name, logo and logo alt text, the list of navigation links (label, href, external, open in new tab), and the call-to-action button (label, link, on/off).

**Footer:**

- Brand: site name, logo, tagline, pillars text, and badge text.
- Big contact section: eyebrow, two heading lines, description, button label and link, and side code.
- Explore column: title and list of links.
- Contact card: title, description, email, and contact link.
- Bottom bar: copyright text, the tag words (Innovation / Intelligence / Engineering), and the "Back to top" label.

### Behavior notes

- **Navbar CTA link:** on desktop, any link whose `href` equals the CTA `href` (default `/contact`) is hidden from the link list to avoid duplicates. It still appears in the mobile menu.
- **External links:** a link with `external` enabled opens in a new tab.
- **Logos:** uploaded images are served from Strapi (`/uploads/...`). Use PNG or JPG, because SVG uploads are blocked in the backend config. If no logo is uploaded, `/logo-mark.png` is used.
- **Copyright year:** computed in the browser. It shows `2026` on first render, then updates.
- **Footer placeholders:** untouched "Add an entry" links (`Link` pointing to `/`) are ignored by the footer. Fill them in or delete them in Strapi.

### Changing the fallback content

Edit `FALLBACK_NAVBAR` in `lib/navbar.ts` and `FALLBACK_FOOTER` in `lib/footer.ts`. This is what visitors see when Strapi is down.

### Troubleshooting

| Symptom | Likely cause and fix |
|---|---|
| CMS changes don't show up | Open `http://localhost:1337/api/navbar?populate=logo,navLinks` and `.../api/footer?populate=logo,exploreLinks,bottomTags`. Check the status code: `403` means the Public role lacks `find` permission, `404` means the entry or content type is missing. |
| Still nothing after the API works | Check `.env.local` exists and restart the dev server. Check the browser Network tab for the `navbar` and `footer` requests. |
| A link called "Link" appears | An entry was added in Strapi but never edited. Change its label and href, or delete it. |
| Console error: "two children with the same key" | Two links share the same `href`. Fix the data in Strapi. The footer already uses unique keys. |
| `"use client" directive must be placed before other expressions` | The file has leftover code above `"use client"`. The directive must be the very first line, so remove everything above it. |
| Logo looks squashed | Add `className="object-contain"` to the logo `<Image>`. The footer already has it. |

## Project Structure (CMS-related files)

```
frontend/
├── components/layout/
│   ├── Navbar.tsx        # Header, reads useNavbar()
│   └── Footer.tsx        # Footer, reads useFooter()
├── hooks/
│   ├── useNavbar.ts      # Fetches /api/navbar
│   └── useFooter.ts      # Fetches /api/footer
├── lib/
│   ├── strapi.ts         # fetchStrapi + strapiImageUrl
│   ├── navbar.ts         # NavbarConfig, FALLBACK_NAVBAR, mapStrapiNavbar
│   └── footer.ts         # FooterConfig, FALLBACK_FOOTER, mapStrapiFooter
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