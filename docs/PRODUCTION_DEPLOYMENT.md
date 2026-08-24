# Production Deployment Runbook

This project now deploys to the Hostinger VPS through GitHub Actions instead of manual edits on the server.

## Architecture

- **App repo:** `https://github.com/eduardoge13/spike-ecommerce-web`
- **Production host:** `shop.srv1175749.hstgr.cloud`
- **Server app path:** `/opt/spike-ecommerce-web`
- **Reverse proxy:** Traefik on the shared `n8n_default` Docker network
- **Pipeline entrypoint:** `.github/workflows/ci-cd.yml`
- **Server deploy script:** `scripts/deploy-production.sh`

## Compose Files

- `docker-compose.yml`
  Base app definition used in every environment.
- `docker-compose.production.yml`
  Production-only networking and Traefik labels for the VPS.

Deploys always use both files together:

```bash
docker compose \
  -p spike-ecommerce-web \
  -f docker-compose.yml \
  -f docker-compose.production.yml \
  up -d --build --remove-orphans
```

## GitHub Actions Flow

1. `Verify` runs on every pull request, push to `main`, and manual dispatch.
2. The workflow installs dependencies, runs `npm run lint`, and runs `npm run build`.
3. If the event is a push to `main` or a manual run on `main`, `Deploy production` opens an SSH session to the VPS.
4. The deploy job refuses to continue if the server checkout has tracked changes.
5. The server fetches `origin/main`, resets to the exact remote branch tip, and runs `scripts/deploy-production.sh`.
6. The deploy script rebuilds the Docker image, recreates the app service, and waits for the production URL to answer successfully.

## GitHub Environment Setup

Create a GitHub environment named `production` and add these values there.

### Environment secrets

- `PRODUCTION_HOST`
  Example: `72.60.228.135`
- `PRODUCTION_USER`
  Example: `root`
- `PRODUCTION_SSH_KEY`
  Private SSH key allowed on the VPS
- `PRODUCTION_KNOWN_HOSTS`
  Output of `ssh-keyscan -H 72.60.228.135`

### Environment variables

- `PRODUCTION_APP_DIR`
  Current value: `/opt/spike-ecommerce-web`
- `PRODUCTION_COMPOSE_PROJECT`
  Current value: `spike-ecommerce-web`
- `PRODUCTION_HEALTHCHECK_URL`
  Current value: `https://shop.srv1175749.hstgr.cloud`

## First-Time VPS Checklist

Run these once on the VPS:

1. Install Docker Engine and Docker Compose plugin.
2. Clone the repository into `/opt/spike-ecommerce-web`.
3. Create the production `.env` file in `/opt/spike-ecommerce-web/.env`.
4. Confirm the shared Traefik network exists:

```bash
docker network ls | grep n8n_default
```

5. Run the first production deploy manually:

```bash
cd /opt/spike-ecommerce-web
git fetch origin main
git checkout main
git reset --hard origin/main
APP_DIR=/opt/spike-ecommerce-web \
COMPOSE_PROJECT_NAME=spike-ecommerce-web \
HEALTHCHECK_URL=https://shop.srv1175749.hstgr.cloud \
bash ./scripts/deploy-production.sh
```

## Manual Rollback

If a release needs to be rolled back:

```bash
cd /opt/spike-ecommerce-web
git fetch origin
git checkout <good-commit-sha>
APP_DIR=/opt/spike-ecommerce-web \
COMPOSE_PROJECT_NAME=spike-ecommerce-web \
HEALTHCHECK_URL=https://shop.srv1175749.hstgr.cloud \
bash ./scripts/deploy-production.sh
```

When rollback is complete, return the checkout to `main` before the next automated deploy:

```bash
git checkout main
git reset --hard origin/main
```

## Multi-App VPS Guidelines

- Keep each app in its own directory under `/opt` or `/opt/apps`.
- Give each app its own Compose project name.
- Keep only Traefik exposed on ports `80` and `443`.
- Join public apps to the shared Traefik network through a production override file.
- Never edit tracked files on the VPS; if the checkout is dirty, fix it in Git or archive it before deploying.
- Keep `.env` files only on the server and in GitHub environment secrets, never in the repo.

## Current Production Routes

- `puntoclaveshop.com.mx`
- `www.puntoclaveshop.com.mx`
- `shop.srv1175749.hstgr.cloud`

The public shop application exposes `/`, `/productos`, `/como-comprar`, `/pago-seguro`, and `/producto/[slug]`. See `docs/MULTIPAGE_SHOWROOM.md` for the information architecture and legacy-link behavior.
