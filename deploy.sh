#!/bin/bash
# ============================================
# Deploy Script - Run from YOUR LOCAL MACHINE
# Handles: VPS setup, build, push, deploy, Nginx, SSL
# Usage: bash deploy.sh [--setup-only] [--ssl-only] [--dry-run]
# ============================================
# 
# ## Deployment Steps Overview
# 
# | Step | Phase   | What it does                                    | Runs on |
# |------|---------|------------------------------------------------|---------|
# |  0   | Remote  | Test SSH connection to VPS                      | VPS     |
# |  1   | Local   | Build CMS Docker image                         | Local   |
# |  2   | Local   | Build Web Docker image                         | Local   |
# |  3   | Local   | Push images to DockerHub                       | Local   |
# |  4   | Remote  | First-time VPS setup (Docker, Nginx, UFW)     | VPS     |
# |  5   | Remote  | Deploy docker-compose.yml & .env to VPS        | VPS     |
# |  6   | Remote  | Pull images & restart containers               | VPS     |
# |  7   | Remote  | Upload & install Nginx configs                 | VPS     |
# |  8   | Remote  | DNS check & install SSL (Let's Encrypt)        | VPS     |
# |  9   | Remote  | Setup SSL auto-renewal cron                    | VPS     |
# 
# ## Prerequisites
# 
# - Docker installed locally
# - `.env` file configured (copy from `.env.example`)
# - VPS SSH access configured
# - Domain DNS A records pointing to VPS IP (for SSL)
# 
# ============================================

set -euo pipefail

# ---- Error trap: show which step failed ----
CURRENT_STEP="init"
step() {
  CURRENT_STEP="$1"
  echo "==> $*"
}
fail() {
  echo ""
  echo "❌ FAILED at step: ${CURRENT_STEP}"
  echo "   $*"
  echo ""
  exit 1
}
trap 'fail "Unexpected error on line $LINENO (exit code $?)"' ERR

# ---- Load .env ----
if [[ -f .env ]]; then
  set -a
  source .env
  set +a
else
  echo "❌ .env file not found!"
  exit 1
fi

# ---- Auto-generate Strapi secrets if still placeholders ----
if grep -qE '(APP_KEYS|API_TOKEN_SALT|ADMIN_JWT_SECRET|TRANSFER_TOKEN_SALT|JWT_SECRET|ENCRYPTION_KEY)=CHANGE_ME' .env 2>/dev/null; then
  echo "==> Generating Strapi secrets..."

  generate_secret() {
    openssl rand -hex 32
  }

  APP_KEYS_NEW="$(generate_secret),$(generate_secret)"
  API_TOKEN_SALT_NEW="$(generate_secret)"
  ADMIN_JWT_SECRET_NEW="$(generate_secret)"
  TRANSFER_TOKEN_SALT_NEW="$(generate_secret)"
  JWT_SECRET_NEW="$(generate_secret)"
  ENCRYPTION_KEY_NEW="$(generate_secret)"

  # Update .env in-place using sed
  sed -i.bak \
    -e "s|^APP_KEYS=.*|APP_KEYS=\"${APP_KEYS_NEW}\"|" \
    -e "s|^API_TOKEN_SALT=.*|API_TOKEN_SALT=${API_TOKEN_SALT_NEW}|" \
    -e "s|^ADMIN_JWT_SECRET=.*|ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET_NEW}|" \
    -e "s|^TRANSFER_TOKEN_SALT=.*|TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN_SALT_NEW}|" \
    -e "s|^JWT_SECRET=.*|JWT_SECRET=${JWT_SECRET_NEW}|" \
    -e "s|^ENCRYPTION_KEY=.*|ENCRYPTION_KEY=${ENCRYPTION_KEY_NEW}|" \
    .env
  rm -f .env.bak

  # Reload env vars
  set -a; source .env; set +a

  echo "   ✅ Secrets generated and saved to .env"
  echo ""
else
  echo "==> Strapi secrets already configured"
fi

# ---- Validate required vars ----
REQUIRED_VARS="DOCKER_IMAGE_PREFIX DOCKER_USERNAME DOCKER_PASSWORD VPS_HOST VPS_USER VPS_SSH_KEY CMS_PORT WEB_PORT CACHE_SECRET"
for var in $REQUIRED_VARS; do
  if [[ -z "${!var:-}" || "${!var}" == *"CHANGE_ME"* || "${!var}" == *"YOUR_"* ]]; then
    echo "❌ Missing or placeholder value in .env: $var"
    exit 1
  fi
done

# ---- Config ----
IMAGE_PREFIX="${DOCKER_IMAGE_PREFIX}"
CMS_IMAGE="${IMAGE_PREFIX}:cms"
WEB_IMAGE="${IMAGE_PREFIX}:web"
WEB_CONTENT_VERSION="${WEB_CONTENT_VERSION:-$(date +%s)}"
SSH_KEY="${VPS_SSH_KEY}"
REMOTE="${VPS_USER}@${VPS_HOST}"
REMOTE_DIR="~/ryhts-app"
ADMIN_EMAIL="${ADMIN_EMAIL:-thanapognchunchombun@gmail.com}"
CMS_DOMAIN="${CMS_DOMAIN:-rthtscms.icute.site}"
WEB_DOMAIN="${WEB_DOMAIN:-rthtsweb.icute.site}"

# ---- Parse flags ----
SETUP_ONLY=false
SSL_ONLY=false
DRY_RUN=false
for arg in "$@"; do
  case $arg in
    --setup-only) SETUP_ONLY=true ;;
    --ssl-only)   SSL_ONLY=true ;;
    --dry-run)    DRY_RUN=true ;;
  esac
done

# Helper: run or preview a command, fail on error
dry_run() {
  if [[ "$DRY_RUN" == "true" ]]; then
    echo "  [dry-run] $*"
    return 0
  fi
  "$@" || fail "Command failed: $*"
}

# Helper: run command on remote VPS via SSH, fail on error
remote() {
  if [[ "$DRY_RUN" == "true" ]]; then
    echo "  [dry-run] ssh ${REMOTE} '$*'"
    return 0
  fi
  ssh -i "${SSH_KEY}" -o StrictHostKeyChecking=no -o ConnectTimeout=10 "${REMOTE}" "$@" \
    || fail "SSH command failed on ${REMOTE}"
}

# Helper: scp file to remote, fail on error
scp_to_remote() {
  if [[ "$DRY_RUN" == "true" ]]; then
    echo "  [dry-run] scp $1 → ${REMOTE}:$2"
    return 0
  fi
  scp -i "${SSH_KEY}" "$1" "${REMOTE}:$2" \
    || fail "SCP failed: $1 → ${REMOTE}:$2"
}

echo "============================================"
echo "  Deploy: i-Stock Express CMS + Web"
echo "============================================"
echo ""
if [[ "$DRY_RUN" == "true" ]]; then
  echo "  ⚠️  DRY RUN MODE — no commands will be executed"
echo ""
fi
echo "  VPS:        ${VPS_HOST}"
echo "  CMS image:  ${CMS_IMAGE}"
echo "  Web image:  ${WEB_IMAGE}"
echo ""

# ---- Pre-check: Docker daemon ----
if [[ "$DRY_RUN" == "false" ]] && ! docker info > /dev/null 2>&1; then
  fail "Docker daemon is not running. Start Docker Desktop and try again."
fi

# ---- Pre-check: Docker login ----
if [[ "$DRY_RUN" == "false" ]]; then
  if ! docker info 2>/dev/null | grep -q "Username"; then
    if [[ -n "${DOCKER_USERNAME:-}" && -n "${DOCKER_PASSWORD:-}" && "${DOCKER_USERNAME}" != *"CHANGE_ME"* ]]; then
      echo "==> Logging in to DockerHub as ${DOCKER_USERNAME}..."
      echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin 2>/dev/null \
        || fail "DockerHub login failed. Check DOCKER_USERNAME/DOCKER_PASSWORD in .env"
      echo "   ✅ DockerHub login successful"
    else
      fail "Not logged in to DockerHub. Set DOCKER_USERNAME and DOCKER_PASSWORD in .env, or run: docker login"
    fi
  fi
fi

# ============================================
# STEP 0: Test SSH Connection (Remote)
# Fails fast if VPS is unreachable
# ============================================
step "[0/10] Testing SSH connection to ${REMOTE}..."
if [[ "$DRY_RUN" == "true" ]]; then
  echo "  [dry-run] ssh -o ConnectTimeout=5 ${REMOTE} 'echo ok'"
elif ! ssh -i "${SSH_KEY}" -o StrictHostKeyChecking=no -o ConnectTimeout=5 "${REMOTE}" "echo ok" > /dev/null 2>&1; then
  fail "Cannot connect to ${REMOTE}"
  echo "  Check:"
  echo "    - VPS is running and reachable at ${VPS_HOST}"
  echo "    - SSH key exists: ${SSH_KEY}"
  echo "    - User '${VPS_USER}' has SSH access"
fi
echo "   ✅ SSH connection successful"
echo ""

# ============================================
# STEP 1: Build CMS Docker Image (Local)
# ============================================
if [[ "$SSL_ONLY" == "false" ]]; then
  # ---- Step 1: Build CMS Docker Image ----
  step "[1/10] Building CMS Docker image..."
  dry_run docker build --platform linux/amd64 --provenance=false --sbom=false -t "${CMS_IMAGE}" -f Dockerfile .

  # ---- Step 2: Build Web Docker Image ----
  echo ""
  step "[2/10] Building Web Docker image..."
  dry_run docker build --platform linux/amd64 --provenance=false --sbom=false \
    --build-arg "PUBLIC_STRAPI_URL=${PUBLIC_STRAPI_URL:-http://cms:1337}" \
    --build-arg "STRAPI_API_TOKEN=${STRAPI_API_TOKEN:-}" \
    --build-arg "CMS_CONTENT_VERSION=${WEB_CONTENT_VERSION}" \
    -t "${WEB_IMAGE}" -f web/Dockerfile ./web

  # ---- Step 3: Push to DockerHub ----
  echo ""
  step "[3/10] Pushing images to DockerHub..."
  dry_run docker push "${CMS_IMAGE}"
  dry_run docker push "${WEB_IMAGE}"
else
  echo "==> Skipping steps 1-3 (--ssl-only mode)"
fi

# ============================================
# STEP 4: First-Time VPS Setup (Remote)
# Installs: Docker, Docker Compose, Nginx, UFW
# ============================================
if [[ "$SSL_ONLY" == "false" ]]; then
  echo ""
  step "[4/10] First-time VPS setup..."

  # Check what's already installed on VPS
  if [[ "$DRY_RUN" == "false" ]]; then
    VPS_CHECKS=$(ssh -i "${SSH_KEY}" -o StrictHostKeyChecking=no "${REMOTE}" '
      echo "DOCKER=$(command -v docker >/dev/null 2>&1 && echo yes || echo no)"
      echo "COMPOSE=$(docker compose version >/dev/null 2>&1 && echo yes || echo no)"
      echo "NGINX=$(command -v nginx >/dev/null 2>&1 && echo yes || echo no)"
      echo "UFW=$(dpkg -l ufw 2>/dev/null | grep -q ^ii && echo yes || echo no)"
    ')
    eval "${VPS_CHECKS}"
    echo "   Docker: ${DOCKER:-?} | Compose: ${COMPOSE:-?} | Nginx: ${NGINX:-?} | UFW: ${UFW:-?}"
    if [[ "$DOCKER" == "yes" && "$COMPOSE" == "yes" && "$NGINX" == "yes" && "$UFW" == "yes" ]]; then
      echo "   ⏭️  All VPS prerequisites already installed, skipping setup"
    else
      echo "   ⚠️  Some packages missing, running setup..."
      SETUP_NEEDED=true
    fi
  else
    SETUP_NEEDED=true
  fi

  if [[ "${SETUP_NEEDED:-false}" == "true" ]]; then
  remote << 'ENDSSH'
    set -e

    echo "==> [4a] Updating system..."
    sudo apt update && sudo apt upgrade -y

    echo "==> [4b] Installing Docker..."
    if ! command -v docker &> /dev/null; then
      curl -fsSL https://get.docker.com | sudo sh
      sudo systemctl enable docker
      sudo systemctl start docker
      echo "   Docker $(docker --version) installed"
    else
      echo "   Docker already installed"
    fi

    echo "==> [4c] Checking Docker Compose..."
    if ! docker compose version &> /dev/null; then
      sudo apt install -y docker-compose-plugin
    fi
    echo "   Docker Compose $(docker compose version --short) ready"

    echo "==> [4d] Installing Nginx..."
    if ! command -v nginx &> /dev/null; then
      sudo apt install -y nginx
    fi
    sudo systemctl enable nginx
    sudo systemctl start nginx
    echo "   Nginx installed and running"

    echo "==> [4e] Configuring firewall..."
    sudo apt install -y ufw
    sudo ufw allow OpenSSH
    sudo ufw allow 'Nginx Full'
    sudo ufw --force enable
    echo "   Firewall enabled"

    echo "==> [4f] Creating app directory..."
    mkdir -p ~/ryhts-app

    echo "   ✅ VPS setup complete"
ENDSSH
  fi

  # ============================================
  # STEP 5: Deploy docker-compose.yml & .env (Remote)
  # ============================================
  echo ""
  step "[5/10] Deploying docker-compose.yml & .env to VPS..."

  remote "mkdir -p ${REMOTE_DIR}"
  [[ -f docker-compose.yml ]] || fail "docker-compose.yml not found"
  [[ -f .env ]] || fail ".env not found"

  # Check if files already exist on VPS with same content
  SKIP_DEPLOY=true
  if [[ "$DRY_RUN" == "false" ]]; then
    REMOTE_HASH=$(ssh -i "${SSH_KEY}" -o StrictHostKeyChecking=no "${REMOTE}" "md5sum ${REMOTE_DIR}/docker-compose.yml ${REMOTE_DIR}/.env 2>/dev/null" || echo "")
    LOCAL_HASH=$(md5sum docker-compose.yml .env 2>/dev/null | awk '{print $1}' || echo "")
    if [[ "$REMOTE_HASH" == "$LOCAL_HASH" ]]; then
      echo "   ⏭️  Files already on VPS with same content, skipping upload"
    else
      SKIP_DEPLOY=false
    fi
  fi

  if [[ "$SKIP_DEPLOY" == "false" || "$DRY_RUN" == "true" ]]; then
    scp_to_remote docker-compose.yml "${REMOTE_DIR}/docker-compose.yml"
    scp_to_remote .env "${REMOTE_DIR}/.env"
  fi

  # ============================================
  # STEP 6: Pull Images & Restart Containers (Remote)
  # ============================================
  echo ""
  step "[6/10] Pulling images & restarting containers..."

  remote << 'ENDSSH'
    set -e
    cd ~/ryhts-app

    echo "==> Pulling latest images..."
    docker compose pull

    echo "==> Restarting containers..."
    docker compose up -d --force-recreate --remove-orphans

    echo "==> Cleaning up old images..."
    docker image prune -f

    echo ""
    echo "==> Container status:"
    docker compose ps
ENDSSH

  # ============================================
  # STEP 7: Upload & Install Nginx Configs (Remote)
  # ============================================
  echo ""
  step "[7/10] Deploying Nginx configs..."

  [[ -d nginx ]] || fail "nginx/ directory not found"

  # Check if nginx configs already match
  SKIP_NGINX=true
  if [[ "$DRY_RUN" == "false" ]]; then
    for conf_file in nginx/*; do
      filename=$(basename "$conf_file")
      REMOTE_NGINX_HASH=$(ssh -i "${SSH_KEY}" -o StrictHostKeyChecking=no "${REMOTE}" "md5sum /etc/nginx/sites-available/${filename} 2>/dev/null" | awk '{print $1}' || echo "")
      LOCAL_NGINX_HASH=$(md5sum "${conf_file}" 2>/dev/null | awk '{print $1}' || echo "")
      if [[ "$REMOTE_NGINX_HASH" != "$LOCAL_NGINX_HASH" ]]; then
        SKIP_NGINX=false
        break
      fi
    done
  fi

  if [[ "$SKIP_NGINX" == "true" && "$DRY_RUN" == "false" ]]; then
    echo "   ⏭️  Nginx configs already on VPS, skipping upload"
  else
    for conf_file in nginx/*; do
      filename=$(basename "$conf_file")
      echo "   Uploading ${filename}..."
      scp_to_remote "${conf_file}" "/tmp/${filename}"
    done
  fi

  remote << 'ENDSSH'
    set -e

    # Move configs to sites-available
    for conf in /tmp/ryhts*; do
      if [ -f "$conf" ]; then
        filename=$(basename "$conf")
        echo "==> Installing ${filename}..."
        sudo cp "$conf" -f /etc/nginx/sites-available/
        sudo ln -sf "/etc/nginx/sites-available/${filename}" "/etc/nginx/sites-enabled/${filename}"
        rm -f "$conf"
      fi
    done

    # Check Nginx syntax
    echo "==> Checking Nginx configuration syntax..."
    sudo nginx -t
    if [ $? -ne 0 ]; then
      echo "❌ Nginx configuration syntax error"
      exit 1
    fi

    # Restart Nginx
    echo "==> Restarting Nginx..."
    sudo systemctl restart nginx
    echo "   ✅ Nginx restarted"
ENDSSH
else
  echo "==> Skipping steps 4-7 (--ssl-only mode)"
fi

# ============================================
# STEP 8: DNS Check & Install SSL (Remote)
# Validates DNS, installs Certbot, requests certificates
# ============================================
echo ""
step "[8/10] DNS check & SSL setup..."

remote << ENDSSH
  set -e

  MY_IP=\$(curl -s ifconfig.me)
  CMS_IP=\$(dig +short ${CMS_DOMAIN} | tail -1)
  WEB_IP=\$(dig +short ${WEB_DOMAIN} | tail -1)

  echo "  Your VPS IP:  \${MY_IP}"
  echo "  ${CMS_DOMAIN} → \${CMS_IP:-NOT_FOUND}"
  echo "  ${WEB_DOMAIN} → \${WEB_IP:-NOT_FOUND}"
  echo ""

  if [[ "\${CMS_IP:-}" != "\$MY_IP" || "\${WEB_IP:-}" != "\$MY_IP" ]]; then
    echo "  ❌ DNS not pointing here yet!"
    echo ""
    echo "  Add these DNS A records:"
    echo "    ${CMS_DOMAIN}  → \${MY_IP}"
    echo "    ${WEB_DOMAIN}  → \${MY_IP}"
    echo "    www.${WEB_DOMAIN} → \${MY_IP}"
    echo ""
    echo "  Wait for DNS propagation, then run:"
    echo "    bash deploy.sh --ssl-only"
    exit 1
  fi

  echo "  ✅ DNS verified"

  # Install Certbot
  echo "==> Installing Certbot..."
  sudo apt install -y certbot python3-certbot-nginx

  # Install SSL for each domain separately
  # CMS domain
  echo "==> Installing SSL for ${CMS_DOMAIN}..."
  sudo certbot --nginx -d "${CMS_DOMAIN}" --non-interactive --agree-tos --redirect --email ${ADMIN_EMAIL} || \
    sudo certbot renew --cert-name "${CMS_DOMAIN}" --quiet
  echo "   ✅ SSL ready for ${CMS_DOMAIN}"

  # Web domain (with www)
  echo "==> Installing SSL for ${WEB_DOMAIN}..."
  sudo certbot --nginx -d "${WEB_DOMAIN}" -d "www.${WEB_DOMAIN}" --non-interactive --agree-tos --redirect --email ${ADMIN_EMAIL} || \
    sudo certbot renew --cert-name "${WEB_DOMAIN}" --quiet
  echo "   ✅ SSL ready for ${WEB_DOMAIN}"

  # Reload Nginx with SSL
  echo "==> Reloading Nginx with SSL..."
  sudo nginx -t && sudo systemctl reload nginx
ENDSSH

# ============================================
# STEP 9: Setup SSL Auto-Renewal Cron (Remote)
# ============================================
echo ""
step "[9/10] Setting up SSL auto-renewal..."

if [[ "$DRY_RUN" == "false" ]]; then
  CRON_EXISTS=$(ssh -i "${SSH_KEY}" -o StrictHostKeyChecking=no "${REMOTE}" "test -f /etc/cron.d/certbot-renew && echo yes || echo no" 2>/dev/null || echo no)
  if [[ "$CRON_EXISTS" == "yes" ]]; then
    echo "   ⏭️  Auto-renewal cron already exists, skipping"
  else
    remote << 'ENDSSH'
  set -e

  echo "==> Setting up auto-renewal cron..."
  echo "0 0,12 * * * root certbot renew --quiet --post-hook 'systemctl reload nginx'" \
    | sudo tee /etc/cron.d/certbot-renew > /dev/null

  echo "   ✅ Auto-renewal configured (every 12 hours)"
ENDSSH
  fi
else
  remote << 'ENDSSH'
  set -e

  echo "==> Setting up auto-renewal cron..."
  echo "0 0,12 * * * root certbot renew --quiet --post-hook 'systemctl reload nginx'" \
    | sudo tee /etc/cron.d/certbot-renew > /dev/null

  echo "   ✅ Auto-renewal configured (every 12 hours)"
ENDSSH
fi

# ============================================
# Done
# ============================================
echo ""
echo "============================================"
echo "  ✅ Deploy Complete!"
echo "============================================"
echo ""
echo "  CMS: https://${CMS_DOMAIN}"
echo "  Web: https://${WEB_DOMAIN}"
echo ""
echo "  VPS commands:"
echo "    ssh ${REMOTE}"
echo "    cd ~/ryhts-app"
echo "    docker compose logs -f        # watch logs"
echo "    docker compose restart        # restart all"
echo "    docker compose down           # stop all"
echo ""
echo "  SSL:"
echo "    sudo certbot certificates     # check certs"
echo "    sudo certbot renew            # manual renew"
echo ""
