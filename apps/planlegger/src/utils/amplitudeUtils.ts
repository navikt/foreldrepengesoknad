import { loggAmplitudeEvent } from '@navikt/fp-metrics';

export const loggExpansionCardOpen = (tittel: string) => (open: boolean) => {
    if (open) {
        loggAmplitudeEvent({
            origin: 'Foreldrepengeplanlegger',
            eventName: 'accordion åpnet',
            eventData: { tittel },
        });
    }
};
