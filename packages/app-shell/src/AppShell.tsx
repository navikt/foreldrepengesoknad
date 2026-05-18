import { onLanguageSelect, setAvailableLanguages } from '@navikt/nav-dekoratoren-moduler';
import { type QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import dayjs from 'dayjs';
import { type ReactElement, type ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Provider, Theme } from '@navikt/ds-react';
import { en, nb, nn } from '@navikt/ds-react/locales';

import type { AppName, LocaleAll } from '@navikt/fp-types';
import { ByttBrowserModal, ErrorBoundary as FpUiErrorBoundary, IntlProvider } from '@navikt/fp-ui';
import { getDecoratorLanguageCookie } from '@navikt/fp-utils';

export type AvailableLocale = LocaleAll;

export type MessagesByLocale<L extends AvailableLocale> = Record<L, Record<string, string>>;

export interface AppShellProps<L extends AvailableLocale = AvailableLocale> {
    appName: AppName;
    /** Lista med språk appen støtter. Brukes til setAvailableLanguages og initial locale-clamping. */
    availableLocales: readonly L[];
    messagesGroupedByLocale: MessagesByLocale<L>;
    queryClient: QueryClient;
    /** Vis ReactQueryDevtools (default true). */
    withReactQueryDevtools?: boolean;
    /** Vis ByttBrowserModal (default false). */
    withByttBrowserModal?: boolean;
    /** Scroll til topp ved navigasjon (default false). */
    scrollToTopOnNavigation?: boolean;
    /**
     * Bytt ut hele ErrorBoundary med en egen wrapper. Hvis ikke satt brukes
     * fp-ui sin ErrorBoundary med `appName`, `retryCallback` og `customErrorPage`.
     */
    renderErrorBoundary?: (children: ReactNode) => ReactElement;
    retryCallback?: () => void;
    customErrorPage?: ReactElement;
    children: ReactNode;
}

const dsLocaleFor = (locale: AvailableLocale) => {
    switch (locale) {
        case 'nn':
            return nn;
        case 'en':
            return en;
        default:
            return nb;
    }
};

const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        globalThis.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

export const AppShell = ({
    appName,
    availableLocales,
    messagesGroupedByLocale,
    queryClient,
    withReactQueryDevtools = true,
    withByttBrowserModal = false,
    scrollToTopOnNavigation = false,
    renderErrorBoundary,
    retryCallback,
    customErrorPage,
    children,
}: AppShellProps) => {
    const supports = (l: string): l is AvailableLocale => (availableLocales as readonly string[]).includes(l);

    const [locale, setLocale] = useState<AvailableLocale>(() => {
        const cookie = getDecoratorLanguageCookie('decorator-language');
        return supports(cookie) ? cookie : 'nb';
    });

    dayjs.locale(locale);

    useEffect(() => {
        document.documentElement.setAttribute('lang', locale);
    }, [locale]);

    useEffect(() => {
        void setAvailableLanguages(availableLocales.map((l) => ({ locale: l, handleInApp: true })));
        onLanguageSelect((lang) => {
            if (supports(lang.locale)) {
                setLocale(lang.locale);
            }
        });
        // Vi vil bare registrere én gang per app-mount.
    }, []);

    const errorBoundaryWrap =
        renderErrorBoundary ??
        ((inner: ReactNode) => (
            <FpUiErrorBoundary appName={appName} retryCallback={retryCallback} customErrorPage={customErrorPage}>
                {inner}
            </FpUiErrorBoundary>
        ));

    return (
        <IntlProvider
            locale={locale}
            messagesGroupedByLocale={messagesGroupedByLocale as Record<AvailableLocale, Record<string, string>>}
        >
            <Theme theme="light">
                {errorBoundaryWrap(
                    <QueryClientProvider client={queryClient}>
                        {withReactQueryDevtools && <ReactQueryDevtools />}
                        <Provider locale={dsLocaleFor(locale)}>
                            {withByttBrowserModal && <ByttBrowserModal />}
                            {scrollToTopOnNavigation && <ScrollToTop />}
                            {children}
                        </Provider>
                    </QueryClientProvider>,
                )}
            </Theme>
        </IntlProvider>
    );
};
