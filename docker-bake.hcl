variable "TAG-AUTOTEST" {
  default = "latest"
}

variable "TAG-PROD" {
  default = "latest"
}

variable "GITHUB_REPOSITORY" {
  default = "navikt/sommerprosjekt23-svp"
}

group "default" {
    targets = ["svangerskapspengesoknad", "foreldrepengeoversikt"]
}

target "base" {
    dockerfile="Dockerfile"
    platforms=["linux/amd64", "linux/arm64"]
    cache-from=["type=gha"]
    cache-to=["type=gha,mode=max"]
}

target "svangerskapspengesoknad" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad:${TAG-PROD}"]
    target="prod"
    args={
        CMD="svangerskapspengesoknad"
    }
}

target "foreldrepengeoversikt" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt:${TAG-AUTOTEST}", "ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt:${TAG-PROD}"]
    target="prod"
    args={
        CMD="foreldrepengeoversikt"
    }
}