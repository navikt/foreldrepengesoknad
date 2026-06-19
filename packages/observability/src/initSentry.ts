import * as Sentry from '@sentry/browser';

import {
    DISTRIBUTOR_PATTERN,
    DOM_OVERSETTELSE_FEIL,
    harDistributorStacktrace,
    harUtenforstaendeKodeOpprinnelse,
} from './filterUtils';

type InitSentryOptions = {
    dsn: string;
};

export const initSentry = ({ dsn }: InitSentryOptions) => {
    if (import.meta.env.MODE === 'development') {
        return;
    }

    Sentry.init({
        dsn,
        release: import.meta.env.VITE_SENTRY_RELEASE,
        environment: globalThis.location.hostname,
        integrations: [Sentry.breadcrumbsIntegration({ console: false })],
        beforeSend: (event) => {
            if (feilVarSomFølgeAvEn401Handling(event)) {
                return null;
            }

            if (feilUtenOpprinnelseIVårKode(event)) {
                return null;
            }

            if (feilFraBrowserExtensions(event)) {
                return null;
            }

            if (feilFraDomOversettelse(event)) {
                return null;
            }

            if (feilFraHasFocus(event)) {
                return null;
            }

            return event;
        },
    });
};

/**
 * 401 skaper mye støy da det er naturlig at folk sine sesjoner utløper. De blir da automatisk redirected til login, og ser ikke feilen engang
 */
const feilVarSomFølgeAvEn401Handling = (event: Sentry.ErrorEvent) => {
    return (event.breadcrumbs ?? []).some((breadcrumb) => breadcrumb.data?.status_code === 401);
};

/**
 * Sjekker om minst én exception har stacktrace uten opprinnelse i vår kode.
 * Se harUtenforstaendeKodeOpprinnelse for detaljert logikk.
 */
const feilUtenOpprinnelseIVårKode = (event: Sentry.ErrorEvent) => {
    return (event.exception?.values ?? []).some((ex) => {
        const frames = ex.stacktrace?.frames;
        return frames ? harUtenforstaendeKodeOpprinnelse(frames) : false;
    });
};

/**
 * Nettleserutvidelser som f.eks. taleassistenter (Speech Assist) genererer mange "Request timeout ...Distributor.getValue"-feil.
 * Disse er ikke våre feil, og vi vil ikke ha dem i Sentry.
 */
const feilFraBrowserExtensions = (event: Sentry.ErrorEvent) => {
    const harDistributorBreadcrumbs = (event.breadcrumbs ?? []).some(
        (breadcrumb) => breadcrumb.message && DISTRIBUTOR_PATTERN.test(breadcrumb.message),
    );

    const harDistributorIStack = (event.exception?.values ?? []).some((ex) => {
        const frames = ex.stacktrace?.frames;
        return frames ? harDistributorStacktrace(frames) : false;
    });

    return harDistributorBreadcrumbs || harDistributorIStack;
};

/**
 * Nettleseren sine oversettelsesverktøy (f.eks. Google Translate / Chrome "oversett siden") bytter ut tekstnoder
 * og pakker dem i egne elementer. Når React seinare skal avmontere subtreet, er noden ikkje lenger eit direkte barn
 * av forelderen, og commit-fasen kastar "Failed to execute 'removeChild'/'insertBefore' on 'Node': The node ...
 * is not a child of this node". Dette er ikkje vår feil og kan ikkje fiksast i koden vår, så vi luker det bort.
 */
const feilFraDomOversettelse = (event: Sentry.ErrorEvent) => {
    return (event.exception?.values ?? []).some((ex) => ex.value && DOM_OVERSETTELSE_FEIL.test(ex.value));
};

/**
 * Enkelte nettlesere/innebygde nettlesere (typisk Mobile Safari / webview i apper) injiserer eller kaller `window.hasFocus()`,
 * som ikke finnes (den standardiserte er `document.hasFocus()`). Dette skjer utenfor vår kode og gir mye støy i Sentry,
 * så vi luker det bort. Feilmeldingen varierer litt mellom nettlesere (f.eks. `window.hasFocus`/`globalThis.hasFocus`).
 */
const HAS_FOCUS_FEIL = /\b(window|globalThis|self)\.hasFocus is not a function/i;

const feilFraHasFocus = (event: Sentry.ErrorEvent) => {
    return (event.exception?.values ?? []).some((ex) => ex.value && HAS_FOCUS_FEIL.test(ex.value));
};
