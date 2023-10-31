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

target "docker-metadata-action" {}

target "base" {
  dockerfile = "Dockerfile"

  cache-to = ["type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/build-cache:${CACHE_TAG},mode=max"]
  cache-from = [
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/build-cache:${CACHE_TAG}",
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/build-cache:master"
  ]
}

target "foreldrepengesoknad" {
  inherits = ["base", "docker-metadata-action"]
  //   tags     = ["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengesoknad:${TAG}"]

  args = {
    APP = "foreldrepengesoknad"
  }
}

target "svangerskapspengesoknad" {
  inherits = ["base", "docker-metadata-action"]
  //   tags     = ["ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad:${TAG}"]

  args = {
    APP = "svangerskapspengesoknad"
  }
}

target "engangsstonad" {
  inherits = ["base", "docker-metadata-action"]
  //   tags     = ["ghcr.io/${GITHUB_REPOSITORY}/engangsstonad:${TAG}"]

  args = {
    APP = "engangsstonad"
  }
}

target "foreldrepengeoversikt" {
  inherits = ["base", "docker-metadata-action"]
  //   tags     = ["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt:${TAG}"]

  args = {
    APP = "foreldrepengeoversikt"
  }
}