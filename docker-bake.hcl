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
  targets = ["foreldrepengesoknad", "engangsstonad", "svangerskapspengesoknad", "foreldrepengeoversikt", "planlegger", "veivisere"]
}

target "docker-metadata-action" {}

target "foreldrepengesoknad" {
  inherits = ["docker-metadata-action"]
  //   tags     = ["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengesoknad:${TAG}"]
  dockerfile = "Dockerfile"

  cache-to = ["type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/foreldrepengesoknad/build-cache:${CACHE_TAG},mode=max"]
  cache-from = [
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/foreldrepengesoknad/build-cache:${CACHE_TAG}",
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/foreldrepengesoknad/build-cache:master"
  ]

  args = {
    APP = "foreldrepengesoknad"
  }
}

target "svangerskapspengesoknad" {
  inherits = ["docker-metadata-action"]
  //   tags     = ["ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad:${TAG}"]
  dockerfile = "Dockerfile"

  cache-to = ["type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad/build-cache:${CACHE_TAG},mode=max"]
  cache-from = [
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad/build-cache:${CACHE_TAG}",
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad/build-cache:master"
  ]

  args = {
    APP = "svangerskapspengesoknad"
  }
}

target "engangsstonad" {
  inherits = ["docker-metadata-action"]
  //   tags     = ["ghcr.io/${GITHUB_REPOSITORY}/engangsstonad:${TAG}"]
  dockerfile = "Dockerfile"

  cache-to = ["type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/engangsstonad/build-cache:${CACHE_TAG},mode=max"]
  cache-from = [
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/engangsstonad/build-cache:${CACHE_TAG}",
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/engangsstonad/build-cache:master"
  ]

  args = {
    APP = "engangsstonad"
  }
}

target "foreldrepengeoversikt" {
  inherits = ["docker-metadata-action"]
  //   tags     = ["ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt:${TAG}"]
  dockerfile = "Dockerfile"

  cache-to = ["type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt/build-cache:${CACHE_TAG},mode=max"]
  cache-from = [
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt/build-cache:${CACHE_TAG}",
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/foreldrepengeoversikt/build-cache:master"
  ]

  args = {
    APP = "foreldrepengeoversikt"
  }
}

target "planlegger" {
  inherits = ["docker-metadata-action"]
  //   tags     = ["ghcr.io/${GITHUB_REPOSITORY}/planlegger:${TAG}"]
  dockerfile = "Dockerfile"

  cache-to = ["type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/planlegger/build-cache:${CACHE_TAG},mode=max"]
  cache-from = [
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/planlegger/build-cache:${CACHE_TAG}",
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/planlegger/build-cache:master"
  ]

  args = {
    APP = "planlegger"
  }
}

target "veivisere" {
  inherits = ["docker-metadata-action"]
  //   tags     = ["ghcr.io/${GITHUB_REPOSITORY}/veivisere:${TAG}"]
  dockerfile = "Dockerfile"

  cache-to = ["type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/veivisere/build-cache:${CACHE_TAG},mode=max"]
  cache-from = [
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/veivisere/build-cache:${CACHE_TAG}",
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/veivisere/build-cache:master"
  ]

  args = {
    APP = "veivisere"
  }
}