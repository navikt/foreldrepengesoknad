FROM gcr.io/distroless/nodejs20-debian11:nonroot

LABEL org.opencontainers.image.source=https://github.com/navikt/fp-planlegger-redirect-produktside
ENV TZ="Europe/Oslo"
ENV NODE_ENV production

WORKDIR /app

COPY ./server.cjs ./

EXPOSE 8080

CMD ["./server.cjs"]
