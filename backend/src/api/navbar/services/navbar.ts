import { factories } from '@strapi/strapi';

/**
 * Navbar service (single type).
 * Uses Strapi's default core service: find, createOrUpdate, delete.
 */
export default factories.createCoreService('api::navbar.navbar');