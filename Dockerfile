# Multi stage build: Node builds and prerenders the static site, nginx serves it.

FROM node:22-alpine AS builder
WORKDIR /app

# Install from the lockfile for reproducible builds.
COPY package.json package-lock.json ./
RUN npm ci --audit=false --fund=false

# Copy the source and produce dist/ (type check, client bundle, SSR bundle, prerender).
COPY . .
RUN npm run build

# Final image: nginx with only the prerendered files.
# Production runs it as uid 101 on a read only filesystem with tmpfs on /var/cache/nginx, /var/run and /tmp,
# listening on :80 through CAP_NET_BIND_SERVICE, so nginx.conf must never write anywhere else.
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Lets the orchestrator watch nginx. 127.0.0.1 on purpose: "localhost" can resolve to ::1, where nginx does not listen.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
