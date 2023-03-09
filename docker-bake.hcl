variable "TAG" {
  default = "latest"
}

variable "GITHUB_REPOSITORY" {
  default = "navikt/foreldrepengesoknad"
}

group "default" {
    targets = ["foreldrepengesoknad", "engangsstonad", "svangerskapspengesoknad"]
}

target "base" {
    dockerfile="Dockerfile"
    platforms=["linux/amd64", "linux/arm64"]
}

target "foreldrepengesoknad" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengesoknad:${TAG}"]
    target="test"
    args={
        CMD="./apps/foreldrepengesoknad/server.js"
    }
}

target "svangerskapspengesoknad" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad:${TAG}"]
    target="test"
    args={
        CMD="./apps/svangerskapspengesoknad/server.js"
    }
}

target "engangsstonad" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/engangsstonad:${TAG}"]
    target="test"
    args={
        CMD="./apps/engangsstonad/server.js"
    }
}