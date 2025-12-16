import { AppName } from '@navikt/fp-types';

// Ambient global variable provided by dekoratoren runtime script. Declared inline so consuming packages see it when this file is compiled.
declare global {
    var dekoratorenAnalytics:
        | ((params?: { origin: string; eventName: string; eventData?: Record<string, unknown> }) => Promise<unknown>)
        | undefined;
}

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
    | 'tab klikk'
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
        const analytics = typeof dekoratorenAnalytics === 'function' ? dekoratorenAnalytics : undefined;
        if (analytics) {
            void analytics({
                origin,
                eventName,
                eventData,
            });
        }
    }
};
