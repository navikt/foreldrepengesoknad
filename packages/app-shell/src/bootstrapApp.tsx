import dayjs from 'dayjs';
import * as countries from 'i18n-iso-countries';
import { type ReactElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { initSentry } from '@navikt/fp-observability';
import type { LocaleAll } from '@navikt/fp-types';

export interface BootstrapAppOptions {
    /** Sentry DSN for appen. */
    sentryDsn: string;
    /** ID på DOM-noden React skal monteres i. Default `'app'`. */
    containerId?: string;
    /** basename til BrowserRouter. Default `import.meta.env.BASE_URL`. */
    basename?: string;
    /** Hvilke språk appen støtter. Brukes til å registrere dayjs- og i18n-iso-countries-locales. */
    availableLocales: readonly LocaleAll[];
    /** Last @formatjs/intl-pluralrules-polyfill (default true). */
    withPluralRulesPolyfill?: boolean;
    /** Registrer i18n-iso-countries-locales (default true). */
    registerCountryLocales?: boolean;
    /** Default dayjs-locale (default `'nb'`). */
    defaultDayjsLocale?: LocaleAll;
    /** Selve app-roten (typisk `<AppShell>...</AppShell>`). */
    app: ReactElement;
}

const loadDayjsLocales = async (locales: readonly LocaleAll[]) => {
    const loaders: Array<Promise<unknown>> = [];
    if (locales.includes('nb')) {
        loaders.push(import('dayjs/locale/nb.js'));
    }
    if (locales.includes('nn')) {
        loaders.push(import('dayjs/locale/nn.js'));
    }
    if (locales.includes('en')) {
        loaders.push(import('dayjs/locale/en.js'));
    }
    await Promise.all(loaders);
};

const loadCountryLocales = async (locales: readonly LocaleAll[]) => {
    if (locales.includes('nb')) {
        const lang = await import('i18n-iso-countries/langs/nb.json');
        countries.registerLocale(lang.default ?? lang);
    }
    if (locales.includes('nn')) {
        const lang = await import('i18n-iso-countries/langs/nn.json');
        countries.registerLocale(lang.default ?? lang);
    }
    if (locales.includes('en')) {
        const lang = await import('i18n-iso-countries/langs/en.json');
        countries.registerLocale(lang.default ?? lang);
    }
};

const loadPluralRulesPolyfill = async (locales: readonly LocaleAll[]) => {
    await import('@formatjs/intl-pluralrules/polyfill.js');
    if (locales.includes('nb')) {
        await import('@formatjs/intl-pluralrules/locale-data/nb');
    }
    if (locales.includes('nn')) {
        await import('@formatjs/intl-pluralrules/locale-data/nn');
    }
    if (locales.includes('en')) {
        await import('@formatjs/intl-pluralrules/locale-data/en');
    }
};

export const bootstrapApp = async ({
    sentryDsn,
    containerId = 'app',
    basename,
    availableLocales,
    withPluralRulesPolyfill = true,
    registerCountryLocales = true,
    defaultDayjsLocale = 'nb',
    app,
}: BootstrapAppOptions) => {
    if (withPluralRulesPolyfill) {
        await loadPluralRulesPolyfill(availableLocales);
    }
    await loadDayjsLocales(availableLocales);
    if (registerCountryLocales) {
        await loadCountryLocales(availableLocales);
    }

    dayjs.locale(defaultDayjsLocale);
    initSentry({ dsn: sentryDsn });

    const container = document.getElementById(containerId);
    if (!container) {
        return;
    }
    const root = createRoot(container);
    root.render(
        <StrictMode>
            <BrowserRouter basename={basename ?? import.meta.env.BASE_URL}>{app}</BrowserRouter>
        </StrictMode>,
    );
};
