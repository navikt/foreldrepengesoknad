VERSION 0.6
FROM node:18.14.2-alpine
LABEL org.opencontainers.image.source=https://github.com/navikt/foreldrepengesoknad
WORKDIR /usr/src/app

RUN apk fix \
	&& apk add --no-cache --update libc6-compat \
	&& rm -rf /var/cache/apk/*

pnpm:
    ENV npm_config_package_import_method=clone-or-copy
    ENV PNPM_HOME="/root/.local/share/pnpm"
    ENV PATH="${PATH}:${PNPM_HOME}"
    RUN npm install -g pnpm \
        && pnpm install -g pnpm turbo \
        && npm uninstall -g pnpm

build:
    FROM +pnpm 
    COPY pnpm-lock.yaml .
    RUN pnpm fetch

    COPY . .

    RUN --mount type=cache,target=node_modules/ \
        pnpm install --frozen-lockfile --offline \
        && turbo test \
        && rm -rf apps/*/node_modules packages/*/node_modules

    SAVE ARTIFACT ./ app
    
foreldrepengesoknad:
    FROM +pnpm
    COPY +build/app ./

    RUN pnpm install --frozen-lockfile --prod --filter "foreldrepengesoknad..."

    CMD ["node", "./apps/foreldrepengesoknad/server.js"]

    SAVE IMAGE local/foreldrepengesoknad