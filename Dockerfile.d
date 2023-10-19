FROM gcr.io/distroless/nodejs18-debian11:nonroot

LABEL org.opencontainers.image.source=https://github.com/navikt/foreldrepengesoknad/engangsstonad
ENV TZ="Europe/Oslo"
ENV NODE_ENV production

WORKDIR /app

COPY ./apps/engangsstonad/dist/ ./dist
COPY ./apps/engangsstonad/src/build/ ./src/build
COPY ./server ./

EXPOSE 8080
CMD ["./server.cjs"]
