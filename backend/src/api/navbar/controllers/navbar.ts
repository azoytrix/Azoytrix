import { factories } from '@strapi/strapi';

/**
 * Navbar controller (single type).
 *
 * Overrides `find` so the logo and navLinks are always populated,
 * even if the frontend forgets to add ?populate=logo,navLinks.
 */
export default factories.createCoreController('api::navbar.navbar', () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        logo: true,
        navLinks: true,
      },
    };

    return super.find(ctx);
  },
}));