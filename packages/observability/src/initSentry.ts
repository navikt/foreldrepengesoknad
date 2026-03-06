import * as Sentry from '@sentry/browser';

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
            const harStacktraceMedOpprinnelseIVårKode = (event.exception?.values ?? []).some((ex) =>
                ex.stacktrace?.frames?.some((frame) => frame.filename && /\/assets\/.*\.js$/.test(frame.filename)),
            );
            return harStacktraceMedOpprinnelseIVårKode ? event : null;
        },
    });
};
