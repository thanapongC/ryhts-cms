# i-Stock Express App

This repository contains two systems:

- `cms`: Strapi 5 backend, served on port `1337`
- `web`: Astro frontend, served on port `3000`

## Requirements

- Node.js `22.x` for local builds
- npm
- Docker and Docker Compose for production containers
- PostgreSQL for production CMS data

## Environment

Create the production environment file from the example:

```sh
cp .env.example .env
```

Update these values before running production:

- `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`
- `DATABASE_CLIENT`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`
- `PUBLIC_STRAPI_URL`
- `PUBLIC_SITE_URL`
- `CMS_PORT`
- `WEB_PORT`
- Gmail SMTP values if the contact form is enabled

The `deploy.sh` script can auto-generate Strapi secrets when the secret values in `.env` still contain `CHANGE_ME`.

## Run Production: Both Systems With Docker Compose

Build and start the CMS and Web containers together:

```sh
docker compose up -d --build
```

Check status:

```sh
docker compose ps
```

Watch logs:

```sh
docker compose logs -f
```

Restart both systems:

```sh
docker compose restart
```

Stop both systems:

```sh
docker compose down
```

Default URLs:

- CMS: `http://localhost:1338`
- Web: `http://localhost:3008`

The compose file uses:

- root `Dockerfile` for Strapi CMS
- `web/Dockerfile` for Astro Web
- `.env` for container environment variables
- `cms-data` Docker volume for Strapi uploads

## Deploy Production To VPS

Configure `.env` with Docker Hub, VPS, domain, database, and app values:

```sh
cp .env.example .env
```

Then run:

```sh
npm run deploy
```

The deploy script builds both Docker images, pushes them to Docker Hub, prepares the VPS, uploads `docker-compose.yml` and `.env`, restarts both containers, configures Nginx, and installs SSL certificates.

Useful deploy modes:

```sh
bash deploy.sh --dry-run
bash deploy.sh --setup-only
bash deploy.sh --ssl-only
```

## Manual Production Without Docker

Run the CMS:

```sh
npm install
npm run build
NODE_ENV=production npm run start
```

Run the Web app in another terminal:

```sh
cd web
npm install
npm run build
NODE_ENV=production HOST=0.0.0.0 PORT=3000 node dist/server/entry.mjs
```

For manual production, make sure the Web server can reach the CMS through `PUBLIC_STRAPI_URL` and `STRAPI_API_TOKEN`. The Web app runs in SSR mode and fetches CMS-backed pages at request time without caching, so published content changes are visible after a refresh without rebuilding.

## Development

Run the CMS:

```sh
npm install
npm run develop
```

Run the Web app:

```sh
cd web
npm install
npm run dev
```

---

# Deploy Without Docker

This guide deploys the project directly on a VPS without Docker.

The repo has two apps:

- CMS: Strapi backend in the repo root, default port `1337`
- Web: Astro frontend in `web/`, default port `3000`

## 1. Server Requirements

Install these on the VPS first:

- Node.js `22.x`
- npm
- PostgreSQL
- Nginx
- Certbot
- PM2

Example for Ubuntu:

```sh
sudo apt update
sudo apt install -y nginx postgresql postgresql-contrib certbot python3-certbot-nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

Check versions:

```sh
node -v
npm -v
pm2 -v
```

## 2. Create The Database

Create a PostgreSQL database and user for Strapi:

```sh
sudo -u postgres psql
```

Inside PostgreSQL:

```sql
CREATE DATABASE ryhts;
CREATE USER admin WITH PASSWORD 'CHANGE_ME_STRONG_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE ryhts TO admin;
\c ryhts
GRANT ALL ON SCHEMA public TO admin;
\q
```

## 3. Create The Environment File First

Create `.env` in the repo root before installing/building production.

```sh
cp .env.example .env
nano .env
```

Use production values like this:

```env
# CMS
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=https://ryhtscms.icute.site
ADMIN_REGISTRATION_DISABLED=true

# Strapi secrets. Generate fresh values; do not reuse these placeholders.
APP_KEYS=CHANGE_ME_SECRET_1,CHANGE_ME_SECRET_2
API_TOKEN_SALT=CHANGE_ME_SECRET
ADMIN_JWT_SECRET=CHANGE_ME_SECRET
TRANSFER_TOKEN_SALT=CHANGE_ME_SECRET
JWT_SECRET=CHANGE_ME_SECRET
ENCRYPTION_KEY=CHANGE_ME_SECRET

# Database
DATABASE_CLIENT=postgres
DATABASE_HOST=139.59.125.25
DATABASE_PORT=5432
DATABASE_NAME=ryhts
DATABASE_USERNAME=admin
DATABASE_PASSWORD=CHANGE_ME_STRONG_PASSWORD
DATABASE_SSL=false

# Web
PUBLIC_STRAPI_URL=https://ryhtscms.icute.site
PUBLIC_SITE_URL=https://ryhtsweb.icute.site
STRAPI_URL=https://ryhtscms.icute.site
STRAPI_API_TOKEN=CHANGE_ME_STRAPI_API_TOKEN

# Contact form email
GMAIL_SMTP_USER=your-gmail-address@example.com
GMAIL_SMTP_PASSWORD=your-google-app-password
FORM_RECIPIENT_EMAIL=your-gmail-address@example.com
```

Generate Strapi secrets:

```sh
openssl rand -hex 32
```

Run that command for each secret value. For `APP_KEYS`, generate two values and separate them with a comma.

Important:

- `PUBLIC_STRAPI_URL` must point to the public CMS URL because the Astro build fetches CMS content during `npm run build`.
- `STRAPI_API_TOKEN` is needed if CMS content is not publicly readable.
- Do not commit `.env`.

The Web app runs in SSR mode and fetches CMS content for each page request with `no-store`. After publishing a CMS edit, refresh the page to see it without rebuilding the Web app. The page-level `isActive` switch is also checked at request time; a disabled public page returns HTTP `404`.

## 4. Upload Or Clone The Project

Example location:

```sh
sudo mkdir -p /var/www/ryhts-express-app
sudo chown -R $USER:$USER /var/www/ryhts-express-app
cd /var/www/ryhts-express-app
git clone YOUR_REPOSITORY_URL .
```

Then place the production `.env` in:

```sh
/var/www/ryhts-express-app/.env
```

## 5. Build And Start The CMS

From the repo root:

```sh
cd /var/www/ryhts-express-app
npm ci
npm run build
NODE_ENV=production npm run start
```

If it starts correctly, stop it with `Ctrl+C` and run it with PM2:

```sh
NODE_ENV=production pm2 start npm --name ryhts-cms -- start
```

## 6. Create A Strapi API Token

Open the CMS admin:

```text
https://ryhtscms.icute.site/admin
```

Create an API token in Strapi:

```text
Settings > API Tokens > Create new API Token
```

Copy the token into the root `.env`:

```env
STRAPI_API_TOKEN=your-token
```

If the web content is already public and does not require a bearer token, this can be left empty.

## 7. Build And Start The Web App

The web build must run after the CMS is reachable.

```sh
cd /var/www/ryhts-express-app/web
npm ci
npm run build
NODE_ENV=production HOST=0.0.0.0 PORT=3000 node dist/server/entry.mjs
```

If it starts correctly, stop it with `Ctrl+C` and run it with PM2:

```sh
NODE_ENV=production HOST=0.0.0.0 PORT=3000 pm2 start dist/server/entry.mjs --name ryhts-web --interpreter node --time
```

Save the PM2 process list so apps restart after reboot:

```sh
pm2 save
pm2 startup
```

Run the command printed by `pm2 startup`.

## 8. Configure Nginx

Create CMS config:

```sh
sudo nano /etc/nginx/sites-available/ryhtscms.icute.site
```

Use:

```nginx
server {
    listen 80;
    server_name ryhtscms.icute.site;

    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Create web config:

```sh
sudo nano /etc/nginx/sites-available/ryhtsweb.icute.site
```

Use:

```nginx
server {
    listen 80;
    server_name ryhtsweb.icute.site;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable both sites:

```sh
sudo ln -s /etc/nginx/sites-available/ryhtscms.icute.site /etc/nginx/sites-enabled/
sudo ln -s /etc/nginx/sites-available/ryhtsweb.icute.site /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 9. Install SSL

Make sure DNS A records point to the VPS first:

- `ryhtscms.icute.site`
- `ryhtsweb.icute.site`

Then run:

```sh
sudo certbot --nginx -d ryhtscms.icute.site
sudo certbot --nginx -d ryhtsweb.icute.site
```

Test renewal:

```sh
sudo certbot renew --dry-run
```

## 10. Verify

Check PM2:

```sh
pm2 status
pm2 logs ryhts-cms
pm2 logs ryhts-web
```

Check local ports:

```sh
curl -I http://127.0.0.1:1337/admin
curl -I http://127.0.0.1:3000
```

Check public URLs:

```sh
curl -I https://ryhtscms.icute.site/admin
curl -I https://ryhtsweb.icute.site
```

## 11. Update Deployment

For normal code updates:

```sh
cd /var/www/ryhts-express-app
git pull
npm ci
npm run build
pm2 restart ryhts-cms

cd web
npm ci
npm run build
pm2 restart ryhts-web
```

CMS content updates do not require a Web rebuild. Refresh the page after publishing in Strapi. Rebuild and restart the Web app only when frontend source code or dependencies change.

## 12. Useful Commands

```sh
pm2 status
pm2 restart ryhts-cms
pm2 restart ryhts-web
pm2 logs ryhts-cms
pm2 logs ryhts-web
sudo nginx -t
sudo systemctl reload nginx
```

---

# Database Backup

## Backup Configuration

Configure backup settings in `.env`:

```env
# ---- Backup Settings ----
BACKUP_SERVER_HOST=139.59.125.25
BACKUP_SERVER_USER=root
BACKUP_SSH_KEY=~/.ssh/ryhts_deploy
BACKUP_DB_HOST=postgres
BACKUP_DB_PORT=5432
BACKUP_DB_USER=admin
BACKUP_DB_NAME=ryhts
BACKUP_DIR=./backup
# Backup password is read from DATABASE_PASSWORD if not set
# BACKUP_DB_PASSWORD=CHANGE_ME_STRONG_PASSWORD
```

## Run Backup

```sh
# Load environment and run backup
set -a && source .env && set +a && bash scripts/backup-db.sh
```

Or simply:

```sh
BACKUP_DB_PASSWORD=yourpassword bash scripts/backup-db.sh
```

## Backup Output

Backups are saved to `./backup/` directory with timestamped filenames:

```
backup/ryhts_backup_20260827_153553.sql
```

## Restore Backup

To restore a backup to the VPS:

```sh
# Copy backup to server
scp backup/ryhts_backup_*.sql root@139.59.125.25:/tmp/

# Restore on server
ssh root@139.59.125.25
docker exec -i -e PGPASSWORD='yourpassword' postgres psql -U admin -d ryhts < /tmp/ryhts_backup_*.sql
```

## Backup Retention Policy

Automatically delete old backups to save disk space.

### Manual Cleanup

Delete backups older than 7 days:

```sh
find ./backup -name "ryhts_backup_*.sql" -mtime +7 -delete
```

Delete backups older than 30 days:

```sh
find ./backup -name "ryhts_backup_*.sql" -mtime +30 -delete
```

Keep only the latest 5 backups:

```sh
ls -t ./backup/ryhts_backup_*.sql | tail -n +6 | xargs rm -f
```

### Automated Cleanup with Cron

Add a cron job to run daily cleanup. Edit crontab:

```sh
crontab -e
```

Add one of these lines:

```bash
# Delete backups older than 7 days (runs daily at 2:00 AM)
0 2 * * * find /var/www/ryhts-express-app/backup -name "ryhts_backup_*.sql" -mtime +7 -delete

# Keep only last 5 backups (runs daily at 2:00 AM)
0 2 * * * ls -t /var/www/ryhts-express-app/backup/ryhts_backup_*.sql 2>/dev/null | tail -n +6 | xargs rm -f
```

### Backup Directory Size

Check current backup disk usage:

```sh
du -sh ./backup
ls -lh ./backup
```
