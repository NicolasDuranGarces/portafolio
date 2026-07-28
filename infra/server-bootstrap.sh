#!/usr/bin/env bash
# Bootstrap idempotente del host de produccion (2.24.209.48, Ubuntu 24.04).
# Objetivo: nginx global en :80/:443 como edge, geocoder movido a 127.0.0.1:8081,
# certs self-signed temporales hasta el cutover DNS (luego correr tls-finalize.sh).
#
# NO destruye nada: solo remapea el puerto del geocoder y agrega el edge nginx.
# Correr como root en el server:  bash server-bootstrap.sh
set -euo pipefail

GEOCODER_COMPOSE="/opt/geocoder/docker-compose.prod.yml"
SSL_DIR="/etc/nginx/ssl/niduga"
WEBROOT="/var/www/certbot"
SITE="/etc/nginx/conf.d/portfolio.conf"

echo "==> 1. Mover geocoder_nginx de :80 a 127.0.0.1:8081 (con backup)"
if grep -q '"80:80"' "$GEOCODER_COMPOSE"; then
  cp -n "$GEOCODER_COMPOSE" "${GEOCODER_COMPOSE}.bak.$(date +%Y%m%d%H%M%S)"
  sed -i 's/"80:80"/"127.0.0.1:8081:80"/' "$GEOCODER_COMPOSE"
  docker compose -f "$GEOCODER_COMPOSE" up -d nginx
else
  echo "   geocoder ya remapeado o puerto distinto; sin cambios."
fi

echo "==> 2. Instalar certbot (webroot; sin plugin nginx para no editar configs)"
if ! command -v certbot >/dev/null; then
  apt-get update -qq
  apt-get install -y -qq certbot
fi

echo "==> 3. Preparar webroot ACME y certs self-signed temporales"
mkdir -p "$WEBROOT" "$SSL_DIR"
if [ ! -f "$SSL_DIR/fullchain.pem" ]; then
  openssl req -x509 -nodes -newkey rsa:2048 -days 30 \
    -keyout "$SSL_DIR/privkey.pem" -out "$SSL_DIR/fullchain.pem" \
    -subj "/CN=niduga.dev" >/dev/null 2>&1
fi

echo "==> 4. Instalar site del edge y desactivar el default de Ubuntu"
rm -f /etc/nginx/sites-enabled/default
# El archivo portfolio.conf se copia desde el repo (infra/nginx/portfolio.conf).
if [ ! -f "$SITE" ]; then
  echo "   FALTA $SITE — copiar infra/nginx/portfolio.conf al server primero." >&2
  exit 1
fi

echo "==> 5. Validar y (re)cargar nginx del host"
nginx -t
systemctl enable --now nginx
systemctl reload nginx

echo "==> OK. Edge nginx activo. Geocoder en 127.0.0.1:8081."
echo "    Tras repuntar DNS a este server (gris), correr: bash tls-finalize.sh"
