import { factories } from '@strapi/strapi';

/**
 * Homepage controller (single type).
 * Always populates every section and its repeatable items for GET /api/homepage.
 */
export default factories.createCoreController('api::homepage.homepage', () => ({
  async find(ctx) {
    ctx.query = {
      ...ctx.query,
      populate: {
        hero: true,
        brandStatement: true,
        services: { populate: { items: true } },
        solutions: { populate: { items: true } },
        why: { populate: { items: true } },
        tech: { populate: { groups: true } },
        process: { populate: { steps: true } },
        portfolio: { populate: { projects: true } },
        stats: { populate: { items: true } },
        principles: { populate: { items: true } },
        cta: true,
      },
    };

    return super.find(ctx);
  },
}));
