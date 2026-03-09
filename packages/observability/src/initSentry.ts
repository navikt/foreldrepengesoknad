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
            const harStacktraceMedOpprinnelseIVårKode = (event.exception?.values ?? []).some((ex) => {
                const stacktraceMatch = ex.stacktrace?.frames?.find(
                    (frame) => frame.filename && /\/assets\/.*\.js$/.test(frame.filename),
                );

                if (FEIL_VI_VIL_LUKE_BORT.some((feil) => stacktraceMatch?.abs_path?.includes(feil))) {
                    return false;
                }

                return true;
            });
            return harStacktraceMedOpprinnelseIVårKode ? event : null;
        },
    });
};
