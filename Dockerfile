# syntax=docker/dockerfile:1

ARG NODE_BUILD_IMG=node:22-alpine
ARG NODE_DEPLOY_IMG=gcr.io/distroless/nodejs22-debian12
ARG APP="foreldrepengesoknad"
ARG SERVER="server"

#########################################
# PREPARE DEPS FOR BUILD
#########################################
FROM --platform=${BUILDPLATFORM} ${NODE_BUILD_IMG} AS prepare
WORKDIR /usr/src/app
COPY ["package.json", ".npmrc", "pnpm-lock.yaml", "pnpm-workspace.yaml", "./"]
COPY packages packages
COPY apps apps
ARG SERVER
COPY ${SERVER} ${SERVER}
RUN find apps \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find ${SERVER} \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

#########################################
# BUILDER IMAGE - INSTALL PACKAGES AND COPY SOURCE
#########################################
FROM --platform=${BUILDPLATFORM} ${NODE_BUILD_IMG} AS builder
WORKDIR /usr/src/app
RUN apk fix \
    && apk add --no-cache --update libc6-compat \
    && rm -rf /var/cache/apk/*
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"

RUN npm install -g pnpm@10.18.3 \
    && pnpm self-update \
    && npm uninstall -g pnpm
COPY --from=prepare /usr/src/app ./

RUN --mount=type=secret,id=PACKAGES_AUTH_TOKEN \
    PACKAGES_AUTH_TOKEN=$(cat /run/secrets/PACKAGES_AUTH_TOKEN) pnpm install --frozen-lockfile
COPY . .

#########################################
# BUILD SERVER
#########################################
FROM --platform=${BUILDPLATFORM} builder AS server-build
ARG SERVER
WORKDIR /usr/src/app/${SERVER}
RUN pnpm exec turbo test

#########################################
# Client
#########################################
FROM --platform=${BUILDPLATFORM} builder AS client
ARG APP
WORKDIR /usr/src/app/apps/${APP}
RUN pnpm exec turbo test && mv /usr/src/app/apps/${APP}/dist /public

#########################################
# App Distroless
#########################################
FROM ${NODE_DEPLOY_IMG}
ARG SERVER
USER nonroot

COPY --from=server-build /usr/src/app/${SERVER}/dist ./
COPY --from=client /public ./public

CMD ["index.js"]
