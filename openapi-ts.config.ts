import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: 'http://localhost:9002/v3/api-docs',
    output: 'temp-types',
    plugins: ['@hey-api/client-fetch'],
});
