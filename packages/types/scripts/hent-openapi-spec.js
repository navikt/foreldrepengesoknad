#!/usr/bin/env node
/* eslint-disable no-console */
import fs from 'node:fs';

// eslint-disable-next-line no-undef
const isLokal = process.argv.includes('lokal');

const SOURCES = [
    {
        name: 'fpoversikt',
        url: 'https://fpoversikt.intern.dev.nav.no/fpoversikt/api/openapi.json',
        localUrl: 'http://localhost:8889/fpoversikt/api/openapi.json',
        aud: 'dev-gcp:teamforeldrepenger:fpoversikt',
    },
    {
        name: 'fpsoknad',
        url: 'https://fpsoknad.intern.dev.nav.no/fpsoknad/api/openapi.json',
        localUrl: 'http://localhost:8999/fpsoknad/api/openapi.json',
        aud: 'dev-gcp:teamforeldrepenger:fpsoknad',
    },
];

async function hentToken(aud) {
    if (isLokal) {
        console.log('Henter token fra VTP.');
        const res = await fetch('http://localhost:8060/rest/azuread/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code: 'S123456',
                client_id: 'autotest',
                scope: 'api://vtp.teamforeldrepenger.vtp/.default',
            }).toString(),
        });
        const data = await res.json();
        if ('id_token' in data) {
            return data.id_token;
        } else {
            throw new Error('Could not extract id_token from response');
        }
    } else {
        console.log('Henter remote token fra Azure Token Generator.');
        const res = await fetch('https://azure-token-generator.intern.dev.nav.no/api/public/m2m', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                aud,
            }).toString(),
        });
        return res.text();
    }
}

async function hentOpenAPISpec(source, token) {
    const fileName = `${source.name}-swagger.json`;
    const url = isLokal ? source.localUrl : source.url;
    console.log(`Henter OpenAPI spec fra: ${url}`);
    const res = await fetch(url, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'User-Agent': 'foreldrepengesoknad-script/1.0',
        },
    });
    const json = await res.text();
    console.log(`Oppdaterer ${fileName}`);
    fs.writeFileSync(fileName, json);
}

try {
    console.log(`Kjører i ${isLokal ? 'lokal' : 'remote'} modus.`);

    for (const source of SOURCES) {
        const token = await hentToken(source.aud);
        await hentOpenAPISpec(source, token);
    }
} catch (error) {
    console.error(error);
    // eslint-disable-next-line no-undef
    process.exit(1);
}
