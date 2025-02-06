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
  targets = ["foreldrepengesoknad", "engangsstonad", "svangerskapspengesoknad", "foreldrepengeoversikt", "planlegger", "veiviser-hvor-mye", "veiviser-fp-eller-es"]
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
    APP    = "foreldrepengesoknad",
    SERVER = "server"
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
    APP    = "svangerskapspengesoknad",
    SERVER = "server"
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
    APP    = "engangsstonad",
    SERVER = "server"
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
    APP    = "foreldrepengeoversikt",
    SERVER = "server"
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
    APP    = "planlegger",
    SERVER = "server-uinnlogget"
  }
}

target "veiviser-fp-eller-es" {
  inherits = ["docker-metadata-action"]
  //   tags     = ["ghcr.io/${GITHUB_REPOSITORY}/veiviser-fp-eller-es:${TAG}"]
  dockerfile = "Dockerfile"

  cache-to = ["type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/veiviser-fp-eller-es/build-cache:${CACHE_TAG},mode=max"]
  cache-from = [
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/veiviser-fp-eller-es/build-cache:${CACHE_TAG}",
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/veiviser-fp-eller-es/build-cache:master"
  ]

  args = {
    APP    = "veiviser-fp-eller-es",
    SERVER = "server-uinnlogget"
  }
}

target "veiviser-hvor-mye" {
  inherits = ["docker-metadata-action"]
  //   tags     = ["ghcr.io/${GITHUB_REPOSITORY}/veiviser-hvor-mye:${TAG}"]
  dockerfile = "Dockerfile"

  cache-to = ["type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/veiviser-hvor-mye/build-cache:${CACHE_TAG},mode=max"]
  cache-from = [
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/veiviser-hvor-mye/build-cache:${CACHE_TAG}",
    "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/veiviser-hvor-mye/build-cache:master"
  ]

  args = {
    APP    = "veiviser-hvor-mye",
    SERVER = "server-uinnlogget"
  }
}
