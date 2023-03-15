# syntax=docker/dockerfile:1

#########################################
# PREPARE DEPS FOR BUILD
######################################### 
FROM --platform=$BUILDPLATFORM node:18.14.2 as prepare
WORKDIR /usr/src/app

COPY . .

RUN mkdir -p /usr/src/build-deps \
    && cp ./package.json ./.npmrc ./pnpm-lock.yaml ./pnpm-workspace.yaml /usr/src/build-deps/ \
    && mkdir -p /usr/src/build-deps/apps \
    && mkdir -p /usr/src/build-deps/packages \
    && cp --parents apps/*/package.json /usr/src/build-deps/apps/ \
    && cp --parents packages/*/package.json /usr/src/build-deps/packages/

#########################################
# BUILD - Builds all node code
######################################### 
FROM --platform=$BUILDPLATFORM node:18.14.2-alpine as build
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
    
COPY pnpm-lock.yaml .
RUN pnpm fetch

COPY --from=prepare /usr/src/build-deps/* ./

RUN pnpm install --frozen-lockfile --offline

COPY . .

RUN --mount=type=cache,target=/run/turbo,id=turbo \
    mkdir -p /run/turbo \
    && mkdir -p node_modules/.cache \
    && rm -rf node_modules/.cache/turbo \
    && ln -s /run/turbo node_modules/.cache/turbo \
    && turbo test \
    && rm -rf "node_modules" apps/*/node_modules packages/*/node_modules

#########################################
# PNPM - Dependency of all images
######################################### 
FROM node:18.14.2-alpine as pnpm
LABEL org.opencontainers.image.source=https://github.com/navikt/foreldrepengesoknad
WORKDIR /usr/src/app

RUN apk fix \
    && apk add --no-cache --update libc6-compat \
    && rm -rf /var/cache/apk/*
ENV npm_config_package_import_method=clone-or-copy
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm \
    && pnpm install -g pnpm \
    && npm uninstall -g pnpm

#########################################
# NODE DEPENDENCIES
######################################### 
FROM pnpm as prod-deps

COPY --from=prepare /usr/src/build-deps/* ./

RUN pnpm install --frozen-lockfile --prod

COPY --from=build  /usr/src/app ./

#########################################
# PROD IMAGES
######################################### 
FROM prod-deps as prod
ARG CMD
ENV APP=$CMD

ENTRYPOINT ["./docker-entrypoint.sh"]