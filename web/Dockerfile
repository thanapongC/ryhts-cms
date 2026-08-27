# ============================================
# Astro Web - Multi-stage Docker Build
# ============================================

# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Astro renders CMS-backed pages during the image build, so the CMS URL must
# be available in this stage as well as in the running container.
ARG PUBLIC_STRAPI_URL=http://localhost:1337
ENV PUBLIC_STRAPI_URL=$PUBLIC_STRAPI_URL
ARG STRAPI_API_TOKEN=
ENV STRAPI_API_TOKEN=$STRAPI_API_TOKEN

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
ARG CMS_CONTENT_VERSION=local
RUN echo "Building frontend content version ${CMS_CONTENT_VERSION}" && npm run build

# Stage 2: Production
FROM node:22-alpine

RUN addgroup -g 1001 webgroup && \
    adduser -D -u 1001 -G webgroup webuser

WORKDIR /app

COPY --from=builder --chown=webuser:webgroup /app/node_modules ./node_modules
COPY --from=builder --chown=webuser:webgroup /app/dist ./dist
COPY --from=builder --chown=webuser:webgroup /app/package.json ./.
COPY --from=builder --chown=webuser:webgroup /app/astro.config.mjs ./.

RUN mkdir -p /app/.astro && chown webuser:webgroup /app/.astro

USER webuser

EXPOSE 3000

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["node", "dist/server/entry.mjs"]
