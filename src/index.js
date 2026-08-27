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

      const existingPermsByAction = new Map(
        existingPerms.map((p) => [`${p.action}`, p])
      );

      const permsToCreate = [];
      const permsToEnable = [];

      for (const uid of apiContentTypes) {
        const parts = uid.split('::')[1].split('.');
        const baseAction = `api::${parts[0]}.${parts[1]}`;

        const actions =
          strapi.contentTypes[uid].kind === 'singleType'
            ? [`${baseAction}.find`]
            : [`${baseAction}.find`, `${baseAction}.findOne`];

        for (const action of actions) {
          const existingPerm = existingPermsByAction.get(action);
          if (!existingPerm) {
            permsToCreate.push({
              action,
              role: publicRole.id,
              enabled: true,
            });
          } else if (existingPerm.enabled !== true) {
            permsToEnable.push(existingPerm);
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
      }

      if (permsToEnable.length > 0) {
        for (const perm of permsToEnable) {
          await strapi
            .query('plugin::users-permissions.permission')
            .update({
              where: { id: perm.id },
              data: { enabled: true },
            });
        }
        strapi.log.info(
          `Bootstrap: re-enabled ${permsToEnable.length} public API permissions`
        );
      }

      if (permsToCreate.length === 0 && permsToEnable.length === 0) {
        strapi.log.info('Bootstrap: public API permissions already configured');
      } else {
        strapi.log.info('Bootstrap: public API permissions synchronized');
      }
    } else {
      strapi.log.info('Public role not found, skipping permission setup');
    }

    strapi.log.info('Bootstrap: frontend cache disabled; cache invalidation subscriber not registered');
  },
};
