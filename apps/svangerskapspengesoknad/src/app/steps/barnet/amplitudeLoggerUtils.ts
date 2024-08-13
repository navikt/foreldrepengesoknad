import { logAmplitudeEvent } from '@navikt/fp-metrics';

export const onToggleInfo = (hendelsenavn: string) => (open: boolean) => {
    if (open) {
        logAmplitudeEvent('applikasjon-hendelse', {
            app: 'svangerskapspengesoknad',
            team: 'foreldrepenger',
            hendelse: hendelsenavn,
        });
    }
};
