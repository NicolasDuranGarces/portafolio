# Multi-stage build for a production-ready static React app

FROM node:20-alpine AS build
WORKDIR /app

# Instalación de dependencias (mejor caché)
COPY package.json ./
# Si agregas package-lock.json en el futuro, cambia a: COPY package*.json ./ y usa npm ci
RUN npm install --no-audit --no-fund

# Copia del código y build
COPY . .
RUN npm run build

# Runtime minimal sin Nginx: servir estáticos con 'serve'
FROM node:20-alpine AS runtime
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist /app/dist

EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000", "-n"]
