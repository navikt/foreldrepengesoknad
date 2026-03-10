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
                const assetsFrames =
                    ex.stacktrace?.frames?.filter(
                        (frame) => frame.filename && /\/assets\/.*\.js$/.test(frame.filename),
                    ) ?? [];

                if (assetsFrames.length === 0) {
                    return false;
                }

                return assetsFrames.some(
                    (frame) => !FEIL_VI_VIL_LUKE_BORT.some((feil) => frame.abs_path?.includes(feil)),
                );
            });
            return harStacktraceMedOpprinnelseIVårKode ? event : null;
        },
    });
};
