# Azoytrix

Engineering the Next Era.

Azoytrix builds software, AI, cloud and digital innovation solutions.

**Innovation · Intelligence · Engineering**

## Repository Overview

| Folder | What it is |
|--------|------------|
| [`./frontend`](./frontend) | Next.js website. Its **navbar (header)**, **footer** and **homepage** are editable from the CMS. |
| [`./backend`](./backend) | Strapi headless CMS that stores the navbar, footer and homepage content and powers the admin panel. |

### Quick start (run both)

Start the backend first so the frontend can load the navbar, footer and homepage content:

```bash
# Terminal 1: CMS
cd backend
npm install
cp .env.example .env   # then set secrets and database values
npm run dev            # http://localhost:1337/admin

# Terminal 2: website
cd frontend
npm install
cp .env.example .env.local
npm run dev            # http://localhost:3000
```

If the backend is not running, the website still works. The navbar, footer and homepage simply show their built-in fallback content.

## Frontend

This repository includes the Azoytrix frontend, a Next.js application located in [`./frontend`](./frontend).

### Tech Stack

- **Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS 4
- **3D Graphics:** Three.js, `@react-three/fiber`, `@react-three/drei`
- **Animations:** Framer Motion
- **Forms:** React Hook Form, Zod
- **Icons:** Lucide React
- **Fonts:** Inter & Montserrat (via `next/font/google`)
- **CMS integration:** Strapi REST API (navbar, footer and homepage)
- **Language:** TypeScript

### Getting Started

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Environment Variables (`frontend/.env.local`)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_STRAPI_URL` | Public URL of the Strapi backend (default `http://localhost:1337`) |
| `NEXT_PUBLIC_STRAPI_API_TOKEN` | Optional. Only needed if the Strapi endpoints are protected by an API token |

`NEXT_PUBLIC_*` values are read at startup, so restart `npm run dev` after changing them.

### Project Structure

```text
frontend/
├── app/                # Next.js App Router pages
│   ├── page.tsx        # Home page (renders HomeSections)
│   ├── layout.tsx      # Root layout (Navbar, Footer, metadata)
│   ├── globals.css     # Tailwind imports & design tokens
│   ├── about/          # About page (story, mission, principles)
│   ├── services/       # Services detail page
│   ├── solutions/      # Solutions detail page
│   ├── our-work/       # Portfolio / Our Work page
│   └── contact/        # Contact page with form
├── components/
│   ├── home/           # Homepage sections (Hero, Services, etc.), driven by Strapi
│   │   └── HomeSections.tsx  # Loads the homepage once and sets section order
│   ├── layout/         # Navbar and Footer (both driven by Strapi)
│   ├── ui/             # Shared UI (SectionHeading, Reveal, Counter, DynamicIcon, GradientTitle)
│   ├── three/          # HeroScene, HeroVisual (3D graphics)
│   ├── contact/        # ContactForm (React Hook Form + Zod)
│   └── about/          # CuteRobotModel, RobotCTA (3D dodge robot)
├── hooks/
│   ├── useNavbar.ts    # Loads the navbar from Strapi
│   ├── useFooter.ts    # Loads the footer from Strapi
│   └── useHomepage.ts  # Loads the homepage from Strapi
├── lib/
│   ├── strapi.ts       # Strapi fetch helper and image URL helper
│   ├── navbar.ts       # Navbar types, fallback content, Strapi mapper
│   ├── footer.ts       # Footer types, fallback content, Strapi mapper
│   ├── homepage.ts     # Homepage types, fallback content, Strapi mapper
│   ├── icons.ts        # Icon names that can be chosen in Strapi
│   ├── site.ts         # Static site constants
│   ├── data.ts         # Content for the other pages (services, solutions, portfolio, etc.)
│   └── bot/engine.ts   # Rule-based chat bot engine
├── public/
│   └── models/         # 3D GLB models (robot.glb, bumble.glb)
├── .env.example        # Strapi URL / token variables
├── next.config.ts
├── tailwind.config.*
└── package.json
```

### Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, brand statement, services overview, solutions, process, tech stack, portfolio, stats, principles, CTA (all editable in Strapi) |
| `/about` | About | Company story, mission & beliefs, Azoytrix difference, closing CTA with dodging 3D robot |
| `/services` | Services | Six specialised capability cards with explore links |
| `/solutions` | Solutions | Business automation, analytics, cloud, product platform cards |
| `/our-work` | Our Work | Portfolio case studies with project visuals |
| `/contact` | Contact | Contact form (React Hook Form + Zod validation) + contact info |

### 3D Models

The About page CTA includes a 3D robot that dodges your mouse cursor. Place a GLB model at `frontend/public/models/robot.glb` (already present in the repo) — the component loads it automatically on mount.

### Available Scripts (run from `./frontend`)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## CMS-driven Navbar, Footer and Homepage

The header, footer and homepage content is managed in Strapi, so it can be changed without editing code or redeploying the frontend.

### How it works

1. The frontend shows built-in fallback content immediately.
2. In the browser, `useNavbar` / `useFooter` / `useHomepage` request the content from Strapi.
3. When Strapi responds, a mapper (`lib/navbar.ts`, `lib/footer.ts`, `lib/homepage.ts`) converts it and the components update.
4. If Strapi is unreachable, or a field is empty, the fallback value is used, so the site never breaks.

| | Navbar (header) | Footer | Homepage |
|---|---|---|---|
| Frontend component | `components/layout/Navbar.tsx` | `components/layout/Footer.tsx` | `components/home/HomeSections.tsx` + 11 sections |
| Frontend hook | `hooks/useNavbar.ts` | `hooks/useFooter.ts` | `hooks/useHomepage.ts` |
| Strapi content type | Single type `Navbar` | Single type `Footer` | Single type `Homepage` |
| Public endpoint | `GET /api/navbar` | `GET /api/footer` | `GET /api/homepage` |

These components are client components (`"use client"`), which matches `cacheComponents: true` in `next.config.ts`. Visitors may briefly see the fallback content before the CMS content loads.

### What editors can change

- **Navbar:** site name, logo and alt text, navigation links (label, URL, external, new tab), and the call-to-action button.
- **Footer:** brand text and logo, the large "Let's create what's next" section, the Explore links, the "Get in touch" card and email, the copyright text, the bottom tag words, and the "Back to top" label.
- **Homepage:** every section, one group at a time, in page order.

| # | Strapi group | Website section |
|---|--------------|-----------------|
| 1 | Hero | Top banner with title, buttons and pillars |
| 2 | Brand Statement | "Who we are" statement and capability pills |
| 3 | Services | "What we do" cards and call-to-action |
| 4 | Solutions | Solutions intro, button and cards |
| 5 | Why | "Why Azoytrix" cards and closing line |
| 6 | Tech | Technology domains and their tools |
| 7 | Process | "How we work" steps |
| 8 | Portfolio | "Selected work" project cards |
| 9 | Stats | Numbers section |
| 10 | Principles | Principle pillars and philosophy banner |
| 11 | Cta | Closing banner with buttons and email |

### Editing content

1. Start the backend and open [http://localhost:1337/admin](http://localhost:1337/admin).
2. Go to **Content Manager → Navbar**, **Footer** or **Homepage** (under Single Types).
3. On the Homepage, expand the section you want, edit its fields and click **Save**. No publish step is needed.
4. Refresh the website to see the change. No frontend rebuild is required.

**Good to know**

- **Empty means default.** Clearing a text field on the Homepage brings back the original text, and deleting every card in a list brings back the default cards.
- When adding a card with **Add an entry**, fill in at least its title, because cards without one are ignored. For navbar and footer links, change the default `Link` / `/` values before saving, or delete the entry. Otherwise a stray "Link" item appears.
- Tech tools and capability pills are typed one per line.
- Icons and portfolio gradients are chosen from dropdowns.

**Not managed by the CMS:** the 3D hero scene and chat bot, the 3D building in the closing banner, and the other pages (`/about`, `/services`, `/solutions`, `/our-work`, `/contact`). Editing the homepage cards does not change those pages.

See [`frontend/README.md`](./frontend/README.md) and [`backend/README.md`](./backend/README.md) for field lists, file layout and troubleshooting.

## Backend

This repository includes the Azoytrix backend, a [Strapi](https://strapi.io) headless CMS located in [`./backend`](./backend). Strapi provides the content API, admin panel, and authentication that power the frontend.

### Tech Stack

- **Framework:** Strapi 5 (TypeScript)
- **Database:** MySQL in this project (`DATABASE_CLIENT=mysql`, driver `mysql2`). Strapi's config also supports PostgreSQL and SQLite.
- **Authentication:** Users & Permissions plugin (JWT, refresh-token management)
- **Media Upload:** Strapi Upload plugin with allowed/denied media types (SVG uploads are blocked, so use PNG or JPG for logos)
- **Language:** TypeScript
- **Node:** `>=22.0.0 <=26.x.x`

### Getting Started

```bash
cd backend
npm install
cp .env.example .env   # adjust values as needed
npm run dev
```

The admin panel and API run at [http://localhost:1337](http://localhost:1337). Admin panel: [http://localhost:1337/admin](http://localhost:1337/admin).

On startup, `src/index.ts` automatically:

- gives the **Public** role read (`find`) access to the navbar, footer and homepage, and
- creates default navbar, footer and homepage content if none exists yet (existing content is never overwritten).

### Project Structure

```text
backend/
├── src/
│   ├── api/
│   │   ├── navbar/        # Navbar single type (schema, controller, service, routes)
│   │   ├── footer/        # Footer single type (schema, controller, service, routes)
│   │   └── homepage/      # Homepage single type (schema, controller, service, routes)
│   ├── components/
│   │   ├── shared/        # nav-link.json, footer-tag.json (reusable components)
│   │   └── home/          # Homepage section and card components (16 files)
│   ├── seed/
│   │   └── homepage.ts    # Default homepage content
│   ├── admin/             # Admin panel customizations
│   ├── extensions/        # Strapi plugin extensions
│   └── index.ts           # Public permissions + default content seeding
├── config/                # Strapi configuration
│   ├── database.ts        # Database client (mysql/postgres/sqlite)
│   ├── server.ts          # Host, port, app keys
│   ├── plugins.ts         # Upload & users-permissions plugin config
│   ├── api.ts
│   └── middlewares.ts     # Includes CORS
├── database/              # Migrations (gitignored)
├── public/                # Static assets
├── dist/                  # Build output (gitignored)
├── .env.example           # Example environment variables
├── .env                   # Local environment (gitignored)
├── package.json
├── tsconfig.json
└── README.md              # Backend CMS guide
```

### API Endpoints

| Endpoint | Access | Description |
|----------|--------|-------------|
| `GET /api/navbar` | Public, read-only | Navbar content (logo and links included) |
| `GET /api/footer` | Public, read-only | Footer content (logo, links and tags included) |
| `GET /api/homepage` | Public, read-only | All 11 homepage sections with their cards and lists |

A `403` response means the Public role is missing the `find` permission. Restart Strapi so `src/index.ts` grants it. A `404` means the content type did not load or has no entry.

### Available Scripts (run from `./backend`)

| Script | Description |
|--------|-------------|
| `npm run dev` / `npm run develop` | Start Strapi with auto-reload |
| `npm run start` | Start Strapi production server |
| `npm run build` | Build the admin panel |
| `npm run strapi` | Run the Strapi CLI |

### Environment Variables

Copy `.env.example` to `.env` and set:

| Variable | Description |
|----------|-------------|
| `HOST` | Server host (`0.0.0.0`) |
| `PORT` | Server port (`1337`) |
| `APP_KEYS` | Secret keys for the app |
| `API_TOKEN_SALT` | Salt for API tokens |
| `ADMIN_JWT_SECRET` | Secret for admin JWT |
| `JWT_SECRET` | Secret for API JWT |
| `TRANSFER_TOKEN_SALT` | Salt for transfer tokens |
| `ENCRYPTION_KEY` | Encryption key |
| `DATABASE_CLIENT` | `mysql`, `postgres` or `sqlite` |
| `DATABASE_HOST` / `DATABASE_PORT` | Database server (MySQL: `localhost` / `3306`) |
| `DATABASE_NAME` | Database name |
| `DATABASE_USERNAME` / `DATABASE_PASSWORD` | Database credentials |
| `DATABASE_SSL` | `true` or `false` |

### Database

This project is configured for MySQL: set `DATABASE_CLIENT=mysql` and the `DATABASE_*` variables above, and create the database before the first run. If `DATABASE_CLIENT` is not set, Strapi's config falls back to SQLite (`database/.tmp/data.db`); using it requires the SQLite driver to be installed. To use PostgreSQL, set `DATABASE_CLIENT=postgres` and the matching variables (see `config/database.ts`).

The following are intentionally **not committed**: `node_modules/`, `dist/`, `.strapi/`, `database/`, `types/`, `.env`, and `.strapi-updater.json` (see `backend/.gitignore`).

### Production notes

- Set `NEXT_PUBLIC_STRAPI_URL` in the frontend hosting environment to the deployed Strapi URL.
- Restrict `strapi::cors` in `backend/config/middlewares.ts` to your frontend domain.
- Use strong, unique values for all secrets in the backend `.env`.

## Hero Chat Bot

The hero section includes an AI-powered chat bot (`frontend/components/three/HeroScene.tsx`) backed by a rule-based response engine (`frontend/lib/bot/engine.ts`). The bot is not managed by the CMS.

### Features

- **Idle greetings**: Cycles through default welcome messages until the visitor asks a question, then stops for good.
- **Typed responses**: Answers type out character-by-character with a pulsing orb that reacts to speech activity.
- **Context-aware**: Covers services, solutions, process, technology, portfolio, pricing, timelines, and contact info.
- **Suggestion chips**: Follow-up prompts and quick links appear after each answer.

### Recent changes

- **CMS-managed homepage**: All 11 homepage sections (Hero through the closing banner) are now loaded from a single Strapi `Homepage` type, with built-in fallbacks that match the original design.
- **CMS-managed navbar and footer**: Both are loaded from Strapi (single types `Navbar` and `Footer`) with built-in fallbacks, replacing the hardcoded content.
- **Response glitches**: Removed a duplicate idle-greeting loop that was fighting the active response loop, fixing flashing, early disappearance, and mixed default/chat responses.
- **Mobile responsiveness**: Compact orb height on mobile (`h-[300px]`), minimum orb height floor, proper chat panel padding, and a max-height chat card with scroll on small screens.
- **Background particles**: Subtle cyan snow-like particles floating across the full hero background (`HeroParticles.tsx`), respecting `prefers-reduced-motion`.
- ** frontend dependencies**: Updated `lucide-react` from `^1.73.0` to `^1.83.0` in `package.json` and `package-lock.json`.
- **Frontend component updates**:
  - `frontend/components/home/HomeSections.tsx`: Added `ShowcaseGallery` component import and rendering.
## Recent changes

- **CMS-managed homepage**: All 11 homepage sections (Hero through the closing banner) are now loaded from a single Strapi `Homepage` type, with built-in fallbacks that match the original design.
- **CMS-managed navbar and footer**: Both are loaded from Strapi (single types `Navbar` and `Footer`) with built-in fallbacks, replacing the hardcoded content.
- **Response glitches**: Removed a duplicate idle-greeting loop that was fighting the active response loop, fixing flashing, early disappearance, and mixed default/chat responses.
- **Mobile responsiveness**: Compact orb height on mobile (`h-[300px]`), minimum orb height floor, proper chat panel padding, and a max-height chat card with scroll on small screens.
- **Background particles**: Subtle cyan snow-like particles floating across the full hero background (`HeroParticles.tsx`), respecting `prefers-reduced-motion`.
- ** frontend dependencies**: Updated `lucide-react` from `^1.73.0` to `^1.83.0` in `package.json` and `package-lock.json`.
- **Frontend component updates**:
  - `frontend/components/home/HomeSections.tsx`: Added `ShowcaseGallery` component import and rendering.
  - `frontend/components/home/MatrixRain.tsx`: Optimized GLYPH_LIST to use unique characters only via `new Set()`.
  - `frontend/app/globals.css`: Added trailing newline at end of file.
- **New untracked files/directories**: `frontend/app/demos/`, `frontend/components/showcase/`, `frontend/lib/showcase.ts`, `frontend/public/models/geometry_texture_effect_spheres.glb`.
  - `frontend/components/home/MatrixRain.tsx`: Optimized GLYPH_LIST to use unique characters only via `new Set()`.
  - `frontend/app/globals.css`: Added trailing newline at end of file.
- **New untracked files/directories**: `frontend/app/demos/`, `frontend/components/showcase/`, `frontend/lib/showcase.ts`, `frontend/public/models/geometry_texture_effect_spheres.glb`.

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Navbar, footer or homepage shows old or default content | Open `http://localhost:1337/api/navbar`, `/api/footer` and `/api/homepage` and check the status. `403` means permission, `404` means missing entry. Also confirm `frontend/.env.local` exists and restart the frontend. |
| A homepage section keeps showing the default text | The Strapi field is empty, which means "use the default". Fill it in and Save. |
| A homepage card does not appear | Cards without a title are ignored. Fill it in. |
| A link named "Link" appears in the navbar | A link was added in Strapi without editing it. Change its label and URL, or delete it. |
| Strapi fails with `Unexpected end of JSON input` | A `schema.json` file is empty. Restore it from git and restart (see `backend/README.md`). |
| `"use client" directive must be placed before other expressions` | Leftover code sits above `"use client"` in the file. The directive must be the first line. |

## Contact

azoytrix@gmail.com