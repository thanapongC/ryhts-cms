'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // ── Public permissions setup ───────────────────────────────────
    // Auto-enable public read (find/findOne) for all API content types
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (publicRole) {
      const apiContentTypes = Object.keys(strapi.contentTypes).filter(
        (uid) => uid.startsWith('api::')
      );

      const existingPerms = await strapi
        .query('plugin::users-permissions.permission')
        .findMany({
          where: { role: { id: publicRole.id } },
        });

      const existingActions = new Set(
        existingPerms.map((p) => `${p.action}`)
      );

      const permsToCreate = [];

      for (const uid of apiContentTypes) {
        const parts = uid.split('::')[1].split('.');
        const baseAction = `api::${parts[0]}.${parts[1]}`;

        const actions =
          strapi.contentTypes[uid].kind === 'singleType'
            ? [`${baseAction}.find`]
            : [`${baseAction}.find`, `${baseAction}.findOne`];

        for (const action of actions) {
          if (!existingActions.has(action)) {
            permsToCreate.push({
              action,
              role: publicRole.id,
              enabled: true,
            });
          }
        }
      }

      if (permsToCreate.length > 0) {
        for (const perm of permsToCreate) {
          await strapi
            .query('plugin::users-permissions.permission')
            .create({ data: perm });
        }
        strapi.log.info(
          `Bootstrap: enabled ${permsToCreate.length} public API permissions`
        );
      } else {
        strapi.log.info('Bootstrap: public API permissions already configured');
      }
    } else {
      strapi.log.info('Public role not found, skipping permission setup');
    }

    // ── SSR cache invalidation lifecycle subscriber ────────────────
    // Automatically calls DELETE /api/cache on the Astro frontend
    // whenever content is created, updated, or deleted in Strapi.

    const CACHE_FRONTEND_URL =
      process.env.FRONTEND_URL || 'http://localhost:4321';
    const CACHE_SECRET = process.env.CACHE_SECRET;

    if (CACHE_SECRET) {
      // Debounce: batch rapid changes into a single invalidation
      let invalidateTimer = null;

      const scheduleInvalidation = () => {
        if (invalidateTimer) clearTimeout(invalidateTimer);
        invalidateTimer = setTimeout(async () => {
          try {
            const res = await fetch(`${CACHE_FRONTEND_URL}/api/cache`, {
              method: 'DELETE',
              headers: { 'x-cache-secret': CACHE_SECRET },
              signal: AbortSignal.timeout(5000),
            });
            if (res.ok) {
              strapi.log.info('Bootstrap: SSR cache invalidated after content change');
            } else {
              strapi.log.warn(
                `Bootstrap: cache invalidation returned ${res.status}`
              );
            }
          } catch (err) {
            strapi.log.warn(`Bootstrap: cache invalidation failed: ${err.message}`);
          }
        }, 500); // 500ms debounce window
      };

      strapi.db.lifecycles.subscribe({
        afterCreate: scheduleInvalidation,
        afterUpdate: scheduleInvalidation,
        afterDelete: scheduleInvalidation,
        afterBulkDelete: scheduleInvalidation,
      });

      strapi.log.info('Bootstrap: SSR cache invalidation lifecycle subscriber registered');
    } else {
      strapi.log.info('Bootstrap: CACHE_SECRET not set, skipping cache invalidation subscriber');
    }
  },
};
