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

```
frontend/
├── app/                # Next.js App Router pages
│   ├── page.tsx        # Home page (Hero section)
│   ├── layout.tsx      # Root layout (Navbar, Footer, metadata)
│   └── globals.css     # Tailwind imports & design tokens
├── components/
│   ├── home/Hero.tsx   # Hero section with Three.js scene
│   ├── layout/         # Navbar, Footer, CopyrightYear
│   └── three/          # HeroScene, HeroVisual (3D graphics)
├── lib/
│   └── site.ts         # Site config (name, tagline, nav links)
├── public/             # Static assets
├── next.config.ts
├── tailwind.config.*
└── package.json
```

### Available Scripts (run from `./frontend`)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

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
