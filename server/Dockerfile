FROM node:18.17-alpine AS deps

ENV TZ="Europe/Oslo"
ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./
RUN npm ci --frozen-lockfile --ignore-scripts

FROM gcr.io/distroless/nodejs20-debian11:nonroot

ENV TZ="Europe/Oslo"
ENV NODE_ENV production

WORKDIR /app

COPY --from=deps /usr/src/app/node_modules ./node_modules/
COPY ./src/decorator.cjs ./src/
COPY ./server.cjs ./

EXPOSE 8080

CMD ["./server.cjs"]
