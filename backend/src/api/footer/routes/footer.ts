import { factories } from '@strapi/strapi';

/** Read-only public route: GET /api/footer. Edit content in the admin panel. */
export default factories.createCoreRouter('api::footer.footer', {
  only: ['find'],
});