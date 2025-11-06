import { loggUmamiEvent } from '@navikt/fp-metrics';

export const loggExpansionCardOpen = (tittel: string) => (open: boolean) => {
    if (open) {
        loggUmamiEvent({
            origin: 'planlegger',
            eventName: 'accordion åpnet',
            eventData: { tittel },
        });
    }
};
