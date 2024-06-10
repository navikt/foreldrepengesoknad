# syntax=docker/dockerfile:1

ARG NODE_IMG=node:20.12-alpine
ARG APP="foreldrepengesoknad"

#########################################
# PREPARE DEPS FOR BUILD
#########################################
FROM --platform=${BUILDPLATFORM} ${NODE_IMG} as prepare
WORKDIR /usr/src/app
COPY ["package.json", ".npmrc", "pnpm-lock.yaml", "pnpm-workspace.yaml", "./"]
COPY packages packages
COPY apps apps
COPY server server
RUN find apps \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find packages \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf
RUN find server \! -name "package.json" -mindepth 2 -maxdepth 2 -print | xargs rm -rf

#########################################
# BUILDER IMAGE - INSTALL PACKAGES AND COPY SOURCE
#########################################
FROM --platform=${BUILDPLATFORM} ${NODE_IMG} as builder
WORKDIR /usr/src/app
RUN apk fix \
    && apk add --no-cache --update libc6-compat \
    && rm -rf /var/cache/apk/*
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm@9.1.4 \
    && pnpm install -g pnpm \
    && npm uninstall -g pnpm
COPY --from=prepare /usr/src/app ./
RUN pnpm install --frozen-lockfile
COPY . .

#########################################
# BUILD SERVER
#########################################
FROM --platform=${BUILDPLATFORM} builder as server-build
RUN cd ./server && pnpm exec turbo build

#########################################
# Client
#########################################
FROM --platform=${BUILDPLATFORM} builder as client
ARG APP="foreldrepengesoknad"

RUN cd ./apps/${APP} && pnpm exec turbo test \
    && mv /usr/src/app/apps/${APP}/dist /public

#########################################
# Server
#########################################
FROM ${NODE_IMG} as server
WORKDIR /usr/src/app

RUN apk fix \
    && apk add --no-cache --update libc6-compat tini \
    && rm -rf /var/cache/apk/*

COPY --from=server-build /usr/src/app/server/dist ./

ENTRYPOINT ["/sbin/tini", "--"]

#########################################
# App
#########################################
FROM server

COPY --from=client /public ./public

CMD ["node", "index.cjs"]
