variable "TAG-AUTOTEST" {
  default = "latest"
}

variable "TAG-PROD" {
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
    platforms=["linux/amd64", "linux/arm64"]
    cache-from=["type=gha"]
    cache-to=["type=gha,mode=max"]
}

target "foreldrepengesoknad" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengesoknad:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/foreldrepengesoknad:${TAG-PROD}"]
    args={
        CMD="foreldrepengesoknad"
    }
}

target "svangerskapspengesoknad" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad:${TAG-PROD}"]
    args={
        CMD="svangerskapspengesoknad"
    }
}

target "engangsstonad" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/engangsstonad:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/engangsstonad:${TAG-PROD}"]
    args={
        CMD="engangsstonad"
    }
}

target "foreldrepengeoversikt" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt:${TAG-PROD}"]
    args={
        CMD="foreldrepengeoversikt"
    }
}