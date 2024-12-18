import { AppName } from '@navikt/fp-types';

//Bruk kun navn fra taksonomien. Med utgangspunkt i https://github.com/navikt/analytics-taxonomy
type EventNamesTaksonomi = 'readmore lukket' | 'readmore åpnet' | 'switch åpnet' | 'switch lukket';

export const loggAmplitudeEvent = ({
    origin,
    eventName,
    eventData,
}: {
    origin: AppName;
    eventName: EventNamesTaksonomi;
    eventData?: Record<string, string>;
}) => {
    if (process.env.NODE_ENV === 'production') {
        window.dekoratorenAmplitude({
            origin,
            eventName,
            eventData,
        });
    }
};
