# ============================================
# Strapi 5 CMS - Multi-stage Docker Build
# ============================================

# Stage 1: Build
FROM node:22-alpine AS builder

RUN apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production
FROM node:22-alpine

RUN apk add --no-cache vips-dev

RUN addgroup -g 1001 strapi && \
    adduser -D -u 1001 -G strapi strapi

WORKDIR /app

COPY --from=builder --chown=strapi:strapi /app/node_modules ./node_modules
COPY --from=builder --chown=strapi:strapi /app/. ./.

USER strapi

EXPOSE 1337

ENV NODE_ENV=production

CMD ["node", "node_modules/.bin/strapi", "start"]
