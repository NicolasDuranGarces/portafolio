# Infra — auto-deploy del portfolio

Pipeline: **push a `main` → GitHub Actions → build & push a GHCR → server hace `docker pull` + `docker run`**.
El server nunca clona el repo; solo consume la imagen `ghcr.io/nicolasdurangarces/portafolio`.

## Topología del host (2.24.209.48, Ubuntu 24.04)

```
Internet ─▶ nginx host (edge, :80/:443)
              ├─ niduga.dev / www           ─▶ 127.0.0.1:8090  (contenedor portfolio)
              ├─ nicolasdurangarces.com / www ─▶ 301 https://niduga.dev
              └─ default_server (:80)        ─▶ 127.0.0.1:8081  (geocoder, reubicado)
```

Servicios preexistentes intactos: `geocoder_*` (nginx movido de :80 a 127.0.0.1:8081) y `finflow-*` (:5666/:8888/:5135).

## Secrets requeridos en GitHub (repo → Settings → Secrets → Actions)

| Secret | Valor |
|---|---|
| `PROD_HOST` | `2.24.209.48` |
| `PROD_USER` | `root` |
| `PROD_SSH_PORT` | `22` (opcional, default 22) |
| `PROD_SSH_KEY` | Llave privada de deploy (ver abajo) |

GHCR usa el `GITHUB_TOKEN` del workflow (permiso `packages: write`). La imagen se publica **pública** → el server hace pull sin credenciales. Si se vuelve privada, agregar `docker login ghcr.io` en el server con un PAT read:packages.

## Puesta en marcha (una vez)

1. **Llave SSH de deploy** (local):
   ```bash
   ssh-keygen -t ed25519 -f deploy_key -N "" -C "gh-actions-deploy"
   # pub -> authorized_keys del server; priv -> secret PROD_SSH_KEY
   ```
2. **Bootstrap del server** (copiar `infra/nginx/portfolio.conf` a `/etc/nginx/conf.d/` y correr):
   ```bash
   bash infra/server-bootstrap.sh
   ```
   Mueve el geocoder a :8081, instala el edge nginx con cert self-signed temporal.
3. **Primer deploy**: merge a `main` (o `workflow_dispatch`) dispara el pipeline; el server queda con el contenedor en 127.0.0.1:8090.

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
