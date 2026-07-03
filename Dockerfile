# Stage 1: Install dependencies
FROM node:22-alpine AS deps
WORKDIR /app
# Build tools needed to compile better-sqlite3's native addon if no prebuilt binary matches
RUN apk add --no-cache python3 make g++
COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# Stage 2: Build the application
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production runner
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
ENV STORE_DB_PATH=/data/db/store.db
ENV STORE_UPLOADS_DIR=/data/uploads

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Ensure the native addon ships even if standalone tracing misses non-JS assets
COPY --from=builder /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3

# Persistent volumes for the admin panel's database and uploaded product images
RUN mkdir -p /data/db /data/uploads && chown -R nextjs:nodejs /data

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
