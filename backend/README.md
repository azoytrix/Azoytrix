# 🚀 Azoytrix Backend (Strapi CMS)

This is the [Strapi](https://strapi.io) 5 backend for the Azoytrix website. It stores the content for the frontend **navbar (header)**, **footer** and **homepage**, which editors can change from the admin panel without touching code.

Stack: Strapi 5, TypeScript, MySQL (`mysql2`).

## Getting Started

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### 1. Environment

Copy `.env.example` to `.env` and set real secrets (`APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`) and your database settings.

### 2. Run

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run dev
# or
npm run develop
# or
yarn develop
```

The admin panel is at [http://localhost:1337/admin](http://localhost:1337/admin).

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## Navbar, Footer and Homepage CMS

Three **single types** (one entry each) power the frontend header, footer and homepage.

| Content type | Public endpoint | Frontend consumer |
|---|---|---|
| `Navbar` (`api::navbar.navbar`) | `GET /api/navbar` | `hooks/useNavbar.ts` |
| `Footer` (`api::footer.footer`) | `GET /api/footer` | `hooks/useFooter.ts` |
| `Homepage` (`api::homepage.homepage`) | `GET /api/homepage` | `hooks/useHomepage.ts` |

All endpoints are **read-only** (`find` only). Content is edited in the admin panel under **Content Manager → Single Types**. The controllers always populate the logo, components and repeatable items, so `?populate=` is optional.

### Navbar fields

| Field | Type |
|---|---|
| `siteName` | Text |
| `logo` | Media (single image) |
| `logoAlt` | Text |
| `ctaEnabled` | Boolean |
| `ctaLabel` | Text |
| `ctaHref` | Text |
| `navLinks` | Repeatable component `shared.nav-link` |

### Footer fields

| Group | Fields |
|---|---|
| Brand | `siteName`, `logo`, `logoAlt`, `tagline`, `pillars`, `brandBadge` |
| Big contact section | `ctaEyebrow`, `ctaHeadingLine1`, `ctaHeadingLine2`, `ctaDescription`, `ctaLabel`, `ctaHref`, `sideCode` |
| Explore column | `exploreTitle`, `exploreLinks` (repeatable `shared.nav-link`) |
| Contact card | `contactTitle`, `contactDescription`, `email`, `contactLinkLabel`, `contactLinkHref` |
| Bottom bar | `copyrightText`, `bottomTags` (repeatable `shared.footer-tag`), `backToTopLabel` |

### Homepage fields

The Homepage has **one component field per section**, shown as 11 collapsible groups in the admin panel, in the same order as on the website.

| Field | Component | Website section | Fields (besides the common heading) |
|---|---|---|---|
| `hero` | `home.hero` | Top banner | `badge`, `headingLine1`, `headingLine2`, `headingHighlight`, `description`, `primaryCtaLabel`, `primaryCtaHref`, `secondaryCtaLabel`, `secondaryCtaHref`, `pillars` |
| `brandStatement` | `home.brand-statement` | "Who we are" | `eyebrow`, `headingStart`, `headingHighlight`, `descriptionStart`, `descriptionHighlight`, `descriptionEnd`, `capabilities` (one per line) |
| `services` | `home.services-section` | "What we do" | `items` (icon cards), `cardFooterLabel`, `ctaEyebrow`, `ctaTitle`, `ctaDescription`, `ctaLabel`, `ctaHref` |
| `solutions` | `home.solutions-section` | Solutions | `buttonLabel`, `buttonHref`, `noteTitle`, `noteText`, `items` (icon cards) |
| `why` | `home.why-section` | "Why Azoytrix" | `items` (icon cards), `closingEyebrow`, `closingTitle` |
| `tech` | `home.tech-section` | Technology | `groups` (tech groups), `domainLabel`, `ecosystemLabel`, `closingEyebrow`, `closingTitle` |
| `process` | `home.process-section` | "How we work" | `steps` (icon cards), `phaseLabel`, `closingEyebrow`, `closingTitle` |
| `portfolio` | `home.portfolio-section` | "Selected work" | `projects` (portfolio cards), `badgeLabel`, `footerLabel`, `ctaEyebrow`, `ctaTitle`, `ctaLabel`, `ctaHref` |
| `stats` | `home.stats-section` | Numbers | `items` (stats), `footerLabel`, `footerCode` |
| `principles` | `home.principles-section` | Principles | `items` (text cards), `philosophyLabel`, `philosophyLine1`, `philosophyLine2`, `mindsetLabel` |
| `cta` | `home.cta-section` | Closing banner | `badge`, `title`, `titleHighlight`, `description`, `primaryLabel`, `primaryHref`, `emailLabel`, `email`, `modelCaption`, `signatureLeft`, `signatureRight` |

**Common heading fields** (every section except Hero, Brand Statement and Cta): `eyebrow`, `title`, `titleHighlight` (optional gradient-coloured tail of the title) and `description`.

### Components

| Component | Fields | Used by |
|---|---|---|
| `shared.nav-link` | `label`, `href`, `external`, `newTab` | Navbar `navLinks`, Footer `exploreLinks` |
| `shared.footer-tag` | `label` | Footer `bottomTags` |
| `home.icon-card` | `icon` (dropdown), `title`, `text` | Services, Solutions, Why, Process |
| `home.text-card` | `title`, `text` | Principles |
| `home.tech-group` | `name`, `items` (one tool per line) | Tech |
| `home.portfolio-card` | `tag`, `title`, `text`, `gradient` (dropdown) | Portfolio |
| `home.stat` | `value` (number), `suffix`, `label` | Stats |
| `home.*-section`, `home.hero`, `home.brand-statement` | See the Homepage table above | Homepage |

A component's ID comes from its path: `src/components/shared/nav-link.json` becomes `shared.nav-link`, and `src/components/home/hero.json` becomes `home.hero`.

**Dropdown values**

- `icon` offers 28 icons: Code, Brain, Cloud, Smartphone, Database, Lightbulb, Workflow, LineChart, Layers, Rocket, Search, PenTool, Hammer, RefreshCw, Zap, ShieldCheck, Users, Target, Globe, Shield, Lock, Server, Bot, Sparkles, Settings, Star, Compass, Cpu. The same list exists in `frontend/lib/icons.ts`, and both must stay in sync.
- `gradient` offers 6 colour pairs: `brand_cyan`, `navy_brand`, `cyan_navy`, `brand_navy`, `navy_cyan`, `cyan_brand`. The same keys exist in `frontend/lib/homepage.ts`.

### Automatic setup on startup

`src/index.ts` runs when Strapi starts and does two things:

1. **Permissions:** grants the Public role `find` on the navbar, footer and homepage, so the frontend can read them without a token.
2. **Seeding:** if the navbar, footer or homepage is empty, creates default content (the original links and text). It only seeds when no entry exists, so your edits are never overwritten. The homepage defaults live in `src/seed/homepage.ts` and mirror the original hardcoded website.

### Project structure (CMS-related files)

```
backend/src/
├── index.ts                                  # Permissions + default content
├── seed/
│   └── homepage.ts                           # Default homepage content
├── api/
│   ├── navbar/
│   │   ├── content-types/navbar/schema.json
│   │   ├── controllers/navbar.ts
│   │   ├── routes/navbar.ts
│   │   └── services/navbar.ts
│   ├── footer/
│   │   ├── content-types/footer/schema.json
│   │   ├── controllers/footer.ts
│   │   ├── routes/footer.ts
│   │   └── services/footer.ts
│   └── homepage/
│       ├── content-types/homepage/schema.json
│       ├── controllers/homepage.ts           # Populates every section
│       ├── routes/homepage.ts
│       └── services/homepage.ts
└── components/
    ├── shared/
    │   ├── nav-link.json
    │   └── footer-tag.json
    └── home/
        ├── hero.json, brand-statement.json          # Section components
        ├── services-section.json, solutions-section.json, why-section.json
        ├── tech-section.json, process-section.json, portfolio-section.json
        ├── stats-section.json, principles-section.json, cta-section.json
        └── icon-card.json, text-card.json, tech-group.json,
            portfolio-card.json, stat.json           # Item components
```

### Editing content

1. Open [http://localhost:1337/admin](http://localhost:1337/admin).
2. Go to **Content Manager → Navbar**, **Footer** or **Homepage**.
3. For the Homepage, expand the section you want (Hero, Brand Statement, Services, and so on), edit its fields and click **Save**. All three types have Draft & Publish turned off, so Save is enough.
4. Refresh the frontend. No rebuild is needed.

**Tips**

- **Empty means default.** On the Homepage, clearing a text field brings back the original text, and deleting every card in a list brings back the default cards. To remove one card, delete just that one.
- When you click **Add an entry** on a list, Strapi creates an empty card. Fill in at least the `title` (or `label` for stats), because cards without one are ignored by the website. For navbar and footer links, the default is label `Link` and href `/`, so change both or delete the entry.
- Tech tools and capability pills are typed **one per line** (commas also work).
- Upload logos as PNG or JPG. SVG uploads are blocked in `config/plugins.ts`.
- Every link `href` should point to a page that exists in the frontend.
- Field names appear as written (for example `headingLine1`). You can rename how they display under **Content Manager → Configure the view**.

### Testing the API

```
http://localhost:1337/api/navbar
http://localhost:1337/api/footer
http://localhost:1337/api/homepage
```

| Status | Meaning and fix |
|---|---|
| `200` with data | Working. |
| `403 Forbidden` | The Public role lacks `find`. Restart Strapi so `src/index.ts` grants it, or set it in **Settings → Users & Permissions → Roles → Public**. |
| `404 Not Found` | The content type did not load or has no entry. Check the startup log for schema errors, and check **Content Manager** for an entry. |

### Adding something new

- **A new icon:** add the name to the `icon` enumeration in `src/components/home/icon-card.json`, and import it in `frontend/lib/icons.ts`.
- **A new gradient:** add a key to the `gradient` enumeration in `src/components/home/portfolio-card.json`, and the matching Tailwind classes in `PORTFOLIO_GRADIENTS` in `frontend/lib/homepage.ts`.
- **A new homepage section:** create a component JSON in `src/components/home`, add a component field for it in the Homepage `schema.json`, add it to the `populate` list in `controllers/homepage.ts`, and add its default content to `src/seed/homepage.ts`. Then add the matching types, fallback and mapper in `frontend/lib/homepage.ts`, and render it in `frontend/components/home/HomeSections.tsx`.

### Troubleshooting

| Symptom | Fix |
|---|---|
| `SyntaxError: ... schema.json: Unexpected end of JSON input` | A schema file is empty or half-saved. Restore it from git (`git restore src/api/<name>/content-types/<name>/schema.json`) or rewrite it. List empty ones with `Get-ChildItem -Recurse src -Filter schema.json \| Where-Object { $_.Length -eq 0 }`. |
| Strapi fails after restoring or changing schemas | Delete the `dist` folder and restart. |
| Frontend shows old data | Confirm the API response matches the admin panel, and that the entry was saved. |
| Navbar, Footer or Homepage entry missing | Stop Strapi and restart so the seed in `src/index.ts` runs, or create the entry in the admin panel. |
| Homepage section shows default text after editing | The field was probably left empty, which means "use the default". Fill it in and Save. |
| Homepage card does not appear | Cards without a title (or label, for stats) are ignored. Fill it in. |
| A homepage icon shows as the default code icon | The saved icon name is not in the frontend `lib/icons.ts` list. Pick one from the dropdown, or add the icon in both places. |

### CORS and production

- CORS is open by default (`strapi::cors`), so `http://localhost:3000` works in development.
- In production, restrict `strapi::cors` in `config/middlewares.ts` to your frontend domain, and set the frontend `NEXT_PUBLIC_STRAPI_URL` to this backend's public URL.

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

```
yarn strapi deploy
```

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>