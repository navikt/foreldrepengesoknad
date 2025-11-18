import { AppName } from '@navikt/fp-types';

/**
 * Bruk kun navn fra denne taksonomien. Med utgangspunkt i https://github.com/navikt/analytics-taxonomy utvides etter behov.
 * Den er ikke veldig omstendelig. FOreslår vi legger oss på 'AKSEL-COMPONENT HANDLING'. Feks "button klikk", "radio valgt", "readmore åpnet" osv
 */
type EventNamesTaksonomi =
    | 'accordion åpnet'
    | 'accordion lukket'
    | 'readmore lukket'
    | 'readmore åpnet'
    | 'button klikk'
    | 'kopier'
    | 'skjema fortsett senere'
    | 'skjema avbrutt'
    | 'besøk';

export const loggUmamiEvent = ({
    origin,
    eventName,
    eventData,
}: {
    origin: AppName;
    eventName: EventNamesTaksonomi;
    eventData?: Record<string, string>;
}) => {
    if (process.env.NODE_ENV === 'production') {
        const analytics = globalThis.dekoratorenAnalytics;
        if (analytics) {
            void analytics({
                origin,
                eventName,
                eventData,
            });
        }
    }
};
