import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import fs from 'node:fs';

// Brukes i CI, så PR-sjekker ikke avhenger av at dekoratøren i dev svarer. Norsk tekst gjør at tegnsettsjekken fortsatt virker.
const LOKAL_DEKORATOR = {
    DECORATOR_HEAD_ASSETS: '',
    DECORATOR_HEADER: '<div id="decorator-header"><p>Lokal dekoratør: Søk, Få hjelp</p></div>',
    DECORATOR_FOOTER: '<div id="decorator-footer"></div>',
    DECORATOR_SCRIPTS: '',
};

export const fpMockModus = ({ scenarioFil }) => ({
    name: 'fp-mock-modus',
    apply: (_config, { command, mode }) => {
        if (mode === 'mock' && command === 'build') {
            throw new Error('Mock-modus skal aldri bygges');
        }

        return mode === 'mock' && command === 'serve';
    },
    configureServer(server) {
        server.middlewares.use((req, res, next) => {
            const requestPath = req.url?.split('?')[0] ?? '';

            if (!requestPath.endsWith('/__scenarioer')) {
                next();
                return;
            }

            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(fs.readFileSync(scenarioFil));
        });
    },
    async transformIndexHtml(html) {
        const { DECORATOR_HEAD_ASSETS, DECORATOR_HEADER, DECORATOR_FOOTER, DECORATOR_SCRIPTS } =
            process.env.FP_MOCK_DEKORATOR === 'lokal'
                ? LOKAL_DEKORATOR
                : await fetchDecoratorHtml({
                      env: 'dev',
                      params: { simple: false, enforceLogin: false },
                  });

        return html
            .replace(/\{\{\{APP_SETTINGS\}\}\}/g, JSON.stringify({ APP_VERSION: 'Lokal mock' }))
            .replace(/\{\{\{NAIS_META_TAGS\}\}\}/g, '')
            .replace(/<\/head\s*>/i, (match) => `${DECORATOR_HEAD_ASSETS}${match}`)
            .replace(/<body[^>]*>/i, (match) => `${match}${DECORATOR_HEADER}`)
            .replace(/<\/body\s*>/i, (match) => `${DECORATOR_FOOTER}${DECORATOR_SCRIPTS}${match}`);
    },
});
