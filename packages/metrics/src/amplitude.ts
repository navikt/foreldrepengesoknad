/**
 * Jeg tenker denne typen bør matche app-name i nais.
 */
export type AppOrigin =
    | 'engangsstonad'
    | 'foreldrepengeoversikt'
    | 'foreldrepengesoknad'
    | 'planlegger'
    | 'svangerskapspengesoknad'
    | 'veiviser-fp-eller-es'
    | 'veiviser-hva-skjer-nar'
    | 'veiviser-hvor-mye';

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

export const loggAmplitudeEvent = ({
    origin,
    eventName,
    eventData,
}: {
    origin: AppOrigin;
    eventName: EventNamesTaksonomi;
    eventData?: Record<string, string>;
}) => {
    if (process.env.NODE_ENV === 'production') {
        // @ts-ignore -- ts-expect-error sier den er unused. Men uten ts-ignore så feil tsc
        window.dekoratorenAmplitude({
            origin,
            eventName,
            eventData,
        });
    }
};
