#!/bin/bash

# PostgreSQL Database Backup Script
# Runs backup on remote server via SSH
# Server: VPS (configured via BACKUP_SERVER_HOST)
# Database: ryhts (running in Docker container)
# User: admin

set -e

# Configuration - reads from BACKUP_* env vars, falls back to DATABASE_* for password
SERVER_HOST="${BACKUP_SERVER_HOST:-139.59.125.25}"
SERVER_USER="${BACKUP_SERVER_USER:-root}"
SSH_KEY="${BACKUP_SSH_KEY:-$HOME/.ssh/istock_deploy}"
DB_CONTAINER="${BACKUP_DB_HOST:-postgres}"
DB_PORT="${BACKUP_DB_PORT:-5432}"
DB_USER="${BACKUP_DB_USER:-admin}"
DB_NAME="${BACKUP_DB_NAME:-ryhts}"
DB_PASSWORD="${BACKUP_DB_PASSWORD:-${DATABASE_PASSWORD:-}}"
BACKUP_DIR="${BACKUP_DIR:-$(dirname "$0")/../backup}"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="${BACKUP_DIR}/ryhts_backup_${DATE}.sql"

# Check required passwords
if [ -z "$DB_PASSWORD" ]; then
    echo "❌ Error: BACKUP_DB_PASSWORD or DATABASE_PASSWORD environment variable not set"
    echo ""
    echo "Usage: BACKUP_DB_PASSWORD=yourpassword ./backup-db.sh"
    echo ""
    echo "Or set DATABASE_PASSWORD in your .env file"
    exit 1
fi

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

echo "🔐 Connecting to ${SERVER_USER}@${SERVER_HOST}..."
echo "📦 Backing up database: ${DB_NAME}"
echo "📁 Saving to: ${BACKUP_FILE}"
echo ""

# SSH into server and run backup via Docker container
ssh -i "${SSH_KEY}" "${SERVER_USER}@${SERVER_HOST}" \
    "docker exec -e PGPASSWORD='${DB_PASSWORD}' ${DB_CONTAINER} pg_dump -U ${DB_USER} ${DB_NAME}" \
    > "$BACKUP_FILE"

# Verify backup
if [ -f "$BACKUP_FILE" ] && [ -s "$BACKUP_FILE" ]; then
    FILE_SIZE=$(du -h "$BACKUP_FILE" | cut -f1)
    LINE_COUNT=$(wc -l < "$BACKUP_FILE")
    echo ""
    echo "✅ Backup completed successfully!"
    echo "📁 File: ${BACKUP_FILE}"
    echo "📊 Size: ${FILE_SIZE}"
    echo "📝 Lines: ${LINE_COUNT}"
else
    echo ""
    echo "❌ Backup failed! Check:"
    echo "   - SSH key or password for ${SERVER_USER}@${SERVER_HOST}"
    echo "   - Container '${DB_CONTAINER}' is running on ${SERVER_HOST}"
    echo "   - Database credentials are correct"
    rm -f "$BACKUP_FILE"
    exit 1
fi
