import { factories } from '@strapi/strapi';

/** Read-only public route: GET /api/homepage. Edit content in the admin panel. */
export default factories.createCoreRouter('api::homepage.homepage', {
  only: ['find'],
});
