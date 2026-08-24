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
    // Auto-enable public read (find/findOne) for all API content types
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) {
      strapi.log.info('Public role not found, skipping permission setup');
      return;
    }

    // Get all API content types
    const apiContentTypes = Object.keys(strapi.contentTypes).filter(
      (uid) => uid.startsWith('api::')
    );

    // Get existing permissions for public role
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
      const controller = parts[0];
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
  },
};
