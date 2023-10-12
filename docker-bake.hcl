variable "TAG" {
  default = "ny-svp"
}

variable "GITHUB_REPOSITORY" {
  default = "navikt/foreldrepengesoknad"
}

variable "CACHE_TAG" {
  default = "ny-svp"
}

group "default" {
    targets = [ "svangerskapspengesoknad"]
}

target "base" {
    dockerfile="Dockerfile"
    cache-from=[
        "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/build-cache:${CACHE_TAG}",
        "type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/build-cache:master"
    ]
    cache-to=["type=registry,ref=ghcr.io/${GITHUB_REPOSITORY}/build-cache:${CACHE_TAG},mode=max"]
}


target "svangerskapspengesoknad" {
    inherits=["base"]
    tags=["ghcr.io/${GITHUB_REPOSITORY}/svangerskapspengesoknad-rework:${TAG}"]
    args={
        CMD="svangerskapspengesoknad"
    }
}