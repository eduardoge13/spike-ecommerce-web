#!/usr/bin/env bash

set -euo pipefail

APP_DIR="${APP_DIR:-$(pwd)}"
COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-spike-ecommerce-web}"
COMPOSE_BASE_FILE="${COMPOSE_BASE_FILE:-docker-compose.yml}"
COMPOSE_PRODUCTION_FILE="${COMPOSE_PRODUCTION_FILE:-docker-compose.production.yml}"
HEALTHCHECK_URL="${HEALTHCHECK_URL:-}"
HEALTHCHECK_TIMEOUT_SECONDS="${HEALTHCHECK_TIMEOUT_SECONDS:-60}"

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require_command docker
require_command git
require_command curl

cd "$APP_DIR"

echo "Deploying commit: $(git rev-parse HEAD)"

docker compose \
  -p "$COMPOSE_PROJECT_NAME" \
  -f "$COMPOSE_BASE_FILE" \
  -f "$COMPOSE_PRODUCTION_FILE" \
  config >/dev/null

docker compose \
  -p "$COMPOSE_PROJECT_NAME" \
  -f "$COMPOSE_BASE_FILE" \
  -f "$COMPOSE_PRODUCTION_FILE" \
  up -d --build --remove-orphans

docker compose \
  -p "$COMPOSE_PROJECT_NAME" \
  -f "$COMPOSE_BASE_FILE" \
  -f "$COMPOSE_PRODUCTION_FILE" \
  ps

if [[ -n "$HEALTHCHECK_URL" ]]; then
  deadline=$((SECONDS + HEALTHCHECK_TIMEOUT_SECONDS))

  until curl --silent --show-error --fail --location --max-time 15 "$HEALTHCHECK_URL" >/dev/null; do
    if (( SECONDS >= deadline )); then
      echo "Health check failed for $HEALTHCHECK_URL" >&2
      exit 1
    fi

    sleep 3
  done

  echo "Health check passed: $HEALTHCHECK_URL"
fi
