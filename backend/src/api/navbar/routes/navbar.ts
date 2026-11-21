import { factories } from '@strapi/strapi';

/**
 * Navbar routes (single type).
 *
 * Only GET /api/navbar is exposed over REST. The navbar is edited from the
 * Strapi admin panel (Content Manager -> Navbar), so PUT/DELETE are not
 * needed publicly.
 */
export default factories.createCoreRouter('api::navbar.navbar', {
  only: ['find'],
});