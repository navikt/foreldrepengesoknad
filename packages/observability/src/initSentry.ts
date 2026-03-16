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
 * 401 skaper mye støy da det er naturlig at folk sine sesjoner utløper. De blir da automatisk redirected til login, og ser ikke feilen engang
 */
const feilVarSomFølgeAvEn401Handling = (event: Sentry.ErrorEvent) => {
    const sisteBreadcrumb = event.breadcrumbs?.at(-1)?.data ?? {};

    if ('status_code' in sisteBreadcrumb) {
        return sisteBreadcrumb.status_code === 401;
    }

    return false;
};
