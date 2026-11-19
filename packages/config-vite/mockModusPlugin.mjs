import { fetchDecoratorHtml } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';

export const fpMockModus = () => ({
    name: 'fp-mock-modus',
    apply: (_config, { command, mode }) => {
        if (mode === 'mock' && command === 'build') {
            throw new Error('Mock-modus skal aldri bygges');
        }

        return mode === 'mock' && command === 'serve';
    },
    async transformIndexHtml(html) {
        const { DECORATOR_HEAD_ASSETS, DECORATOR_HEADER, DECORATOR_FOOTER, DECORATOR_SCRIPTS } =
            await fetchDecoratorHtml({
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
