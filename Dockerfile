# syntax=docker/dockerfile:1

ARG NODE_IMG=node:18.17-alpine

#########################################
# PREPARE DEPS FOR BUILD
######################################### 
FROM --platform=$BUILDPLATFORM ${NODE_IMG} as prepare
WORKDIR /usr/src/app
COPY ["package.json", ".npmrc", "pnpm-lock.yaml", "pnpm-workspace.yaml", "./"]
COPY packages packages
COPY apps apps
COPY server server
RUN find apps \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find server \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

#########################################
# BUILD - Builds all node code
######################################### 
FROM --platform=$BUILDPLATFORM ${NODE_IMG} as build
WORKDIR /usr/src/app
RUN apk fix \
    && apk add --no-cache --update libc6-compat \
    && rm -rf /var/cache/apk/*
ENV npm_config_package_import_method=clone-or-copy
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm \
    && pnpm install -g pnpm turbo \
    && npm uninstall -g pnpm
COPY --from=prepare /usr/src/app ./
RUN pnpm fetch
RUN pnpm install --frozen-lockfile --offline
COPY . .
RUN turbo build \
    && rm -rf "node_modules" apps/*/node_modules packages/*/node_modules
    
#########################################
# PNPM - Dependency of all images
######################################### 
FROM ${NODE_IMG} as pnpm
LABEL org.opencontainers.image.source=https://github.com/navikt/foreldrepengesoknad
WORKDIR /usr/src/app

RUN apk fix \
    && apk add --no-cache --update libc6-compat tini \
    && rm -rf /var/cache/apk/*
ENV npm_config_package_import_method=clone-or-copy
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm \
    && pnpm install -g pnpm \
    && npm uninstall -g pnpm

#########################################
# Server
######################################### 
FROM pnpm as server

COPY --from=prepare /usr/src/app ./

RUN pnpm install --frozen-lockfile --prod --filter server \
    && rm -rf "/root/.local/share/pnpm/store"

# COPY --from=build  /usr/src/app ./