'use strict';

const DEFAULT_BLOCKED_PATHS = [
  '/admin/register-admin',
  '/admin/register',
  '/admin/registration-info',
];

module.exports = (config = {}, { strapi }) => {
  const enabled = config.enabled !== false;
  const allowRegistration = config.allowRegistration === true;
  const blockedPaths = config.blockedPaths || DEFAULT_BLOCKED_PATHS;

  return async (ctx, next) => {
    if (!enabled || allowRegistration) {
      return next();
    }

    const path = ctx.request?.path || ctx.path || '';
    const isBlockedPath = blockedPaths.some((blockedPath) => path === blockedPath);

    if (!isBlockedPath) {
      return next();
    }

    strapi.log.warn(`Blocked disabled admin registration route: ${ctx.method} ${path}`);
    ctx.status = 403;
    ctx.body = {
      error: {
        status: 403,
        name: 'ForbiddenError',
        message: 'Admin registration is disabled.',
      },
    };
  };
};
