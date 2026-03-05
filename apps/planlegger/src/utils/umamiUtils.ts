import { loggUmamiEvent } from '@navikt/fp-observability';

export const loggExpansionCardOpen = (tittel: string) => (open: boolean) => {
    if (open) {
        loggUmamiEvent({
            origin: 'planlegger',
            eventName: 'accordion åpnet',
            eventData: { tittel },
        });
    }
};
