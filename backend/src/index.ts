import type { Core } from '@strapi/strapi';

const NAVBAR_UID = 'api::navbar.navbar' as any;
const FOOTER_UID = 'api::footer.footer' as any;

/** Public role may read these single types over REST. */
const PUBLIC_FIND_ACTIONS = [
  'api::navbar.navbar.find',
  'api::footer.footer.find',
];

const DEFAULT_NAVBAR = {
  siteName: 'AZOYTRIX',
  ctaEnabled: true,
  ctaLabel: 'Contact Us',
  ctaHref: '/contact',
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Our Work', href: '/our-work' },
    { label: 'Contact', href: '/contact' },
  ],
};

const DEFAULT_FOOTER = {
  // Text fields use the defaults defined in the schema; only the
  // repeatable components need seeding.
  exploreLinks: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Solutions', href: '/solutions' },
    { label: 'Our Work', href: '/our-work' },
  ],
  bottomTags: [
    { label: 'Innovation' },
    { label: 'Intelligence' },
    { label: 'Engineering' },
  ],
};

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // 1) Let the Public role read the navbar and footer
    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      for (const action of PUBLIC_FIND_ACTIONS) {
        const existing = await strapi.db
          .query('plugin::users-permissions.permission')
          .findOne({ where: { role: publicRole.id, action } });

        if (!existing) {
          await strapi.db
            .query('plugin::users-permissions.permission')
            .create({ data: { role: publicRole.id, action } });
          strapi.log.info(`Granted Public role "${action}"`);
        }
      }
    }

    // 2) Seed default content once (only when the single type is empty)
    const navbar = await strapi.documents(NAVBAR_UID).findFirst();
    if (!navbar) {
      await strapi.documents(NAVBAR_UID).create({ data: DEFAULT_NAVBAR });
      strapi.log.info('Seeded default navbar content');
    }

    const footer = await strapi.documents(FOOTER_UID).findFirst();
    if (!footer) {
      await strapi.documents(FOOTER_UID).create({ data: DEFAULT_FOOTER });
      strapi.log.info('Seeded default footer content');
    }
  },
};