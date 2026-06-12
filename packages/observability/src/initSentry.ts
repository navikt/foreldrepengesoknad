import * as Sentry from '@sentry/browser';

type InitSentryOptions = {
    dsn: string;
};
/**
 * personbruker/decorator-next -> feil fra dekoratøren
 */
const FEIL_VI_VIL_LUKE_BORT = ['personbruker/decorator-next'];

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

            return event;
        },
    });
};

/**
 * Sjekker først om stacktrace kommer fra en assets fil. Feks "/foreldrepenger/soknad/assets/index-66kDgVTH.js"
 * Disse kan også matche dekoratøren. Så gjør deretter en sjekk om dekoratøren er involvert
 */
const feilUtenOpprinnelseIVårKode = (event: Sentry.ErrorEvent) => {
    return (event.exception?.values ?? []).some((ex) => {
        return ex.stacktrace?.frames?.some((frame) => {
            const assetFrame = frame.filename && /\/assets\/.*\.js$/.test(frame.filename);

            if (assetFrame) {
                const erUønsketAssetFrame = FEIL_VI_VIL_LUKE_BORT.some((feil) => frame.filename?.includes(feil));
                if (erUønsketAssetFrame) {
                    return true;
                }

                return false;
            }
            return true;
        });
    });
};

/**
 * Nettleserutvidelser som f.eks. taleassistenter (Speech Assist) genererer mange "Request timeout ...Distributor.getValue"-feil.
 * Disse er ikke våre feil, og vi vil ikke ha dem i Sentry.
 */
const feilFraBrowserExtensions = (event: Sentry.ErrorEvent) => {
    const distributorPattern = /Request timeout \S*Distributor\.\S+/;

    const harDistributorBreadcrumbs = (event.breadcrumbs ?? []).some(
        (breadcrumb) => breadcrumb.message && distributorPattern.test(breadcrumb.message),
    );

    const harDistributorStacktrace = (event.exception?.values ?? []).some((ex) =>
        ex.stacktrace?.frames?.some(
            (frame) =>
                (frame.filename && distributorPattern.test(frame.filename)) ||
                (frame.function && distributorPattern.test(frame.function)),
        ),
    );

    return harDistributorBreadcrumbs || harDistributorStacktrace;
};

/**
 * Nettleseren sine oversettelsesverktøy (f.eks. Google Translate / Chrome "oversett siden") bytter ut tekstnoder
 * og pakker dem i egne element. Når React seinare skal avmontere subtreet, er noden ikkje lenger eit direkte barn
 * av forelderen, og commit-fasen kastar "Failed to execute 'removeChild'/'insertBefore' on 'Node': The node ...
 * is not a child of this node". Dette er ikkje vår feil og kan ikkje fiksast i koden vår, så vi luker det bort.
 */
const DOM_OVERSETTELSE_FEIL = /(removeChild|insertBefore)[\s\S]*not a child of this node/i;

const feilFraDomOversettelse = (event: Sentry.ErrorEvent) => {
    return (event.exception?.values ?? []).some((ex) => ex.value && DOM_OVERSETTELSE_FEIL.test(ex.value));
};

/**
 * 401 skaper mye støy da det er naturlig at folk sine sesjoner utløper. De blir da automatisk redirected til login, og ser ikke feilen engang
 */
const feilVarSomFølgeAvEn401Handling = (event: Sentry.ErrorEvent) => {
    return (event.breadcrumbs ?? []).some((breadcrumb) => breadcrumb.data?.status_code === 401);
};
