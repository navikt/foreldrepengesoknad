#!/bin/sh

set -e

if [ "$1" = "sh" ]; then
  exec "$@"
else
  echo "Starting $APP"
  for ext in 'mjs' 'cjs' 'js'; do
    file="apps/$APP/server.$ext"
    echo "Checking $file"
    if [ -f "$file" ]; then
      echo "Found server at $file"
      dir=$(dirname "$file")
      cd "$dir"
      exec node "server.$ext"
    fi
  done

  echo "No server file found for $APP"
  exit 1
fi