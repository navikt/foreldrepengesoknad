variable "TAG" {
  default = "latest"
}

variable "GITHUB_REPOSITORY" {
  default = "navikt/foreldrepengesoknad"
}

group "default" {
    targets = ["foreldrepengesoknad", "engangsstonad", "svangerskapspengesoknad", "foreldrepengeoversikt"]
}

target "base" {
    dockerfile="Dockerfile"
    cache-from=["type=gha"]
    cache-to=["type=gha,mode=max"]
}

target "foreldrepengesoknad" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengesoknad:${TAG}"]
    args={
        CMD="foreldrepengesoknad"
    }
}

target "svangerskapspengesoknad" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad:${TAG}"]
    args={
        CMD="svangerskapspengesoknad"
    }
}

target "engangsstonad" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/engangsstonad:${TAG}"]
    args={
        CMD="engangsstonad"
    }
}

target "foreldrepengeoversikt" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt:${TAG}"]
    args={
        CMD="foreldrepengeoversikt"
    }
}