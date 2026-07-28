#!/usr/bin/env bash
# Emite certs Let's Encrypt reales tras el cutover DNS y los instala en la ruta
# estable que usa nginx, sin editar el site. Renovacion automatica via deploy-hook.
#
# PRE-REQUISITO: niduga.dev, www.niduga.dev, nicolasdurangarces.com y su www deben
# resolver a 2.24.209.48 (Cloudflare en gris / DNS-only) para el challenge HTTP-01.
# Correr como root en el server: bash tls-finalize.sh
set -euo pipefail

WEBROOT="/var/www/certbot"
SSL_DIR="/etc/nginx/ssl/niduga"
PRIMARY="niduga.dev"
HOOK="/etc/letsencrypt/renewal-hooks/deploy/portfolio-copy.sh"

echo "==> Emitiendo certificado (HTTP-01 webroot)"
certbot certonly --webroot -w "$WEBROOT" \
  -d niduga.dev -d www.niduga.dev \
  -d nicolasdurangarces.com -d www.nicolasdurangarces.com \
  --non-interactive --agree-tos -m nicolas.duran@bheex.com --keep-until-expiring

echo "==> Instalando deploy-hook de renovacion"
mkdir -p "$(dirname "$HOOK")"
cat > "$HOOK" <<HOOK_EOF
#!/usr/bin/env bash
set -e
cp -L /etc/letsencrypt/live/${PRIMARY}/fullchain.pem ${SSL_DIR}/fullchain.pem
cp -L /etc/letsencrypt/live/${PRIMARY}/privkey.pem   ${SSL_DIR}/privkey.pem
nginx -s reload
HOOK_EOF
chmod +x "$HOOK"

echo "==> Copiando certs a la ruta estable y recargando nginx"
bash "$HOOK"

echo "==> Verificando renovacion"
certbot renew --dry-run

echo "==> TLS listo. Certs reales activos; renovacion automatica configurada."
