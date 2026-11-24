import { loggUmamiEvent } from '@navikt/fp-observability';

const kortTitler = {
    'oppsummering-barnehageplass': 'Barnehageplass',
    'oppsummering-planen': 'Planen',
    'oppsummering-hvor-mye': 'Hvor mye',
    'oppsummering-oppgitt-informasjon': 'Oppgitt informasjon',
    'toggle-tilpasse-planen': 'Tilpasse planen',
    'toggle-uforutsette-endringer': 'Uforutsette endringer',
} as const;

export const loggExpansionCardOpen = (komponentId: keyof typeof kortTitler) => (open: boolean) => {
    if (open) {
        loggUmamiEvent({
            origin: 'planlegger',
            eventName: 'utvidbart kort åpnet',
            eventData: { tittel: kortTitler[komponentId], komponentId },
        });
    }
};

export const loggExpansionCardToggle = (komponentId: keyof typeof kortTitler) => (open: boolean) => {
    loggUmamiEvent({
        origin: 'planlegger',
        eventName: open ? 'utvidbart kort åpnet' : 'utvidbart kort lukket',
        eventData: { tittel: kortTitler[komponentId], komponentId },
    });
};
