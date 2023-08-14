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
    targets = ["foreldrepengesoknad-amd", "engangsstonad-amd", "svangerskapspengesoknad-amd", "foreldrepengeoversikt-amd", "foreldrepengesoknad-arm", "engangsstonad-arm", "svangerskapspengesoknad-arm", "foreldrepengeoversikt-arm"]
}

target "base-amd" {
    dockerfile="Dockerfile"
    platforms=["linux/amd64"]
    cache-from=["type=gha"]
    cache-to=["type=gha,mode=max"]
}

target "base-arm" {
    dockerfile="Dockerfile"
    platforms=["linux/arm64"]
    cache-from=["type=gha"]
    cache-to=["type=gha,mode=max"]
}

target "foreldrepengesoknad-amd" {
    inherits=["base-amd"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengesoknad:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/foreldrepengesoknad:${TAG-PROD}"]
    target="prod"
    args={
        CMD="foreldrepengesoknad"
    }
}

target "svangerskapspengesoknad-amd" {
    inherits=["base-amd"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad:${TAG-PROD}"]
    target="prod"
    args={
        CMD="svangerskapspengesoknad"
    }
}

target "engangsstonad-amd" {
    inherits=["base-amd"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/engangsstonad:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/engangsstonad:${TAG-PROD}"]
    target="prod"
    args={
        CMD="engangsstonad"
    }
}

target "foreldrepengeoversikt-amd" {
    inherits=["base-amd"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt:${TAG-PROD}"]
    target="prod"
    args={
        CMD="foreldrepengeoversikt"
    }
}

target "foreldrepengesoknad-arm" {
    inherits=["base-arm"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengesoknad:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/foreldrepengesoknad:${TAG-PROD}"]
    target="prod"
    args={
        CMD="foreldrepengesoknad"
    }
}

target "svangerskapspengesoknad-arm" {
    inherits=["base-arm"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad:${TAG-PROD}"]
    target="prod"
    args={
        CMD="svangerskapspengesoknad"
    }
}

target "engangsstonad-arm" {
    inherits=["base-arm"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/engangsstonad:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/engangsstonad:${TAG-PROD}"]
    target="prod"
    args={
        CMD="engangsstonad"
    }
}

target "foreldrepengeoversikt-arm" {
    inherits=["base-arm"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt:${TAG-PROD}"]
    target="prod"
    args={
        CMD="foreldrepengeoversikt"
    }
}