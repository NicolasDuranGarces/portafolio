# Infra — auto-deploy del portfolio

Pipeline: **push a `main` → GitHub Actions → build & push a GHCR → server hace `docker pull` + `docker run`**.
El server nunca clona el repo; solo consume la imagen `ghcr.io/nicolasdurangarces/portafolio`.

Los jobs `validate` y `build-push` corren en runners cloud de GitHub (`ubuntu-latest`).
El job `deploy` corre en un **runner self-hosted registrado a nivel repo** (`portfolio-prod`)
que vive en el propio server → hace `docker login ghcr.io` + `pull` + `run` localmente,
sin SSH entrante (el firewall del host bloquea SSH desde los runners cloud).

## Topología del host (2.24.209.48, Ubuntu 24.04)

```
Internet ─▶ nginx host (edge, :80/:443)
              ├─ niduga.dev / www           ─▶ 127.0.0.1:8090  (contenedor portfolio)
              ├─ nicolasdurangarces.com / www ─▶ 301 https://niduga.dev
              └─ default_server (:80)        ─▶ 127.0.0.1:8081  (geocoder, reubicado)
```

Servicios preexistentes intactos: `geocoder_*` (nginx movido de :80 a 127.0.0.1:8081) y `finflow-*` (:5666/:8888/:5135).

## Secrets / credenciales

No se requieren secrets de SSH: el deploy corre en el runner self-hosted del propio server.
GHCR usa el `GITHUB_TOKEN` del workflow (`packages: write` para push, `read` para el pull en deploy).
La imagen es **privada**; el job de deploy hace `docker login ghcr.io` con el `GITHUB_TOKEN`.

## Puesta en marcha (una vez)

1. **Runner self-hosted repo-level** en el server (label `portfolio-prod`), como usuario `github-runner`
   (miembro del grupo `docker`). Registrado con un registration-token del repo:
   ```bash
   # /opt/actions-runner-portfolio, config.sh --labels portfolio-prod, svc.sh install/start
   ```
2. **Edge nginx del host** (copiar `infra/nginx/portfolio.conf` a `/etc/nginx/conf.d/` y correr):
   ```bash
   bash infra/server-bootstrap.sh
   ```
   Mueve el geocoder a `127.0.0.1:8081`, instala el edge nginx (:80/:443) con cert self-signed temporal.
3. **Primer deploy**: merge a `main` (o `workflow_dispatch`) dispara el pipeline; el server queda con el
   contenedor en `127.0.0.1:8090`.

## Cutover DNS + TLS real (Cloudflare)

El sitio hoy vive en Vercel. Para migrar a este VPS:

1. En Cloudflare, apuntar registros **A** de `niduga.dev`, `www`, `nicolasdurangarces.com`, `www` → `2.24.209.48`, en **DNS-only (nube gris)**.
2. En el server: `bash infra/tls-finalize.sh` (emite Let's Encrypt vía HTTP-01, instala renovación automática).
3. Verificar: `curl -I https://niduga.dev` (200) y `curl -I https://nicolasdurangarces.com` (301 → niduga.dev).

## Rollback

El job de deploy guarda la imagen previa y reejecuta el contenedor anterior si el healthcheck falla. Manual:
```bash
docker run ... ghcr.io/nicolasdurangarces/portafolio:sha-<sha_anterior>
```
