variable "TAG" {
  default = "latest"
}

variable "GITHUB_REPOSITORY" {
  default = "navikt/foreldrepengesoknad"
}

variable "CACHE_TAG" {
  default = "latest"
}

group "default" {
    targets = ["foreldrepengesoknad", "engangsstonad", "svangerskapspengesoknad", "foreldrepengeoversikt"]
}

target "base" {
    dockerfile="Dockerfile"
    cache-from=[
        "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/build-cache:${CACHE_TAG}",
        "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/build-cache:master"
    ]
    cache-to=["type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/build-cache:${CACHE_TAG},mode=max"]
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