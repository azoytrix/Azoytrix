# Azoytrix

Engineering the Next Era.

Azoytrix builds software, AI, cloud and digital innovation solutions.

**Innovation · Intelligence · Engineering**

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
- **Language:** TypeScript

### Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Project Structure

```text
frontend/
├── app/                # Next.js App Router pages
│   ├── page.tsx        # Home page (Hero section)
│   ├── layout.tsx      # Root layout (Navbar, Footer, metadata)
│   ├── globals.css     # Tailwind imports & design tokens
│   ├── about/          # About page (story, mission, principles)
│   ├── services/       # Services detail page
│   ├── solutions/      # Solutions detail page
│   ├── our-work/       # Portfolio / Our Work page
│   └── contact/        # Contact page with form
├── components/
│   ├── home/           # Homepage sections (Hero, Services, etc.)
│   ├── layout/         # Navbar, Footer, CopyrightYear
│   ├── ui/             # Shared UI (SectionHeading, Reveal, Counter)
│   ├── three/          # HeroScene, HeroVisual (3D graphics)
│   ├── contact/        # ContactForm (React Hook Form + Zod)
│   └── about/          # CuteRobotModel, RobotCTA (3D dodge robot)
├── lib/
│   ├── site.ts         # Site config (name, tagline, nav links)
│   └── data.ts         # Site content (services, solutions, portfolio, etc.)
├── public/
│   └── models/         # 3D GLB models (robot.glb, bumble.glb)
├── next.config.ts
├── tailwind.config.*
└── package.json
```

### Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Hero, brand statement, services overview, solutions, process, tech stack, portfolio, stats, principles, CTA |
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

## Backend

This repository includes the Azoytrix backend, a [Strapi](https://strapi.io) headless CMS located in [`./backend`](./backend). Strapi provides the content API, admin panel, and authentication that power the frontend.

### Tech Stack

- **Framework:** Strapi 5 (TypeScript)
- **Database:** SQLite by default, configurable to MySQL or PostgreSQL
- **Authentication:** Users & Permissions plugin (JWT, refresh-token management)
- **Media Upload:** Strapi Upload plugin with allowed/denied media types
- **Language:** TypeScript
- **Node:** `>=22.0.0 <=26.x.x`

### Getting Started

```bash
cd backend
npm install
cp .env.example .env   # adjust values as needed
npm run dev
```

The admin panel and API run at [http://localhost:1337](http://localhost:1337).

### Project Structure

```text
backend/
├── src/
│   ├── api/           # API route & content-type definitions (none defined yet)
│   ├── admin/         # Admin panel customizations
│   ├── extensions/    # Strapi plugin extensions
│   └── index.ts       # Entry point
├── config/            # Strapi configuration
│   ├── database.ts    # Database client (mysql/postgres/sqlite)
│   ├── server.ts      # Host, port, app keys
│   ├── plugins.ts     # Upload & users-permissions plugin config
│   ├── api.ts
│   └── middlewares.ts
├── database/          # Migrations (gitignored)
├── public/            # Static assets
├── dist/              # Build output (gitignored)
├── .env.example       # Example environment variables
├── .env               # Local environment (gitignored)
├── package.json
├── tsconfig.json
└── README.md          # Strapi getting-started guide
```

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

### Database

Strapi defaults to SQLite (`database/.tmp/data.db`). To use MySQL or PostgreSQL, set `DATABASE_CLIENT` and the corresponding `DATABASE_*` variables (see `config/database.ts`).

The following are intentionally **not committed**: `node_modules/`, `dist/`, `.strapi/`, `database/`, `types/`, `.env`, and `.strapi-updater.json` (see `backend/.gitignore`).

## Hero Chat Bot

The hero section includes an AI-powered chat bot (`frontend/components/three/HeroScene.tsx`) backed by a rule-based response engine (`frontend/lib/bot/engine.ts`).

### Features

- **Idle greetings**: Cycles through default welcome messages until the visitor asks a question, then stops for good.
- **Typed responses**: Answers type out character-by-character with a pulsing orb that reacts to speech activity.
- **Context-aware**: Covers services, solutions, process, technology, portfolio, pricing, timelines, and contact info.
- **Suggestion chips**: Follow-up prompts and quick links appear after each answer.

### Recent fixes

- **Response glitches**: Removed a duplicate idle-greeting loop that was fighting the active response loop, fixing flashing, early disappearance, and mixed default/chat responses.
- **Mobile responsiveness**: Compact orb height on mobile (`h-[300px]`), minimum orb height floor, proper chat panel padding, and a max-height chat card with scroll on small screens.
- **Background particles**: Subtle cyan snow-like particles floating across the full hero background (`HeroParticles.tsx`), respecting `prefers-reduced-motion`.

## Contact

azoytrix@gmail.com
