#!/bin/sh

set -e

if [ "$1" == "sh" ]; then
  exec "$@"
else
  echo "Starting $APP"
  exec node apps/$APP/server.js
fi