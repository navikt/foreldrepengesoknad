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
            .replaceAll('{{{APP_SETTINGS}}}', JSON.stringify({ APP_VERSION: 'Lokal mock' }))
            .replaceAll('{{{NAIS_META_TAGS}}}', '')
            .replace(/<\/head\s*>/i, (match) => `${DECORATOR_HEAD_ASSETS}${match}`)
            .replace(/<body[^>]*>/i, (match) => `${match}${DECORATOR_HEADER}`)
            .replace(/<\/body\s*>/i, (match) => `${DECORATOR_FOOTER}${DECORATOR_SCRIPTS}${match}`);
    },
});
