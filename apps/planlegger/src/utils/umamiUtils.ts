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

export const loggExpansionCardToggle = (tittel: string) => (open: boolean) => {
    loggUmamiEvent({
        origin: 'planlegger',
        eventName: open ? 'accordion åpnet' : 'accordion lukket',
        eventData: { tittel },
    });
};
