FROM node:18
LABEL org.opencontainers.image.source=https://github.com/navikt/foreldrepengesoknad
WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./

RUN pnpm install

COPY . .

EXPOSE 8080

CMD ["pnpm", "run", "fp-prod"]
