import { factories } from '@strapi/strapi';

/**
 * Footer controller (single type).
 * Always populates the logo and repeatable components for GET /api/footer.
 */
export default factories.createCoreController('api::footer.footer', () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        logo: true,
        exploreLinks: true,
        bottomTags: true,
      },
    };

    return super.find(ctx);
  },
}));