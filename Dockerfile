FROM node:18.14.2-alpine as base
LABEL org.opencontainers.image.source=https://github.com/navikt/foreldrepengesoknad
WORKDIR /usr/src/app

RUN apk fix \
    && apk add --no-cache --update libc6-compat \
    && rm -rf /var/cache/apk/*

#########################################
# PNPM
######################################### 
FROM base as pnpm
ENV npm_config_package_import_method=clone-or-copy
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN --mount=type=cache,id=pnpm,sharing=locked,target=/root/.local/share/pnpm/store/v3 \
    npm install -g pnpm \
    && pnpm install -g pnpm turbo \
    && npm uninstall -g pnpm

#########################################
# BUILD
######################################### 
FROM pnpm as build
COPY pnpm-lock.yaml .
RUN --mount=type=cache,id=pnpm,sharing=locked,target=/root/.local/share/pnpm/store/v3 \
    pnpm fetch

COPY . .

RUN --mount=type=cache,id=pnpm,sharing=locked,target=/root/.local/share/pnpm/store/v3 \
    pnpm install --frozen-lockfile --offline \
    && turbo build \
    && rm -rf "node_modules" apps/*/node_modules packages/*/node_modules

#########################################
# FORELDREPENGESOKNAD
######################################### 
FROM pnpm as foreldrepengesoknad
COPY --from=build  /usr/src/app ./

RUN --mount=type=cache,id=pnpm,sharing=locked,target=/root/.local/share/pnpm/store/v3 \
    pnpm install --frozen-lockfile --prod --filter "foreldrepengesoknad..."

CMD ["node", "./apps/foreldrepengesoknad/server.js"]

#########################################
# SVANGERSKAPSPENGESOKNAD
######################################### 
FROM pnpm as svangerskapspengesoknad
COPY --from=build  /usr/src/app ./

RUN --mount=type=cache,id=pnpm,sharing=locked,target=/root/.local/share/pnpm/store/v3 \
    pnpm install --frozen-lockfile --prod --filter "svangerskapspengesoknad..."

CMD ["node", "./apps/svangerskapspengesoknad/server.js"]

#########################################
# ENGANGSSTONAD
######################################### 
FROM pnpm as engangsstonad
COPY --from=build  /usr/src/app ./

RUN --mount=type=cache,id=pnpm,sharing=locked,target=/root/.local/share/pnpm/store/v3 \
    pnpm install --frozen-lockfile --prod --filter "engangsstonad..."

CMD ["node", "./apps/engangsstonad/server.js"]