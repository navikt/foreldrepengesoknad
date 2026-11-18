#!/usr/bin/env node

import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { chromium } from 'playwright';
import { build, createServer } from 'vite';

const MOCK_MARKØRER = ['mockServiceWorker.js', 'fp-mock-scenario', '__scenarioer'];

const finnMockKodeIProdBygg = async () => {
    const outDir = await fs.mkdtemp(path.join(os.tmpdir(), 'fp-mock-royktest-'));

    try {
        await build({ mode: 'production', logLevel: 'error', build: { outDir, emptyOutDir: true } });
        const filer = (await fs.readdir(outDir, { recursive: true })).filter((fil) => /\.(js|html)$/.test(fil));
        const treff = await Promise.all(
            filer.map(async (fil) => {
                const innhold = await fs.readFile(path.join(outDir, fil), 'utf8');
                return MOCK_MARKØRER.filter((markør) => innhold.includes(markør)).map((markør) => `${fil}: ${markør}`);
            }),
        );
        return treff.flat();
    } finally {
        await fs.rm(outDir, { recursive: true, force: true });
    }
};

const mockKodeIProd = await finnMockKodeIProdBygg();

if (mockKodeIProd.length > 0) {
    console.error(`Prod-bygget inneholder mock-kode:\n${mockKodeIProd.join('\n')}`);
    process.exit(1);
}

const scenarioer = JSON.parse(await fs.readFile('src/mock/scenarioer.json', 'utf8'));
// Et annet scenario enn standardverdien, slik at testen fanger feil i valg og lagring av scenario.
const scenarioId = Object.keys(scenarioer).find((id) => id !== 'standard') ?? 'standard';
const scenario = scenarioer[scenarioId];

const server = await createServer({
    mode: 'mock',
    server: { port: 0, strictPort: false },
});
let browser;

try {
    await server.listen();
    const appUrl = server.resolvedUrls.local[0].replace(/\/$/, '');
    browser = await chromium.launch({ headless: true });

    const page = await browser.newPage();
    const failures = [];
    const consoleErrors = [];

    page.on('pageerror', (error) => failures.push(`JavaScript-feil: ${error.message}`));
    page.on('console', (message) => {
        if (message.type() === 'error') {
            consoleErrors.push(message.text());
        }
    });

    const sjekk = async (steg, sjekker) => {
        const resultater = await Promise.allSettled(sjekker.map(([, sjekkFn]) => sjekkFn()));
        resultater.forEach((resultat, index) => {
            if (resultat.status === 'rejected') {
                failures.push(`${steg}, ${sjekker[index][0]}: ${resultat.reason.message}`);
            }
        });
    };
    const scenarioSjekker = [
        [
            'scenario-attributt',
            () => page.waitForSelector(`html[data-mock-scenario="${scenarioId}"]`, { timeout: 30000 }),
        ],
        ['kjennetegn', () => page.getByText(scenario.kjennetegn).first().waitFor({ state: 'visible', timeout: 30000 })],
    ];

    await page.goto(`${appUrl}${scenario.startsti}?scenario=${scenarioId}`);
    await sjekk('Valg via URL', [
        ...scenarioSjekker,
        ['Nav-dekoratør', () => page.locator('#decorator-header').waitFor({ state: 'visible', timeout: 30000 })],
    ]);

    const dekoratørTekst = await page
        .locator('#decorator-header')
        .innerText({ timeout: 1000 })
        .catch(() => '');
    if (dekoratørTekst.includes('Ã')) {
        failures.push('Dekoratøren har feil tegnsett. Mangler <meta charset="utf-8"> i index.html?');
    }

    await page.goto(`${appUrl}${scenario.startsti}`);
    await sjekk('Lagret valg uten parameter', scenarioSjekker);

    failures.push(...consoleErrors.filter((m) => m.includes('[MSW]')).map((m) => `MSW-konsollfeil: ${m}`));

    const ukjentKall = await page.evaluate(async (url) => {
        try {
            const respons = await fetch(url);
            return `svarte med ${respons.status}`;
        } catch {
            return 'avvist';
        }
    }, `${appUrl}/fpukjent/api/finnes-ikke`);

    if (ukjentKall !== 'avvist') {
        failures.push(`API-kall uten handler ble ikke avvist av MSW, men ${ukjentKall}`);
    }

    if (failures.length > 0) {
        throw new Error(`Røyktest feilet (scenario "${scenarioId}"):\n${failures.join('\n')}`);
    }

    console.log(`Røyktest OK (scenario "${scenarioId}")`);
} catch (error) {
    console.error(error.message);
    process.exitCode = 1;
} finally {
    await browser?.close();
    await server.close();
}

// Dekoratør-biblioteket holder en oppdateringslytter i live, så prosessen avslutter ikke av seg selv.
process.exit();
