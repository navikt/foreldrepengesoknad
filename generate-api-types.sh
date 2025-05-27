#!/bin/bash

# Exit on any error
set -e

# Step 1: Run the command
pnpm run openapi-ts

# Step 2: Copy the generated file
cp temp-types/types.gen.ts packages/types/src/apiDtoGenerert.ts

# Step 3: Delete the temp folder
rm -rf temp-types
