FROM node:18.14.2-alpine as base
LABEL org.opencontainers.image.source=https://github.com/navikt/foreldrepengesoknad
WORKDIR /usr/src/app

RUN apk fix \
    && apk add --no-cache --update libc6-compat \
    && rm -rf /var/cache/apk/*

ENV CACHE_BUSTER="whatever"

#########################################
# PNPM
######################################### 
FROM base as pnpm
ENV npm_config_package_import_method=clone-or-copy
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm \
    && pnpm install -g pnpm turbo \
    && npm uninstall -g pnpm

#########################################
# BUILD
######################################### 
FROM pnpm as build
COPY pnpm-lock.yaml .
RUN pnpm fetch

COPY . .

RUN pnpm install --frozen-lockfile --offline \
    && turbo test \
    && rm -rf "node_modules" apps/*/node_modules packages/*/node_modules

#########################################
# FORELDREPENGESOKNAD
######################################### 
FROM pnpm as foreldrepengesoknad
COPY --from=build  /usr/src/app ./

RUN pnpm install --frozen-lockfile --prod --filter "foreldrepengesoknad..."

CMD ["node", "./apps/foreldrepengesoknad/server.js"]

#########################################
# SVANGERSKAPSPENGESOKNAD
######################################### 
FROM pnpm as svangerskapspengesoknad
COPY --from=build  /usr/src/app ./

RUN pnpm install --frozen-lockfile --prod --filter "svangerskapspengesoknad..."

CMD ["node", "./apps/svangerskapspengesoknad/server.js"]

#########################################
# ENGANGSSTONAD
######################################### 
FROM pnpm as engangsstonad
COPY --from=build  /usr/src/app ./

RUN pnpm install --frozen-lockfile --prod --filter "engangsstonad..."

CMD ["node", "./apps/engangsstonad/server.js"]