FROM node:18.14.2
LABEL org.opencontainers.image.source=https://github.com/navikt/foreldrepengesoknad
ARG APP
WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY apps/$APP/package.json ./apps/$APP/package.json
COPY packages/fp-common/package.json ./packages/fp-common/package.json

COPY . .

RUN pnpm install
RUN pnpm run build

EXPOSE 8080

CMD ["pnpm", "run", "fp-prod"]
