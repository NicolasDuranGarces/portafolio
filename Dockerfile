# Multi-stage build para servir el bundle estático detrás de Nginx.

FROM node:20-alpine AS builder
WORKDIR /app

# Instala dependencias usando el lockfile para builds reproducibles.
COPY package*.json ./
RUN npm ci --audit=false --fund=false

# Copia el resto del código y genera el build optimizado.
COPY . .
RUN npm run build

# Imagen final mínima con Nginx manejando el tráfico HTTP.
FROM nginx:1.27-alpine

# Usa un archivo de configuración alineado con SPA + caching agresivo para assets.
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Verifica que Nginx siga respondiendo para que el orquestador pueda monitorear el contenedor.
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://localhost/ || exit 1
