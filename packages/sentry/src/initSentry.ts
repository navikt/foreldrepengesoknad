import * as Sentry from '@sentry/browser';

type InitSentryOptions = {
    dsn: string;
    beforeSend?: Sentry.BrowserOptions['beforeSend'];
};

export const initSentry = ({ dsn, beforeSend }: InitSentryOptions) => {
    if (import.meta.env.MODE === 'development') {
        return;
    }

    Sentry.init({
        dsn,
        release: import.meta.env.VITE_SENTRY_RELEASE,
        environment: globalThis.location.hostname,
        integrations: [Sentry.breadcrumbsIntegration({ console: false })],
        ...(beforeSend ? { beforeSend } : {}),
    });
};
