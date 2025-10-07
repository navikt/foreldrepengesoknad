#!/usr/bin/env node
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isLokal = process.argv.includes('lokal');

const URL = 'https://fpoversikt.intern.dev.nav.no/fpoversikt/api/openapi.json';
const URL_LOKALT = 'http://localhost:8889/api/openapi.json';

async function generateTypes() {
    try {
        if (isLokal) {
            console.log('Kjører i lokal modus. Henter token fra VTP.');

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

            console.log(`Henter OpenAPI fra: ${URL_LOKALT}`);

            const openApiResponse = execFileSync(
                'curl',
                [
                    '-X',
                    'GET',
                    URL_LOKALT,
                    '-H',
                    `Authorization: Bearer ${tokenLokalt}`,
                    '-H',
                    'Accept: application/json',
                    '-H',
                    'User-Agent: fp-frontend-script/1.0',
                ],
                { encoding: 'utf-8' },
            );

            console.log('Oppdaterer swagger.json');
            fs.writeFileSync('swagger.json', openApiResponse);
        } else {
            console.log('Kjører i remote modus. Henter remote token og OpenAPI.');

            const token = execFileSync(
                'curl',
                [
                    '-s',
                    '-X',
                    'POST',
                    'https://azure-token-generator.intern.dev.nav.no/api/public/m2m',
                    '-d',
                    'aud=dev-fss:teamforeldrepenger:fpsak',
                ],
                { encoding: 'utf-8' },
            ).trim();

            console.log(`Henter OpenAPI fra: ${URL}`);

            const openApiResponse = execFileSync(
                'curl',
                [
                    '-X',
                    'GET',
                    URL,
                    '-H',
                    `Authorization: Bearer ${token}`,
                    '-H',
                    'Accept: application/json',
                    '-H',
                    'User-Agent: fp-frontend-script/1.0',
                ],
                { encoding: 'utf-8' },
            );

            console.log('Oppdaterer swagger.json');
            fs.writeFileSync('swagger.json', openApiResponse);
        }

        console.log('Genererer TS-typer fra swagger.json');
        spawnSync('pnpm', ['run', 'openapi-ts'], { stdio: 'inherit' });

        const isWindows = process.platform === 'win32';
        if (isWindows) {
            spawnSync(
                'cmd',
                ['/c', 'copy', String.raw`temp-types\types.gen.ts`, String.raw`packages\types\src\apiDtoGenerert.ts`],
                {
                    stdio: 'inherit',
                },
            );
            spawnSync('cmd', ['/c', 'rmdir', '/s', '/q', 'temp-types'], { stdio: 'inherit' });
        } else {
            spawnSync('cp', ['temp-types/types.gen.ts', 'packages/types/src/apiDtoGenerert.ts'], { stdio: 'inherit' });
            spawnSync('rm', ['-rf', 'temp-types'], { stdio: 'inherit' });
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
