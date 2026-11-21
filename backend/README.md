# 🚀 Azoytrix Backend (Strapi CMS)

This is the [Strapi](https://strapi.io) 5 backend for the Azoytrix website. It stores the content for the frontend **navbar (header)** and **footer**, which editors can change from the admin panel without touching code.

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

## Navbar and Footer CMS

Two **single types** (one entry each) power the frontend header and footer.

| Content type | Public endpoint | Frontend consumer |
|---|---|---|
| `Navbar` (`api::navbar.navbar`) | `GET /api/navbar` | `hooks/useNavbar.ts` |
| `Footer` (`api::footer.footer`) | `GET /api/footer` | `hooks/useFooter.ts` |

Both endpoints are **read-only** (`find` only). Content is edited in the admin panel under **Content Manager → Single Types**. The controllers always populate the logo and repeatable components, so `?populate=` is optional.

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

### Components

| Component | Fields | Used by |
|---|---|---|
| `shared.nav-link` | `label`, `href`, `external`, `newTab` | Navbar `navLinks`, Footer `exploreLinks` |
| `shared.footer-tag` | `label` | Footer `bottomTags` |

A component's ID comes from its path: `src/components/shared/nav-link.json` becomes `shared.nav-link`.

### Automatic setup on startup

`src/index.ts` runs when Strapi starts and does two things:

1. **Permissions:** grants the Public role `find` on the navbar and footer, so the frontend can read them without a token.
2. **Seeding:** if the navbar or footer is empty, creates default content (the original links and text). It only seeds when no entry exists, so your edits are never overwritten.

### Project structure (CMS-related files)

```
backend/src/
├── index.ts                                  # Permissions + default content
├── api/
│   ├── navbar/
│   │   ├── content-types/navbar/schema.json
│   │   ├── controllers/navbar.ts
│   │   ├── routes/navbar.ts
│   │   └── services/navbar.ts
│   └── footer/
│       ├── content-types/footer/schema.json
│       ├── controllers/footer.ts
│       ├── routes/footer.ts
│       └── services/footer.ts
└── components/shared/
    ├── nav-link.json
    └── footer-tag.json
```

### Editing content

1. Open [http://localhost:1337/admin](http://localhost:1337/admin).
2. Go to **Content Manager → Navbar** or **Footer**.
3. Edit the fields and click **Save**. Both types have Draft & Publish turned off, so Save is enough.
4. Refresh the frontend. No rebuild is needed.

**Tips**

- When you click **Add an entry** on a link list, Strapi creates a link with the default label `Link` and href `/`. Always change both before saving, or delete the entry.
- Upload logos as PNG or JPG. SVG uploads are blocked in `config/plugins.ts`.
- Every link `href` should point to a page that exists in the frontend.

### Testing the API

```
http://localhost:1337/api/navbar
http://localhost:1337/api/footer
```

| Status | Meaning and fix |
|---|---|
| `200` with data | Working. |
| `403 Forbidden` | The Public role lacks `find`. Restart Strapi so `src/index.ts` grants it, or set it in **Settings → Users & Permissions → Roles → Public**. |
| `404 Not Found` | The content type did not load or has no entry. Check the startup log for schema errors, and check **Content Manager** for an entry. |

### Troubleshooting

| Symptom | Fix |
|---|---|
| `SyntaxError: ... schema.json: Unexpected end of JSON input` | A schema file is empty or half-saved. Restore it from git (`git restore src/api/<name>/content-types/<name>/schema.json`) or rewrite it. List empty ones with `Get-ChildItem -Recurse src -Filter schema.json \| Where-Object { $_.Length -eq 0 }`. |
| Strapi fails after restoring or changing schemas | Delete the `dist` folder and restart. |
| Frontend shows old data | Confirm the API response matches the admin panel, and that the entry was saved. |
| Navbar/Footer entry missing | Stop Strapi and restart so the seed in `src/index.ts` runs, or create the entry in the admin panel. |

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