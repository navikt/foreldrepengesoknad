import * as Sentry from '@sentry/browser';
import ky from 'ky';

export const kyWithSentry = ky.extend({
    hooks: {
        afterResponse: [
            ({ request, response }) => {
                const callId = response.headers.get('Nav-Callid');

                Sentry.addBreadcrumb({
                    type: 'http',
                    category: 'fetch',
                    level: response.ok ? 'info' : 'error',
                    data: {
                        method: request.method,
                        url: response.url,
                        status_code: response.status,
                        ...(callId && { callId }),
                    },
                });
            },
        ],
    },
});
