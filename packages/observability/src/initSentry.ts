import * as Sentry from '@sentry/browser';

type InitSentryOptions = {
    dsn: string;
};
/**
 * personbruker/decorator-next -> feil fra dekoratøren
 */
const FEIL_VI_VIL_LUKE_BORT = ['personbruker/decorator-next'];

export const initSentry = ({ dsn }: InitSentryOptions) => {
    // if (import.meta.env.MODE === 'development') {
    //     return;
    // }
    console.log('init sentry');

    Sentry.init({
        dsn,
        release: import.meta.env.VITE_SENTRY_RELEASE,
        environment: globalThis.location.hostname,
        integrations: [Sentry.breadcrumbsIntegration({ console: false })],
        beforeSend: (event) => {
            console.log('event', event);
            if (feilVarSomFølgeAvEn401Handling(event)) {
                return null;
            }

            if (feilUtenOpprinnelseIVårKode(event)) {
                return null;
            }

            return event;
        },
    });
};

/**
 * Sjekker først om stacktrace kommer fra en assets fil. Feks "/foreldrepenger/soknad/assets/index-66kDgVTH.js"
 * Disse kan også matche
 */
const feilUtenOpprinnelseIVårKode = (event: Sentry.ErrorEvent) => {
    return (event.exception?.values ?? []).some((ex) => {
        return ex.stacktrace?.frames?.some((frame) => {
            const assetFrame = frame.filename && /\/assets\/.*\.js$/.test(frame.filename);

            if (assetFrame) {
                const erUønsketAssetFrame = FEIL_VI_VIL_LUKE_BORT.some((feil) => frame.filename?.includes(feil));
                if (erUønsketAssetFrame) {
                    return false;
                }

                return true;
            }
            return false;
        });
    });
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
