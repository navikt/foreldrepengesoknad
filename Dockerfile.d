FROM gcr.io/distroless/nodejs18-debian11:nonroot

LABEL org.opencontainers.image.source=https://github.com/navikt/foreldrepengesoknad
ENV TZ="Europe/Oslo"
ENV NODE_ENV production

WORKDIR /app

COPY ./apps/engangsstonad ./
#COPY ./apps/engangsstonad/* ./

EXPOSE 8080
CMD ["./server.cjs"]
