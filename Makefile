# Simple Makefile to build and run the portfolio container without docker-compose

IMAGE ?= portfolio
TAG ?= latest
CONTAINER ?= portfolio_web
PORT ?= 3000

.PHONY: help build run run-fg run-mount up up-mount stop rm logs shell ps rebuild rebuild-nocache clean clean-image doctor

## Show this help
help:
	@echo "Usage: make <target> [VAR=value]"
	@echo
	@echo "Variables: IMAGE=$(IMAGE) TAG=$(TAG) CONTAINER=$(CONTAINER) PORT=$(PORT)"
	@echo
	@echo "Targets:"
	@echo "  build       Build image ($(IMAGE):$(TAG))"
	@echo "  run         Run detached on :$(PORT) as $(CONTAINER)"
	@echo "  run-fg      Run foreground (ctrl+c to stop)"
	@echo "  run-mount   Run with code mounted (HMR)"
	@echo "  up          Stop+remove existing, then run"
	@echo "  up-mount    Stop+remove existing, then run-mount"
	@echo "  stop        Stop container"
	@echo "  rm          Remove container"
	@echo "  logs        Tail logs"
	@echo "  shell       Open /bin/sh inside container"
	@echo "  reload      Validate and reload nginx inside container"
	@echo "  ps          Show container status"
	@echo "  rebuild     Clean run: stop, rm, build, run"
	@echo "  rebuild-nocache Stop, rm, build --no-cache, run"
	@echo "  clean       Stop+remove container"
	@echo "  clean-image Remove image ($(IMAGE):$(TAG))"
	@echo "  doctor     Run quick diagnostics (nginx -t, dist check, port)"
	@echo "  inspect-health Show image healthcheck config"

## Build the Docker image
build:
	docker build -t $(IMAGE):$(TAG) .

## Run container detached
run:
	docker run -d --name $(CONTAINER) -p $(PORT):80 $(IMAGE):$(TAG)

## Run container in foreground
run-fg:
	docker run --rm --name $(CONTAINER) -p $(PORT):80 $(IMAGE):$(TAG)

## Run with nginx.conf bind-mounted for live config edits
run-mount:
	docker run -d --name $(CONTAINER) -p $(PORT):80 -v $(PWD)/nginx.conf:/etc/nginx/conf.d/default.conf:ro $(IMAGE):$(TAG)

## Stop then run
up: stop rm run

## Stop then run-mount
up-mount: stop rm run-mount

## Stop container
stop:
	- docker stop $(CONTAINER)

## Remove container
rm:
	- docker rm $(CONTAINER)

## Tail logs
logs:
	docker logs -f $(CONTAINER)

## Shell inside container
shell:
	docker exec -it $(CONTAINER) sh

## Validate and reload nginx
reload:
	docker exec $(CONTAINER) nginx -t && docker exec $(CONTAINER) nginx -s reload

## Show container status
ps:
	docker ps --filter name=$(CONTAINER)

## Clean run end-to-end
rebuild: stop rm build run

## Clean run without cache
rebuild-nocache: stop rm
	docker build --no-cache -t $(IMAGE):$(TAG) . && docker run -d --name $(CONTAINER) -p $(PORT):80 $(IMAGE):$(TAG)

## Stop+remove container
clean: stop rm

## Remove image
clean-image:
	- docker rmi $(IMAGE):$(TAG)

## Quick diagnostics
doctor:
	@echo "[1/2] Node & npm versions inside image" && \
	docker run --rm --entrypoint sh $(IMAGE):$(TAG) -c 'node -v && npm -v' || true; \

	echo "\n[2/2] Check if host port $(PORT) is in use" && \
	( lsof -i :$(PORT) || true )

## Show image healthcheck
inspect-health:
	@docker image inspect $(IMAGE):$(TAG) --format '{{json .ContainerConfig.Healthcheck}}' || true

## Build development image (Vite)
## Run container detached (Vite on 3000)
run:
	docker run -d --name $(CONTAINER) -p $(PORT):3000 $(IMAGE):$(TAG)

## Run container in foreground
run-fg:
	docker run --rm --name $(CONTAINER) -p $(PORT):3000 $(IMAGE):$(TAG)

## Run with code mounted for HMR (without overriding node_modules)
run-mount:
	docker run -d --name $(CONTAINER) -e CHOKIDAR_USEPOLLING=1 -p $(PORT):3000 \
	  -v $(PWD)/src:/app/src \
	  -v $(PWD)/index.html:/app/index.html \
	  -v $(PWD)/vite.config.ts:/app/vite.config.ts \
	  -v $(PWD)/tsconfig.json:/app/tsconfig.json \
	  $(IMAGE):$(TAG)
