#!/bin/bash

# Step 1: Run the command
if ! pnpm run openapi-ts; then
  echo "❌ Typegenerering feilet. Sjekk error filen som ble generert."
  echo "👉 Husk at du må ha autotest kjørende. Dobbeltsjekk at foreldrepengesoknad-api kjører på samme port som gitt i openapi-ts.config.ts"
  exit 1
fi

# Step 2: Copy the generated file
cp temp-types/types.gen.ts packages/types/src/apiDtoGenerert.ts

# Step 3: Delete the temp folder
rm -rf temp-types

# Step 4: Format types
cd packages/types
pnpm run prettier
pnpm run lint:fix
