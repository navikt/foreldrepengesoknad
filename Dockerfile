# syntax=docker/dockerfile:1

# Build and test run on the CI runner (turbo + cache), not in this image.
# This image only packages prebuilt artifacts: bundled server + app dist.
ARG NODE_DEPLOY_IMG=europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim

FROM ${NODE_DEPLOY_IMG}
ENV TZ="Europe/Oslo"
ENV NODE_ENV=production

# App and server are selected through build args from CI.
ARG APP="foreldrepengesoknad"
ARG SERVER="server"

WORKDIR /app

COPY ${SERVER}/dist/index.js /app/index.js
COPY apps/${APP}/dist /app/public

CMD ["index.js"]
