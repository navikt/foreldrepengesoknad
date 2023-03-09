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

COPY . .

RUN pnpm install --frozen-lockfile --offline \
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
COPY . .
RUN pnpm install --frozen-lockfile --prod

COPY --from=build  /usr/src/app ./

#########################################
# FORELDREPENGESOKNAD
######################################### 
FROM prod-deps as foreldrepengesoknad
CMD ["node", "./apps/foreldrepengesoknad/server.js"]

#########################################
# SVANGERSKAPSPENGESOKNAD
######################################### 
FROM prod-deps as svangerskapspengesoknad
CMD ["node", "./apps/svangerskapspengesoknad/server.js"]

#########################################
# ENGANGSSTONAD
######################################### 
FROM prod-deps as engangsstonad
CMD ["node", "./apps/engangsstonad/server.js"]

#########################################
# START SERVER
######################################### 
FROM prod-deps as test
ARG CMD
CMD ["node", "${CMD}"]
