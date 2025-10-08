#!/usr/bin/env node
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isLokal = process.argv.includes('lokal');

const SOURCES = [
    {
        name: 'fpoversikt',
        url: 'https://fpoversikt.intern.dev.nav.no/fpoversikt/api/openapi.json',
        localUrl: 'http://localhost:8889/api/openapi.json',
        aud: 'dev-gcp:teamforeldrepenger:fpoversikt',
    },
    {
        name: 'fpsoknad',
        url: 'https://fpsoknad.intern.dev.nav.no/fpsoknad/api/openapi.json',
        localUrl: 'http://localhost:8999/api/openapi.json',
        aud: 'dev-gcp:teamforeldrepenger:fpsoknad',
    },
];

async function fetchOpenApi({ name, url, localUrl, aud }) {
    const swaggerPath = path.resolve(`${name}.json`);

    if (isLokal) {
        console.log(`\n==> [${name}] Kjører i lokal modus. Henter token fra VTP.`);
        const tokenResponse = execFileSync(
            'curl',
            [
                '-X',
                'POST',
                'http://localhost:8060/rest/azuread/token',
                '-H',
                'Content-Type: application/x-www-form-urlencoded',
                '--data-urlencode',
                'grant_type=authorization_code',
                '--data-urlencode',
                'code=S123456',
                '--data-urlencode',
                'client_id=autotest',
                '--data-urlencode',
                'scope=api://vtp.teamforeldrepenger.vtp/.default',
            ],
            { encoding: 'utf-8' },
        );

        const tokenMatch = tokenResponse.match(/"id_token":"([^"]+)"/);
        if (!tokenMatch) throw new Error('Could not extract token from response');
        const tokenLokalt = tokenMatch[1];

        console.log(`Henter OpenAPI fra: ${localUrl}`);
        const openApiResponse = execFileSync(
            'curl',
            [
                '-s',
                '-X',
                'GET',
                localUrl,
                '-H',
                `Authorization: Bearer ${tokenLokalt}`,
                '-H',
                'Accept: application/json',
                '-H',
                'User-Agent: fp-frontend-script/1.0',
            ],
            { encoding: 'utf-8' },
        );

        fs.writeFileSync(swaggerPath, openApiResponse);
    } else {
        console.log(`\n==> [${name}] Kjører i remote modus. Henter token og OpenAPI.`);
        const token = execFileSync(
            'curl',
            ['-s', '-X', 'POST', 'https://azure-token-generator.intern.dev.nav.no/api/public/m2m', '-d', `aud=${aud}`],
            { encoding: 'utf-8' },
        ).trim();

        console.log(`Henter OpenAPI fra: ${url}`);
        const openApiResponse = execFileSync(
            'curl',
            [
                '-s',
                '-X',
                'GET',
                url,
                '-H',
                `Authorization: Bearer ${token}`,
                '-H',
                'Accept: application/json',
                '-H',
                'User-Agent: fp-frontend-script/1.0',
            ],
            { encoding: 'utf-8' },
        );

        fs.writeFileSync(swaggerPath, openApiResponse);
    }

    console.log(`Swagger lagret: ${swaggerPath}`);
    return swaggerPath;
}

async function generateTypes() {
    try {
        for (const source of SOURCES) {
            await fetchOpenApi(source);
        }

        spawnSync('pnpm', ['run', 'openapi-ts'], { stdio: 'inherit' });

        console.log('\n==> Kopierer genererte typer');
        const isWindows = process.platform === 'win32';

        for (const source of SOURCES) {
            if (isWindows) {
                spawnSync(
                    'cmd',
                    [
                        '/c',
                        'copy',
                        String.raw`temp-${source.name}-types\types.gen.ts`,
                        String.raw`packages\types\src\${source.name}DtoGenerert.ts`,
                    ],
                    {
                        stdio: 'inherit',
                    },
                );
                spawnSync('cmd', ['/c', 'rmdir', '/s', '/q', `temp-${source.name}-types`], { stdio: 'inherit' });
            } else {
                spawnSync(
                    'cp',
                    [`temp-${source.name}-types/types.gen.ts`, `packages/types/src/${source.name}DtoGenerert.ts`],
                    {
                        stdio: 'inherit',
                    },
                );
                spawnSync('rm', ['-rf', `temp-${source.name}-types`], { stdio: 'inherit' });
            }
        }

        process.chdir('packages/types');
        spawnSync('pnpm', ['prettier', '--log-level', 'silent'], { stdio: 'pipe' });
        spawnSync('pnpm', ['lint:fix'], { stdio: 'pipe' });

        console.log('Script ferdig!');
    } catch (error) {
        console.error('Error:', error.message);
        process.exit(1);
    }
}

try {
    await generateTypes();
} catch (error) {
    console.error(error);
    process.exit(1);
}
